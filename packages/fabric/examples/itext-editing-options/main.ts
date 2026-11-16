// IText editing looks: cursorColor, cursorWidth, selectionColor, borders
import { Canvas, IText } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, color, slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { hideSelection, INK, showSelection } from '../../shared/text.ts';

const PALETTE = ['#e94b3c', '#2e9e5b', '#8a4fd6', '#d99a1c'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Edit the text (double click or the button), then change the options: the caret, the selection and the dashed border restyle live.' });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new IText('Style the caret\nand the selection', {
    left: 180,
    top: 120,
    fontFamily: 'Inter',
    fontSize: 34,
    fontWeight: 600,
    fill: INK,
    textAlign: 'center',
    cursorColor: '#e94b3c',
    cursorWidth: 4,
    selectionColor: 'rgba(233,75,60,0.3)',
    editingBorderColor: '#e94b3c',
  });
  canvas.add(text);

  const say = status(stage);
  const apply = (): void => {
    say(`cursor ${text.cursorColor} · ${text.cursorWidth}px`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    const bar = stage.bar;
    button(bar, 'Edit and select a word', () => {
      canvas.setActiveObject(text);
      text.enterEditing();
      text.selectWord(3);
      apply();
    });
    color(bar, 'cursorColor', '#e94b3c', (v) => ((text.cursorColor = v), apply()));
    slider(bar, 'cursorWidth', 1, 12, 1, 4, (v) => ((text.cursorWidth = v), apply()));
    color(bar, 'selectionColor', '#e94b3c', (v) => ((text.selectionColor = `${v}55`), apply()));
    color(bar, 'editingBorderColor', '#e94b3c', (v) => ((text.editingBorderColor = v), apply()));
  } else {
    stage.onDispose(() => hideSelection(text));
    let i = 0;
    stage.every(1100, () => {
      const c = PALETTE[i++ % PALETTE.length]!;
      text.set({ cursorColor: c, selectionColor: `${c}55`, cursorWidth: 2 + (i % 3) * 3 });
      // Alternate a caret and a range, drawn without entering editing.
      if (i % 2) showSelection(text, 6, 6);
      else showSelection(text, 4, 15);
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
