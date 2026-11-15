// theme.brandingLink: replace or remove the link in the status bar
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const LINKS = {
  'default': undefined,
  'your own': { text: 'Showcases gallery', href: '#/embedding-atlas' },
  'none (null)': null,
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The link sits at the right end of the status bar.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const names = Object.keys(LINKS) as (keyof typeof LINKS)[];

  // Left undefined, the theme's default link (to the Embedding Atlas docs) is used.
  const theme = (name: keyof typeof LINKS) => (LINKS[name] === undefined ? {} : { brandingLink: LINKS[name] });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    theme: theme('your own'),
  });
  stage.own(view);

  const show = (name: keyof typeof LINKS): void => view.update({ theme: theme(name) });
  if (stage.bar) select(stage.bar, 'brandingLink', names, show, 'your own');
  let i = 1;
  if (stage.preview) stage.every(1800, () => show(names[(i = (i + 1) % names.length)]!));
  return stage.dispose;
};

export default mount;
