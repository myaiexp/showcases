// A sample documents table for Mosaic: projection, text and metadata columns
import { rng, texts, topicPoints, TOPICS, type Points, type PointsOptions } from './data.ts';
import type { Columns, Mosaic } from './db.ts';

export interface DocsTable {
  /** The table's name in DuckDB (unique to the mount). */
  table: string;
  points: Points;
}

const SOURCES = ['forum', 'blog', 'wiki', 'news', 'paper'] as const;

/**
 * Column arrays for `points`: `id` (int), `x`/`y` (float), `topic` (text), `text`, `source`
 * (text), `words` (int), `rating` (1–5, one decimal), `score` (0–100), `published` (date in
 * 2024–2025), `tags` (list of text). Every column is seeded, so each mount is identical.
 */
export function docsColumns(points: Points, seed = 17): Columns {
  const r = rng(seed);
  const n = points.count;
  const id = new Int32Array(n);
  const words = new Int32Array(n);
  const rating = new Float64Array(n);
  const score = new Int32Array(n);
  const source: string[] = [];
  const published: Date[] = [];
  const tags: string[][] = [];
  const topic: string[] = [];
  const start = Date.UTC(2024, 0, 1);
  for (let i = 0; i < n; i++) {
    const c = points.category[i]!;
    id[i] = i;
    topic.push(points.names[c]!);
    source.push(SOURCES[Math.floor(r() * r() * SOURCES.length)]!);
    words[i] = 40 + Math.floor(r() * r() * 900);
    rating[i] = Math.round((1 + Math.min(4, Math.max(0, 2 + c * 0.35 + (r() - 0.5) * 2.5))) * 10) / 10;
    score[i] = Math.round(Math.min(100, Math.max(0, 50 + points.y[i]! * 6 + (r() - 0.5) * 30)));
    published.push(new Date(start + Math.floor(r() * 730) * 86400000));
    const pool = TOPICS[c]!.words;
    const k = 1 + Math.floor(r() * 3);
    tags.push(Array.from({ length: k }, () => pool[Math.floor(r() * 4)]!));
  }
  return { id, x: points.x, y: points.y, topic, text: texts(points), source, words, rating, score, published, tags };
}

/** Builds the sample documents table on `mosaic`, from `topicPoints(opts)`. */
export async function docsTable(mosaic: Mosaic, opts: PointsOptions = {}, extra: Columns = {}): Promise<DocsTable> {
  const points = topicPoints({ count: 4000, ...opts });
  const table = await mosaic.table('docs', { ...docsColumns(points), ...extra });
  return { table, points };
}

/**
 * A lean table for EmbeddingViewMosaic examples: `id`, `x`, `y`, `topic_id` (0-based int, the
 * kind of column the category prop needs), `topic` (name), `text` and `score` (0–100, rising
 * with y).
 */
export async function pointsTable(mosaic: Mosaic, opts: PointsOptions = {}, extra: Columns = {}): Promise<DocsTable> {
  const points = topicPoints({ count: 20000, ...opts });
  const all = docsColumns(points);
  const table = await mosaic.table('points', {
    id: all.id!,
    x: points.x,
    y: points.y,
    topic_id: Int32Array.from(points.category),
    topic: all.topic!,
    text: all.text!,
    score: all.score!,
    ...extra,
  });
  return { table, points };
}
