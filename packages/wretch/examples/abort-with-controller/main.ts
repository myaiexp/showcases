// .controller() returns an AbortController, so a Cancel button can stop the call
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import type { Mount } from '@/types.ts';
import { chips } from '../../shared/chips.ts';
import { button } from '../../shared/controls.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The report takes a while. Press Cancel before it arrives.' });
  const server = createServer(stage, { '/report': () => ({ json: { rows: 120 }, delay: stage.preview ? 1500 : 4000 }) });
  const tl = timeline(stage, server, { span: 3000 });
  const ran = chips(stage.root, ['.json()', '.onAbort()']);
  const shown = screen(stage.root, 'What the app shows', 'Nothing asked for yet');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(AbortAddon());
  let current: AbortController | null = null;

  const send = async (): Promise<void> => {
    tl.reset();
    ran.reset();
    shown.show('Loading the report…');
    stage.say('Asking for the report; .controller() gives back a way to cancel it');
    // .controller() returns the AbortController and the chain to carry on with.
    const [controller, chain] = api
      .get('/report')
      .onAbort(() => {
        if (stage.disposed) return;
        ran.fire('.onAbort()', 'warn', 'The request was aborted before an answer came');
        shown.show('Cancelled: nothing was downloaded', 'warn');
        stage.say('Cancel stopped the request, and .onAbort() ran instead of .json()', 'warn');
      })
      .controller();
    current = controller;
    await chain
      .json((r: { rows: number }) => {
        if (stage.disposed) return;
        ran.fire('.json()', 'ok', 'The report arrived');
        shown.show(`Report with ${r.rows} rows`, 'ok');
        stage.say('Nobody cancelled, so the report arrived and .json() ran', 'ok');
      })
      .catch(() => {});
  };
  const cancel = (): void => {
    tl.mark('cancel', 'warn');
    current?.abort();
  };

  if (stage.bar) {
    button(stage.bar, 'Ask for the report', () => void send());
    button(stage.bar, 'Cancel', cancel);
    void send();
  } else {
    stage.play(async (wait) => {
      void send();
      await wait(700);
      cancel();
      await wait(1600);
      await send();
      await wait(1800);
    });
  }
  return () => stage.dispose();
};

export default mount;
