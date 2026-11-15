// create(code) returns a new <css-doodle> element with the code as its content
import { create } from 'css-doodle/component';
import type { Mount } from '@/types.ts';
import { framed } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';
import type { CSSDoodle } from '../../shared/types.ts';

const PALETTES = ['#000, #fff', '#e63946, #f1faee', '#2a9d8f, #e9c46a', '#5f0f40, #fb8b24'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const row = document.createElement('div');
  row.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap; justify-content: center';
  stage.root.append(row);

  // Each call registers css-doodle if needed and returns an element ready to append.
  const add = (colors: string): void => {
    const doodle = create(`
      @grid: 5 / 100%;
      background: @p(${colors});
    `) as CSSDoodle;
    framed(row, doodle, `@p(${colors})`, 'free');
    doodle.style.cssText = `width: ${ctx.preview ? 52 : 140}px; height: ${ctx.preview ? 52 : 140}px`;
    if (row.childElementCount > PALETTES.length) row.firstElementChild!.remove();
  };
  let i = 0;
  add(PALETTES[0]!);
  stage.every(ctx.preview ? 900 : 1500, () => add(PALETTES[(i = (i + 1) % PALETTES.length)]!));
  stage.say('create(code) → a new element; append it anywhere');
  return () => stage.dispose();
};

export default mount;
