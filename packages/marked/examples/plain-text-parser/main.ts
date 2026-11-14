// provideParser swaps in a parser that returns plain text instead of HTML
import { Marked, Parser, type Token } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import type { Sample } from '../../shared/typing.ts';
import { docPane, row, sourcePane, textPane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';
import { select } from '../../shared/controls.ts';

const SAMPLES: Sample[] = [
  { label: 'Chat message', text: '**Sam:** dinner is at [Luigi\'s](https://luigis.test)\nbring `cash`, ~~not cards~~' },
  { label: 'Update', text: '# Road closed\n\nThe *main bridge* is shut until **Friday**.\n\n- take the ring road\n- allow 20 minutes' },
];

const CARD: Sample[] = [{ text: '**Sam:** dinner is at\n[Luigi](https://l.test)\nbring `cash`' }];
const LIMIT = 60;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same Markdown, as the one-line preview of a notification' });

  // Plain text for block tokens: inline runs go through the TextRenderer, blocks are joined with a space.
  const plainText = (tokens: Token[], parser: Parser): string => {
    const parts: string[] = [];
    for (const t of tokens) {
      const any = t as { type: string; tokens?: Token[]; items?: Token[]; text?: string };
      // Raw HTML and layout-only tokens have no words a notification should show.
      if (['space', 'hr', 'def', 'html'].includes(any.type)) continue;
      if (any.type === 'table') {
        const table = t as { header: { tokens: Token[] }[]; rows: { tokens: Token[] }[][] };
        for (const cell of [...table.header, ...table.rows.flat()]) parts.push(parser.parseInline(cell.tokens, parser.textRenderer));
      } else if (any.items) parts.push(plainText(any.items, parser));
      else if (any.type === 'code') parts.push(any.text ?? '');
      else if (any.tokens && ['paragraph', 'heading', 'text'].includes(any.type)) parts.push(parser.parseInline(any.tokens, parser.textRenderer));
      else if (any.tokens) parts.push(plainText(any.tokens, parser));
      else parts.push(any.text ?? '');
    }
    return parts.join(' ');
  };

  const m = new Marked({
    hooks: {
      // parse() calls the function this returns, in place of Parser.parse.
      provideParser(block) {
        return (tokens, options) => {
          const parser = new Parser(options);
          const raw = block ? plainText(tokens, parser) : parser.parseInline(tokens, parser.textRenderer);
          // A notification is one line: soft line breaks inside paragraphs become spaces too.
          const text = raw.replace(/\s+/g, ' ').trim();
          return text.length > LIMIT ? `${text.slice(0, LIMIT - 1)}…` : text;
        };
      },
    },
  });
  const normal = new Marked();

  if (stage.preview) {
    const src = sourcePane(stage, '');
    const out = textPane(stage, 'Preview text');
    row(stage.root, src.el, out.el);
    typeLoop(stage, CARD, (text) => {
      src.set(text);
      out.show(m.parse(text, { async: false }));
    });
    return () => stage.dispose();
  }

  const src = sourcePane(stage, SAMPLES[0]!.text);
  const out = textPane(stage, 'parse() with provideParser: plain text, cut at 60 characters');
  const doc = docPane(stage, 'Normal parse()');
  row(stage.root, src.el, out.el);
  stage.root.append(doc.el);
  const draw = (md: string): void => {
    out.show(m.parse(md, { async: false }));
    doc.show(normal.parse(md, { async: false }));
  };
  src.onInput(draw);
  select(stage.bar!, 'Sample', SAMPLES.map((s) => s.label ?? ''), (label) => {
    const s = SAMPLES.find((x) => x.label === label)!;
    src.set(s.text);
    draw(s.text);
  });
  draw(SAMPLES[0]!.text);
  return () => stage.dispose();
};

export default mount;
