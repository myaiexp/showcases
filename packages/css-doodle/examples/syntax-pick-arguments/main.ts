// [a-z] ranges, an index before a colon, xN weights and --name lists in picks
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 6 / 100% / #111;
    @content: @p([a-z]);
    color: #fff;
    font: 700 20px/1 monospace;
    display: grid;
    place-items: center;
`;
const v1 = `
    @grid: 6 / 100% / #111;
    @content: @pick(@i: ○, ●);
    color: @pick(@i: #e6437d, #42c6ff);
    font: 700 20px/1 monospace;
    display: grid;
    place-items: center;
`;
const v2 = `
    @grid: 6 / 100% / #111 _2px;
    background: @p(#e6437d x3, #42c6ff);
`;
const v3 = `
    @grid: 6 / 100% / #111 _2px;
    --c: #f9c74f, #90be6d, #577590;
    background: @p(--c);
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '[a-z]', code: v0 },
    { label: '@pick(@i: …)', code: v1 },
    { label: 'red x3, blue', code: v2 },
    { label: '--c list', code: v3 },
  ]);
  stage.say('[a-z] expands to 26 letters to pick from');
  return () => stage.dispose();
};

export default mount;
