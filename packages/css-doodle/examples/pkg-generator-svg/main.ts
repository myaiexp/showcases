// svg() turns @svg code into markup; svg.element() makes it an element
import { svg } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { codeBlock, framed } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
  viewBox: 0 0 10 10;
  circle*5 {
    cx: @r(10);
    cy: @r(10);
    r: @r(1, 3);
    fill: @p(#e6437d, #ebbf4d);
  }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const box = document.createElement('div');
  box.style.cssText = `width: ${ctx.preview ? 120 : 300}px; height: ${ctx.preview ? 120 : 300}px; background: #1b1b2f`;
  framed(stage.root, box, 'svg.element(code, { seed })');
  const pre = codeBlock(stage.root, ctx.preview);

  let seed = 7;
  const draw = (): void => {
    // The same seed always gives the same markup.
    const markup = svg(code, { seed });
    pre.textContent = markup;
    // svg.element() parses it into an element (in a browser only).
    box.replaceChildren(svg.element(code, { seed }) ?? '');
    stage.say(`seed ${seed}: ${markup.length} characters of SVG`);
  };
  draw();
  stage.every(ctx.preview ? 1800 : 2600, () => {
    seed++;
    draw();
  });
  return () => stage.dispose();
};

export default mount;
