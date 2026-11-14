// The tooltip is a page element: external builds the HTML, Chart.js only says where
import type { Chart as ChartType, TooltipModel } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, createStage } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { C, alpha } from '../../shared/data.ts';
import { DRINKS, SALES_MONTHS } from '../../shared/config-data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  // The HTML tooltip lives in the chart's own relatively positioned box.
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position: 'absolute',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.15s, left 0.15s, top 0.15s',
    transform: 'translate(-50%, calc(-100% - 12px))',
    minWidth: '140px',
    padding: '8px 10px',
    borderRadius: '10px',
    background: 'rgba(24, 24, 27, 0.96)',
    border: `1px solid ${alpha(C.amber, 0.6)}`,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
    font: '12px Inter Variable, Inter, system-ui, sans-serif',
    color: '#fafafa',
    zIndex: '2',
  });
  stage.box.append(tip);

  // tooltip.md § External (Custom) Tooltips: turn the model into elements.
  const external = ({ tooltip }: { chart: ChartType; tooltip: TooltipModel<'bar'> }): void => {
    if (tooltip.opacity === 0) {
      tip.style.opacity = '0';
      return;
    }
    tip.replaceChildren();
    const head = document.createElement('div');
    head.textContent = `${tooltip.title.join(' ')} 2026`;
    Object.assign(head.style, { fontWeight: '700', marginBottom: '6px', color: C.amber });
    tip.append(head);

    const total = tooltip.dataPoints.reduce((t, p) => t + (p.parsed.y ?? 0), 0);
    tooltip.dataPoints.forEach((point, i) => {
      const colours = tooltip.labelColors[i]!;
      const row = document.createElement('div');
      Object.assign(row.style, { display: 'grid', gridTemplateColumns: '10px 1fr auto', gap: '6px', alignItems: 'center', marginTop: '3px' });
      const dot = document.createElement('span');
      Object.assign(dot.style, { width: '10px', height: '10px', borderRadius: '50%', background: colours.borderColor as string });
      const name = document.createElement('span');
      name.textContent = point.dataset.label ?? '';
      const value = document.createElement('b');
      value.textContent = `${Math.round(((point.parsed.y ?? 0) / total) * 100)}%`;
      row.append(dot, name, value);
      tip.append(row);
    });
    tip.style.opacity = '1';
    tip.style.left = `${tooltip.caretX}px`;
    tip.style.top = `${tooltip.caretY}px`;
  };

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: SALES_MONTHS,
      datasets: DRINKS.map(([label, color, data]) => ({ label, data: [...data], backgroundColor: alpha(color, 0.75), borderColor: color, borderWidth: 1 })),
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { stacked: true }, y: { stacked: true, max: 1500 } },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: !ctx.preview },
        // enabled: false hides the canvas tooltip; `external` still runs for every change.
        tooltip: { enabled: false, external },
      },
    },
  });

  const stop = ctx.preview
    ? autoHover(chart, 1500, (s) => [0, 1, 2].map((datasetIndex) => ({ datasetIndex, index: (s * 2 + 1) % 6 })))
    : () => {};

  return () => {
    stop();
    tip.remove();
    stage.release(chart);
  };
};

export default mount;
