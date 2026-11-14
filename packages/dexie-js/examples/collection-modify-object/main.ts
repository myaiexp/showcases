// collection.modify(object): set fields on every row a query matches
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';
import { SHOE_FRIENDS } from '../../shared/collection-kit.ts';

const mount: Mount = (el, ctx) => {
  const columns = [{ field: 'name' }, { field: 'shoeSize', label: 'shoe', width: '2.6em' }, { field: 'isBigfoot', label: 'big', width: '2.6em' }];
  const d = demo(el, ctx, { stores: 'id, name, shoeSize, isBigfoot', seed: SHOE_FRIENDS, columns });
  const { t, say, view, out } = d;
  say.set('Friends with shoe sizes.', "stores: 'id, name, shoeSize, isBigfoot'");
  d.run([
    d.step('Find big feet', 'Who has shoe size 42 or more?', "where('shoeSize').aboveOrEqual(42)", async () =>
      view.mark(await t.where('shoeSize').aboveOrEqual(42).primaryKeys()),
    ),
    d.step('modify()', 'Flag them all in one call.', ".modify({ isBigfoot: 1 })", async () =>
      out.value(await t.where('shoeSize').aboveOrEqual(42).modify({ isBigfoot: 1 }), 'rows modified'),
    ),
    d.step('Find the flagged', 'Ask for the flagged ones.', 'where({ isBigfoot: 1 }).toArray()', async () => {
      const found = await t.where({ isBigfoot: 1 }).toArray();
      view.mark(found.map((f) => f.id));
      out.list(found.map((f) => f.name));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
