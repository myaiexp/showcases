// Marker colour alpha, marker.opacity and trace opacity: three ways to see density
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cloud } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const KINDS = ['fully opaque', 'alpha in the colour', 'marker.opacity', 'trace opacity'] as const;
type Kind = (typeof KINDS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const a = cloud(3, 500, 3, 6);
  const draw = (kind: Kind): Promise<unknown> => {
    const base = { size: 20, line: { color: 'rgb(231, 99, 250)', width: 2 } };
    const big = { size: 60, line: { color: 'rgb(231, 99, 250)', width: 6 } };
    const fill = kind === 'alpha in the colour' ? 'rgba(17, 157, 255, 0.5)' : 'rgb(17, 157, 255)';
    const marker = (b: typeof base): object => ({ ...b, color: fill, ...(kind === 'marker.opacity' ? { opacity: 0.5 } : {}) });
    return Plotly.react(
      stage.div,
      [
        { x: a.x, y: a.y, type: 'scatter', mode: 'markers', marker: marker(base), opacity: kind === 'trace opacity' ? 0.5 : 1, showlegend: false },
        { x: [2, 2], y: [4.25, 4.75], type: 'scatter', mode: 'markers', marker: marker(big), opacity: kind === 'trace opacity' ? 0.5 : 1, showlegend: false },
      ],
      { template: stage.template, title: { text: stage.preview ? '' : kind } },
      stage.config,
    );
  };
  await draw('fully opaque');

  if (stage.bar) select(stage.bar, 'transparency', KINDS, 'fully opaque', (k) => void draw(k));
  else stage.every(1500, (i) => void draw(KINDS[i % KINDS.length]!));
  return () => stage.dispose();
};

export default mount;
