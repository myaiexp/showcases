// Lexer.rules holds the block regexes; which one claims each block
import { Lexer, marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { note, row, sourcePane } from '../../shared/panes.ts';
import { typeHue } from '../../shared/token-tree.ts';
import { typeLoop } from '../../shared/typing.ts';

const TEXT = `# Trip notes

Pack light.

- Passport
- Charger

> Rain on Friday

\`\`\`
bus 7 at 8:15
\`\`\`

| day | bed |
|-----|-----|
| Fri | 4   |

---

<div>Done</div>`;

const CARDS = [
  { text: '# Trip\n\nPack light.\n\n- Passport\n- Charger\n\n> Rain\n\n---' },
];

/** The order Marked's block tokenizer tries the rules in (src/Lexer.ts blockTokens). */
const ORDER = ['newline', 'code', 'fences', 'heading', 'hr', 'blockquote', 'list', 'html', 'def', 'table', 'lheading', 'paragraph', 'text'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the text: each block names the rule that matched it' });
  const rules = Lexer.rules.block.gfm;

  const list = document.createElement('div');
  list.className = 'mk-pane';
  const body = document.createElement('div');
  body.className = 'mk-text';
  body.style.cssText = 'display:flex;flex-direction:column;gap:3px;white-space:normal';
  const label = document.createElement('div');
  label.className = 'mk-label';
  label.textContent = 'Lexer.rules.block.gfm: first rule that matches';
  list.append(label, body);

  const src = sourcePane(stage, stage.preview ? '' : TEXT);
  row(stage.root, src.el, list);
  const regex = document.createElement('div');
  regex.className = 'mk-readout';
  stage.root.append(regex);

  const draw = (md: string): void => {
    let rest = md.replace(/\r\n?/g, '\n');
    const rows: HTMLElement[] = [];
    for (const token of marked.lexer(md)) {
      // Try each rule on the text that is left, as the tokenizer does.
      const rule = ORDER.find((k) => rules[k].test(rest)) ?? 'text';
      rest = rest.slice(token.raw.length);
      if (token.type === 'space') continue;
      const line = document.createElement('div');
      line.style.cssText = 'display:flex;gap:6px;white-space:nowrap;overflow:hidden;cursor:default';
      const chip = document.createElement('span');
      chip.textContent = rule;
      chip.style.cssText = `min-width:${stage.preview ? 58 : 80}px;color:hsl(${typeHue(rule)} 70% 70%);font-weight:600`;
      const first = document.createElement('span');
      first.textContent = token.raw.split('\n')[0]!;
      first.style.cssText = 'color:var(--fg-2);overflow:hidden;text-overflow:ellipsis';
      line.append(chip, first);
      line.addEventListener('mouseenter', () => show(rule));
      rows.push(line);
    }
    body.replaceChildren(...rows);
    if (stage.preview) show('');
  };
  const show = (rule: string): void => {
    regex.textContent = rule ? `${rule}: ${(rules as Record<string, RegExp>)[rule]!.source.slice(0, stage.preview ? 40 : 160)}` : '';
  };

  if (stage.preview) {
    typeLoop(stage, CARDS, (text) => {
      src.set(text);
      draw(text);
    });
    let i = 0;
    stage.every(900, () => {
      const rows = body.children;
      if (!rows.length) return;
      const row = rows[i++ % rows.length] as HTMLElement;
      for (const r of rows) (r as HTMLElement).style.background = '';
      row.style.background = 'var(--bg-surface-2, #2a2f3a)';
      show(row.firstElementChild!.textContent ?? '');
    });
  } else {
    src.onInput(draw);
    note(stage.root, 'Hover a row to read the rule\'s regular expression. A line starting with # is claimed by heading, dashes by hr, and so on; plain words fall through to paragraph.');
    draw(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
