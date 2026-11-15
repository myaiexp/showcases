// Two surfaces side by side, one lighting term different: the docs' ambient, diffuse, specular, roughness and fresnel pages
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { saddle } from '../../shared/fund-util.ts';

// The two values each docs page compares for its term.
const TERMS = {
  ambient: [0.9, 0.2],
  diffuse: [0.9, 0.1],
  specular: [2, 0.1],
  roughness: [0.1, 0.9],
  fresnel: [4.5, 0.2],
} as const;
const BASE = { ambient: 0.8, diffuse: 0.8, specular: 0.05, roughness: 0.5, fresnel: 0.2 } as const;
type Term = keyof typeof TERMS;
const NAMES = Object.keys(TERMS) as Term[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const z = saddle(60);
  const side = (scene: string, v: number): Plotly.Data => ({ type: 'surface', z, scene, colorscale: 'Viridis', showscale: false, lighting: { ambient: 0.8, diffuse: 0.8, specular: 0.05, roughness: 0.5, fresnel: 0.2, [NAMES[0]!]: v } } as Plotly.Data);
  await Plotly.newPlot(
    stage.div,
    [side('scene', TERMS.ambient[0]), side('scene2', TERMS.ambient[1])],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: stage.preview ? 0 : 40, b: 0 },
      title: { text: stage.preview ? '' : 'Ambient lighting: 0.9 left, 0.2 right' },
      grid: { rows: 1, columns: 2, pattern: 'independent' },
      scene: { aspectmode: 'cube', domain: { row: 0, column: 0 }, camera: { eye: { x: 1.5, y: 1.5, z: 0.8 } } },
      scene2: { aspectmode: 'cube', domain: { row: 0, column: 1 }, camera: { eye: { x: 1.5, y: 1.5, z: 0.8 } } },
    },
    stage.config,
  );

  const show = (term: Term): void => {
    const [a, b] = TERMS[term];
    // Each restyle address names a nested attribute; the value list is one entry per trace.
    // The other four terms go back to the shared base value on both surfaces.
    const update = Object.fromEntries(NAMES.map((t) => [`lighting.${t}`, t === term ? [a, b] : [BASE[t], BASE[t]]]));
    void Plotly.restyle(stage.div, update as unknown as Plotly.DataUpdate);
    if (!stage.preview) void Plotly.relayout(stage.div, { 'title.text': `${term[0]!.toUpperCase()}${term.slice(1)} lighting: ${a} left, ${b} right` });
  };
  if (stage.bar) select(stage.bar, 'lighting term', NAMES, 'ambient', show);
  else stage.every(1700, (i) => show(NAMES[i % NAMES.length]!));
  return () => stage.dispose();
};

export default mount;
