// processAllTokens saves the links map; provideLexer hands it to the next chunk
import { Lexer, Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, sourcePane } from '../../shared/panes.ts';
import { checkbox } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const FIRST = `Sources:

[menu]: https://pizza.test/menu
[map]: https://pizza.test/map`;

const SECOND = `See the [menu][] and the
[map][] before you order.`;

const CARD_FIRST = '[menu]: https://p.test/menu';
const CARD_SECOND = 'See the [menu][].';

type Links = Record<string, { href: string; title?: string | undefined }>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Chunk 2 only works because chunk 1 was parsed before it' });
  let secondFirst = false;

  // Link definitions seen in earlier chunks, kept between parse() calls.
  let refLinks: Links = {};
  const chunked = new Marked({
    hooks: {
      processAllTokens(tokens) {
        refLinks = (tokens as unknown as { links: Links }).links;
        return tokens;
      },
      provideLexer(block) {
        return (src, options) => {
          const lexer = new Lexer(options);
          lexer.tokens.links = refLinks;
          return block ? lexer.lex(src) : lexer.inlineTokens(src);
        };
      },
    },
  });
  const plain = new Marked();

  const one = sourcePane(stage, stage.preview ? '' : FIRST, 'Chunk 1');
  const two = sourcePane(stage, stage.preview ? '' : SECOND, 'Chunk 2');
  const left = docPane(stage, 'Chunk 2, plain Marked');
  const right = docPane(stage, 'Chunk 2, with the hooks');
  row(stage.root, one.el, two.el);
  row(stage.root, left.el, right.el);
  if (!stage.preview) note(stage.root, 'Plain Marked cannot find [menu] in chunk 2: the definition lives in chunk 1. The hooks pass the links map from one parse() call to the next, like a chat reply that streams in pieces.');

  const draw = (): void => {
    refLinks = {};
    const parts = secondFirst ? [two.value(), one.value()] : [one.value(), two.value()];
    let secondHtml = '';
    parts.forEach((md, i) => {
      const html = render(chunked, md);
      if ((i === 0) === secondFirst) secondHtml = html;
    });
    left.show(render(plain, two.value()));
    right.show(secondHtml);
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      one.set('');
      two.set('');
      draw();
      await wait(600);
      one.set(CARD_FIRST);
      draw();
      await wait(1400);
      two.set(CARD_SECOND);
      draw();
      await wait(3200);
    });
  } else {
    one.onInput(draw);
    two.onInput(draw);
    checkbox(stage.bar!, 'Chunk 2 arrives first', false, (v) => {
      secondFirst = v;
      draw();
    });
    draw();
  }
  return () => stage.dispose();
};

export default mount;
