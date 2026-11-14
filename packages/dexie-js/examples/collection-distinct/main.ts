// collection.distinct(): one result per row, even when several tags match
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { pick } from '../../shared/collection-kit.ts';
import { TAGGED } from '../../shared/where-data.ts';

const mount: Mount = (el, ctx) => {
  const rows = TAGGED.slice(0, 5).map((r, i) => ({ id: i + 1, ...r }));
  const columns = ctx.preview ? ['name', 'tags'] : [{ field: 'id', width: '2.6em' }, 'name', 'tags'];
  const d = demo(el, ctx, { stores: 'id, name, *tags', seed: rows, columns });
  const { t, say, out } = d;
  const name = (r: Record<string, unknown>) => String(r.name);
  say.set('Friends with tags.', "stores: 'id, name, *tags'");
  d.run([
    d.step('Two tags', "Find 'sports' or 'cars' tags.", "where('tags').anyOf('sports','cars')", async () =>
      pick(d, await t.where('tags').anyOf('sports', 'cars').toArray(), name),
    ),
    d.step('distinct()', 'distinct(): each friend once.', '.anyOf(...).distinct()', async () =>
      pick(d, await t.where('tags').anyOf('sports', 'cars').distinct().toArray(), name),
    ),
    d.step('Count', 'Count them without repeats.', '.anyOf(...).distinct().count()', async () =>
      out.value(await t.where('tags').anyOf('sports', 'cars').distinct().count(), 'friends'),
    ),
  ]);
  return d.stage.dispose;
};

export default mount;
