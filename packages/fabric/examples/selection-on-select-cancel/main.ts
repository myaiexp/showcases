// Selection: onSelect and onDeselect return true to refuse a change
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Green refuses to be selected (onSelect returns true). Red, once selected while pinned, cannot be deselected (onDeselect returns true), so clicks elsewhere do nothing.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const say = status(stage);

  let noGreen = true;
  let pinRed = true;
  // both callbacks are empty hooks on every object; returning true cancels the change
  green.onSelect = () => noGreen;
  red.onDeselect = () => pinRed;
  const report = (): void => say(`${stage.preview ? 'green locked' : 'green onSelect refuses'}: ${noGreen} · ${stage.preview ? 'red pinned' : 'red onDeselect refuses'}: ${pinRed}\nactive: ${who(canvas.getActiveObject())}`);
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) {
    checkbox(stage.bar, 'green refuses selection', true, (v) => ((noGreen = v), report()));
    checkbox(stage.bar, 'red cannot be deselected', true, (v) => ((pinRed = v), report()));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      pinRed = true;
      noGreen = true;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      report();
      await ghost.click(green.getCenterPoint());
      await ghost.click(red.getCenterPoint());
      await ghost.click(blue.getCenterPoint());
      await stage.wait(1000);
      pinRed = false;
      report();
      await ghost.click(blue.getCenterPoint());
      await stage.wait(900);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
