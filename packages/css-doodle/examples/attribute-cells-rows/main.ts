// cells reads which row each wrapped tag landed in, so @y colours whole rows
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const words = ['css', 'doodle', 'grid', 'shape', 'svg', 'pattern', 'scene', 'plot', 'tile', 'palette', 'shaders'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = paper(stage, 'cd-cells-rows', words.map((w) => `<span>${w}</span>`).join(' '), 'p');
  stage.doodle(
    `
    padding: 0 4px;
    color: #fff;
    background: @pick(@y: #111, #e6437d, #2a9d8f);
  `,
    { attrs: { cells: '#cd-cells-rows span' }, frame: 'free', parent: rows.parentElement! },
  );
  // Resizing moves tags to other rows; the doodle draws again with the same seed.
  const panel = rows.parentElement!;
  const full = stage.preview ? 176 : 400;
  stage.frame((t) => {
    panel.style.width = `${Math.round(full * (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.7))))}px`;
  });
  stage.say('The box resizes; the colour follows each tag\'s row (@y)');
  return () => stage.dispose();
};

export default mount;
