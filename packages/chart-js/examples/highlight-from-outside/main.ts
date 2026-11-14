// Hover a row in an HTML list and the matching bar lights up, tooltip included
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { C, alpha } from '../../shared/data.ts';

const RAINFALL = [
  ['Jan', 52],
  ['Feb', 41],
  ['Mar', 48],
  ['Apr', 38],
  ['May', 44],
  ['Jun', 63],
  ['Jul', 79],
  ['Aug', 86],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { previewHeight: 128 });
  const note = caption(el);
  // The list sits under the chart in a card and beside it in the full view.
  const list = document.createElement('div');
  Object.assign(list.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: ctx.preview ? '2px' : '4px',
    justifyContent: 'center',
    width: '100%',
    padding: ctx.preview ? '4px 0 0' : '12px 0 0',
  });
  el.insertBefore(list, note);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: RAINFALL.map((r) => r[0]),
      datasets: [
        {
          label: 'Rainfall (mm)',
          data: RAINFALL.map((r) => r[1]),
          backgroundColor: alpha(C.cyan, 0.45),
          hoverBackgroundColor: C.amber,
          borderRadius: 3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { ticks: { maxRotation: 0 } } },
      plugins: { legend: { display: false } },
    },
  });

  // api.md § setActiveElements: the same call the chart makes itself when it is hovered,
  // plus the tooltip's own setActiveElements so its box follows.
  const highlight = (index: number | null): void => {
    const bar = index === null ? undefined : chart.getDatasetMeta(0).data[index];
    const active = index === null ? [] : [{ datasetIndex: 0, index }];
    chart.setActiveElements(active);
    chart.tooltip?.setActiveElements(active, { x: bar?.x ?? 0, y: bar?.y ?? 0 });
    chart.update();
    items.forEach((item, i) => {
      item.style.background = i === index ? alpha(C.amber, 0.35) : 'transparent';
    });
    note.textContent = index === null ? 'setActiveElements([])' : ctx.preview ? `setActiveElements(index ${index})` : `setActiveElements([{ datasetIndex: 0, index: ${index} }])`;
  };

  const items = RAINFALL.map(([month, mm], i) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.textContent = ctx.preview ? month : `${month} · ${mm} mm`;
    item.style.padding = ctx.preview ? '0 4px' : '2px 8px';
    item.style.fontSize = ctx.preview ? '11px' : '';
    item.addEventListener('mouseenter', () => highlight(i));
    item.addEventListener('mouseleave', () => highlight(null));
    list.append(item);
    return item;
  });
  highlight(0);

  // A card has no pointer: it moves over the list itself.
  const stop = ctx.preview ? cycle(RAINFALL, 1300, (_r, i) => highlight(i)) : () => {};

  return () => {
    stop();
    list.remove();
    note.remove();
    stage.release(chart);
  };
};

export default mount;
