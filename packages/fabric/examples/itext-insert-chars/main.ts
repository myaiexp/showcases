// insertChars and removeChars edit an IText from code, with styles kept in step
import { Canvas, IText } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { BLUE, hideSelection, INK, RED, showSelection, textField } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Both calls take grapheme positions. insertChars(text, style, start, end) replaces start to end; removeChars(start, end) deletes.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new IText('Hello Fabric', { left: 180, top: 120, fontFamily: 'Lora', fontSize: 44, fill: INK, textAlign: 'center' });
  canvas.add(text);

  const say = status(stage);
  const report = (): void => {
    say(`${JSON.stringify(text.text)} · ${text.text.length} chars`);
    canvas.requestRenderAll();
  };
  report();

  if (stage.bar) {
    const bar = stage.bar;
    let pos = 5;
    let word = ', dear';
    slider(bar, 'position', 0, 24, 1, pos, (v) => (pos = v));
    textField(bar, 'chars', word, (v) => (word = v), 90);
    button(bar, 'insertChars', () => {
      const at = Math.min(pos, text.text.length);
      // The style array has one entry per inserted character: here every new char is red.
      text.insertChars(word, [...word].map(() => ({ fill: RED })), at);
      report();
    });
    button(bar, 'removeChars(pos, pos + 3)', () => {
      const at = Math.min(pos, text.text.length);
      text.removeChars(at, Math.min(at + 3, text.text.length));
      report();
    });
    button(bar, 'reset', () => {
      text.styles = {};
      text.set('text', 'Hello Fabric');
      report();
    });
  } else {
    // A type-on effect: the caret is drawn without entering editing.
    stage.onDispose(() => hideSelection(text));
    const phrase = 'Typing with insertChars';
    stage.repeat(async () => {
      text.styles = {};
      text.set('text', '');
      for (let i = 0; i < phrase.length && !stage.disposed; i++) {
        text.insertChars(phrase[i]!, i > 6 ? [{ fill: BLUE }] : undefined, i);
        showSelection(text, i + 1, i + 1);
        report();
        await stage.wait(90);
      }
      await stage.wait(900);
      for (let i = phrase.length; i > 7 && !stage.disposed; i--) {
        text.removeChars(i - 1, i);
        showSelection(text, i - 1, i - 1);
        report();
        await stage.wait(50);
      }
      await stage.wait(500);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
