// hook('updating') keeps an updatedAt column current without the caller asking
import type { Mount } from '@/types.ts';
import { bare, demo, friends } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const columns = ['name', { field: 'age', width: '3em' }, { field: 'updatedAt', label: 'updated', width: '5.4em' }];
  const d = demo(el, ctx, { stores: '++id, name', seed: bare(friends(3)), columns });
  const { stage, t, out } = d;
  // Whatever object the hook returns is merged into the changes being made.
  t.hook('updating', () => ({ updatedAt: new Date() }));
  d.say.set('Three friends, none ever updated.', "table.hook('updating', () => ({ updatedAt: new Date() }))");
  const change = async (name: string, changes: object): Promise<void> => {
    const row = (await t.where('name').equals(name).toArray())[0];
    await t.update(row.id, changes);
    out.value((await t.get(row.id)).updatedAt, 'updatedAt, set by the hook');
  };
  d.run([
    d.step('Change an age', 'Only age is changed. The hook adds the time.', "t.update(id, { age: 22 })", () => change('Josephine', { age: 22 }), 2400),
    d.step('Change a name later', 'Another update, a newer time.', "t.update(id, { name: 'Pelle' })", async () => {
      await stage.wait(1100);
      await change('Per', { name: 'Pelle' });
    }, 2400),
  ]);
  return stage.dispose;
};

export default mount;
