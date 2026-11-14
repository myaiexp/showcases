// collection.primaryKeys(): intersect the ids from several index searches
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';

const rows = [
  { id: 1, firstName: 'Alice', lastName: 'Svensson', age: 30 },
  { id: 2, firstName: 'Alice', lastName: 'Svensson', age: 70 },
  { id: 3, firstName: 'Alicia', lastName: 'Svenson', age: 40 },
  { id: 4, firstName: 'Alice', lastName: 'Berg', age: 25 },
  { id: 5, firstName: 'Bob', lastName: 'Svensson', age: 50 },
  { id: 6, firstName: 'Alison', lastName: 'Svensson', age: 17 },
];

const mount: Mount = (el, ctx) => {
  const columns = ctx.preview
    ? [{ field: 'firstName', label: 'first' }, { field: 'lastName', label: 'last' }, { field: 'age', width: '2.6em' }]
    : [{ field: 'id', width: '2.6em' }, { field: 'firstName', label: 'first' }, { field: 'lastName', label: 'last' }, { field: 'age', width: '3.4em' }];
  const d = demo(el, ctx, { table: 'people', stores: 'id, firstName, lastName, age', seed: rows, columns });
  const { t, say, view, out } = d;
  const ids = (n: 'firstName' | 'lastName' | 'age') =>
    n === 'firstName' ? t.where(n).startsWith('Ali').primaryKeys()
    : n === 'lastName' ? t.where(n).startsWith('Svens').primaryKeys()
    : t.where(n).between(18, 65).primaryKeys();
  const show = async (n: 'firstName' | 'lastName' | 'age') => {
    const keys = await ids(n);
    view.mark(keys);
    out.list(keys.map((k) => `id ${k}`));
  };
  say.set('Ali..., Svens..., aged 18 to 65.', 'three searches, three indexes');
  d.run([
    d.step('First name', "firstName starts with 'Ali'.", "where('firstName').startsWith('Ali')", () => show('firstName')),
    d.step('Last name', "lastName starts with 'Svens'.", "where('lastName').startsWith('Svens')", () => show('lastName')),
    d.step('Age', 'Age between 18 and 65.', "where('age').between(18, 65)", () => show('age')),
    d.step('Keep common ids', 'Only ids found by all three.', 'primaryKeys() x3, then bulkGet', async () => {
      const found = await d.db.transaction('r', t, async () => {
        const results = await Promise.all([ids('firstName'), ids('lastName'), ids('age')]);
        const common = results.reduce((inCommon, keys) => {
          const set = new Set(inCommon);
          return keys.filter((id) => set.has(id));
        });
        return t.bulkGet(common);
      });
      pick(d, found, (r) => `${r.firstName} ${r.lastName} ${r.age}`);
    }, 2600),
  ]);
  return d.stage.dispose;
};

export default mount;
