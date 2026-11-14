// unsubscribe() takes a hook off again; keep the function to pass it back
import type { Mount } from '@/types.ts';
import { demo, ID_COL } from '../../shared/demo.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: '++id, name', columns: [ID_COL, 'name', { field: 'tag', width: '4.2em' }] });
  const { stage, t, out } = d;
  // Unsubscribing needs the very same function, so it gets a name instead of being inline.
  const addTag = (_primKey: unknown, obj: { tag?: string }): void => {
    obj.tag = 'new';
  };
  let on = false;
  const subscribe = (): void => {
    if (!on) t.hook('creating', addTag);
    on = true;
  };
  const unsubscribe = (): void => {
    if (on) t.hook('creating').unsubscribe(addTag);
    on = false;
  };
  subscribe();
  d.say.set('Every new row gets the tag "new".', "table.hook('creating', addTag)");
  d.run([
    d.step('Add Ann', 'The hook is on: tagged.', "t.add({ name: 'Ann' })", async () => {
      subscribe();
      await t.add({ name: 'Ann' });
      out.value('tagged', 'hook subscribed');
    }),
    d.step('Unsubscribe, add Bo', 'The hook is gone: no tag.', "hook('creating').unsubscribe(addTag)", async () => {
      unsubscribe();
      await t.add({ name: 'Bo' });
      out.value('untagged', 'hook unsubscribed', 'warn');
    }),
    d.step('Subscribe again, add Cy', 'Back on: tagged again.', "table.hook('creating', addTag)", async () => {
      subscribe();
      await t.add({ name: 'Cy' });
      out.value('tagged', 'hook subscribed again');
    }),
  ]);
  return stage.dispose;
};

export default mount;
