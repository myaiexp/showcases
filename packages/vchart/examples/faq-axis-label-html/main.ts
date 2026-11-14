// FAQ: HTML axis labels through enableHtmlAttribute and formatMethod returning type 'html'
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every, readout } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const TEAMS = ['Ant', 'Bee', 'Cat', 'Dog', 'Elk', 'Fox'];
const rows = (seed: number): { team: string; score: number }[] => {
  const r = rng(seed);
  return TEAMS.map((team) => ({ team, score: Math.round(20 + r() * 70) }));
};

const build = (w: number): ISpec => ({
  type: 'bar',
  data: [{ id: 'd', values: rows(1) }],
  xField: 'team',
  yField: 'score',
  axes: [
    {
      orient: 'bottom',
      sampling: false,
      label: {
        style: { forceBoundsWidth: w, forceBoundsHeight: 26 },
        // Returning { type: 'html' } puts a real DOM node at the label's position.
        formatMethod: (label: string | string[]) => ({
          type: 'html',
          text: {
            pointerEvents: 'auto',
            id: `team-label-${String(label)}`,
            style: { width: `${w}px`, overflow: 'hidden' },
            dom: `<span data-team="${String(label)}" style="display:inline-block;padding:2px ${w < 50 ? 3 : 8}px;border-radius:10px;background:#334155;color:#e2e8f0;font:${w < 50 ? 9 : 12}px sans-serif;cursor:pointer">${String(label)}</span>`,
          },
        }),
      },
    },
    { orient: 'left' },
  ],
} as unknown as ISpec);

const mount: Mount = (el, ctx) => {
  // The plugin must be on before the chart renders.
  const { vchart, release, container } = createChart(el, ctx, build(ctx.preview ? 36 : 56), { init: { enableHtmlAttribute: true } });
  const log = ctx.preview ? null : readout(el);
  if (log) log.textContent = 'Click a team badge on the x axis.';
  // The badges are plain DOM, so ordinary listeners work, delegated on the container.
  const onClick = (e: Event): void => {
    const team = (e.target as HTMLElement).dataset.team;
    if (team && log) log.textContent = `clicked label: ${team}`;
  };
  container.addEventListener('click', onClick);
  let seed = 1;
  let released = false;
  const stop = every(2000, () => {
    seed += 1;
    if (!released) void vchart.updateData('d', rows(seed));
  });
  return () => {
    stop();
    released = true;
    container.removeEventListener('click', onClick);
    release();
  };
};

export default mount;
