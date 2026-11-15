// Helpers for NNDescent examples: planar data, exact neighbours, recall
import type { Scatter } from './canvas2d.ts';
import { topicPoints } from './data.ts';
import type { Stage } from './stage.ts';
import type { Vectors } from './vectors.ts';

/** Topic points as 2D `Vectors` (x, y rows), so neighbours can be drawn where they really are. */
export function planar(count: number, topics = 6, seed = 7): Vectors {
  const p = topicPoints({ count, topics, seed, noise: 0.05 });
  const data = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    data[i * 2] = p.x[i]!;
    data[i * 2 + 1] = p.y[i]!;
  }
  return { count, dim: 2, data, label: p.category };
}

/** Exact `k` nearest rows to `q` (row indices, nearest first) under the metric, by brute force. */
export function exactKnn(v: Vectors, q: ArrayLike<number>, k: number, metric: 'euclidean' | 'cosine' = 'euclidean'): number[] {
  let qn = 0;
  for (let d = 0; d < v.dim; d++) qn += q[d]! * q[d]!;
  const scored: [number, number][] = [];
  for (let i = 0; i < v.count; i++) {
    let dot = 0, sq = 0, rn = 0;
    for (let d = 0; d < v.dim; d++) {
      const a = v.data[i * v.dim + d]!;
      dot += a * q[d]!;
      rn += a * a;
      sq += (a - q[d]!) ** 2;
    }
    scored.push([metric === 'cosine' ? 1 - dot / (Math.sqrt(rn * qn) || 1) : sq, i]);
  }
  scored.sort((a, b) => a[0] - b[0]);
  return scored.slice(0, k).map((s) => s[1]);
}

/** The row of `v` as a fresh array, for use as a query vector. */
export function rowOf(v: Vectors, i: number): Float32Array {
  return v.data.slice(i * v.dim, (i + 1) * v.dim);
}

/** Fraction of `truth` that appears in `found`. */
export function overlap(found: ArrayLike<number>, truth: readonly number[]): number {
  const set = new Set(Array.from(found));
  return truth.filter((t) => set.has(t)).length / truth.length;
}

export interface Board {
  /** Adds or updates a row: a bar for `value` (0..1) with a note after it. */
  set(label: string, value: number, note: string): void;
  clear(): void;
}

/** A canvas of animated horizontal bars, for recall against build time. Draws until the stage ends. */
export function recallBoard(stage: Stage, title: string): Board {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = stage.width, h = stage.height;
  const canvas = document.createElement('canvas');
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.cssText = `display:block;width:${w}px;height:${h}px`;
  stage.view.append(canvas);
  const g = canvas.getContext('2d')!;
  g.scale(dpr, dpr);
  const rows: { label: string; target: number; shown: number; note: string }[] = [];
  stage.loop(() => {
    g.fillStyle = '#0b0d12';
    g.fillRect(0, 0, w, h);
    g.font = '12px ui-monospace, monospace';
    g.fillStyle = '#c8d0e0';
    g.textBaseline = 'middle';
    g.fillText(title, 12, 18);
    const rowH = Math.min(40, (h - 40) / Math.max(rows.length, 4));
    rows.forEach((r, i) => {
      r.shown += (r.target - r.shown) * 0.12;
      const y = 44 + i * rowH;
      const labelW = Math.min(120, w * 0.3);
      const barW = Math.max(40, w - labelW - 24 - Math.min(190, w * 0.45));
      g.fillStyle = '#9aa4ba';
      g.fillText(r.label, 12, y);
      g.fillStyle = '#262b38';
      g.fillRect(labelW + 12, y - 7, barW, 14);
      // Recall below 1 shows in a warmer colour.
      g.fillStyle = r.target > 0.995 ? '#7ad9a0' : r.target > 0.9 ? '#7aa2f7' : '#f7a07a';
      g.fillRect(labelW + 12, y - 7, barW * r.shown, 14);
      g.fillStyle = '#c8d0e0';
      g.fillText(r.note, labelW + barW + 20, y);
    });
  });
  return {
    set(label, value, note) {
      const row = rows.find((r) => r.label === label);
      if (row) Object.assign(row, { target: value, note });
      else rows.push({ label, target: value, shown: 0, note });
    },
    clear: () => void (rows.length = 0),
  };
}

/**
 * Runs `measure` for each label in turn, filling the board. Cards repeat the sweep forever;
 * the full view runs it once and again on `rerun()`.
 */
export function sweep(
  stage: Stage,
  board: Board,
  labels: readonly string[],
  measure: (label: string) => Promise<{ value: number; note: string }>,
): () => void {
  let token = 0;
  const run = async (): Promise<void> => {
    const mine = ++token;
    board.clear();
    for (const label of labels) {
      if (stage.disposed || mine !== token) return;
      const r = await measure(label);
      if (stage.disposed || mine !== token) return;
      board.set(label, r.value, r.note);
      await new Promise<void>((res) => setTimeout(res, stage.preview ? 350 : 80));
    }
    if (stage.preview && !stage.disposed && mine === token) {
      await new Promise<void>((res) => setTimeout(res, 2500));
      if (!stage.disposed && mine === token) void run();
    }
  };
  void run();
  return () => void run();
}

/** Marks neighbour rows of 2D `v` on the plot: lines from the centre, white dots, a ring on the farthest. */
export function highlight(plot: Scatter, v: Vectors, centre: [number, number], rows: ArrayLike<number>, color = '#fff'): void {
  const g = plot.g;
  const [cx, cy] = plot.toPixel(centre[0], centre[1]);
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.lineWidth = 0.8;
  g.fillStyle = color;
  let far = 0;
  for (let n = 0; n < rows.length; n++) {
    const i = rows[n]!;
    const [px, py] = plot.toPixel(v.data[i * 2]!, v.data[i * 2 + 1]!);
    g.beginPath();
    g.moveTo(cx, cy);
    g.lineTo(px, py);
    g.stroke();
    g.fillRect(px - 2.5, py - 2.5, 5, 5);
    far = Math.max(far, Math.hypot(px - cx, py - cy));
  }
  g.strokeStyle = color;
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(cx, cy, 5, 0, Math.PI * 2);
  g.stroke();
}

/** Mean overlap with the exact neighbours of sample rows; `ask(i)` returns an index's row list. */
export function recallByIndex(
  v: Vectors,
  k: number,
  ask: (i: number) => ArrayLike<number>,
  metric: 'euclidean' | 'cosine' = 'euclidean',
  samples = 60,
): number {
  let sum = 0;
  for (let s = 0; s < samples; s++) {
    const i = Math.floor((s * 7919) % v.count);
    sum += overlap(ask(i), exactKnn(v, rowOf(v, i), k, metric));
  }
  return sum / samples;
}

/** Mean overlap for off-sample queries (a data row nudged by `jitter`); `ask(q)` returns the rows. */
export function recallByVector(
  v: Vectors,
  k: number,
  ask: (q: Float32Array) => ArrayLike<number>,
  samples = 60,
  jitter = 0.8,
): number {
  let sum = 0;
  for (let s = 0; s < samples; s++) {
    const q = rowOf(v, Math.floor((s * 7919) % v.count));
    for (let d = 0; d < q.length; d++) q[d]! += Math.sin(s * 12.9898 + d * 78.233) * jitter;
    sum += overlap(ask(q), exactKnn(v, q, k));
  }
  return sum / samples;
}
