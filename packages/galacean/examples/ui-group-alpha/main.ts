// UIGroup.alpha fades every element below it; nested groups multiply
import { UIGroup } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { button, image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const make = (x: number, title: string) => {
    const holder = canvasEntity.createChild(title);
    const group = holder.addComponent(UIGroup);
    image(holder, x, 0, 220, 190, { color: [0.3, 0.45, 0.8, 1] }, 'panel');
    button(holder, stage.engine, x, 20, 150, 60, 'Button', '#d9822b');
    label(holder, x, -55, title, 22);
    return group;
  };
  const left = make(-130, 'UIGroup alpha');
  const inner = canvasEntity.createChild('static');
  image(inner, 130, 0, 220, 190, { color: [0.3, 0.45, 0.8, 1] }, 'panel');
  button(inner, stage.engine, 130, 20, 150, 60, 'Button', '#d9822b');
  label(inner, 130, -55, 'no group', 22);
  const alpha = (v: number): void => {
    left.alpha = v;
    say(`left UIGroup.alpha = ${v.toFixed(2)} | right has no group`);
  };
  if (stage.preview) tick(canvasEntity, (_dt, t) => alpha(0.5 + 0.5 * Math.sin(t * 1.5)));
  else {
    slider(stage.bar, 'alpha', 0, 1, 0.01, 1, alpha);
    alpha(1);
  }
  return stage.dispose;
};

export default mount;
