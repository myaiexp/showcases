// An indented line inside a list item: code block or not
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { outlineDocs, quotedSide } from '../../shared/broken-kit.ts';

// The input and markdown.pl's output, both as docs/broken.md shows them.
const SOURCE = `* hello
      var a = 1;
* world`;
const MARKDOWN_PL = `<ul>
<li>hello
var a = 1;</li>
<li>world</li>
</ul>`;
const WITH_BLANK = '* hello\n\n      var a = 1;\n* world';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the Markdown: the Marked side re-renders' });
  const marked = new Marked();

  compareDemo(stage, {
    samples: [{ label: 'From the docs', text: SOURCE }, { label: 'With a blank line', text: WITH_BLANK }],
    sides: [
      quotedSide('markdown.pl (quoted in the docs)', SOURCE, MARKDOWN_PL),
      { label: 'Marked', render: (md) => marked.parse(md, { async: false }) },
    ],
    caption: "Without a blank line the indented line continues 'hello' (an indented code block cannot interrupt a paragraph), so Marked agrees with markdown.pl here. Add a blank line and Marked makes it a code block inside the item.",
  });
  outlineDocs(stage);

  return () => stage.dispose();
};

export default mount;
