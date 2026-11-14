// Reference links: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Read [the menu][menu]
or [the map][map].

[menu]: https://example.com/menu
[map]: https://example.com/map`;

const SAMPLE_1 = `Open [menu] or
[menu][] again.

[menu]: /menu "Lunch"`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit a definition and watch the link' });

  liveDemo(stage, {
    samples: [
      { label: 'Two links', text: SAMPLE_0 },
      { label: 'Shortcuts', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'The lines starting [name]: address are definitions: they never appear in the page, they only supply addresses to links that use the name.',
  });

  return () => stage.dispose();
};

export default mount;
