// mesh3d from 50 bare points: Plotly triangulates them along the chosen delaunayaxis
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const AXES = ['z', 'x', 'y'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const rand = rng(50);
  await Plotly.newPlot(
    stage.div,
    [{ type: 'mesh3d', opacity: 0.8, color: 'rgb(255,100,200)', x: uniform(rand, 50), y: uniform(rand, 50), z: uniform(rand, 50), delaunayaxis: 'z' }],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } } },
    stage.config,
  );

  const apply = (a: string): void => void restyle(stage.div, { delaunayaxis: a });
  if (stage.bar) select(stage.bar, 'delaunayaxis', AXES, 'z', apply);
  else stage.every(1600, (i) => apply(AXES[i % 3]!));
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
