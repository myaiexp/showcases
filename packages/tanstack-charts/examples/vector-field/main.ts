// vector: fixed-pixel arrows at scaled anchors, with length and rotation read from fields
import { defineChart, mountChart, vector } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// A swirling wind field on a 12 by 8 grid: bearing turns with position, speed grows with distance from the center.
const wind = Array.from({ length: 96 }, (_, i) => {
  const col = i % 12;
  const row = Math.floor(i / 12);
  const dx = col - 5.5;
  const dy = row - 3.5;
  return { id: i, lon: col, lat: row, speed: Math.hypot(dx, dy) * 3 + 4, bearing: (Math.atan2(dx, -dy) * 180) / Math.PI + 90 };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a vector: its anchor stays on the grid point whichever anchor mode is chosen.' });

  const build = (anchor: 'start' | 'middle' | 'end') =>
    defineChart({
      svgAnimation: true,
      marks: [vector(wind, { x: 'lon', y: 'lat', key: 'id', length: 'speed', rotate: 'bearing', anchor, color: 'speed', strokeWidth: 1.8 })],
      scales: {
        x: { scale: scaleLinear().domain([-1, 12]), grid: true },
        y: { scale: scaleLinear().domain([-1, 8]), grid: true },
      },
      tooltip,
    });

  const options = (anchor: 'start' | 'middle' | 'end') => ({ definition: build(anchor), height: stage.height, ariaLabel: 'Wind vectors on a grid' });
  const host = stage.own(mountChart(stage.box, options('middle')));
  const modes = [['start', 'start (tail on the point)'], ['middle', 'middle'], ['end', 'end (head on the point)']] as const;
  const show = (anchor: 'start' | 'middle' | 'end'): void => host.update(options(anchor));
  if (stage.bar) select(stage.bar, 'anchor', modes, show, 'middle');
  else {
    stage.cycle(modes.map((m) => m[0]), 1800, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
