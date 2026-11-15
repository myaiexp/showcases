// dodgeY options: anchor, padding, fit
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { dodgeY } from '@tanstack/charts/dodge';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ a: [50, 8, 260], b: [72, 5, 120] }, 2).map((r, i) => ({ ...r, id: i }));

interface Setup {
  anchor: 'top' | 'middle' | 'bottom';
  padding: number;
  fit: 'overflow' | 'compress';
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let setup: Setup = { anchor: 'bottom', padding: 1, fit: 'overflow' };

  const chart = (s: Setup) =>
    defineChart({
      marks: [dot(rows, { x: 'value', key: 'id', r: 4, fillOpacity: 0.7, layout: dodgeY(s) })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: null },
    });

  const options = { definition: chart(setup), height: stage.height, initialWidth: 640, ariaLabel: 'A crowded swarm with configurable placement' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (next: Setup): void => {
    setup = next;
    host.update({ ...options, definition: chart(setup) });
    stage.say(`anchor: ${setup.anchor}, padding: ${setup.padding}, fit: ${setup.fit}`);
  };

  if (stage.bar) {
    select(stage.bar, 'anchor', [['bottom', 'bottom'], ['middle', 'middle'], ['top', 'top']] as const, (anchor) => show({ ...setup, anchor }));
    slider(stage.bar, 'padding', 0, 8, 1, 1, (padding) => show({ ...setup, padding }), (v) => `${v}px`);
    select(stage.bar, 'fit', [['overflow', 'overflow'], ['compress', 'compress']] as const, (fit) => show({ ...setup, fit }));
    stage.say('anchor: bottom, padding: 1, fit: overflow');
  } else
    stage.cycle<Setup>(
      [
        { anchor: 'bottom', padding: 1, fit: 'overflow' },
        { anchor: 'middle', padding: 1, fit: 'overflow' },
        { anchor: 'top', padding: 1, fit: 'overflow' },
        { anchor: 'middle', padding: 4, fit: 'overflow' },
        { anchor: 'middle', padding: 1, fit: 'compress' },
      ],
      1800,
      show,
    );
  return () => stage.dispose();
};

export default mount;
