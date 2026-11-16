// A Textbox never gets narrower than minWidth or its longest word
import { Canvas, Textbox } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Ask for a width below the limit and the box refuses: the larger of minWidth and the longest unbreakable word wins.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const box = new Textbox('Tiny extraordinary widths', {
    left: 180,
    top: 120,
    width: 260,
    minWidth: 20,
    fontFamily: 'Kalam',
    fontSize: 30,
    fill: INK,
    backgroundColor: 'rgba(233,75,60,0.12)',
  });
  canvas.add(box);

  const say = status(stage);
  const apply = (asked: number, min: number): void => {
    box.set({ minWidth: min, width: asked });
    box.setCoords();
    say(`asked ${asked.toFixed(0)} → got ${box.width.toFixed(0)} · min ${min}, word ${box.dynamicMinWidth.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply(260, 20);

  if (stage.bar) {
    let asked = 260;
    let min = 20;
    slider(stage.bar, 'asked width', 10, 340, 1, 260, (v) => apply((asked = v), min));
    slider(stage.bar, 'minWidth', 20, 240, 1, 20, (v) => apply(asked, (min = v)));
  } else {
    stage.loop((_dt, t) => apply(150 + 140 * Math.sin(t * 1.2), 20));
  }
  return stage.dispose;
};

export default mount;
