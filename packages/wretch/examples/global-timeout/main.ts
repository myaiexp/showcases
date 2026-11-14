// One default deadline for the whole client, and a longer one for the slow report
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { slider } from '../../shared/controls.ts';
import { mwScene } from '../../shared/mwscene.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  let slow = 700;
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'A dashboard loads three widgets at once. The client gives every request 500 ms; the report is allowed 1000 ms.',
    routes: {
      '/greeting': () => ({ json: { text: 'Good morning' } }),
      '/forecast': () => ({ json: { text: '-3 degrees' }, delay: slow - 200 }),
      '/report': () => ({ json: { text: '120 rows' }, delay: slow - 200 }),
    },
    span: 1500,
    latency: 200,
  });
  const widgets = columns(stage.root, 3).map((col, i) => screen(col, ['greeting', 'forecast', 'report'][i]!, '…'));

  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .addon(AbortAddon())
    // Every request made from `api` starts a 500 ms timer on its own.
    .resolve((chain) => chain.setTimeout(500));

  const load = (path: string, i: number, longer?: number): Promise<void> => {
    const request = api.get(path);
    return (longer ? request.setTimeout(longer) : request)
      .onAbort(() => {
        if (!stage.disposed) widgets[i]!.show('gave up', 'warn');
      })
      .json((r: { text: string }) => {
        if (!stage.disposed) widgets[i]!.show(r.text, 'ok');
      })
      .catch(() => {});
  };

  const loadAll = async (): Promise<void> => {
    tl.reset();
    widgets.forEach((w) => w.clear('…'));
    stage.say(`Three requests at once; the forecast and the report take ${slow} ms`);
    stage.after(500, () => tl.mark('500 ms', 'info'));
    await Promise.all([load('/greeting', 0), load('/forecast', 1), load('/report', 2, 1000)]);
    if (stage.disposed) return;
    stage.say(
      slow > 1000 ? 'Even the report ran out of its 1000 ms' : slow > 500 ? 'The default cut the forecast; the report asked for more time and got it' : 'Everything answered inside the default deadline',
      slow > 500 ? 'warn' : 'ok',
    );
  };

  if (stage.bar) slider(stage.bar, 'Slow widgets take', 300, 1400, 100, slow, (v) => (slow = v), (v) => `${v} ms`);
  runCases(stage, [{ label: 'Load the dashboard', run: loadAll }], 2000);
  return () => stage.dispose();
};

export default mount;
