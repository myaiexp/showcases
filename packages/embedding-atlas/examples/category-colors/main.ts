// categoryColors: category i takes the i-th colour of the list
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const PALETTES: Record<string, string[]> = {
  harbour: ['#0ea5e9', '#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#fb923c'],
  forest: ['#14532d', '#16a34a', '#84cc16', '#a3e635', '#65a30d', '#bef264'],
  ember: ['#7f1d1d', '#dc2626', '#f97316', '#fbbf24', '#fde68a', '#fef3c7'],
  'one highlighted': ['#334155', '#334155', '#f43f5e', '#334155', '#334155', '#334155'],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });
  const names = Object.keys(PALETTES);

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    categoryColors: PALETTES[names[0]!]!,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  // update() passes on a prop only when its value is a different object, so each palette is its own array.
  const show = (name: string): void => view.update({ categoryColors: PALETTES[name]! });
  if (stage.bar) select(stage.bar, 'categoryColors', names, show);
  let i = 0;
  if (stage.preview) stage.every(2500, () => show(names[(i = (i + 1) % names.length)]!));
  return stage.dispose;
};

export default mount;
