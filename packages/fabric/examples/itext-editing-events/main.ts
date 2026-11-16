// IText editing events: text:changed, editing:entered/exited, selection:changed
import { Canvas, IText } from 'fabric';
import type { Mount } from '@/types.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { GREEN, INK, RED } from '../../shared/text.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 200],
    height: 300,
    hint: 'Double click the text to edit it (it is built in), type, move the caret with the arrows or drag to select, then click outside.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el));

  const text = new IText('Double click to edit', { left: 180, top: 100, fontFamily: 'Kalam', fontSize: 32, fill: INK, fontWeight: 700 });
  canvas.add(text);

  const say = status(stage, 'idle');
  const counts = { entered: 0, exited: 0, selection: 0, changed: 0 };
  let log: HTMLDivElement | null = null;
  if (stage.bar) {
    log = document.createElement('div');
    log.style.cssText =
      'width:100%;max-width:560px;height:120px;overflow:auto;font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);background:rgba(127,127,127,0.1);border-radius:6px;padding:6px 10px;box-sizing:border-box';
    stage.box.append(log);
  }
  const note = (line: string, color: string): void => {
    say(`entered ${counts.entered} · exited ${counts.exited} · selection ${counts.selection} · changed ${counts.changed}`);
    if (!log) return;
    const row = document.createElement('div');
    row.style.color = color;
    row.textContent = line;
    log.prepend(row);
    while (log.childElementCount > 40) log.lastElementChild?.remove();
  };

  // Object-level events fire on the IText; the canvas repeats them with a 'text:' prefix and a target.
  text.on('editing:entered', () => note(`editing:entered`, GREEN));
  text.on('editing:exited', () => note(`editing:exited  text is now ${JSON.stringify(text.text)}`, RED));
  text.on('selection:changed', () => {
    counts.selection++;
    note(`selection:changed  ${text.selectionStart}–${text.selectionEnd}`, 'var(--fg-3)');
  });
  canvas.on('text:changed', (e) => {
    counts.changed++;
    note(`text:changed  ${JSON.stringify(e.target.text)}`, '#3b7dd8');
  });
  text.on('editing:entered', () => counts.entered++);
  text.on('editing:exited', () => counts.exited++);

  if (stage.preview) {
    // No editing in a card: moving the selection through the API fires the same selection:changed event.
    const cap = 'Double click to edit';
    stage.repeat(async () => {
      for (let i = 0; i <= cap.length && !stage.disposed; i += 2) {
        text.setSelectionStart(0);
        text.setSelectionEnd(i);
        await stage.wait(150);
      }
      counts.selection = 0;
    }, 500);
  }
  return stage.dispose;
};

export default mount;
