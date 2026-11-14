// Three async beforeRequest hooks run in turn; the request waits for all
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { hookGantt } from '../../shared/hook-gantt.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let work = ctx.preview ? 250 : 400; // how long each hook's job takes, ms
  const { stage, api, lane, server, fullResult, go } = hookScene(el, ctx, {
    hint: 'Each hook pretends to do a job that takes a moment. Watch the bars: they never overlap.',
    routes: { '/dashboard': { json: { widgets: 6 } } },
  });
  const gantt = hookGantt(stage.root, lane, server, stage.signal, stage.preview ? 2000 : 3000);
  const out = fullResult();

  // Named functions: the gantt labels each bar with the function's name.
  const loadToken = async (): Promise<void> => {
    await stage.wait(work); // e.g. reading a token from storage
  };
  const checkFlags = async (): Promise<void> => {
    await stage.wait(work); // e.g. asking which features are switched on
  };
  const signRequest = async (): Promise<void> => {
    await stage.wait(work); // e.g. computing a signature
  };

  const again = go(async () => {
    gantt.reset();
    stage.say('Three hooks, each with a job to do before the request may leave…');
    const got = await attempt(stage, out, () =>
      api.get('https://app.example/dashboard', { hooks: lane.hooks({ beforeRequest: [loadToken, checkFlags, signRequest] }) }).json(),
    );
    stage.say(got.ok ? `Hook after hook after hook: the request left only after all three (${3 * work} ms).` : 'Failed.', got.ok ? 'ok' : 'bad');
  });
  if (!stage.preview) slider(stage.bar!, 'each hook takes', 100, 700, 100, work, (v) => ((work = v), again()), (v) => `${v} ms`);
  return stage.dispose;
};

export default mount;
