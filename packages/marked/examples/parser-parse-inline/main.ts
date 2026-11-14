// Parser.parseInline renders a heading's words without the <h1> around them
import { marked, Parser, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, htmlPane, note, row, sourcePane } from '../../shared/panes.ts';
import { typeLoop } from '../../shared/typing.ts';

const TEXT = `# Trip to **Lisbon** (*May*)

Flights are booked. Hotel next.

## Packing`;

const CARDS = [{ text: '# Trip to **Lisbon**\n\nFlights booked.' }, { text: '# Menu for *Sunday*\n\nSoup first.' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the first heading: both HTML strings follow' });

  const src = sourcePane(stage, stage.preview ? '' : TEXT);
  const whole = htmlPane(stage, 'marked.parser([heading])');
  const inline = htmlPane(stage, 'Parser.parseInline(heading.tokens)');
  const tab = docPane(stage, 'Used as a tab title');

  const draw = (md: string): void => {
    const heading = marked.lexer(md).find((t): t is Tokens.Heading => t.type === 'heading');
    if (!heading) {
      whole.show('(no heading yet)');
      inline.show('');
      tab.show('');
      return;
    }
    whole.show(marked.parser([heading]).trim()); // a block: the whole <h1>
    const words = Parser.parseInline(heading.tokens); // only the inline pieces
    inline.show(words);
    tab.show(`<p>📄 ${words}</p>`);
  };

  if (stage.preview) {
    // Source on top, the two outputs side by side: three columns would not fit a card.
    src.el.classList.add('mk-pane-src-top');
    stage.root.append(src.el);
    row(stage.root, whole.el, inline.el);
    typeLoop(stage, CARDS, (text) => {
      src.set(text);
      draw(text);
    });
  } else {
    stage.root.append(src.el);
    row(stage.root, whole.el, inline.el);
    stage.root.append(tab.el);
    src.onInput(draw);
    note(stage.root, 'parser() renders a whole block, so the heading comes back wrapped in <h1>. parseInline() takes just the heading\'s inline tokens, so the bold and italic words can go inside a tab title or breadcrumb that has its own wrapper.');
    draw(TEXT);
  }
  return () => stage.dispose();
};

export default mount;
