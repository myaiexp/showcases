// UIGroup.interactive: off, it disables every button below it
import { UIGroup } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { button, ghost, label, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const holder = canvasEntity.createChild('toolbar');
  const group = holder.addComponent(UIGroup);
  const counts = [0, 0, 0];
  const names = ['Save', 'Open', 'Run'];
  const score = label(canvasEntity, 0, 100, 'save 0 | open 0 | run 0', 26).text;
  const show = (): void => void (score.text = `save ${counts[0]} | open ${counts[1]} | run ${counts[2]}`);
  names.forEach((n, i) => {
    const b = button(holder, stage.engine, -200 + i * 200, -10, 170, 80, n, ['#3b6fd4', '#3b9d6a', '#c9582d'][i]);
    b.button.addClicked(() => ((counts[i] = counts[i]! + 1), show()));
  });
  const set = (on: boolean): void => {
    group.interactive = on;
    say(`group.interactive = ${on}`);
  };
  set(true);
  if (stage.preview) {
    const g = ghost(stage);
    timeline(canvasEntity, 8, [
      [0.4, () => g.move(-200, -10)], [0.9, () => g.down()], [1.1, () => g.up()],
      [2.3, () => set(false)], [2.6, () => g.move(0, -10)], [3.1, () => g.down()], [3.3, () => g.up()],
      [5, () => set(true)], [5.4, () => g.move(200, -10)], [5.9, () => g.down()], [6.1, () => g.up()], [7.3, () => g.move(0, -140)],
    ]);
  } else checkbox(stage.bar, 'group interactive', true, set);
  return stage.dispose;
};

export default mount;
