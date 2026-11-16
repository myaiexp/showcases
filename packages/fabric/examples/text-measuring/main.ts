// Measuring: every character gets a box in __charBounds, and the lines a width
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, cycle, INK, RED } from '../../shared/text.ts';

const SAMPLES = ['AVATAR Wavy', 'Fabric\nmeasures\nevery glyph', 'ffi fi fl'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "Red boxes are text.__charBounds (left, width, kernedWidth per grapheme); the blue rule is each line's width. Kerning pairs such as 'AV' make a glyph narrower than it measures alone.",
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText(SAMPLES[0], { left: 180, top: 120, fontFamily: 'Lora', fontSize: 44, fill: INK, selectable: false, evented: false });
  canvas.add(text);

  // Draw the measurements over the finished frame, in the text's own coordinate space.
  canvas.on('after:render', ({ ctx: g }) => {
    g.save();
    g.transform(...canvas.viewportTransform);
    g.transform(...text.calcTransformMatrix());
    let y = -text.height / 2;
    text.textLines.forEach((_line, row) => {
      const bounds = text.__charBounds[row] ?? [];
      const lineH = text.getHeightOfLine(row);
      const x0 = -text.width / 2 + text._getLineLeftOffset(row);
      g.strokeStyle = RED;
      g.lineWidth = 1;
      for (const b of bounds) g.strokeRect(x0 + b.left, y, b.kernedWidth || 0.5, lineH);
      g.fillStyle = BLUE;
      g.fillRect(x0, y + lineH - 2, text.getLineWidth(row), 2);
      y += lineH;
    });
    g.restore();
  });

  const say = status(stage);
  const report = (): void => {
    const widths = text.textLines.map((_l, i) => text.getLineWidth(i).toFixed(0)).join(', ');
    say(`width ${text.width.toFixed(0)} · lines [${widths}]`);
    canvas.requestRenderAll();
  };
  const use = (s: string): void => {
    text.set('text', s);
    report();
  };
  report();

  if (stage.bar) {
    select(stage.bar, 'sample', SAMPLES.map((s) => s.replace(/\n/g, ' / ')), (v) => use(v.replace(/ \/ /g, '\n')));
    slider(stage.bar, 'fontSize', 20, 70, 1, 44, (v) => (text.set('fontSize', v), report()));
    slider(stage.bar, 'charSpacing', -100, 400, 5, 0, (v) => (text.set('charSpacing', v), report()));
  } else {
    cycle(stage, SAMPLES, 1800, use);
  }
  return stage.dispose;
};

export default mount;
