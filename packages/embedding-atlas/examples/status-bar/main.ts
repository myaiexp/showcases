// The status bar: shown or hidden, and its text and background colours
import { EmbeddingView, type EmbeddingViewTheme } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const LOOKS: Record<string, Partial<EmbeddingViewTheme>> = {
  default: {},
  teal: { statusBarTextColor: '#ccfbf1', statusBarBackgroundColor: 'rgba(15,118,110,0.9)' },
  paper: { statusBarTextColor: '#1c1917', statusBarBackgroundColor: 'rgba(250,250,249,0.92)' },
  hidden: { statusBar: false },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The status bar sits along the bottom edge.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 60000 });
  const names = Object.keys(LOOKS);

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    theme: LOOKS.teal,
  });
  stage.own(view);

  const show = (name: string): void => view.update({ theme: { ...LOOKS[name] } });
  if (stage.bar) select(stage.bar, 'status bar', names, show, 'teal');
  let i = 1;
  if (stage.preview) stage.every(1800, () => show(names[(i = (i + 1) % names.length)]!));
  return stage.dispose;
};

export default mount;
