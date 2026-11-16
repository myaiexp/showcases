// Text: setSelectionStyles styles a character range and getSelectionStyles reads it back
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, GREEN, INK, RED } from '../../shared/text.ts';

const TEXT = 'Style any range\nof characters';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'start and end are character indexes into the whole string (newlines count). The styles object is edited in place; getSelectionStyles returns what is stored for each character.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText(TEXT, { left: 180, top: 120, fontFamily: 'Lora', fontSize: 36, fill: INK, textAlign: 'center' });
  canvas.add(text);

  let start = 6;
  let end = 9;
  // Mark the range on top of the finished frame, in the text's own coordinates.
  canvas.on('after:render', ({ ctx: g }) => {
    g.save();
    g.transform(...canvas.viewportTransform);
    g.transform(...text.calcTransformMatrix());
    g.fillStyle = 'rgba(59,125,216,0.22)';
    g.strokeStyle = BLUE;
    for (let i = start; i < end; i++) {
      const { lineIndex, charIndex } = text.get2DCursorLocation(i);
      const b = text.__charBounds[lineIndex]?.[charIndex];
      if (!b) continue;
      let y = -text.height / 2;
      for (let l = 0; l < lineIndex; l++) y += text.getHeightOfLine(l);
      const x = -text.width / 2 + text._getLineLeftOffset(lineIndex) + b.left;
      g.fillRect(x, y, b.kernedWidth, text.getHeightOfLine(lineIndex));
    }
    g.restore();
  });
  const say = status(stage);
  const report = (): void => {
    const got = text.getSelectionStyles(start, end);
    say(`[${start}, ${end}) ${JSON.stringify(TEXT.slice(start, end))} → ${JSON.stringify(got[0] ?? {})}`);
    canvas.requestRenderAll();
  };
  const style = (s: object): void => {
    text.setSelectionStyles(s, start, end);
    report();
  };
  report();

  if (stage.bar) {
    const bar = stage.bar;
    slider(bar, 'start', 0, TEXT.length, 1, start, (v) => ((start = Math.min(v, end)), report()));
    slider(bar, 'end', 0, TEXT.length, 1, end, (v) => ((end = Math.max(v, start)), report()));
    button(bar, 'red', () => style({ fill: RED }));
    button(bar, 'bold', () => style({ fontWeight: 'bold' }));
    button(bar, 'bigger', () => style({ fontSize: 52 }));
    button(bar, 'underline', () => style({ underline: true }));
    button(bar, 'highlight', () => style({ textBackgroundColor: '#ffe27a' }));
    button(bar, 'clear all', () => {
      text.styles = {};
      text.set('dirty', true);
      text.initDimensions();
      report();
    });
  } else {
    const steps: object[] = [{ fill: RED }, { fontWeight: 'bold', fill: BLUE }, { fontSize: 50 }, { textBackgroundColor: '#ffe27a' }, { underline: true, fill: GREEN }];
    let n = 0;
    stage.every(900, () => {
      if (n % steps.length === 0) {
        text.styles = {};
        text.initDimensions();
      }
      start = [0, 6, 16, 22, 10][n % 5]!;
      end = start + [5, 3, 6, 7, 5][n % 5]!;
      style(steps[n % steps.length]!);
      n++;
    });
  }
  return stage.dispose;
};

export default mount;
