import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
test('PWA shell exposes the core offline controls', () => {
  for (const value of ['videoInput', 'recipe', 'filter', 'preset', 'convertBtn', 'progress', 'download']) assert.match(html, new RegExp(value));
});
test('encoding recipe keeps the WhatsApp-safe constraints', () => {
  for (const value of ['profile:v','baseline','3.1','2650k','5300k','faststart','1080','1920']) assert.match(html, new RegExp(value));
});
test('service worker has versioned caching and activation cleanup', () => {
  assert.match(sw, /wa-hd-assets-v3/); assert.match(sw, /skipWaiting/); assert.match(sw, /clients\.claim/);
});
