// Compile errors: compile rejects with every error and its line and column
import type { Mount } from '@/types.ts';
import { d2Errors } from '../../shared/errors.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// Each source holds a mistake on purpose. "(deliberate error)" marks them for the tests.
const BROKEN = [
  { label: 'An unfinished connection and an unclosed map', code: '# (deliberate error)\nx -> {\n' },
  { label: 'An unknown shape', code: '# (deliberate error)\nx.shape: blob' },
  { label: 'A reserved keyword at a connection end', code: '# (deliberate error)\na -- shape' },
  { label: 'A spread import outside a map', code: '# (deliberate error)\na: ...@x' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();

  const run = async (code: string, label: string): Promise<void> => {
    try {
      const result = await d2.compile(code, { themeID: 200, pad: 24 });
      stage.show(await d2.render(result.diagram, result.renderOptions));
      stage.say('Compiled without errors', 'ok');
    } catch (err) {
      // The rejection's message is the compiler's error list as JSON; d2Errors reads it.
      const errors = d2Errors(err);
      const list = document.createElement('ol');
      list.className = 'errors';
      for (const e of errors) {
        const li = document.createElement('li');
        li.textContent = e;
        list.append(li);
      }
      stage.box.replaceChildren(list);
      stage.say(`${label}: ${errors.length} error${errors.length === 1 ? '' : 's'}`, 'bad');
    }
  };

  if (stage.preview) {
    let i = 0;
    await run(BROKEN[0]!.code, BROKEN[0]!.label);
    stage.every(3000, () => {
      const b = BROKEN[(i = (i + 1) % BROKEN.length)]!;
      void run(b.code, b.label);
    });
  } else {
    const panel = stage.side('D2 source (edit me)');
    const editor = document.createElement('textarea');
    editor.className = 'dd-editor';
    editor.setAttribute('aria-label', 'D2 source');
    panel?.append(editor);
    const pick = (i: number): void => {
      editor.value = BROKEN[i]!.code;
      void run(editor.value, BROKEN[i]!.label);
    };
    stage.select('Mistake', BROKEN.map((b, i) => [String(i), b.label] as [string, string]), '0', (v) => pick(Number(v)));
    let typing = 0;
    editor.addEventListener('input', () => {
      clearTimeout(typing);
      typing = window.setTimeout(() => void run(editor.value, 'Your source'), 350);
    });
    stage.onDispose(() => clearTimeout(typing));
    pick(0);
  }
  return () => stage.dispose();
};

export default mount;
