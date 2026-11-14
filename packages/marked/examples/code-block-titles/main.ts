// tokenizer.fences keeps a title="..."; renderer.code shows it
import { Marked, Tokenizer, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const README = `Start the shop server:

\`\`\`sh title="start.sh"
npm install
npm start
\`\`\`

Then edit the greeting:

\`\`\`js title="src/hello.js"
const name = 'Anna';
console.log('Hi ' + name);
\`\`\`

A block without a title looks as before:

\`\`\`
plain block
\`\`\``;

const CARD = `\`\`\`
untitled
\`\`\`

\`\`\`sh title="start.sh"
npm install
npm start
\`\`\``;

type TitledCode = Tokens.Code & { title?: string };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the title="..." after the language on the opening fence' });

  const titled = new Marked({
    tokenizer: {
      fences(src) {
        // The built-in tokenizer does the work; we only move `title="..."` out of the info string.
        const token = Tokenizer.prototype.fences.call(this, src) as TitledCode | undefined;
        const info = /^(\S*)\s+title=(?:"([^"]*)"|'([^']*)')\s*$/.exec(token?.lang ?? '');
        if (token && info) {
          token.lang = info[1];
          token.title = info[2] ?? info[3];
        }
        return token;
      },
    },
    renderer: {
      code(token) {
        const { text, lang, title } = token as TitledCode;
        if (!title) return false;
        const cls = lang ? ` class="language-${esc(lang)}"` : '';
        return `<figure class="file"><figcaption>${esc(title)}</figcaption><pre><code${cls}>${esc(text)}\n</code></pre></figure>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : README }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'fences + code', render: (md) => render(titled, md) },
    ],
    caption:
      'The default drops everything after the language name, so the file name is lost. The tokenizer adds a title to the code token and a small renderer override prints it as a tab above the block.',
  });

  return () => stage.dispose();
};

export default mount;
