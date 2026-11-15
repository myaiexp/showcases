// A dashboard of chosen charts on the sample table, one variant shown at a time
import { EmbeddingAtlas, type EmbeddingAtlasProps, type EmbeddingAtlasState } from 'embedding-atlas';
import type { MountContext } from '@/types.ts';
import type { Columns, Mosaic } from './db.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';
import { docsTable } from './table.ts';

/** What one variant puts on the board: the charts (id to spec) and optional saved state. */
export interface Board {
  charts: Record<string, unknown>;
  /** Chart id to chart state (brushes, selections, offsets). */
  chartStates?: Record<string, unknown>;
  columnStyles?: EmbeddingAtlasState['columnStyles'];
  /** Replaces the default dashboard (every chart in an equal-width column). */
  layouts?: Record<string, unknown>;
  layoutOrder?: string[];
  currentLayout?: string;
  /** Other EmbeddingAtlas props (data.text, chartTheme, onStateChange…). `data` merges over table/id. */
  props?: Omit<Partial<EmbeddingAtlasProps>, 'data'> & { data?: Partial<EmbeddingAtlasProps['data']> };
}

export interface BoardOptions extends StageOptions {
  rows?: number;
  /** Extra columns for the table (images, JSON, URLs…), or a function of the row count. */
  extra?: Columns | ((rows: number) => Columns);
  /** Runs SQL on the new table before anything mounts (build BLOB or STRUCT columns). */
  setup?: (mosaic: Mosaic, table: string) => Promise<void>;
  /** Label of the bar select. */
  label?: string;
  /** Milliseconds each variant stays in cards. */
  ms?: number;
}

/** Equal-width dashboard cells, one per chart id, filling the 24x18 grid. */
export function rowLayout(ids: string[]): Record<string, unknown> {
  const w = Math.floor(24 / ids.length);
  const placements = Object.fromEntries(ids.map((id, i) => [id, { x: i * w, y: 0, width: w, height: 18 }]));
  return {
    main: { type: 'dashboard', name: 'Board', chartIds: ids, grids: { '24x18': { placements } } },
  };
}

/**
 * Mounts a stage, builds the docs table, and shows each variant as its own EmbeddingAtlas
 * (cards cycle them, full views get a select). A variant may be a function of the table name,
 * for specs that read `from` or a `query`.
 */
export async function chartBoard(
  el: HTMLElement,
  ctx: MountContext,
  variants: Record<string, Board | ((table: string) => Board)>,
  opts: BoardOptions = {},
): Promise<Stage> {
  const stage = createStage(el, ctx, { height: 420, cardZoom: 0.5, ...opts });
  const mosaic = await stage.mosaic();
  const rows = ctx.preview ? 1500 : (opts.rows ?? 3000);
  const extra = typeof opts.extra === 'function' ? opts.extra(rows) : opts.extra;
  const { table } = await docsTable(mosaic, { count: rows }, extra);
  await opts.setup?.(mosaic, table);
  if (stage.disposed) return stage;

  stage.variants(
    opts.label ?? 'Variant',
    Object.keys(variants),
    (name, host) => {
      const v = variants[name]!;
      const board = typeof v === 'function' ? v(table) : v;
      const ids = Object.keys(board.charts);
      const layouts = board.layouts ?? rowLayout(ids);
      const props = board.props ?? {};
      return new EmbeddingAtlas(host, {
        coordinator: mosaic.coordinator,
        colorScheme: 'dark',
        ...props,
        data: { table, id: 'id', ...props.data },
        initialState: {
          charts: board.charts,
          chartStates: board.chartStates,
          columnStyles: board.columnStyles,
          layouts,
          layoutOrder: board.layoutOrder ?? Object.keys(layouts),
          currentLayout: board.currentLayout ?? Object.keys(layouts)[0],
        },
      });
    },
    opts.ms ?? 5000,
  );
  return stage;
}
