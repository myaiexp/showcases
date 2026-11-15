// The docs trap: enableWrapping with no width draws nothing
import { TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { box, scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const back = box(root, engine, 0, 0, 4, 1.2);
  const text = root.createChild('text').addComponent(TextRenderer);
  text.text = 'Now you can see me';
  text.fontSize = 40;
  const apply = (wrap: boolean, width: number): void => {
    text.enableWrapping = wrap;
    text.width = width;
    back.width = width || 4;
    say(`enableWrapping = ${wrap}, width = ${width}${wrap && width === 0 ? '  -> nothing renders' : ''}`);
  };
  const cases: [boolean, number][] = [[false, 0], [true, 0], [true, 4]];
  let i = 0;
  if (stage.preview) steps(root, 1.8, cases.length, (k) => apply(...cases[k]!));
  else {
    apply(...cases[0]!);
    button(stage.bar, 'next case', () => apply(...cases[(i = (i + 1) % cases.length)]!));
  }
  return stage.dispose;
};

export default mount;
