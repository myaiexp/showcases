// UI events bubble: down, up and click travel up through ancestors
import { Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { ghost, image, label, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { hint: 'Move over, press and release on the inner square, then on the middle one.' });
  const { stage, canvasEntity } = ui;
  const log = eventLog(stage, stage.preview ? 7 : 12, 'tr');
  class Spy extends Script {
    name = '';
    override onPointerEnter(): void {
      log.log(`${this.name} enter`);
    }
    override onPointerExit(): void {
      log.log(`${this.name} exit`);
    }
    override onPointerDown(): void {
      log.log(`${this.name} down`);
    }
    override onPointerUp(): void {
      log.log(`${this.name} up`);
    }
    override onPointerClick(): void {
      log.log(`${this.name} click`);
    }
  }
  const make = (parent: typeof canvasEntity, name: string, size: number, color: [number, number, number, number], x = 0, y = 0) => {
    const part = image(parent, x, y, size, size, { color }, name);
    part.entity.addComponent(Spy).name = name;
    label(part.entity, 0, size / 2 - 16, name, 20);
    return part.entity;
  };
  const a = make(canvasEntity, 'A', 300, [0.3, 0.4, 0.7, 1], -90, 0);
  const b = make(a, 'B', 200, [0.35, 0.6, 0.5, 1], 0, -14);
  make(b, 'C', 90, [0.85, 0.55, 0.3, 1], 0, -26);
  if (stage.preview) {
    const g = ghost(stage);
    timeline(canvasEntity, 7, [
      [0.3, () => g.move(100, -120)], [0.8, () => g.move(-90, -40)], [1.4, () => g.down()], [1.8, () => g.up()],
      [3, () => g.move(-90, 60)], [3.6, () => g.down()], [4, () => g.up()], [5.2, () => g.move(120, -120)],
    ]);
  }
  return stage.dispose;
};

export default mount;
