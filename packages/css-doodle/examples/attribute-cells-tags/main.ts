// cells="#tags span" clips nine page tags to blobs; a click redraws them
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const words = ['css', 'doodle', 'grid', 'shape', 'svg', 'pattern', 'scene', 'plot', 'tile'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a tag for new shapes.' });
  const tags = paper(stage, 'cd-cells-tags', words.map((w) => `<span>${w}</span>`).join(' '));
  const doodle = stage.doodle(
    `
    display: inline-block;
    padding: 10px 16px;
    background: @p(#ebbf4d, #e6437d, #2a9d8f);
    clip-path: @shape(r: @R.t(.75, 1));
  `,
    { attrs: { cells: '#cd-cells-tags span', 'click:update': '' }, frame: 'free', parent: tags.parentElement! },
  );
  // A card has no pointer: click a tag, which is what the reader would do.
  if (stage.preview) stage.every(2200, () => tags.querySelector('span')?.click());
  stage.onDispose(() => doodle.removeAttribute('cells'));
  stage.say('Every tag is a cell with a clip-path of its own');
  return () => stage.dispose();
};

export default mount;
