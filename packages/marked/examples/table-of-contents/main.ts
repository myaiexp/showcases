// walkTokens collects every heading into a clickable contents list
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, slugify } from '../../shared/renderer-kit.ts';

const GUIDE = `# Sourdough for beginners

## Ingredients
Flour, water, salt, starter.

## Method
### Mixing
Stir until shaggy.
### Folding
Fold every 30 minutes.

## Baking
240 degrees, 40 minutes.`;

const CARD = `# Sourdough
## Ingredients
Flour and water.
## Method
### Mixing
Stir it.
## Baking`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add a heading and the contents list grows; click an entry to jump' });

  let headings: { depth: number; text: string; id: string }[] = [];
  const m = new Marked({
    walkTokens(token) {
      // Runs for every token, in document order; keep only the headings.
      if (token.type === 'heading') {
        headings.push({ depth: token.depth, text: token.text, id: slugify(token.text) });
      }
    },
    renderer: {
      heading({ tokens, depth, text }) {
        return `<h${depth} id="${slugify(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : GUIDE }],
    output: 'Contents + page',
    caption:
      'The contents box was not typed: walkTokens saw every heading go by, and its depth indents each entry. The ids come from a heading renderer, so the entries jump to the right place.',
    render(md) {
      headings = [];
      const body = m.parse(md, { async: false });
      const first = Math.min(...headings.map((h) => h.depth), 6);
      const toc = headings
        .map((h) => `<div style="margin-left:${(h.depth - first) * 14}px"><a href="#${esc(h.id)}">${esc(h.text)}</a></div>`)
        .join('');
      return headings.length ? `<nav style="border:1px solid var(--border);border-radius:6px;padding:.3em .7em;margin-bottom:.6em"><strong>Contents</strong>${toc}</nav>${body}` : body;
    },
  });

  return () => stage.dispose();
};

export default mount;
