// @trace() turns a picture into an SVG path for @shape(path: …), clipping the cells
import '@css-doodle/addons/trace';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CAT } from '../../shared/trace-images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // CAT is a data: URL of a cat's head on a transparent background, so its alpha is the ink.
  const doodle = stage.doodle(`
    @use: trace;
    @grid: 1 / 100% / #fbe9d0;
    background: linear-gradient(@r(360deg), #1d3557, #e63946);
    clip-path: @shape(path: @trace(${CAT}));
    transition: background 1s;
  `);
  // A new seed only turns the gradient: the outline comes from the picture.
  stage.reroll(doodle, 2000);
  stage.say('clip-path: @shape(path: @trace(cat))');
  return () => stage.dispose();
};

export default mount;
