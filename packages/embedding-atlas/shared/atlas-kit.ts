// Helpers for the EmbeddingAtlas prop examples: stage, table, dashboards
import type { BuiltinChartSpec, EmbeddingAtlasState } from 'embedding-atlas';
import type { MountContext } from '@/types.ts';
import { eventLog, readout } from './controls.ts';
import type { Columns, Mosaic } from './db.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';
import { docsTable } from './table.ts';
import { topicPoints, type Points } from './data.ts';

export interface AtlasSetup {
  stage: Stage;
  mosaic: Mosaic;
  table: string;
  points: Points;
}

export interface AtlasSetupOptions extends StageOptions {
  /** Rows in the table; cards use at most `cardRows` (default 1500). */
  rows?: number;
  cardRows?: number;
  /**
   * Extra columns. A function gets the row count and the table's points (the same seeded points
   * `docsTable` draws), and may be async, for columns computed from the data (neighbours).
   */
  extra?: Columns | ((rows: number, points: Points) => Columns | Promise<Columns>);
}

/** A stage plus the sample docs table. Check `stage.disposed` after awaiting this. */
export async function atlasSetup(el: HTMLElement, ctx: MountContext, opts: AtlasSetupOptions = {}): Promise<AtlasSetup> {
  const stage = createStage(el, ctx, { height: 480, cardZoom: 0.5, ...opts });
  const mosaic = await stage.mosaic();
  const rows = ctx.preview ? Math.min(opts.rows ?? 3000, opts.cardRows ?? 1500) : (opts.rows ?? 3000);
  const extra = typeof opts.extra === 'function' ? await opts.extra(rows, topicPoints({ count: rows })) : opts.extra;
  if (stage.disposed) return { stage, mosaic, table: '', points: topicPoints({ count: 1 }) };
  const { table, points } = await docsTable(mosaic, { count: rows }, extra);
  return { stage, mosaic, table, points };
}

/** The `words` histogram every small dashboard here shares. */
export const wordsChart = {
  title: 'words',
  layers: [
    { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
    { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
  ],
  selection: { brush: { encoding: 'x' } },
} satisfies BuiltinChartSpec;

export const topicChart = { type: 'count-plot', title: 'topic', data: { field: 'topic' } } satisfies BuiltinChartSpec;

/** An initialState with these charts side by side in equal-width cells of one dashboard. */
export function dashboard(charts: Record<string, unknown>): EmbeddingAtlasState {
  const ids = Object.keys(charts);
  const w = Math.floor(24 / ids.length);
  const placements = Object.fromEntries(ids.map((id, i) => [id, { x: i * w, y: 0, width: w, height: 18 }]));
  return {
    charts,
    layouts: { main: { type: 'dashboard', name: 'Board', chartIds: ids, grids: { '24x18': { placements } } } },
    layoutOrder: ['main'],
    currentLayout: 'main',
  };
}

/** A small caption laid over the bottom of the view, for cards (scaled down with the view). */
function overlay(stage: Stage): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `position:absolute;left:0;right:0;bottom:0;z-index:50;pointer-events:none;padding:6px 10px;
    font:22px/1.3 ui-monospace,monospace;color:#e2e8f0;background:rgba(11,13,18,.82);white-space:pre-wrap;overflow-wrap:anywhere`;
  stage.view.append(div);
  return div;
}

/** A monospace readout under the view in full views, a caption over the view in cards. */
export function infoPanel(stage: Stage, text = ''): HTMLDivElement {
  if (!stage.preview) return readout(stage.box, text);
  const o = overlay(stage);
  o.textContent = text;
  return o;
}

/** A newest-first event log under the view in full views; the last line over the view in cards. */
export function logPanel(stage: Stage, max = 8): (line: string) => void {
  if (!stage.preview) return eventLog(stage.box, max);
  const o = overlay(stage);
  return (line) => (o.textContent = line);
}
