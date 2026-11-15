// Label levels: topics at level 0, sub-areas at 1 and 2 on zoom
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { topicPoints, TOPICS } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in on a cluster: its finer labels appear around 2^level zoom.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });

  const labels: Label[] = [];
  points.centres.forEach(([cx, cy], t) => {
    labels.push({ x: cx, y: cy, content: points.names[t]!.toUpperCase(), level: 0 });
    // Level 1: four words of the topic around its centre; level 2: four more, closer in.
    const words = TOPICS[t]!.words;
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + 0.4;
      labels.push({ x: cx + Math.cos(a) * 1.1, y: cy + Math.sin(a) * 1.1, content: words[k]!, level: 1 });
      labels.push({ x: cx + Math.cos(a + 0.8) * 0.45, y: cy + Math.sin(a + 0.8) * 0.45, content: words[k + 4]!, level: 2 });
    }
  });

  const status = stage.preview ? null : readout(stage.box);
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onViewportState: (v) => {
      if (status) status.textContent = `viewport scale ${v.scale.toFixed(3)}`;
    },
  });
  stage.own(view);

  // Cards dive into the first topic and back out, so the deeper levels come and go.
  if (stage.preview) {
    const [cx, cy] = points.centres[0]!;
    stage.loop((_, t) => {
      const k = (1 - Math.cos(t / 2)) / 2;
      view.update({ viewportState: { x: cx * k, y: cy * k, scale: 0.08 * 2 ** (k * 3.2) } });
    });
  }
  return stage.dispose;
};

export default mount;
