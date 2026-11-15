// autoLabelDensityThreshold: drop faint clusters before they are labelled
import { EmbeddingView, type EmbeddingViewConfig, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise the threshold: only the densest clusters keep a label.' });
  // Uneven clusters: tight, heavy topics next to faint, spread-out ones.
  const points = topicPoints({ count: stage.preview ? 15000 : 80000, topics: 8, spread: 0.8, noise: 0.08 });
  const status = stage.preview ? null : readout(stage.box);

  let asked = 0;
  // Label each cluster with its index, so the readout can say how many survived.
  const queryClusterLabels = async (clusters: Rectangle[][]): Promise<string[]> => {
    asked = clusters.length;
    if (status) status.textContent = `${asked} clusters passed the threshold and were labelled`;
    return clusters.map((_, i) => `cluster ${i + 1}`);
  };

  const config = (t: number): EmbeddingViewConfig => ({ colorScheme: 'dark', autoLabelDensityThreshold: t });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    queryClusterLabels,
    width: stage.width,
    height: stage.height,
    config: config(0.005),
  });
  stage.own(view);

  if (stage.bar) {
    slider(stage.bar, 'autoLabelDensityThreshold', 0, 0.3, 0.005, 0.005, (t) => view.update({ config: config(t) }), (t) => t.toFixed(3));
  }
  const steps = [0.005, 0.05, 0.15, 0.3];
  let i = 0;
  if (stage.preview) stage.every(2500, () => view.update({ config: config(steps[(i = (i + 1) % steps.length)]!) }));
  return stage.dispose;
};

export default mount;
