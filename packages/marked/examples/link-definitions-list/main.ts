// tokenizer.def runs the built-in and also collects every definition
import { Marked, Tokenizer, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc } from '../../shared/renderer-kit.ts';

const NOTE = `Weekend plan: buy bread at [the bakery][bread], then
walk to the [market][mkt]. Check the [map][map] if lost.

[bread]: https://bakery.example/menu "Fresh rolls from 7"
[mkt]: https://market.example
[map]: https://maps.example/route?from=home`;

const CARD = `Buy bread at [the
bakery][b], then
see the [map][m].

[b]: https://bk.example
[m]: https://map.example`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add, rename or delete a [name]: https://... line' });

  let found: Tokens.Def[] = [];
  const collect = new Marked({
    tokenizer: {
      def(src) {
        // Run the built-in def tokenizer, keep a copy of what it found, and return it unchanged.
        const token = Tokenizer.prototype.def.call(this, src);
        if (token) found.push(token);
        return token;
      },
    },
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : NOTE }],
    output: 'Page + collected definitions',
    caption:
      'Definition lines like [bread]: https://... print nothing by themselves. Hooking the def tokenizer lets the page list every definition it found as a "Sources" box under the text.',
    render(md) {
      found = [];
      const html = collect.parse(md, { async: false });
      const items = found
        .map((d) => `<li><code>${esc(d.tag)}</code> <a href="${esc(d.href)}">${esc(d.href)}</a>${d.title ? ` <em>${esc(d.title)}</em>` : ''}</li>`)
        .join('');
      return `${html}<h4>Sources (${found.length})</h4><ul>${items}</ul>`;
    },
  });

  return () => stage.dispose();
};

export default mount;
