// Events: right and middle clicks and the v7 fire/stop options
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { eventLog, trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const BUTTONS = ['left', 'middle', 'right'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 330,
    hint: 'Right-click and middle-click the shapes. fireRightClick and fireMiddleClick let the button reach mouse:down and mouse:up; stopContextMenu keeps the browser menu away.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { all, red, blue } = trio();
  canvas.add(...all);
  const log = eventLog(stage, 8);

  // v7 defaults (deprecated options): all three are true. Turn one off and its events stop.
  const button = (e: Event): string => BUTTONS[(e as MouseEvent).button] ?? '?';
  canvas.on('mouse:down', ({ e, target }) => log.add('mouse:down', `${button(e)} button · target ${who(target)}`));
  canvas.on('mouse:up', ({ e, target }) => log.add('mouse:up', `${button(e)} button · target ${who(target)}`));
  canvas.on('contextmenu', ({ e, target }) => log.add('contextmenu', `target ${who(target)} · default prevented ${e.defaultPrevented}`));

  if (stage.bar) {
    checkbox(stage.bar, 'fireRightClick', canvas.fireRightClick, (v) => (canvas.fireRightClick = v));
    checkbox(stage.bar, 'fireMiddleClick', canvas.fireMiddleClick, (v) => (canvas.fireMiddleClick = v));
    checkbox(stage.bar, 'stopContextMenu', canvas.stopContextMenu, (v) => (canvas.stopContextMenu = v));
  } else {
    // a card has no real pointer: send the browser events the canvas listens to
    const ghost = stage.ghost(canvas);
    const upper = canvas.upperCanvasEl;
    const send = (type: string, button: number, p: Point): void => {
      const v = p.transform(canvas.viewportTransform);
      const r = upper.getBoundingClientRect();
      const init = { clientX: r.left + (v.x * r.width) / canvas.width, clientY: r.top + (v.y * r.height) / canvas.height, button, bubbles: true, cancelable: true };
      upper.dispatchEvent(new MouseEvent(type, init));
    };
    stage.repeat(async () => {
      for (const [obj, b] of [[red, 2], [blue, 1], [blue, 2]] as const) {
        const p = obj.getCenterPoint();
        await ghost.move(p, 500);
        send('mousedown', b, p);
        await stage.wait(80);
        send('mouseup', b, p);
        if (b === 2) send('contextmenu', b, p);
        await stage.wait(700);
      }
    }, 300);
  }

  return stage.dispose;
};

export default mount;
