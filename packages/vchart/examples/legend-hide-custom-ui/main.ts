// Built-in legend hidden (visible: false), replaced by checkboxes calling setLegendSelectedDataByIndex
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { groupedRows, pick } from '../../shared/components-data.ts';

const ROLES = ['Role A', 'Role B', 'Role C'];

const spec: ISpec = {
  type: 'bar',
  data: [{ id: 'rounds', values: groupedRows(['R1', 'R2', 'R3', 'R4', 'R5', 'R6'], ROLES, 17) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  axes: [{ orient: 'left' }, { orient: 'bottom' }],
  legends: { visible: false },
};

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, spec);
  // getLegendSelectedDataByIndex still reports the (invisible) legend's items.
  const all = vchart.getLegendSelectedDataByIndex(0).map(String);
  const checked = new Set(all);
  const boxes: HTMLInputElement[] = [];
  const apply = (): void => vchart.setLegendSelectedDataByIndex(0, all.filter((n) => checked.has(n)));

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1400, () => {
      i += 1;
      const hidden = i % 4 === 3 ? '' : pick(all, i);
      vchart.setLegendSelectedDataByIndex(0, all.filter((n) => n !== hidden));
    });
  } else {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:16px;padding:8px 0;font-size:13px';
    for (const name of all) {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = true;
      box.addEventListener('change', () => {
        if (box.checked) checked.add(name);
        else checked.delete(name);
        apply();
      });
      boxes.push(box);
      label.append(box, ` ${name}`);
      row.append(label);
    }
    el.prepend(row);
  }

  return () => {
    stop();
    release();
  };
};

export default mount;
