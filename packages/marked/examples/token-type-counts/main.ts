// marked.walkTokens over lexer output: a bar chart of token types
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { typeHue } from '../../shared/token-tree.ts';
import { typeLoop } from '../../shared/typing.ts';
import './style.css';

const RECIPE = `# Pancakes

Mix **flour**, *milk* and 2 eggs.

1. Whisk the batter
2. Rest it for [10 minutes](#rest)
3. Fry in butter

> Tip: the first one is always a test.

| Topping | Price |
| --- | --- |
| Jam | 1 |
| Berries | 3 |

\`\`\`
pan: medium heat
\`\`\``;

const CARD = `# Pancakes
Mix **flour** and
*milk*.

- Whisk
- Rest
- Fry`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type Markdown and watch the bars grow' });

  const src = sourcePane(stage, stage.preview ? '' : RECIPE);
  const chart = docPane(stage, 'Tokens by type');
  chart.body.classList.add('counts');
  row(stage.root, src.el, chart.el);
  if (!stage.preview) note(stage.root, 'The lexer made a token tree; marked.walkTokens visited every node of it, nested ones too, and a Map tallied the type of each. Space (blank line) tokens are left out.');

  const draw = (md: string): void => {
    const tally = new Map<string, number>();
    // Both are plain marked calls with no configuration, so the shared `marked` stays untouched.
    marked.walkTokens(marked.lexer(md), (token) => {
      if (token.type !== 'space') tally.set(token.type, (tally.get(token.type) ?? 0) + 1);
    });
    const rows = [...tally].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, stage.preview ? 6 : 14);
    const max = Math.max(1, ...rows.map((r) => r[1]));
    chart.body.replaceChildren(
      ...rows.map(([type, n]) => {
        const line = document.createElement('div');
        line.className = 'line';
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = type;
        const bar = document.createElement('span');
        bar.className = 'bar';
        bar.style.width = `${(n / max) * 100}%`;
        bar.style.background = `hsl(${typeHue(type)} 55% 50%)`;
        const count = document.createElement('span');
        count.className = 'n';
        count.textContent = String(n);
        const track = document.createElement('span');
        track.className = 'track';
        track.append(bar);
        line.append(name, track, count);
        return line;
      }),
    );
  };

  if (stage.preview) {
    typeLoop(stage, [{ text: CARD }], (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    draw(RECIPE);
  }

  return () => stage.dispose();
};

export default mount;
