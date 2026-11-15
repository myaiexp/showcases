// Light and dark theme blocks: one theme object, values per colorScheme
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const labels: Label[] = points.centres.map(([x, y], i) => ({ x, y, content: points.names[i]!, level: 0 }));

  // Shared values at the top level; `light` and `dark` override them for that scheme only.
  const theme = {
    fontFamily: 'Georgia, serif',
    clusterLabelOpacity: 1,
    light: { clusterLabelColor: '#9a3412', statusBarBackgroundColor: 'rgba(255,237,213,0.95)' },
    dark: { clusterLabelColor: '#fdba74', statusBarBackgroundColor: 'rgba(67,20,7,0.9)' },
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    theme,
  });
  stage.own(view);

  const paint = (scheme: 'light' | 'dark'): void => {
    stage.view.style.background = scheme === 'light' ? '#fff' : '#0b0d12';
    view.update({ config: { colorScheme: scheme } });
  };
  if (stage.bar) select(stage.bar, 'colorScheme', ['dark', 'light'] as const, paint);
  let light = false;
  if (stage.preview) stage.every(2000, () => paint((light = !light) ? 'light' : 'dark'));
  return stage.dispose;
};

export default mount;
