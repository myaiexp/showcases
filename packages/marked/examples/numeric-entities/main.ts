// The docs' numericEntity extension: lexer tokens with and without it
import { Marked, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { row, sourcePane, textPane, note } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';

const SAMPLE = 'Press &#27;[2J to clear, or &#x1b;[2J in hex.\nA smiley: &#128512; and a plain &amp; too.';
const CARD = 'before &#27;[2J\nand &#x1b;[2J after';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a reference such as &#65; or &#x1b;' });

  const plain = new Marked();
  // From the docs (Using advanced, numeric character references).
  const literal = new Marked({
    extensions: [
      {
        name: 'numericEntity',
        level: 'inline',
        start: (src) => src.indexOf('&#'),
        tokenizer(src) {
          const match = /^&#(?:\d{1,7}|[xX][a-fA-F0-9]{1,6});/.exec(src);
          return match ? { type: 'numericEntity', raw: match[0], text: match[0] } : undefined;
        },
        renderer: (token) => String(token.text),
      },
    ],
  });

  const src = sourcePane(stage, stage.preview ? '' : SAMPLE);
  stage.root.append(src.el);
  src.el.classList.add('mk-pane-src-top');
  const a = textPane(stage, 'default: text tokens');
  const b = textPane(stage, 'with extension');
  row(stage.root, a.el, b.el);

  /** One line per inline token of the first paragraph: its type and text, control characters spelled out. */
  const list = (m: Marked, md: string): string => {
    const first = m.lexer(md).find((t) => t.type === 'paragraph');
    const kids = (first && 'tokens' in first ? first.tokens : []) as Token[];
    return kids.map((t) => `${t.type.padEnd(13)} ${JSON.stringify('text' in t ? t.text : t.raw)}`).join('\n');
  };
  const draw = (md: string): void => {
    a.show(list(plain, md));
    b.show(list(literal, md));
  };

  if (stage.preview) {
    typeLoop(stage, [{ text: CARD }], (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    draw(SAMPLE);
    note(
      stage.root,
      'Marked decodes &#27; into the invisible ESC character (shown as \\u001b) inside text tokens, so the original spelling is lost. The extension keeps each reference as its own numericEntity token with the literal text, which a non-HTML renderer can use.',
    );
  }

  return () => stage.dispose();
};

export default mount;
