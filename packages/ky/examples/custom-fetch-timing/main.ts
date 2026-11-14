// A fetch wrapper that times every request, the readme's instrumentation recipe
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { bars } from '../../shared/inst-bars.ts';
import { runner, scene } from '../../shared/inst-kit.ts';
import { errorName } from '../../shared/panels.ts';

const mount: Mount = (el, ctx) => {
  let reportMs = 900;
  const { stage, server } = scene(el, ctx, {
    hint: 'Every call goes through one wrapper you wrote. It never changes the answer, it only times it.',
    routes: {
      '/ping': { json: { ok: true }, delay: 20 },
      '/forecast': { json: { temp: -3 }, delay: 250 },
      '/report': () => ({ json: { rows: 120 }, delay: reportMs }),
    },
  });
  const timings = bars(stage.row(), 'Your wrapper measured', 2200, stage.preview ? 4 : 6);

  // The Ky option: your own fetch. It receives the request Ky built, passes it on, and times it.
  const api = ky.create({
    retry: 0,
    fetch: async (request, init) => {
      const start = performance.now();
      const response = await server.fetch(request, init);
      const ms = performance.now() - start;
      const { pathname } = new URL((request as Request).url);
      timings.add(`${(request as Request).method} ${pathname} → ${response.status}`, ms, response.ok ? 'ok' : 'bad');
      return response;
    },
  });

  const sendAll = async (): Promise<void> => {
    timings.clear();
    stage.say('Four calls, all measured by the same wrapper…');
    for (const path of ['ping', 'forecast', 'report', 'missing']) {
      try {
        await api.get(`https://api.example/${path}`).json();
      } catch (error) {
        // The wrapper already saw the 404; Ky then turns it into an error for your code.
        if (stage.disposed) throw error;
        stage.say(`/${path} answered 404: the wrapper timed it, Ky then threw ${errorName(error)}.`, 'warn');
      }
    }
    stage.say('The wrapper timed every call: the slow report stands out.', 'ok');
  };

  if (stage.bar) {
    slider(stage.bar, 'report thinking time:', 0, 1800, 100, reportMs, (v) => (reportMs = v), (v) => `${v} ms`);
    button(stage.bar, 'Clear', () => timings.clear());
  }
  runner(stage, sendAll, { label: 'Send the four calls' });
  return stage.dispose;
};

export default mount;
