// One ==highlight== extension with and without start()
import { Marked, type TokenizerAndRendererExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `==Passport== first, then bring ==cash==
and the ==tickets== too.

Remember: ==water== and ==snacks== please!`;

const CARD = `==Passport== first,
then bring ==cash==
and ==tickets== too.`;

const base: TokenizerAndRendererExtension = {
  name: 'highlight',
  level: 'inline',
  tokenizer(src) {
    const match = /^==([^=\n]+)==/.exec(src);
    return match ? { type: 'highlight', raw: match[0], tokens: this.lexer.inlineTokens(match[1]!) } : undefined;
  },
  renderer(token) {
    return `<mark>${this.parser.parseInline(token.tokens ?? [])}</mark>`;
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare where ==marks== are found' });

  // Identical tokenizer and renderer; the only difference is the start() hint.
  const without = new Marked({ extensions: [base] });
  const withStart = new Marked({ extensions: [{ ...base, start: (src: string) => src.indexOf('==') }] });

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    sides: [
      { label: 'no start()', render: (md) => render(without, md) },
      { label: 'with start()', render: (md) => render(withStart, md) },
    ],
    caption:
      'Marked tries an inline extension only where it is looking: the start of a paragraph, or just after text it stopped at. Plain text swallows everything up to the next special character, so without start() only the ==mark== at the very start is found. start() tells Marked where to stop.',
  });

  return () => stage.dispose();
};

export default mount;
