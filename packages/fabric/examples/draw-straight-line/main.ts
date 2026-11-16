// Free drawing: PencilBrush.straightLineKey turns a held modifier key into a straight line
import { Canvas, PencilBrush } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { wave } from '../../shared/scribble.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Key = 'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey' | 'none';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag with the chosen key held: the stroke becomes a straight line from where it started to the pointer. Release the key mid-stroke to go freehand again.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const brush = new PencilBrush(canvas);
  brush.color = '#2c3e50';
  brush.width = 5;
  canvas.freeDrawingBrush = brush;
  canvas.isDrawingMode = true;

  const show = (): void => say(`straightLineKey: ${String(brush.straightLineKey)} (default 'shiftKey')`);
  show();

  if (stage.bar) {
    select(
      stage.bar,
      'straightLineKey',
      ['shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'none'] as const,
      (v: Key) => {
        // null (or any string that is not a modifier) switches the feature off.
        brush.straightLineKey = v === 'none' ? null : v;
        show();
      },
      'shiftKey',
    );
    button(stage.bar, 'Clear', () => canvas.remove(...canvas.getObjects()));
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      // The ghost sends no modifier keys, so the card names an event flag that is always set
      // ('bubbles') to stand in for a held key. A real reader uses 'shiftKey'.
      brush.straightLineKey = null;
      say('no key: freehand');
      await ghost.stroke(wave(40, 320, 80, 24, 1.5), 900);
      brush.straightLineKey = 'bubbles' as unknown as 'shiftKey';
      say('key held: straight line');
      await ghost.stroke(wave(40, 320, 160, 24, 1.5), 900);
      await stage.wait(1000);
      canvas.remove(...canvas.getObjects());
    }, 300);
  }

  return stage.dispose;
};

export default mount;
