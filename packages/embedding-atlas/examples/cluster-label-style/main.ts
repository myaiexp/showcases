// Cluster label colour, outline colour and opacity from the theme
import { EmbeddingView, type EmbeddingViewTheme, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const STYLES: Record<string, Partial<EmbeddingViewTheme>> = {
  'amber on black': { clusterLabelColor: '#fbbf24', clusterLabelOutlineColor: 'rgba(0,0,0,0.9)' },
  'white on violet': { clusterLabelColor: '#ffffff', clusterLabelOutlineColor: 'rgba(76,29,149,0.95)' },
  'no outline': { clusterLabelColor: '#e2e8f0', clusterLabelOutlineColor: 'transparent' },
  'dark on white': { clusterLabelColor: '#0f172a', clusterLabelOutlineColor: 'rgba(255,255,255,0.9)' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const labels: Label[] = points.centres.map(([x, y], i) => ({ x, y, content: points.names[i]!, level: 0 }));
  const names = Object.keys(STYLES);

  let style = names[0]!;
  let opacity = 0.9;
  const theme = (): Partial<EmbeddingViewTheme> => ({ ...STYLES[style], clusterLabelOpacity: opacity });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    theme: theme(),
  });
  stage.own(view);

  if (stage.bar) {
    select(stage.bar, 'style', names, (s) => {
      style = s;
      view.update({ theme: theme() });
    });
    slider(stage.bar, 'clusterLabelOpacity', 0, 1, 0.05, opacity, (o) => {
      opacity = o;
      view.update({ theme: theme() });
    });
  }
  let i = 0;
  if (stage.preview) {
    stage.every(1800, () => {
      style = names[(i = (i + 1) % names.length)]!;
      view.update({ theme: theme() });
    });
  }
  return stage.dispose;
};

export default mount;
