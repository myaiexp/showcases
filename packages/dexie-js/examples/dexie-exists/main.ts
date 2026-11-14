// Dexie.exists(name) answers true or false and never creates the database
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { versionDemo } from '../../shared/era.ts';

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'exists', title: 'Dexie.exists(name)' });
  const { lab, out } = d;
  d.say.set('Does a database with this name exist?', 'await Dexie.exists(name)');
  d.run([
    d.step('Ask first', 'Nobody made it yet.', 'await Dexie.exists(name)', async () => {
      await lab.wipe();
      out.value(await Dexie.exists(lab.name), 'asking did not create it', 'bad');
    }),
    d.step('Ask again', 'Still nothing: asking is harmless.', 'await Dexie.exists(name)', async () => {
      out.value(await Dexie.exists(lab.name), 'still not created', 'bad');
    }),
    d.step('Create it', 'Now it exists.', 'new Dexie(name).version(1).stores(...)', async () => {
      await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      out.value(await Dexie.exists(lab.name));
    }),
    d.step('Delete it', 'Gone again.', 'await Dexie.delete(name)', async () => {
      await lab.wipe();
      out.value(await Dexie.exists(lab.name), 'deleted', 'bad');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
