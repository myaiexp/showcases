// marked.lexer() then marked.parser(): edit the token list in between
import { marked, type Token, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { select } from '../../shared/controls.ts';
import { tokenTree } from '../../shared/token-tree.ts';

const TEXT = `# Packing

Tent and **torch**.

- Stove
- Fuel

> Check the weather.`;

const CARD = `# Packing

Tent and **torch**.

- Stove`;

/** Each edit changes the token list; the parser then renders whatever it is given. */
const EDITS: Record<string, (tokens: Token[]) => Token[]> = {
  'No edit': (tokens) => tokens,
  'Reverse the blocks': (tokens) => tokens.filter((t) => t.type !== 'space').reverse(),
  'Drop the headings': (tokens) => tokens.filter((t) => t.type !== 'heading'),
  'Shout the headings': (tokens) => {
    for (const t of tokens) {
      if (t.type !== 'heading') continue;
      const h = t as Tokens.Heading;
      h.text = h.text.toUpperCase();
      for (const inner of h.tokens) if (inner.type === 'text') inner.text = inner.text.toUpperCase();
    }
    return tokens;
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an edit: it happens between the lexer and the parser' });
  let edit = 'No edit';

  const src = sourcePane(stage, stage.preview ? '' : TEXT);
  const tree = tokenTree(stage, 'Tokens after the edit');
  const doc = docPane(stage, 'marked.parser(tokens)');
  const label = document.createElement('div');
  label.className = 'mk-note';

  const draw = (md: string): void => {
    const tokens = marked.lexer(md); // 1. text to tokens
    const edited = EDITS[edit]!(tokens); // 2. any change you like
    tree.show(edited, { hideSpace: true });
    doc.show(marked.parser(edited)); // 3. tokens to HTML
    label.textContent = `edit: ${edit}`;
  };

  if (stage.preview) {
    src.set(CARD);
    row(stage.root, tree.el, doc.el);
    stage.root.append(label);
    let i = 0;
    const names = Object.keys(EDITS);
    const step = (): void => {
      edit = names[i++ % names.length]!;
      draw(CARD);
    };
    step();
    stage.every(2200, step);
  } else {
    row(stage.root, src.el, tree.el, doc.el);
    src.onInput(draw);
    select(stage.bar!, 'Edit', Object.keys(EDITS), (v) => {
      edit = v;
      draw(src.value());
    });
    note(stage.root, 'The same text is lexed each time. The edit reorders, removes or rewrites tokens, and the parser draws the changed list: no walkTokens or renderer involved.');
    draw(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
