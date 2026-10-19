import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
test('PWA shell exposes the core offline controls', () => {
  for (const value of ['mediaInput', 'recipe', 'filter', 'preset', 'run', 'progress', 'download', 'range', 'compare']) assert.match(html, new RegExp(value));
});
test('encoding recipe keeps the WhatsApp-safe constraints', () => {
  for (const value of ['profile:v','baseline','3.1','2650k','5300k','faststart','1080','1920']) assert.match(html, new RegExp(value));
});
test('service worker has versioned caching and activation cleanup', () => {
  assert.match(sw, /wa-hd-assets-v4/); assert.match(sw, /skipWaiting/); assert.match(sw, /clients\.claim/);
});
test('media flow has a unified input, comparison output, and no stale video globals', () => {
  assert.match(html, /accept="image\/\*,video\/\*"/);
  assert.match(html, /createImageBitmap\(media\)/);
  assert.match(html, /4096\/bitmap\.width/);
  assert.match(html, /await \$\('beforeVideo'\)\.play\(\)/);
  assert.doesNotMatch(html, /(?<!\$\(')beforeVideo\.play\(\)/);
});
test('FFmpeg blob worker rewrites relative module imports', () => {
  assert.match(html, /cachedText\(workerUrl\)/);
  assert.match(html, /replace\(/);
  assert.match(html, /workerBase\}\$1/);
  assert.match(html, /classWorkerURL:worker/);
});
