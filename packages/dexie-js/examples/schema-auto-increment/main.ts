// "++id" in stores(): the table hands out the next number, and never reuses one
import type { Mount } from '@/types.ts';
import { schemaLines, versionDemo } from '../../shared/era.ts';

const COLS = [{ field: 'id', width: '2.6em' }, 'name'];

const mount: Mount = (el, ctx) => {
  const d = versionDemo(el, ctx, { label: 'autoinc', title: 'ids handed out' });
  const { lab, out } = d;
  d.say.set('Rows get numbered by the table itself.', "stores({ friends: '++id, name' })");
  d.run([
    d.step('Declare ++id', 'The ++ means: number the rows for me.', "stores({ friends: '++id, name' })", async () => {
      await lab.wipe();
      const db = await lab.open((x) => x.version(1).stores({ friends: '++id, name' }));
      lab.show('friends', COLS);
      out.list(schemaLines(db));
    }),
    d.step('Add three', 'No id given, yet each row gets one.', 'await db.friends.add({ name })', async () => {
      const t = lab.db.table('friends');
      const ids: string[] = [];
      for (const name of ['Ulla', 'Per', 'Sara']) {
        ids.push(`id ${await t.add({ name })}: ${name}`);
        await d.stage.wait(350);
      }
      out.list(ids);
    }),
    d.step('Delete the last, add again', 'A freed number is not handed out twice.', 'delete(3), then add({ name })', async () => {
      const t = lab.db.table('friends');
      await t.delete(3);
      await d.stage.wait(900);
      out.value(await t.add({ name: 'Simon' }), 'the next id: 4, not 3');
    }),
  ]);
  return d.stage.dispose;
};

export default mount;
