import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  try {
    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzdog1J5djq52THUd9pt_YBK34iP3hgcLPULnv6zwIwdtI5w10AWfOngzirt-nGtoRfnw/exec';
    
    const response = await fetch(SHEETS_URL, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: 'Failed to fetch' }) };
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
