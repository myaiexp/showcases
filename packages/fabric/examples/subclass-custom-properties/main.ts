// Subclassing: static customProperties are written by toObject without a list
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

class Task extends Rect {
  declare owner: string;
  declare done: boolean;
  static override type = 'ShowcaseTask';
  // Every Task's toObject() copies these properties, as if each call passed the list.
  static override customProperties = ['owner', 'done'];
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'toObject, clone'],
    scene: [160, 200],
    hint: 'Task lists owner and done in customProperties. A plain Rect with the same properties assigned saves neither, and neither does its clone.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.includeDefaultValues = false;

  const look = { left: 80, width: 110, height: 40, stroke: '#2b2a33', strokeWidth: 2 };
  const task = Object.assign(new Task({ ...look, top: 55, fill: '#b9e3b0' }), { owner: 'mara', done: false });
  const plain = Object.assign(new Rect({ ...look, top: 145, fill: '#ffd0c7' }), { owner: 'mara', done: false });
  canvas.add(task, plain);

  let token = 0;
  const refresh = async (): Promise<void> => {
    const mine = ++token;
    const copy = await task.clone(); // clone() is toObject() then fromObject(): the properties ride along
    const copyOfPlain = await plain.clone();
    if (mine !== token || stage.disposed) return;
    const pick = (o: object) => {
      const { type, owner, done } = o as Record<string, unknown>;
      return { type, owner, done };
    };
    show(
      `Task.toObject()\n${pretty(pick(task.toObject()), stage.preview)}\nTask clone: owner ${copy.owner}\n\nRect.toObject()\n${pretty(pick(plain.toObject()), stage.preview)}\nRect clone: owner ${(copyOfPlain as Task).owner}`,
    );
    say(`done: ${task.done}`);
  };
  void refresh();

  stage.every(1500, () => {
    task.done = !task.done;
    plain.done = task.done;
    task.set('fill', task.done ? '#6fc26a' : '#b9e3b0');
    canvas.requestRenderAll();
    void refresh();
  });

  return stage.dispose;
};

export default mount;
