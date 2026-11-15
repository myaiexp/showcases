// svg() with a seed repeats its random picks; without one every call picks new ones
import { svg } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { framed } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
  viewBox: 0 0 20 20;
  rect*12 {
    x: @r(16); y: @r(16);
    width, height: @r(2, 6);
    fill: @p(#264653, #2a9d8f, #e9c46a, #f4a261, #e76f51);
    opacity: .85;
  }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const size = ctx.preview ? 76 : 180;
  const make = (label: string): HTMLElement => {
    const box = document.createElement('div');
    box.style.cssText = `width: ${size}px; height: ${size}px; background: #f8f4e3`;
    framed(stage.root, box, label);
    return box;
  };
  const a = make('{ seed: 42 }');
  const b = make('{ seed: 42 }');
  const c = make('no seed');

  const draw = (): void => {
    a.replaceChildren(svg.element(code, { seed: 42 }) ?? '');
    b.replaceChildren(svg.element(code, { seed: 42 }) ?? '');
    c.replaceChildren(svg.element(code) ?? '');
  };
  draw();
  stage.every(1500, draw);
  stage.say('Same seed, same picture; no seed, a new one every call');
  return () => stage.dispose();
};

export default mount;
