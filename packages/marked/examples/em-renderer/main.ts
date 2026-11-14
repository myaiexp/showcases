// renderer.em turns *italic* words into glossary terms with a tooltip
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const GLOSSARY: Record<string, string> = {
  roux: 'Flour cooked in butter, used to thicken sauces.',
  béchamel: 'A white sauce made from a roux and milk.',
  simmer: 'Cook just below boiling point.',
};

const TEXT = `To make a *béchamel*, start with a *roux*: melt butter, stir in flour.

Add milk slowly and *simmer* for ten minutes. Stir *constantly*.`;

const CARD = `Start a *roux* in
butter, then *simmer*
the sauce. Stir *often*.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Italic a word from the glossary: roux, béchamel or simmer' });

  const terms = new Marked({
    renderer: {
      em({ tokens, text }) {
        const meaning = GLOSSARY[text.toLowerCase()];
        // Italics that are not glossary words stay ordinary emphasis.
        if (!meaning) return false;
        return `<dfn class="term" title="${esc(meaning)}">${this.parser.parseInline(tokens)}</dfn>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : TEXT }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'em override', render: (md) => render(terms, md) },
    ],
    caption:
      'Italic words that are in a small glossary become dotted-underline terms (hover one for its meaning). Other italics, like "constantly", stay italic.',
  });

  return () => stage.dispose();
};

export default mount;
