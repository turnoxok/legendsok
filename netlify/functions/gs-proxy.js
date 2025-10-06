// netlify/functions/gs-proxy.js

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ ok: false, error: 'Only POST allowed' })
    };
  }
  try {
    const body = JSON.parse(event.body || '{}');

    // 👉 acá usamos la URL de tu Apps Script
    const GS_URL = "https://script.google.com/macros/s/AKfycbygSPJkK4bN3HeI5JByzI2soGxSV1xDCzkMOhc-W-ie1TV9lDTVKxPYu0LTRrG6mTA9QQ/exec";

    const res = await fetch(GS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const text = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
