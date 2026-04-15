import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { fetchGalleryPrompts, incrementPromptViews } from '../services/sheets';
import { GalleryPrompt } from '../types';
import { PromptCard } from '../components/prompts/PromptCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toggleFavorite } from '../services/firebase';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const PromptsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [prompts, setPrompts] = useState<GalleryPrompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const searchQuery = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'all';
  const isArabic = language === 'ar';

  const loadPrompts = async () => {
    setLoading(true);
    
    const data = await fetchGalleryPrompts();
    setPrompts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  const handleToggleFavorite = async (promptId: string) => {
    if (!user) {
      toast.error(isArabic ? 'يرجى تسجيل الدخول أولاً' : 'Please login first');
      return;
    }

    const isFavorited = profile?.favorites?.includes(promptId);

    try {
      await toggleFavorite(user.uid, promptId, !isFavorited);
      if (isFavorited) {
        toast.success(isArabic ? 'تمت الإزالة من المفضلة' : 'Removed from favorites');
      } else {
        toast.success(isArabic ? 'تمت الإضافة إلى المفضلة' : 'Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error(isArabic ? 'حدث خطأ ما' : 'Something went wrong');
    }
  };

  const handleView = async (promptId: string) => {
    await incrementPromptViews(promptId);
    setPrompts(prev => prev.map(p => 
      p.id === promptId ? { ...p, views: p.views + 1 } : p
    ));
  };

  const uniqueTypes = Array.from(new Set(prompts.map(p => p.type).filter(Boolean))) as string[];

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const updateSearch = (q: string) => {
    const params = new URLSearchParams(searchParams);
    if (q) params.set('q', q);
    else params.delete('q');
    setSearchParams(params);
  };

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category !== 'all') params.set('category', category);
    else params.delete('category');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {t('galleryTitle')}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4"
          >
            {t('gallerySubtitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            {t('galleryDesc')}
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                type="text"
                placeholder={t('gallerySearch')}
                className="pl-12 pr-4 h-12 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Dynamic Categories */}
          {uniqueTypes.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                onClick={() => updateCategory('all')}
                className="rounded-full px-6 transition-all duration-300"
              >
                {isArabic ? 'الكل' : 'All'}
              </Button>
              {uniqueTypes.map((type) => (
                <Button
                  key={type}
                  variant={activeCategory === type ? 'default' : 'outline'}
                  onClick={() => updateCategory(type)}
                  className="rounded-full px-6 transition-all duration-300"
                >
                  {type}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-zinc-500">{t('galleryLoading')}</p>
          </div>
        ) : filteredPrompts.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isFavorited={profile?.favorites?.includes(prompt.id) || false}
                onToggleFavorite={handleToggleFavorite}
                onView={handleView}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-500 text-lg">
              {t('galleryNoResults')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptsPage;
