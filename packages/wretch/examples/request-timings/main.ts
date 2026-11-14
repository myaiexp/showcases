// .perfs() reports when the request began and how long it took
import wretch from 'wretch';
import PerfsAddon from 'wretch/addons/perfs';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { slider } from '../../shared/controls.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const SPAN = 2500;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change how long the server takes and send again: the bar changes.' });
  // timings: true makes the in-memory server write the Performance entry a real network call would.
  const server = createServer(stage, { '/report': () => ({ json: { ok: true } }) }, { timings: true });
  const lane = document.createElement('div');
  lane.className = 'lane';
  const fill = document.createElement('div');
  fill.className = 'fill';
  lane.append(fill);
  stage.root.append(lane);
  const numbers = kv(stage.root, 'What .perfs() handed over');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(PerfsAddon());
  // Each mount asks for its own address, because Performance entries are named after it.
  const tag = Math.random().toString(36).slice(2, 7);

  const measure = async (takes: number): Promise<void> => {
    server.latency = takes;
    fill.style.width = '0%';
    const clicked = performance.now();
    stage.say(`The server will take ${takes} ms`);
    await api
      .get(`/report?r=${tag}`)
      .perfs((timing: PerformanceEntry) => {
        if (stage.disposed) return;
        fill.style.left = `${((timing.startTime - clicked) / SPAN) * 100}%`;
        fill.style.width = `${Math.max(1, (timing.duration / SPAN) * 100)}%`;
        numbers.set([
          ['startTime', `${Math.round(timing.startTime - clicked)} ms after the click`],
          ['duration', `${Math.round(timing.duration)} ms`],
          ['entry type', timing.entryType],
        ]);
        stage.say(`The request took ${Math.round(timing.duration)} ms. A real network call would add DNS, connect and more.`, 'ok');
      })
      .json()
      .catch(() => {});
  };

  if (stage.bar) {
    let takes = 800;
    slider(stage.bar, 'Server takes', 100, 2400, 100, takes, (v) => (takes = v), (v) => `${v} ms`);
    runCases(stage, [{ label: 'Send', run: () => measure(takes) }]);
  } else {
    runCases(stage, [200, 900, 1800].map((t) => ({ label: `${t} ms`, run: () => measure(t) })));
  }
  return () => stage.dispose();
};

export default mount;
