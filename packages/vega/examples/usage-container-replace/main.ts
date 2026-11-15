// A View empties its container on initialize; a second view replaces the first
import * as vega from 'vega';
import type { Spec, View, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const host = stage.options.container;

  const chart = (title: string, color: string, shape: 'bar' | 'dots'): Spec => ({
    width: 300,
    height: 120,
    padding: 8,
    title: { text: title, color: '#ddd', anchor: 'start' },
    data: [{ name: 'd', values: Array.from({ length: 8 }, (_, i) => ({ i, v: 25 + ((i * 41) % 70) })) }],
    scales: [
      { name: 'x', type: 'band', domain: Array.from({ length: 8 }, (_, i) => i), range: 'width', padding: 0.2 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    marks: [
      shape === 'bar'
        ? { type: 'rect', from: { data: 'd' }, encode: { update: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: color } } } }
        : { type: 'symbol', from: { data: 'd' }, encode: { update: { x: { scale: 'x', field: 'i', band: 0.5 }, y: { scale: 'y', field: 'v' }, size: { value: 150 }, fill: { value: color } } } },
    ],
  });

  const note = document.createElement('div');
  note.style.cssText = 'font:11px monospace;color:var(--fg-2);margin-top:8px;white-space:pre-wrap';
  host.parentElement?.append(note);
  stage.own(() => note.remove());

  const placeholder = (): void => {
    const p = document.createElement('p');
    p.textContent = 'Placeholder text already inside the container';
    p.style.cssText = 'margin:0;padding:34px 12px;width:300px;color:var(--fg-1);background:#1d2a3f;border-radius:6px';
    host.replaceChildren(p);
    note.textContent = `before: container.children = ${host.children.length} (a <${host.firstElementChild?.tagName.toLowerCase()}>)`;
  };
  let view: View | null = null;
  const mountChart = async (spec: Spec, what: string): Promise<void> => {
    const old = view;
    view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
    await view.runAsync();
    // The older view is told it is done: its listeners go with it, though its DOM was already replaced.
    old?.finalize();
    note.textContent = `${what}: container.children = ${host.children.length} (a <${host.firstElementChild?.tagName.toLowerCase()}>)`;
  };
  const steps = [
    () => placeholder(),
    () => mountChart(chart('first view', 'steelblue', 'bar'), 'after the first view initialized'),
    () => mountChart(chart('second view', '#f59e0b', 'dots'), 'after a second view used the same container'),
  ];
  placeholder();
  if (stage.bar) {
    let k = 0;
    button(stage.bar, 'Next step', () => void steps[++k % steps.length]?.());
    button(stage.bar, 'Start over', () => void steps[(k = 0)]?.());
  }
  if (stage.preview) stage.every(1500, (i) => steps[i % steps.length]?.());
  return () => stage.dispose();
};

export default mount;
