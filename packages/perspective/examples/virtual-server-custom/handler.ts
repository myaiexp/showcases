// A VirtualServerHandler over a plain JavaScript array: filter and sort, no engine
import type { ColumnType, VirtualServerHandler, ViewConfig, ViewWindow, VirtualDataSlice } from '@perspective-dev/client';

type Row = Record<string, string | number>;
type Log = (line: string) => void;

const OPS: Record<string, (a: unknown, b: unknown) => boolean> = {
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
  '>': (a, b) => (a as number) > (b as number),
  '<': (a, b) => (a as number) < (b as number),
  '>=': (a, b) => (a as number) >= (b as number),
  '<=': (a, b) => (a as number) <= (b as number),
  contains: (a, b) => String(a).includes(String(b)),
};

/** Every view is a filtered, sorted list of row indices, computed once in tableMakeView. */
export function arrayHandler(tableId: string, rows: Row[], schema: Record<string, ColumnType>, log: Log): VirtualServerHandler {
  const views = new Map<string, number[]>();
  const columnsOf = (config: ViewConfig): string[] => (config.columns ?? Object.keys(schema)).filter((c): c is string => !!c);

  return {
    getHostedTables: () => [tableId],
    tableSchema: () => schema,
    tableSize: () => rows.length,
    // Translate the view config into a "query" against the source, keyed by viewId.
    tableMakeView(_table, viewId, config) {
      let idx = rows.map((_, i) => i);
      for (const [col, op, term] of config.filter ?? []) {
        const test = OPS[op as string];
        if (test) idx = idx.filter((i) => test(rows[i]![col as string], term));
      }
      for (const [col, dir] of [...(config.sort ?? [])].reverse()) {
        const sign = dir === 'desc' ? -1 : 1;
        idx.sort((a, b) => sign * (rows[a]![col]! > rows[b]![col]! ? 1 : rows[a]![col]! < rows[b]![col]! ? -1 : 0));
      }
      views.set(viewId, idx);
      log(`tableMakeView(${viewId}) filter ${JSON.stringify(config.filter ?? [])} sort ${JSON.stringify(config.sort ?? [])} → ${idx.length} rows`);
    },
    // Validate a config and report the view's schema without building it.
    tableDescribe(_table, config) {
      const view_schema = Object.fromEntries(columnsOf(config).map((c) => [c, schema[c]!]));
      return { expression_schema: {}, view_schema };
    },
    viewSize: (viewId) => views.get(viewId)?.length ?? 0,
    viewSchema: (_viewId, config) => Object.fromEntries(columnsOf(config).map((c) => [c, schema[c]!])),
    viewDelete(viewId) {
      views.delete(viewId);
      log(`viewDelete(${viewId})`);
    },
    // Push only the requested window, column by column, into the slice.
    viewGetData(viewId: string, config: ViewConfig, viewSchema: Record<string, ColumnType>, viewport: ViewWindow, slice: VirtualDataSlice) {
      const idx = views.get(viewId) ?? [];
      const start = viewport.start_row ?? 0;
      const end = Math.min(viewport.end_row ?? idx.length, idx.length);
      const cols = columnsOf(config).slice(viewport.start_col ?? 0, viewport.end_col ?? undefined);
      for (const col of cols) {
        for (let r = start; r < end; r++) slice.setCol(viewSchema[col] ?? schema[col]!, col, r - start, rows[idx[r]!]![col]);
      }
      log(`viewGetData(${viewId}) rows ${start}–${end}, ${cols.length} columns`);
    },
    // The viewer only offers what is declared here.
    getFeatures: () => ({
      sort: true,
      filter_ops: {
        string: ['==', '!=', 'contains'],
        float: ['==', '!=', '>', '<', '>=', '<='],
        integer: ['==', '!=', '>', '<', '>=', '<='],
      },
    }),
  };
}
