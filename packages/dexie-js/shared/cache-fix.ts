// Works around a dexie 4.4.7 bug: a failed add() breaks later live queries
//
// In dexie's cache middleware, an add()/put() without a primary key (a '++id' table) or of 50+
// rows pushes `adjustOptimisticFromFailures(...)` onto the table's optimisticOps without the null
// check the other branch has. When every row fails (a unique-index clash, say), that is null, and
// from then on every live query on the table throws "Cannot read properties of null (reading
// 'type')" and the transaction-end cleanup throws on `null.trans`, so the grid stops updating.
// This middleware sits above the cache and removes those nulls right after each write settles.
import { Dexie } from 'dexie';

export function scrubNullOptimisticOps(db: Dexie): void {
  db.use({
    stack: 'dbcore',
    name: 'ShowcaseScrubNullOptimisticOps',
    level: 100, // outermost, so its .then runs after the cache middleware's own
    create: (down) => ({
      ...down,
      table: (tableName) => {
        const table = down.table(tableName);
        return {
          ...table,
          mutate: (req) =>
            table.mutate(req).then((res) => {
              const cached = Dexie.cache[`idb://${down.schema.name}/${tableName}`];
              if (cached?.optimisticOps.includes(null as never)) {
                cached.optimisticOps = cached.optimisticOps.filter(Boolean);
              }
              return res;
            }),
        };
      },
    }),
  });
}
