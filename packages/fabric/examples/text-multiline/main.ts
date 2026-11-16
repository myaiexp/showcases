// Text: newlines in the string make lines; textLines lists them and height follows
import { Canvas, FabricText } from 'fabric';
import type { Mount } from '@/types.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { INK } from '../../shared/text.ts';

const LINES = ['this is', 'a multiline', 'text', 'with several', 'lines of', 'different length'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Canvas fillText ignores \\n; FabricText splits on it. Type in the box (Enter makes a new line).' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new FabricText(LINES.slice(0, 2).join('\n'), { left: 180, top: 120, fontFamily: 'Kalam', fontSize: 28, fill: INK, textAlign: 'center', backgroundColor: 'rgba(46,158,91,0.12)' });
  canvas.add(text);

  const say = status(stage);
  const show = (): void => {
    say(`${text.textLines.length} lines · ${text.width.toFixed(0)} × ${text.height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  show();

  if (stage.bar) {
    const area = document.createElement('textarea');
    area.value = text.text;
    area.rows = 4;
    area.style.cssText = 'font:14px ui-monospace,monospace;padding:4px 8px;width:260px';
    area.addEventListener('input', () => {
      text.set('text', area.value);
      show();
    });
    stage.bar.append(area);
  } else {
    let n = 2;
    stage.every(900, () => {
      n = n >= LINES.length ? 1 : n + 1;
      text.set('text', LINES.slice(0, n).join('\n'));
      show();
    });
  }
  return stage.dispose;
};

export default mount;
