// Dexie.spawn and Dexie.async: generators that yield promises
import type { Mount } from '@/types.ts';
import { dexieStatics } from '../../shared/class-kit.ts';
import { versionDemo } from '../../shared/era.ts';

const ID = { field: 'id', width: '2.6em' };

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'spawn', title: 'what came back' });
  const { lab, out } = d;
  d.say.set('Write async code with yield.', 'Dexie.spawn(function* () { yield ... })');
  d.run([
    d.step('Open', 'An empty list of tasks.', "stores({ tasks: '++id, title' })", async () => {
      await lab.wipe();
      await lab.open((x) => x.version(1).stores({ tasks: '++id, title' }));
      lab.show('tasks', [ID, 'title']);
      out.idle('no tasks yet');
    }),
    d.step('Dexie.spawn()', 'Runs the generator right away.', 'Dexie.spawn(function* () { yield db.tasks.add(...) })', async () => {
      const tasks = lab.db.table('tasks');
      const count = await dexieStatics.spawn(function* () {
        yield tasks.add({ title: 'Water plants' });
        yield tasks.add({ title: 'Buy milk' });
        return (yield tasks.count()) as number;
      });
      out.value(count, 'counted after two yields');
    }),
    d.step('Dexie.async()', 'Makes a function you can call later.', 'const addTask = Dexie.async(function* (title) {...})', async () => {
      const tasks = lab.db.table('tasks');
      const addTask = dexieStatics.async(function* (title: string) {
        yield tasks.add({ title });
        return (yield tasks.count()) as number;
      });
      out.value(await addTask('Call Per'), 'addTask("Call Per") returned');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
