// Five 3D scenes in one figure, each placed with scene.domain and holding its own mesh3d
import Plotly from 'plotly.js';
import type { Data, Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 620 });
  const rand = rng(3);
  const cloud = (mul: number): number[] => Array.from({ length: 51 }, () => rand() * mul);
  const specs = [
    { color: 'rgba(255,127,80,0.7)', m: [-75, 75, 75] },
    { color: 'pink', m: [-75, 75, 75] },
    { color: 'rgb(33,255,100)', m: [-75, -75, -75] },
    { color: 'rgb(200,100,200)', m: [-75, 75, 75] },
    { color: 'rgb(0,150,200)', m: [100, 100, 100] },
  ];
  // A card holds two WebGL scenes at most: the full view has five.
  const used = stage.preview ? specs.slice(0, 2) : specs;
  const data: Data[] = used.map((s, i) => ({
    type: 'mesh3d',
    opacity: 0.5,
    color: s.color,
    x: cloud(s.m[0]!),
    y: cloud(s.m[1]!),
    z: cloud(s.m[2]!),
    scene: i === 0 ? 'scene' : `scene${i + 1}`,
  }));
  const domains = stage.preview
    ? [{ x: [0, 0.5], y: [0, 1] }, { x: [0.5, 1], y: [0, 1] }]
    : [
        { x: [0, 0.5], y: [0.5, 1] },
        { x: [0.5, 1], y: [0.5, 1] },
        { x: [0, 0.33], y: [0, 0.5] },
        { x: [0.33, 0.66], y: [0, 0.5] },
        { x: [0.66, 0.99], y: [0, 0.5] },
      ];
  const layout: Record<string, unknown> = { template: stage.template, margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 }, showlegend: false };
  domains.forEach((d, i) => (layout[i === 0 ? 'scene' : `scene${i + 1}`] = { domain: d }));
  await Plotly.newPlot(stage.div, data, layout as Partial<Layout>, stage.config);

  orbit(stage, { radius: 2, scenes: ['scene', 'scene2'] });
  return () => stage.dispose();
};

export default mount;
