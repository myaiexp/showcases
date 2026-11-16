// IText selection API: selectionStart/End, selectAll, selectWord, selectLine
import { Canvas, IText } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { hideSelection, INK, showSelection } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'A selection is just selectionStart and selectionEnd on the IText, and it only draws while the text is being edited: the buttons enter editing first.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new IText('Select words,\nlines or ranges\nwith the API', { left: 180, top: 120, fontFamily: 'Lora', fontSize: 32, fill: INK, textAlign: 'center' });
  canvas.add(text);

  const say = status(stage);
  const report = (): void => {
    say(`selectionStart ${text.selectionStart} · selectionEnd ${text.selectionEnd} · ${JSON.stringify(text.getSelectedText())}`);
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    const bar = stage.bar;
    const edit = (): void => {
      canvas.setActiveObject(text);
      text.enterEditing();
    };
    button(bar, 'selectAll()', () => (edit(), text.selectAll(), report()));
    button(bar, 'selectWord(8)', () => (edit(), text.selectWord(8), report()));
    button(bar, 'selectLine(20)', () => (edit(), text.selectLine(20), report()));
    slider(bar, 'selectionStart', 0, text.text.length, 1, 0, (v) => (edit(), text.setSelectionStart(v), report()));
    slider(bar, 'selectionEnd', 0, text.text.length, 1, 0, (v) => (edit(), text.setSelectionEnd(v), report()));
    text.on('selection:changed', report);
    report();
  } else {
    // Walk the words by their boundaries: pure maths on the text, no editing needed.
    stage.onDispose(() => hideSelection(text));
    let at = 0;
    const next = (): void => {
      const start = text.findWordBoundaryRight(at) > at ? at : 0;
      let end = text.findWordBoundaryRight(start);
      if (end <= start) end = text.text.length;
      showSelection(text, start, end);
      say(`${start} → ${end} ${JSON.stringify(text.text.slice(start, end))}`);
      at = end >= text.text.length ? 0 : end + 1;
    };
    next();
    stage.every(900, next);
  }
  return stage.dispose;
};

export default mount;
