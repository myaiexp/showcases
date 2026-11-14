// marked.lexer() returns a links map of every [name]: address definition
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { textPane } from '../../shared/panes.ts';

const TEXT = `Useful pages: the [library][lib],
the [pool][Pool] and [the bus][].

[lib]: https://library.test/hours "Opening hours"
[POOL]: https://pool.test/times
[the bus]: https://bus.test/7`;

const CARD = `The [pool][] and
the [bus][b].

[pool]: https://p.test
[b]: https://bus.test/7`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or rename a [name]: address line' });
  const map = textPane(stage, 'tokens.links');

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : TEXT }],
    html: false,
    render: (md) => marked.parse(md, { async: false }),
    after(_doc, md) {
      // The lexer's result is an array with an extra `links` property: names are lower-cased.
      const links = marked.lexer(md).links;
      const lines = Object.entries(links).map(([name, l]) => `${name}  ->  ${l.href}${l.title ? `  "${l.title}"` : ''}`);
      map.show(lines.length ? lines.join('\n') : '(no definitions yet)');
    },
    caption:
      'Each [name]: address line is not shown on the page, but the lexer keeps it in the links map under a lower-case name, so [pool][] and [POOL][] find the same address.',
  });
  stage.root.append(map.el);
  return () => stage.dispose();
};

export default mount;
