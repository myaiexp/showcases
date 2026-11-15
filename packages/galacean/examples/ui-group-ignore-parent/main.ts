// UIGroup.ignoreParentGroup: a nested group opts out of its parent
import { UIGroup } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const outer = canvasEntity.createChild('outer');
  const outerGroup = outer.addComponent(UIGroup);
  image(outer, 0, 0, 640, 240, { color: [0.35, 0.4, 0.55, 1] }, 'backdrop');
  label(outer, 0, 90, 'parent group', 24);
  const follow = outer.createChild('follows');
  follow.addComponent(UIGroup);
  image(follow, -150, -10, 200, 110, { color: [0.85, 0.5, 0.25, 1] }, 'panel');
  label(follow, -150, -10, 'follows parent', 22);
  const free = outer.createChild('ignores');
  const freeGroup = free.addComponent(UIGroup);
  image(free, 150, -10, 200, 110, { color: [0.3, 0.75, 0.5, 1] }, 'panel');
  label(free, 150, -10, 'ignoreParentGroup', 20);
  freeGroup.ignoreParentGroup = true;
  const alpha = (v: number): void => {
    outerGroup.alpha = v;
    say(`parent alpha ${v.toFixed(2)} | right group ignoreParentGroup = ${freeGroup.ignoreParentGroup}`);
  };
  if (stage.preview) tick(canvasEntity, (_dt, t) => alpha(0.5 + 0.5 * Math.sin(t * 1.3)));
  else {
    slider(stage.bar, 'parent alpha', 0, 1, 0.01, 1, alpha);
    checkbox(stage.bar, 'ignoreParentGroup', true, (v) => ((freeGroup.ignoreParentGroup = v), alpha(outerGroup.alpha)));
    alpha(1);
  }
  return stage.dispose;
};

export default mount;
