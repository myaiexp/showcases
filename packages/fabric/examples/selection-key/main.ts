// Selection: selectionKey names the modifier that extends the selection
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const OPTIONS = ['shiftKey', 'ctrlKey', 'altKey', 'metaKey', 'shift or ctrl', 'null'] as const;
type Option = (typeof OPTIONS)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Click one shape, then hold the chosen key and click another. A key that is not selectionKey just selects the second shape alone.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const say = status(stage);

  const apply = (v: Option): void => {
    // a modifier name, an array of them, or null to switch the feature off
    canvas.selectionKey = v === 'null' ? null : v === 'shift or ctrl' ? ['shiftKey', 'ctrlKey'] : v;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    report();
  };
  const report = (): void => {
    const k = canvas.selectionKey;
    say(`selectionKey ${Array.isArray(k) ? `[${k.join(', ')}]` : String(k)}\nselected [${canvas.getActiveObjects().map(who).join(', ')}]`);
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  report();

  if (stage.bar) select(stage.bar, 'selectionKey', OPTIONS, apply, 'shiftKey');
  else {
    const ghost = stage.ghost(canvas);
    const order: Option[] = ['shiftKey', 'ctrlKey', 'shift or ctrl', 'null'];
    let i = 0;
    stage.repeat(async () => {
      apply(order[i++ % order.length]!);
      await ghost.click(red.getCenterPoint());
      await ghost.click(green.getCenterPoint(), { shiftKey: true });
      await stage.wait(900);
    }, 200);
    void blue;
  }

  return stage.dispose;
};

export default mount;
