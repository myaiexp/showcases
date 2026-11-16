// Selection: selection:created, updated and cleared with their object lists
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { eventLog, trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Click a shape, click another, shift-click a third, then click empty space. Updated lists only what changed: selected and deselected.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const log = eventLog(stage, 9);

  const names = (list: typeof all): string => `[${list.map(who).join(', ')}]`;
  canvas.on('selection:created', ({ selected }) => log.add('selection:created', `selected ${names(selected)}`));
  canvas.on('selection:updated', ({ selected, deselected }) => log.add('selection:updated', `selected ${names(selected)} · deselected ${names(deselected)}`));
  canvas.on('before:selection:cleared', ({ deselected }) => log.add('before:selection:cleared', `deselected ${names(deselected)}`));
  canvas.on('selection:cleared', ({ deselected }) => log.add('selection:cleared', `deselected ${names(deselected)}`));
  // every involved object also fires its own `selected` / `deselected`
  for (const o of all) {
    o.on('selected', () => log.add(`${who(o)} selected`));
    o.on('deselected', () => log.add(`${who(o)} deselected`));
  }

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.click(red.getCenterPoint());
      await stage.wait(300);
      await ghost.click(blue.getCenterPoint());
      await stage.wait(300);
      await ghost.click(green.getCenterPoint(), { shiftKey: true });
      await stage.wait(300);
      await ghost.click({ x: 180, y: 210 });
      await stage.wait(600);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
