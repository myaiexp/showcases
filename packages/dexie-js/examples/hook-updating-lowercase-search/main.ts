// Two hooks keep a lowercase copy of name in sync, so searching ignores case
import type { Mount } from '@/types.ts';
import { bare, demo, friends } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const columns = ['name', { field: 'nameLower', label: 'search copy' }];
  const d = demo(el, ctx, { stores: '++id, name, nameLower', seed: bare(friends(3)), columns });
  const { stage, t, view, out } = d;
  t.hook('creating', (_primKey, obj) => {
    obj.nameLower = String(obj.name).toLowerCase();
  });
  t.hook('updating', (mods) => {
    if ('name' in mods) return { nameLower: String((mods as { name: string }).name).toLowerCase() };
    return undefined;
  });
  d.say.set('Every name has a lowercase copy next to it.', 'creating + updating hooks keep nameLower in step');
  d.run([
    d.step('Rename Per', 'Rename: the search copy follows.', "t.update(id, { name: 'PELLE' })", async () => {
      await t.where('name').equals('Per').modify({ name: 'PELLE' });
      out.value('PELLE', 'new name; nameLower is now pelle');
    }, 2400),
    d.step('Search in lowercase', 'Find it by typing it in any case.', "where('nameLower').startsWith('pel')", async () => {
      const rows = await t.where('nameLower').startsWith('pel').toArray();
      view.mark(rows.map((r) => r.id));
      out.list(rows.map((r) => r.name));
    }, 2400),
  ]);
  return stage.dispose;
};

export default mount;
