// A linked table: one controlled selected key drives the chart marker, the table buttons and the status text
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

interface Observation {
  id: string;
  product: string;
  setupMinutes: number;
  satisfaction: number;
}
const rows: readonly Observation[] = [
  { id: 'atlas', product: 'Atlas', setupMinutes: 18, satisfaction: 9 },
  { id: 'beacon', product: 'Beacon', setupMinutes: 31, satisfaction: 7 },
  { id: 'comet', product: 'Comet', setupMinutes: 24, satisfaction: 8 },
  { id: 'delta', product: 'Delta', setupMinutes: 42, satisfaction: 6 },
  { id: 'ember', product: 'Ember', setupMinutes: 15, satisfaction: 10 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Click a point or a table button: both select the same row.' });
  let selectedId: string | null = null;

  const build = () => {
    const selection = keyedSelection<Observation, string, number, number>({
      selected: controlledSignal(selectedId, (next) => select(next)),
      key: (datum) => datum.id,
    });
    return defineChart({
      marks: [
        dot(rows, { id: 'observations', x: 'setupMinutes', y: 'satisfaction', key: 'id', r: 5 }),
        whenSelected(dot(rows, { id: 'selected-observation', x: 'setupMinutes', y: 'satisfaction', key: 'id', r: 9, strokeWidth: 3 }), selection),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'Setup time (minutes)' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Satisfaction' } },
      },
      selection,
      tooltip,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Customer onboarding observations', ariaDescription: 'Select a point or a table row to inspect the same observation.' });
  const host = stage.own(mountChart(stage.box, options()));

  const buttons = new Map<string, HTMLButtonElement>();
  function select(id: string | null): void {
    selectedId = id;
    host.update(options());
    for (const [key, b] of buttons) b.setAttribute('aria-pressed', String(key === id));
    const row = rows.find((r) => r.id === id);
    stage.say(row ? `${row.product}: ${row.setupMinutes} minutes, satisfaction ${row.satisfaction}` : 'No observation selected');
  }
  if (!stage.preview) {
    const table = document.createElement('table');
    table.className = 'tc-readout';
    table.createCaption().textContent = 'Customer onboarding observations';
    const head = table.createTHead().insertRow();
    for (const h of ['Product', 'Setup minutes', 'Satisfaction']) head.append(Object.assign(document.createElement('th'), { scope: 'col', textContent: h }));
    const body = table.createTBody();
    for (const r of rows) {
      const tr = body.insertRow();
      const th = document.createElement('th');
      th.scope = 'row';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.textContent = r.product;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => select(r.id));
      buttons.set(r.id, b);
      th.append(b);
      tr.append(th, Object.assign(document.createElement('td'), { textContent: String(r.setupMinutes) }), Object.assign(document.createElement('td'), { textContent: String(r.satisfaction) }));
    }
    stage.root.append(table);
    if (stage.bar) button(stage.bar, 'Clear selection', () => select(null));
  }
  select(null);
  if (stage.preview) stage.cycle(rows, 1400, (r) => select(r.id));
  return () => stage.dispose();
};

export default mount;
