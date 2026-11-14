// Extended clients combine signals; replaceOption or undefined drop them
import { replaceOption } from 'ky';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { scene } from '../../shared/inst-kit.ts';
import { notes } from '../../shared/req-kit.ts';
import type { Tone } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api } = scene(el, ctx, {
    hint: 'The app has a "page closed" signal. The search box adds a "new search" signal. Three clients treat them differently.',
    routes: { '/slow': { hang: true } },
  });
  const board = notes(stage.row(), 'Three requests, all waiting on a slow server');

  let page = new AbortController();
  let search = new AbortController();
  let done = new AbortController();
  // Which requests have ended: only a real rejection from Ky marks one as cancelled.
  let ended: boolean[] = [false, false, false];
  let fired = false;
  const names = ['both signals', 'replaceOption(search)', 'signal: undefined'];
  const draw = (): void =>
    board.set(
      ended.map((over, i): readonly [string, Tone] =>
        over ? [`${names[i]}: cancelled`, 'bad'] : [`${names[i]}: ${fired ? 'still running' : 'waiting'}`, fired ? 'warn' : 'info'],
      ),
    );

  // The app's client carries the "page closed" signal; each child is extended in a different way.
  const start = (): void => {
    done.abort();
    page = new AbortController();
    search = new AbortController();
    done = new AbortController();
    const mine: boolean[] = [false, false, false];
    ended = mine;
    fired = false;
    const app = api.extend({ signal: page.signal });
    const clients = [
      app.extend({ signal: search.signal }), // signals are combined
      app.extend({ signal: replaceOption(search.signal) }), // the inherited one is swapped out
      app.extend({ signal: undefined }), // the inherited one is removed
    ];
    const ours = done.signal;
    clients.forEach((client, i) => {
      // `done` is only ours, to tidy up at the end; a request it stops is not shown as cancelled.
      client.get('https://search.example/slow', { retry: 0, signal: ours }).then(
        () => undefined,
        () => {
          if (!ours.aborted) mine[i] = true;
        },
      );
    });
    draw();
    stage.say('Three clients each sent a search that the server never answers…');
  };
  /** Fires a signal, gives Ky a moment to react, then shows which requests really stopped. */
  const fire = (controller: () => AbortController, say: string): void =>
    stage.task(async () => {
      controller().abort();
      fired = true;
      await stage.wait(150);
      draw();
      stage.say(say, 'warn');
    });
  const closePage = (): void => fire(() => page, 'Page closed: only the client that kept both signals was cancelled.');
  const newSearch = (): void => fire(() => search, 'New search: the clients still holding the search signal were cancelled.');
  stage.onDispose(() => {
    done.abort();
    page.abort();
    search.abort();
  });

  if (stage.bar) {
    button(stage.bar, 'Close the page', closePage);
    button(stage.bar, 'Type a new search', newSearch);
    button(stage.bar, 'Start again', start);
    start();
  } else {
    stage.play(async (wait) => {
      start();
      await wait(1800);
      closePage();
      await wait(1800);
      newSearch();
      await wait(1800);
    });
  }
  return stage.dispose;
};

export default mount;
