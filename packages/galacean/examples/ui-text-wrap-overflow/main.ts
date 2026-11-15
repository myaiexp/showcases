// UI Text enableWrapping and overflowMode in the UITransform box
import { OverflowMode, TextHorizontalAlignment, TextVerticalAlignment } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { image, label, rect, uiScene } from '../../shared/ui-kit.ts';

const LOREM = 'A UI Text wraps its words to the width of its UITransform when enableWrapping is on, and may spill past the height.';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const back = image(canvasEntity, 0, 0, 360, 200, { color: [0.25, 0.3, 0.42, 1] }, 'box');
  const { text, entity } = label(canvasEntity, 0, 0, LOREM, 26);
  text.enableWrapping = true;
  text.horizontalAlignment = TextHorizontalAlignment.Left;
  text.verticalAlignment = TextVerticalAlignment.Top;
  const size = (w: number, h: number): void => {
    rect(entity).size.set(w, h);
    rect(back.entity).size.set(w, h);
    say(`enableWrapping = ${text.enableWrapping}, ${w.toFixed(0)} x ${h.toFixed(0)}, ${OverflowMode[text.overflowMode]}`);
  };
  if (stage.preview) tick(canvasEntity, (_dt, t) => size(300 + 140 * Math.sin(t * 0.9), 150 + 70 * Math.sin(t * 0.6)));
  else {
    slider(stage.bar, 'width', 120, 640, 1, 360, (v) => size(v, rect(entity).size.y));
    slider(stage.bar, 'height', 60, 300, 1, 200, (v) => size(rect(entity).size.x, v));
    checkbox(stage.bar, 'enableWrapping', true, (v) => ((text.enableWrapping = v), size(rect(entity).size.x, rect(entity).size.y)));
    select(stage.bar, 'overflowMode', ['Overflow', 'Truncate'] as const, (v) => ((text.overflowMode = OverflowMode[v]), size(rect(entity).size.x, rect(entity).size.y)));
    size(360, 200);
  }
  return stage.dispose;
};

export default mount;
