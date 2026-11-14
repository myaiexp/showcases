// With your own signal, .setTimeout() needs { controller } or it cuts nothing
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server takes 2.5 seconds. The deadline is 1 second.' });
  const server = createServer(stage, { '/report': () => ({ json: { rows: 120 } }) }, { latency: 2500 });
  const tl = timeline(stage, server, { span: 3000 });
  const shown = screen(stage.root, 'What the app shows', 'Nothing asked for yet');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(AbortAddon());
  let controller = new AbortController();
  let run = 0;
  let byUser = false;
  const cancel = (): void => {
    byUser = true;
    controller.abort();
  };

  const send = async (say: string, withController: boolean, cancelAfter = 0): Promise<void> => {
    const mine = ++run;
    tl.reset();
    shown.show('Loading…');
    stage.say(say);
    stage.after(1000, () => mine === run && tl.mark('deadline', 'info'));
    controller = new AbortController();
    byUser = false;
    if (cancelAfter) stage.after(cancelAfter, () => mine === run && cancel());
    // Our own controller is on the request, so the timeout has to be told about it.
    const chain = api.signal(controller).get('/report');
    await (withController ? chain.setTimeout(1000, { controller }) : chain.setTimeout(1000))
      .onAbort(() => {
        if (stage.disposed) return;
        shown.show(byUser ? 'Cancelled before the report arrived' : 'Sorry, that took too long.', 'warn');
        stage.say(
          byUser ? 'The same controller served the timeout and the cancel button' : 'The timeout used the controller you gave it: cut at 1 second',
          'warn',
        );
        tl.mark('aborted', 'warn');
      })
      .json(() => {
        if (stage.disposed) return;
        shown.show('Report loaded, though it was late', 'bad');
        stage.say('The 1 second timeout did nothing: it aimed at a controller the request does not use', 'bad');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: '.setTimeout(1000)', run: () => send('Own signal, plain .setTimeout(1000)', false) },
    { label: '.setTimeout(1000, { controller })', run: () => send('Own signal, .setTimeout(1000, { controller })', true) },
    { label: 'With a Cancel button', run: () => send('Same controller, and a Cancel button that uses it', true, stage.preview ? 500 : 0) },
  ]);
  if (stage.bar) button(stage.bar, 'Cancel', cancel);
  return () => stage.dispose();
};

export default mount;
