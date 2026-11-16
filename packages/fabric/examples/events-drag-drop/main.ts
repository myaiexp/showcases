// Events: dragenter, dragover and drop from outside the canvas
import { Canvas, Circle, Point, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { BLUE, eventLog, GOLD, nameIt, RED, who, xy } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

type Payload = 'circle' | 'square';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    height: 300,
    hint: 'Drag a chip from below onto the canvas. Dropping on empty space creates a shape at the drop point; dropping on a shape recolours it.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const target = nameIt(new Rect({ left: 270, top: 80, width: 90, height: 70, fill: '#d8d3c4', stroke: '#8a8472', strokeWidth: 2, selectable: false }), 'drop zone');
  canvas.add(target);
  const log = eventLog(stage, 6);
  let payload: Payload = 'circle';
  let hot: FabricObject | undefined;
  const mark = (o: FabricObject | undefined): void => {
    if (hot === o) return;
    hot?.set('stroke', '#8a8472');
    hot = o;
    hot?.set('stroke', RED);
    canvas.requestRenderAll();
  };

  canvas.on('dragenter', ({ target: t }) => log.add('dragenter', `target ${who(t)}`));
  // A drop is only allowed when dragover is cancelled: fabric leaves that to you.
  canvas.on('dragover', ({ e, target: t }) => {
    e.preventDefault();
    mark(t);
    log.add('dragover', `target ${who(t)}`);
  });
  canvas.on('dragleave', () => {
    mark(undefined);
    log.add('dragleave');
  });
  canvas.on('drop', ({ e, target: t, scenePoint }) => {
    mark(undefined);
    const what = (e.dataTransfer?.getData('text/plain') as Payload) || payload;
    log.add('drop', `${what} at ${xy(scenePoint)} · target ${who(t)}`);
    if (t) {
      t.set('fill', what === 'circle' ? BLUE : GOLD);
    } else {
      const spot = { left: scenePoint.x, top: scenePoint.y, fill: what === 'circle' ? BLUE : GOLD };
      canvas.add(what === 'circle' ? new Circle({ ...spot, radius: 18 }) : new Rect({ ...spot, width: 34, height: 34 }));
      if (canvas.getObjects().length > 8) canvas.remove(canvas.getObjects()[1]!);
    }
    canvas.requestRenderAll();
  });

  if (stage.bar) {
    for (const kind of ['circle', 'square'] as const) {
      const chip = document.createElement('div');
      chip.draggable = true;
      chip.textContent = `drag ${kind}`;
      chip.style.cssText = 'padding:6px 14px;border-radius:14px;background:rgba(127,127,127,0.2);cursor:grab;font-size:13px;user-select:none';
      chip.addEventListener('dragstart', (e) => {
        payload = kind;
        e.dataTransfer?.setData('text/plain', kind);
      });
      stage.bar.append(chip);
    }
  } else {
    // a card cannot start a real drag: send the DOM drag events the canvas listens to
    const ghost = stage.ghost(canvas);
    const upper = canvas.upperCanvasEl;
    const send = (type: string, p: Point): void => {
      const v = p.transform(canvas.viewportTransform);
      const r = upper.getBoundingClientRect();
      upper.dispatchEvent(new DragEvent(type, { clientX: r.left + (v.x * r.width) / canvas.width, clientY: r.top + (v.y * r.height) / canvas.height, bubbles: true, cancelable: true }));
    };
    stage.repeat(async () => {
      for (const [kind, to] of [['circle', new Point(90, 130)], ['square', new Point(270, 80)], ['circle', new Point(170, 170)]] as const) {
        payload = kind;
        await ghost.move(new Point(30, 30), 300);
        send('dragenter', new Point(30, 30));
        for (let i = 1; i <= 4; i++) {
          const p = new Point(30 + ((to.x - 30) * i) / 4, 30 + ((to.y - 30) * i) / 4);
          await ghost.move(p, 150);
          send('dragover', p);
        }
        send('drop', to);
        await stage.wait(500);
      }
      canvas.remove(...canvas.getObjects().slice(1));
      target.set('fill', '#d8d3c4');
    }, 400);
  }

  return stage.dispose;
};

export default mount;
