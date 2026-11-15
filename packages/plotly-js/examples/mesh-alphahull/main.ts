// mesh3d.alphahull wraps random points: -1 is the convex hull, larger values carve in
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const HULLS = ['-1', '0', '1', '5', '20'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const rand = rng(7);
  const x = uniform(rand, 50);
  const y = uniform(rand, 50);
  const z = uniform(rand, 50);
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'mesh3d', alphahull: 5, opacity: 0.8, color: 'rgb(200,100,255)', x, y, z },
      { type: 'scatter3d', mode: 'markers', x, y, z, marker: { size: 2.5, color: '#e6e8ee' }, hoverinfo: 'skip' },
    ],
    { template: stage.template, margin: margin3d(stage), showlegend: false, scene: { camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } } },
    stage.config,
  );

  const apply = (h: string): void => void restyle(stage.div, { alphahull: Number(h) }, [0]);
  if (stage.bar) select(stage.bar, 'alphahull', HULLS, '5', apply);
  else stage.every(1500, (i) => apply(HULLS[i % HULLS.length]!));
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
