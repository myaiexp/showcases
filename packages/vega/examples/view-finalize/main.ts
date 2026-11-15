// finalize() stops a view's timer and window listener; later pings go unheard
import * as vega from 'vega';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // `ticks` counts a timer event the view starts for itself; `pings` counts a window event it listens for.
  const spec: Spec = {
    width: 400,
    height: 90,
    padding: 8,
    signals: [
      { name: 'ticks', value: 0, on: [{ events: { type: 'timer', throttle: 120 }, update: 'ticks + 1' }] },
      { name: 'pings', value: 0, on: [{ events: { source: 'window', type: 'ping' }, update: 'pings + 1' }] },
      { name: 'status', value: 'running' },
    ],
    marks: [
      { type: 'rect', encode: { update: { x: { value: 0 }, y: { value: 10 }, height: { value: 16 }, width: { signal: '(ticks % 40) * 10' }, fill: { signal: "status == 'running' ? '#f59e0b' : '#6b7280'" } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 54 }, text: { signal: "'status: ' + status + '    ticks: ' + ticks + '    window pings seen: ' + pings" }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 12 } } } },
    ],
  };

  const note = document.createElement('div');
  note.style.cssText = 'font:11px monospace;color:var(--fg-2);margin-top:8px;white-space:pre';
  stage.options.container.parentElement?.append(note);
  stage.own(() => note.remove());

  let view: View | null = null;
  let live = false;
  const start = async (): Promise<void> => {
    view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
    live = true;
    await view.runAsync();
    note.textContent = 'a new view: its timer and its window listener are running';
  };
  const ping = async (): Promise<void> => {
    window.dispatchEvent(new Event('ping'));
    await view?.runAsync();
  };
  const finish = async (): Promise<void> => {
    if (!view || !live) return;
    // One last update so the frozen chart says what happened; after finalize() it can no longer run.
    view.signal('status', 'finalized');
    await view.runAsync();
    view.finalize();
    live = false;
    note.textContent = 'finalize() called: the timer is cleared and the window listener removed.\nA ping sent now changes nothing.';
  };
  await start();
  if (stage.bar) {
    button(stage.bar, 'window ping', () => void ping());
    button(stage.bar, 'finalize()', () => void finish());
    button(stage.bar, 'new view', () => void (live ? Promise.resolve() : start()));
  }
  if (stage.preview) {
    stage.every(500, async (i) => {
      const k = i % 12;
      if (k === 3 || k === 5) await ping();
      if (k === 7) await finish();
      if (k === 8) await ping();
      if (k === 11) await start();
    });
  }
  return () => stage.dispose();
};

export default mount;
