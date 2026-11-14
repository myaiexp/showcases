// Images: ![alt][name] becomes a picture
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { cat, chart, landscape } from '../../shared/images.ts';

const SAMPLE_0 = `My cat:

![A cat][cat]`;

const SAMPLE_1 = `![Hills][hills]

![Sales][chart]`;

// The reference definitions are appended here so the typed Markdown stays short.
const DEFINITIONS = `

[cat]: ${cat} "Our cat"
[hills]: ${landscape}
[chart]: ${chart} "Sales"`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try ![A cat][cat], ![Hills][hills] or ![Chart][chart]' });

  liveDemo(stage, {
    samples: [
      { label: 'Cat', text: SAMPLE_0 },
      { label: 'Hills and chart', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown + DEFINITIONS, { async: false }),
    caption:
      'The text in [brackets] is the alt text, shown if the picture fails. The picture addresses are defined at the end of the source by the example, so the typed text stays short.',
  });

  return () => stage.dispose();
};

export default mount;
