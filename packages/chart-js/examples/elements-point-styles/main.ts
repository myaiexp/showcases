// Twelve point styles on one line, with rotation, size and fill you can change
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const STYLES = ['circle', 'cross', 'crossRot', 'dash', 'line', 'rect', 'rectRounded', 'rectRot', 'star', 'triangle'] as const;

/** elements.md § Point Styles: a pointStyle can also be an Image or a canvas. */
function customStyles(onLoad: () => void): [HTMLImageElement, HTMLCanvasElement] {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='12' fill='#22c55e'/>" +
    "<path d='M8 14l4 4 8-9' stroke='white' stroke-width='3' fill='none'/></svg>";
  const img = new Image(28, 28);
  img.onload = onLoad;
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const c = document.createElement('canvas');
  c.width = c.height = 28;
  const g = c.getContext('2d')!;
  g.fillStyle = C.pink;
  g.beginPath();
  g.moveTo(14, 25);
  g.bezierCurveTo(-6, 11, 8, -4, 14, 7);
  g.bezierCurveTo(20, -4, 34, 11, 14, 25);
  g.fill();
  return [img, c];
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let hollow = true;
  let radius = 9;
  let rotation = 0;
  const [img, canvasTile] = customStyles(() => chart.update());

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: [...STYLES, 'image', 'canvas'],
      datasets: [
        {
          label: 'pointStyle',
          data: Array.from({ length: STYLES.length + 2 }, () => 1),
          showLine: false,
          // An array is an indexable option (general/options.md): point i takes style i.
          pointStyle: [...STYLES, img, canvasTile],
          pointRadius: radius,
          borderColor: C.amber,
          borderWidth: 2,
          backgroundColor: alpha(C.amber, 0.3),
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: { left: 6, right: 6, top: 6 } },
      scales: {
        x: { ticks: { autoSkip: false, maxRotation: 90, minRotation: ctx.preview ? 90 : 45, font: { size: ctx.preview ? 9 : 12 } } },
        y: { display: false, min: 0, max: 2 },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: !ctx.preview } },
    },
  });

  const apply = (): void => {
    const ds = chart.data.datasets[0]!;
    ds.pointRadius = radius;
    ds.pointRotation = rotation;
    ds.backgroundColor = hollow ? alpha(C.amber, 0.3) : C.amber;
    chart.update();
    label.textContent = `pointRotation: ${rotation}  pointRadius: ${radius}`;
  };
  apply();

  if (bar) {
    slider(bar, 'pointRadius', [3, 18, 1], radius, (v) => ((radius = v), apply()));
    slider(bar, 'pointRotation', [0, 180, 5], rotation, (v) => ((rotation = v), apply()));
    toggle(bar, 'translucent fill', hollow, (v) => ((hollow = v), apply()));
  }
  const stop = ctx.preview
    ? cycle([45, 90, 0], 1700, (r) => {
        rotation = r;
        radius = r === 90 ? 6 : 9;
        apply();
      })
    : () => {};

  return () => {
    stop();
    img.onload = null;
    stage.release(chart);
  };
};

export default mount;
