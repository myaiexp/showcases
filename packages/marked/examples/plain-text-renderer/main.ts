// Parser.textRenderer drops all formatting and keeps only the words
import { marked, Parser, type Token, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane, textPane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';

const TEXT = `# Pasta night

Boil **500 g** of [pasta](https://shop.test/pasta) for \`9 min\`.

- *Stir* the sauce
- ~~Skip~~ the cheese`;

const CARDS = [{ text: '# Pasta night\n\nBoil **500 g** of\n[pasta](https://s.test)\n\n- *Stir* the sauce' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the plain text keeps only the words' });
  const parser = new Parser();

  /** Block by block: inline tokens go through the TextRenderer, which prints only their words. */
  const toText = (tokens: Token[]): string =>
    tokens
      .map((t) => {
        if (t.type === 'heading' || t.type === 'paragraph') return parser.parseInline((t as Tokens.Heading).tokens, parser.textRenderer);
        if (t.type === 'list') return (t as Tokens.List).items.map((i) => `- ${toText(i.tokens).trim()}`).join('\n');
        if (t.type === 'text') return parser.parseInline((t as Tokens.Text).tokens ?? [], parser.textRenderer) || (t as Tokens.Text).text;
        if (t.type === 'code') return (t as Tokens.Code).text;
        return '';
      })
      .filter(Boolean)
      .join('\n\n');

  const src = sourcePane(stage, stage.preview ? '' : TEXT);
  const plain = textPane(stage, 'Plain text');
  const doc = docPane(stage, 'With formatting');
  row(stage.root, src.el, plain.el);
  if (!stage.preview) stage.root.append(doc.el);

  const draw = (md: string): void => {
    plain.show(toText(marked.lexer(md)));
    doc.show(marked.parse(md, { async: false }));
  };

  if (stage.preview) {
    typeLoop(stage, CARDS, (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    src.onInput(draw);
    note(stage.root, 'The same words, with no bold, no link, no code styling and no # sign. This is the text a search index, a page title or a spoken-aloud reader would want.');
    draw(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
