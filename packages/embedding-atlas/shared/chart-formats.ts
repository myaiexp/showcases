// Sample cell values for column renderers: image, audio, JSON, links
import type { Columns } from './db.ts';
import { TOPICS } from './data.ts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

/** A 64x64 PNG as a data URL: a coloured disc with the topic's initial. Drawn in code, never fetched. */
export function pngDataUrl(i: number): string {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  g.fillStyle = '#0f172a';
  g.fillRect(0, 0, 64, 64);
  g.fillStyle = COLORS[i % COLORS.length]!;
  g.beginPath();
  g.arc(32, 32, 26 - (i % 3) * 4, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#fff';
  g.font = 'bold 26px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText((TOPICS[i % TOPICS.length]?.name[0] ?? '?').toUpperCase(), 32, 34);
  return c.toDataURL('image/png');
}

/** A 0.4 s 16-bit mono WAV beep as a data URL. It is only ever a source: nothing plays it. */
export function wavDataUrl(freq: number): string {
  const rate = 8000;
  const n = Math.floor(rate * 0.4);
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const str = (o: number, s: string): void => [...s].forEach((ch, k) => v.setUint8(o + k, ch.charCodeAt(0)));
  str(0, 'RIFF');
  v.setUint32(4, 36 + n * 2, true);
  str(8, 'WAVEfmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, n * 2, true);
  for (let k = 0; k < n; k++) {
    const env = Math.min(1, k / 200, (n - k) / 400);
    v.setInt16(44 + k * 2, Math.sin((k / rate) * freq * Math.PI * 2) * 9000 * env, true);
  }
  let bin = '';
  for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b);
  return `data:audio/wav;base64,${btoa(bin)}`;
}

const TOPIC_NAMES = TOPICS.map((t) => t.name);

/**
 * Columns for `rows` rows, cycling through eight values each: `thumb` (PNG data URL),
 * `thumb_b64` (raw base64 of the same PNG), `link` (a URL on example.com), `meta` (a struct
 * for the json renderer), `clip` (WAV data URL), `note`
 * (Markdown), `stars` (1 to 5).
 */
export function formatColumns(rows: number): Columns {
  const thumbs = Array.from({ length: 8 }, (_, i) => pngDataUrl(i));
  const clips = Array.from({ length: 8 }, (_, i) => wavDataUrl(330 + i * 70));
  const thumb: string[] = [];
  const thumbB64: string[] = [];
  const link: string[] = [];
  const meta: unknown[] = [];
  const clip: string[] = [];
  const note: string[] = [];
  const stars = new Int32Array(rows);
  for (let i = 0; i < rows; i++) {
    const k = i % 8;
    const topic = TOPIC_NAMES[k % TOPIC_NAMES.length]!;
    thumb.push(thumbs[k]!);
    thumbB64.push(thumbs[k]!.slice('data:image/png;base64,'.length));
    link.push(`https://example.com/topics/${topic}/${i}`);
    meta.push({ topic, index: i, flags: { reviewed: k % 2 === 0, draft: k % 3 === 0 }, scores: [k, k * 2, k * 3] });
    clip.push(clips[k]!);
    note.push(`### ${topic} #${i}\n\n- *emphasis* and **strong**\n- a [link](https://example.com/${topic})\n- \`code\``);
    stars[i] = 1 + (k % 5);
  }
  return { thumb, thumb_b64: thumbB64, link, meta, clip, note, stars };
}
