// A bar chart fed by an async loader, with the museum's three standout years
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { autoHover } from '../../shared/hover.ts';
import { acquisitionsByYear, type Acquisition } from '../../shared/dev-data.ts';
import { C, alpha } from '../../shared/data.ts';

// usage.md § Real-world data fetches rows from an API. A gallery card never touches the
// network, so this stand-in resolves the same shape ({ year, count }) from inline data.
async function getAcquisitionsByYear(signal: AbortSignal, delay: number): Promise<Acquisition[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  signal.throwIfAborted();
  return acquisitionsByYear();
}

const STANDOUT = [1964, 1968, 2008];

const mount: Mount = async (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'loading…');
  const controller = new AbortController();
  ctx.signal.addEventListener('abort', () => controller.abort());

  let chart: Chart<'bar'> | null = null;
  let stopHover = (): void => {};

  const draw = (data: Acquisition[]): void => {
    stopHover();
    chart?.destroy();
    // The same map() calls as the guide: one for the labels, one for the points.
    chart = new Chart(stage.canvas, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map((row) => row.count),
            backgroundColor: data.map((row) => alpha(STANDOUT.includes(row.year) ? C.amber : C.blue, 0.65)),
            borderRadius: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: { x: { ticks: { maxRotation: 0, autoSkipPadding: 12 } } },
        plugins: { legend: { display: !ctx.preview } },
      },
    });
    note.textContent = '1964, 1968 and 2008 stand out';
    const c = chart;
    // Cards cannot be hovered: step the highlight through the three standout years.
    if (ctx.preview) {
      stopHover = autoHover(c, 1500, (s) => {
        const index = data.findIndex((row) => row.year === STANDOUT[s % STANDOUT.length]);
        return [{ datasetIndex: 0, index }];
      });
    }
  };

  const load = async (): Promise<void> => {
    note.textContent = 'loading…';
    try {
      draw(await getAcquisitionsByYear(controller.signal, ctx.preview ? 0 : 900));
    } catch {
      /* aborted: the example was unmounted */
    }
  };
  await load();
  if (bar) button(bar, 'Reload data', () => void load());

  return () => {
    controller.abort();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
