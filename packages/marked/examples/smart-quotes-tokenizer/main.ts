// tokenizer.inlineText: the built-in text token, then straight quotes turned curly
import { Marked, Tokenizer } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const LETTER = `"Don't wait," said Anna. 'It's *her* turn...'

She wrote "see you at 6" -- and \`"code"\` stays straight.`;

const CARD = `"Don't wait," she
said. It's her turn...

\`"code"\` stays`;

/** Opening or closing, decided from the characters around it (a text token is cut at * _ [ and so on). */
function curl(text: string): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    const prev = text[i - 1] ?? '';
    const next = text[i + 1] ?? '';
    if (ch !== '"' && ch !== "'") {
      out += ch;
      continue;
    }
    const afterOpener = prev === '' || /[\s([]/.test(prev);
    const opens = (afterOpener && next !== '' && !/[\s.,;:!?)\]]/.test(next)) || (next === '' && /\s/.test(prev));
    if (ch === '"') out += opens ? '“' : '”';
    else out += opens ? '‘' : '’'; // a lone ' in "It's" is an apostrophe: closing form
  }
  return out.replace(/\.\.\./g, '…').replace(/ -- /g, ' – ');
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type "straight quotes", it\'s, ... and -- between spaces' });

  const smart = new Marked({
    tokenizer: {
      inlineText(src) {
        // Let the built-in tokenizer cut the text, then polish what it found. Code spans never come here.
        const token = Tokenizer.prototype.inlineText.call(this, src);
        if (token && !token.escaped) token.text = curl(token.text);
        return token;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : LETTER }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'inlineText override', render: (md) => render(smart, md) },
    ],
    caption:
      'Straight quotes become curly ones, "..." becomes an ellipsis and a spaced "--" becomes a dash, just by polishing every plain-text token. The code span is a different token, so it is left alone.',
  });

  return () => stage.dispose();
};

export default mount;
