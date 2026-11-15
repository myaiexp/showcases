// contour as lines: no fill, stroke colored by level, a dashed variant, and the fill drawn beneath
import { defineChart, mountChart } from '@tanstack/charts';
import { contour } from '@tanstack/charts/spatial/contour';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { hillGrid } from '../../shared/marks2-field.ts';
import { createStage } from '../../shared/stage.ts';

const grid = hillGrid(60, 40);
type Look = 'lines' | 'dashed' | 'both';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (look: Look) => {
    const base = { width: 60, height: 40, value: 'height' as const, thresholds: 12 };
    return defineChart({
      marks:
        look === 'both'
          ? [contour(grid, { ...base, fillOpacity: 0.35 }), contour(grid, { ...base, fill: 'none', stroke: '#e5e7eb', strokeWidth: 0.8, strokeOpacity: 0.7 })]
          : [
              contour(grid, {
                ...base,
                fill: 'none',
                // With no stroke override the color scale does not paint lines, so color goes through stroke.
                stroke: (level) => heat(level.value / 10),
                strokeWidth: 1.5,
                ...(look === 'dashed' ? { strokeDasharray: '5 3' } : {}),
              }),
            ],
      scales: { x: null, y: null },
      guides: false,
      color: { scale: scaleSequential(heat).domain([0, 10]) },
    });
  };

  const options = (look: Look) => ({ definition: build(look), height: stage.height, ariaLabel: 'Contour lines' });
  const host = stage.own(mountChart(stage.box, options('lines')));
  const modes: readonly (readonly [Look, string])[] = [['lines', 'colored lines'], ['dashed', 'dashed lines'], ['both', 'fill and outline layers']];
  const show = (look: Look): void => host.update(options(look));
  if (stage.bar) select(stage.bar, 'look', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 1900, show);
  return () => stage.dispose();
};

export default mount;
