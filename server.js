/**
 * Neat Pulse API プロキシサーバー
 * 起動方法: node server.js
 * その後 neat-pulse-dashboard.html をブラウザで開く
 */

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;
const API_BASE = 'api.pulse.neat.no';

const server = http.createServer((req, res) => {
  // CORS ヘッダーを全レスポンスに付与
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');

  // プリフライトリクエスト対応
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // /proxy?path=/v1/orgs/... の形式でリクエストを受け付ける
  const parsed = url.parse(req.url, true);
  if (parsed.pathname !== '/proxy') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found. Use /proxy?path=/v1/...' }));
    return;
  }

  const apiPath = parsed.query.path;
  const authHeader = req.headers['authorization'];

  if (!apiPath) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'path クエリパラメータが必要です' }));
    return;
  }

  if (!authHeader) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authorization ヘッダーが必要です' }));
    return;
  }

  console.log(`[${new Date().toLocaleTimeString('ja-JP')}] → GET https://${API_BASE}${apiPath}`);

  const options = {
    hostname: API_BASE,
    path: apiPath,
    method: 'GET',
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json',
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    let body = '';
    proxyRes.on('data', chunk => body += chunk);
    proxyRes.on('end', () => {
      console.log(`[${new Date().toLocaleTimeString('ja-JP')}] ← ${proxyRes.statusCode} (${body.length} bytes)`);
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(body);
    });
  });

  proxyReq.on('error', (e) => {
    console.error('プロキシエラー:', e.message);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'プロキシエラー: ' + e.message }));
  });

  proxyReq.end();
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   Neat Pulse プロキシサーバー 起動中          ║');
  console.log(`║   http://localhost:${PORT}                      ║`);
  console.log('╠══════════════════════════════════════════════╣');
  console.log('║  次のステップ:                                ║');
  console.log('║  1. neat-pulse-dashboard.html をChromeで開く  ║');
  console.log('║  2. APIキーと組織IDを入力して接続する          ║');
  console.log('║  Ctrl+C でサーバーを停止                      ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
