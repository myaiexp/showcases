// getState captures signals and changed data; setState restores them and reruns
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 190, width: 440, rows: 5, title: 'state' });

  const spec: Spec = {
    width: 440,
    height: 170,
    padding: 8,
    signals: [
      { name: 'radius', value: 8, bind: { input: 'range', min: 3, max: 30, step: 1 } },
      { name: 'tint', value: 'steelblue', bind: { input: 'select', options: ['steelblue', '#f59e0b', '#7dd3fc', '#e879f9'] } },
    ],
    data: [{ name: 'dots', values: [{ x: 30, y: 40 }, { x: 120, y: 90 }, { x: 220, y: 60 }] }, con.data],
    marks: [
      { type: 'symbol', from: { data: 'dots' }, encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { signal: 'radius * radius * 3.14' }, fill: { signal: 'tint' }, fillOpacity: { value: 0.8 } } } },
      ...con.marks,
    ],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 5);

  let saved = view.getState();
  const describe = (state: ReturnType<typeof view.getState>): string => {
    const data = state.data as Record<string, unknown[]>;
    return `radius ${String((state.signals as Record<string, unknown>).radius)}, tint ${String((state.signals as Record<string, unknown>).tint)}, dots ${data.dots?.length ?? 0} rows`;
  };
  const save = async (): Promise<void> => {
    saved = view.getState();
    out.push(`getState() saved: ${describe(saved)}`);
    await out.show();
  };
  const restore = async (): Promise<void> => {
    view.setState(saved);
    await view.runAsync();
    out.push(`setState(saved) restored: ${describe(view.getState())}`);
    await out.show();
  };
  const scribble = async (i: number): Promise<void> => {
    // Edit through the View API, so the data set counts as modified and travels with the state.
    view.signal('radius', 4 + ((i * 11) % 24)).signal('tint', ['#f59e0b', '#7dd3fc', '#e879f9'][i % 3] ?? 'steelblue');
    view.insert('dots', [{ x: 20 + ((i * 97) % 400), y: 15 + ((i * 53) % 150) }]);
    await view.runAsync();
    out.push(`changed: ${describe(view.getState())}`);
    await out.show();
  };
  await save();
  if (stage.bar) {
    button(stage.bar, 'Add a dot', () => void scribble(Math.floor(Math.random() * 1000)));
    button(stage.bar, 'getState: save', () => void save());
    button(stage.bar, 'setState: restore', () => void restore());
  }
  if (stage.preview) {
    stage.every(1100, (i) => {
      const k = i % 8;
      if (k === 0) return save();
      if (k === 7) return restore();
      return scribble(i);
    });
  }
  return () => stage.dispose();
};

export default mount;
