// An error nobody catches reaches the page's unhandledrejection event; a caught one does not
import type { Mount } from '@/types.ts';
import { demo, friends, FRIEND_COLS } from '../../shared/demo.ts';
import { why } from '../../shared/tx-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = demo(el, ctx, { stores: 'id, name, age', seed: friends(3), columns: FRIEND_COLS, side: 'log' });
  const { stage, t, log } = d;
  d.say.set('Forget to catch, and the page hears.');
  // Only this example's own rejections are looked at; the listener is removed on dispose.
  const mine = new WeakSet<Promise<unknown>>();
  const onUnhandled = (ev: PromiseRejectionEvent): void => {
    if (!mine.has(ev.promise)) return;
    ev.preventDefault();
    log.add(`unhandledrejection: ${why(ev.reason)}`, 'bad');
  };
  window.addEventListener('unhandledrejection', onUnhandled);
  stage.onDispose(() => window.removeEventListener('unhandledrejection', onUnhandled));
  const fire = async (handle: boolean): Promise<void> => {
    log.clear();
    log.add('add({ id: 2 }) fails...', 'muted');
    const p = (async () => {
      const add = t.add({ id: 2, name: 'Twin', age: 1 });
      await (handle ? add.catch(() => log.add('caught: no event', 'ok')) : add);
    })();
    mine.add(p);
    await stage.wait(300);
    if (!handle) log.add('(nobody caught it)', 'muted');
  };
  d.run([
    d.step('Forget to catch', 'Nobody catches: the page is told.', "addEventListener('unhandledrejection')", () => fire(false), 2800),
    d.step('Catch it', 'Caught: the page hears nothing.', 'add(...).catch(fn)', () => fire(true), 2800),
  ]);
  return stage.dispose;
};

export default mount;
