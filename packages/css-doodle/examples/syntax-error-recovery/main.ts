// Broken code still draws; css-doodle reports what it could not read
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 5 / 100% _2px;
    background: @colour(red, blue);
    border: 2px solid #e6437d;
`;
const v1 = `
    @grid: 5 / 100% _2px;
    background: #42c6ff;
    scale: @r(.5, 1;
    border-radius: 50%;
`;
const v2 = `
    --loop(x): $loop(x);
    @grid: 5 / 100% _2px;
    background: #f4d35e;
    width: $loop(1)px;
`;
const v3 = `
    @grid: 5 / 100% _2px;
    @keyframes {
      from { opacity: 0 }
    }
    background: #90be6d;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: 'unknown function', code: v0 },
    { label: 'unclosed (', code: v1 },
    { label: 'function calls itself', code: v2 },
    { label: '@keyframes, no name', code: v3 },
  ], 3000);
  // diagnostics holds the last render's warnings ({ message, index or pos }).
  doodle.addEventListener('render', () => {
    const w = doodle.diagnostics;
    stage.say(w.length ? w.map((d) => d.message).join(' · ') : 'no warnings', w.length ? 'warn' : 'ok');
  });
  return () => stage.dispose();
};

export default mount;
