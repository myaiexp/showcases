// A token's raw is the exact source slice it consumed; text is its content
import { marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { typeHue } from '../../shared/token-tree.ts';

const TEXT = `# Pasta night

Boil **500 g** of pasta.

- Stir the sauce
- Skip the cheese

> Eat while hot`;

const CARD = '# Pasta\n\nBoil **500 g**.\n\n- Stir\n- Skip\n\n> Eat hot';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a token to see the part of the text it consumed' });
  let text = stage.preview ? CARD : TEXT;
  let blocks: { token: Token; from: number }[] = [];
  let current = 0;

  const src = sourcePane(stage, stage.preview ? '' : TEXT, 'Markdown (edit me)');
  // A read-only copy of the source with the chosen token's raw slice marked.
  const view = document.createElement('pre');
  view.className = 'mk-text';
  const viewBox = document.createElement('div');
  viewBox.className = 'mk-pane';
  const viewLabel = document.createElement('div');
  viewLabel.className = 'mk-label';
  viewLabel.textContent = 'The chosen token\'s raw';
  viewBox.append(viewLabel, view);
  const rawPane = textPane(stage, 'raw');
  const textOnly = textPane(stage, 'text');
  const chips = document.createElement('div');
  chips.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px';

  const choose = (i: number): void => {
    current = i;
    const b = blocks[i];
    if (!b) {
      // Nothing typed: clear the panes rather than leave the last token's slice on screen.
      view.replaceChildren(text);
      rawPane.show('');
      textOnly.show('');
      return;
    }
    const raw = b.token.raw;
    view.replaceChildren(text.slice(0, b.from));
    const mark = document.createElement('span');
    mark.textContent = raw;
    mark.style.cssText = `background:hsl(${typeHue(b.token.type)} 55% 35%);color:var(--fg-1);border-radius:2px`;
    view.append(mark, text.slice(b.from + raw.length));
    rawPane.show(JSON.stringify(raw).slice(1, -1));
    const words = (b.token as { text?: unknown }).text;
    textOnly.show(typeof words === 'string' ? words : '(this token has no text field)');
    [...chips.children].forEach((c, k) => ((c as HTMLElement).style.outline = k === i ? '2px solid var(--accent)' : 'none'));
  };

  const draw = (md: string): void => {
    text = md.replace(/\r\n?/g, '\n');
    let at = 0;
    blocks = [];
    for (const token of marked.lexer(md)) {
      if (token.type !== 'space') blocks.push({ token, from: at });
      at += token.raw.length;
    }
    chips.replaceChildren(
      ...blocks.map((b, i) => {
        const c = document.createElement('button');
        c.type = 'button';
        c.textContent = b.token.type;
        c.style.cssText = `border:0;border-radius:99px;padding:1px 9px;font:12px ui-monospace,monospace;color:var(--fg-1);background:hsl(${typeHue(b.token.type)} 45% 30%);cursor:pointer`;
        c.addEventListener('click', () => choose(i));
        return c;
      }),
    );
    choose(Math.min(current, blocks.length - 1));
  };

  if (stage.preview) {
    row(stage.root, viewBox, row(stage.root, rawPane.el, textOnly.el));
    draw(CARD);
    stage.every(1400, () => choose((current + 1) % blocks.length));
  } else {
    stage.root.append(src.el);
    row(stage.root, viewBox, row(stage.root, rawPane.el, textOnly.el));
    stage.root.append(chips);
    src.onInput((t) => {
      draw(t);
    });
    note(stage.root, 'raw is the exact slice of the text the token consumed, markers and blank lines included; the tokens\' raw slices laid end to end rebuild the whole source. text is the content of the token itself: a heading loses its #, but a paragraph keeps inline markers such as **, which are parsed into its child tokens.');
    draw(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
