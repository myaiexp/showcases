// view.preventDefault and the events config decide which events get cancelled
import * as vega from 'vega';
import type { Config, Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { revealRows, tableSpec } from '../../shared/api-kit.ts';
import { createStage } from '../../shared/stage.ts';

type Kind = 'wheel' | 'click' | 'mousemove';
const kinds: Kind[] = ['wheel', 'click', 'mousemove'];
interface Mode {
  label: string;
  flag: boolean;
  config?: Config;
}
const modes: Mode[] = [
  { label: 'preventDefault(false)  (default)', flag: false },
  { label: 'preventDefault(true)', flag: true },
  { label: 'true + config defaults {}', flag: true, config: { events: { defaults: {} } } as unknown as Config },
  { label: 'false + config defaults {}', flag: false, config: { events: { defaults: {} } } as unknown as Config },
  { label: 'config prevent [click]', flag: false, config: { events: { defaults: { prevent: ['click'] } } } },
  { label: 'config prevent false', flag: true, config: { events: { defaults: { prevent: false } } } },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The spec listens for each event on the view, which is what makes Vega consider preventing it.
  // Trap: Vega's built-in config sets events.defaults.allow to ['wheel'], and a config rule beats the
  // view.preventDefault flag, so the flag does nothing until the spec's config empties `defaults`.
  const probeSpec = (config?: Config): Spec => ({
    width: 200,
    height: 80,
    padding: 4,
    ...(config ? { config } : {}),
    signals: kinds.map((type) => ({ name: `seen_${type}`, value: 0, on: [{ events: { source: 'view', type }, update: `${type === 'wheel' ? 'event.deltaY' : '1'}` }] })),
    marks: [{ type: 'rect', encode: { enter: { width: { signal: 'width' }, height: { signal: 'height' }, fill: { value: '#1d2a3f' } } } }],
  });

  // A synthetic cancelable event is sent to the canvas; the answer is whether Vega cancelled it.
  const probe = async (view: View, type: Kind): Promise<string> => {
    const canvas = view.container()?.querySelector('canvas');
    if (!canvas) return 'no canvas';
    const event = type === 'wheel' ? new WheelEvent('wheel', { deltaY: 1, cancelable: true }) : new MouseEvent(type, { cancelable: true });
    canvas.dispatchEvent(event);
    await view.runAsync();
    return event.defaultPrevented ? 'prevented' : 'allowed';
  };

  const rows: string[][] = [];
  for (const mode of modes) {
    const view = stage.adopt(new vega.View(vega.parse(probeSpec(mode.config), stage.config), { ...stage.options, logLevel: vega.Warn, renderer: 'canvas' } as ViewOptions));
    view.preventDefault(mode.flag);
    await view.runAsync();
    rows.push([mode.label, ...(await Promise.all(kinds.map((k) => probe(view, k))))]);
    view.finalize();
  }

  const columns = [{ title: 'mode', width: 250 }, ...kinds.map((k) => ({ title: k, width: 100 }))];
  const view = await stage.render(tableSpec(columns, rows, { accent: false, rowHeight: 22 }));
  revealRows(stage, view, rows.length, 700);
  return () => stage.dispose();
};

export default mount;
