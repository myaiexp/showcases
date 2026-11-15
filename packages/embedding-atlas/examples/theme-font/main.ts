// theme.fontFamily: the typeface for labels and the status bar
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const FONTS = ['system-ui, sans-serif', 'Georgia, serif', 'ui-monospace, monospace', '"Comic Sans MS", cursive'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const labels: Label[] = points.centres.map(([x, y], i) => ({ x, y, content: points.names[i]!, level: 0 }));

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    theme: { fontFamily: FONTS[1] },
  });
  stage.own(view);

  // theme is compared by identity like every prop: pass a new object to change it.
  const show = (fontFamily: string): void => view.update({ theme: { fontFamily } });
  if (stage.bar) select(stage.bar, 'fontFamily', FONTS, show, FONTS[1]);
  let i = 1;
  if (stage.preview) stage.every(1800, () => show(FONTS[(i = (i + 1) % FONTS.length)]!));
  return stage.dispose;
};

export default mount;
