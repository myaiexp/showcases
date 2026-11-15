// The page's bundled DuckDB-WASM; a Mosaic coordinator and tables per mount
//
// Mosaic's wasmConnector() fetches DuckDB from jsDelivr when it is not handed an instance,
// so every coordinator here is built on the page's one AsyncDuckDB, loaded from the
// package's own wasm and worker files (same-origin assets, never the CDN).
import * as duckdb from '@duckdb/duckdb-wasm';
import wasmUrl from '@duckdb/duckdb-wasm/dist/duckdb-base.wasm?url';
import workerUrl from '@duckdb/duckdb-wasm/dist/duckdb-browser-base.worker.js?url';
import { tableFromArrays, tableToIPC } from '@uwdata/flechette';
import { Coordinator, wasmConnector } from '@uwdata/mosaic-core';

let dbPromise: Promise<duckdb.AsyncDuckDB> | null = null;

/** The page's one DuckDB instance, started on first use. */
export function pageDuckDB(): Promise<duckdb.AsyncDuckDB> {
  dbPromise ??= (async () => {
    const worker = new Worker(workerUrl);
    const db = new duckdb.AsyncDuckDB(new duckdb.VoidLogger(), worker);
    await db.instantiate(wasmUrl);
    // Extensions would be fetched from extensions.duckdb.org; nothing here needs one.
    // embedding-atlas 0.26 writes lambdas as `x -> …`, which this DuckDB rejects as deprecated
    // (the features list then stays empty), so the old arrow syntax is switched back on.
    const con = await db.connect();
    await con.query(`SET autoinstall_known_extensions = false; SET autoload_known_extensions = false;
      SET GLOBAL lambda_syntax = 'ENABLE_SINGLE_ARROW';`);
    await con.close();
    return db;
  })();
  return dbPromise;
}

/** Column arrays for one table: typed arrays, or plain arrays of numbers, strings, nulls or lists. */
export type Columns = Record<string, ArrayLike<unknown>>;

let tables = 0;

export interface Mosaic {
  /** A coordinator of this mount's own, on the page's DuckDB. */
  coordinator: Coordinator;
  /** Creates a table from column arrays under a name unique to this mount, and returns that name. */
  table(name: string, columns: Columns): Promise<string>;
  /** Runs SQL on this mount's connection (CREATE, UPDATE, …). */
  exec(sql: string): Promise<void>;
  /** Drops this mount's tables and closes its connection. */
  dispose(): Promise<void>;
}

/**
 * Opens a connection and a coordinator for one mount. Tables are named `<name>_<n>`, so two
 * cards never share one, and pre-aggregation is off: it writes materialized views into a
 * page-wide `mosaic` schema that nothing would drop.
 */
export async function createMosaic(): Promise<Mosaic> {
  const db = await pageDuckDB();
  const con = await db.connect();
  const coordinator = new Coordinator(wasmConnector({ duckdb: db, connection: con }), {
    logger: null,
    preagg: { enabled: false },
  });
  const owned: string[] = [];
  let disposed = false;

  return {
    coordinator,
    async table(name, columns) {
      const unique = `${name}_${++tables}`;
      const ipc = tableToIPC(tableFromArrays(columns as Record<string, never>), { format: 'stream' });
      if (!ipc) throw new Error(`could not encode table ${name}`);
      await con.insertArrowFromIPCStream(ipc, { name: unique, create: true });
      owned.push(unique);
      return unique;
    },
    async exec(sql) {
      await con.query(sql);
    },
    async dispose() {
      if (disposed) return;
      disposed = true;
      coordinator.clear();
      for (const t of owned) await con.query(`DROP TABLE IF EXISTS "${t}"`).catch(() => undefined);
      await con.close().catch(() => undefined);
    },
  };
}
