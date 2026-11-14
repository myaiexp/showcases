// collection.modify() with a key path: change one field inside a nested object
import type { Mount } from '@/types.ts';
import { demo } from '../../shared/demo.ts';

const rows = [
  { id: 1, name: 'Zlatan', props: { shoeSize: 47, bigfoot: 'no' } },
  { id: 2, name: 'Sara', props: { shoeSize: 40, bigfoot: 'no' } },
  { id: 3, name: 'Per', props: { shoeSize: 48, bigfoot: 'no' } },
  { id: 4, name: 'Simon', props: { shoeSize: 28, bigfoot: 'no' } },
];

const mount: Mount = (el, ctx) => {
  const columns = [{ field: 'name' }, { field: 'props.shoeSize', label: 'shoe', width: '3em' }, { field: 'props.bigfoot', label: 'bigfoot', width: '4.2em' }];
  const d = demo(el, ctx, { stores: 'id, name, props.shoeSize, props.bigfoot', seed: rows, columns });
  const { t, say, view, out } = d;
  say.set('Shoe size lives inside props.', "stores: 'id, name, props.shoeSize, ...'");
  d.run([
    d.step('Find 47+', 'Who has shoe size 47 or more?', "where('props.shoeSize').aboveOrEqual(47)", async () =>
      view.mark(await t.where('props.shoeSize').aboveOrEqual(47).primaryKeys()),
    ),
    d.step('modify()', "Set only props.bigfoot to 'yes'.", `.modify({ 'props.bigfoot': 'yes' })`, async () =>
      out.value(await t.where('props.shoeSize').aboveOrEqual(47).modify({ 'props.bigfoot': 'yes' }), 'rows modified'),
    ),
    d.step('Find bigfoots', "Query on the changed field.", "where('props.bigfoot').equals('yes')", async () => {
      const found = await t.where('props.bigfoot').equals('yes').toArray();
      view.mark(found.map((f) => f.id));
      out.list(found.map((f) => f.name));
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
