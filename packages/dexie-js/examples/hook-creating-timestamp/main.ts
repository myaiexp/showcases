// hook('creating') stamps every new row with the time it was added
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const columns = [ID_COL, 'name', { field: 'createdAt', label: 'created', width: '5.4em' }];
  const d = demo(el, ctx, { stores: '++id, name', columns });
  const { stage, t, out } = d;
  t.hook('creating', (_primKey, obj) => {
    obj.createdAt = new Date();
  });
  d.say.set('Nobody types the time: the hook does.', "table.hook('creating', (key, obj) => ...)");
  const addAndShow = async (name: string): Promise<void> => {
    const id = await t.add({ name });
    const row = await t.get(id);
    out.value(row.createdAt, 'createdAt, filled in by the hook');
  };
  d.run([
    d.step('Add Sara', 'Only a name goes in. The time comes out.', "t.add({ name: 'Sara' })", () => addAndShow('Sara'), 2400),
    d.step('Add Per a moment later', 'A new row, a new time stamp.', "t.add({ name: 'Per' })", async () => {
      await stage.wait(1100);
      await addAndShow('Per');
    }, 2400),
  ]);
  return stage.dispose;
};

export default mount;
