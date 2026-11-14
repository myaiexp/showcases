// Inline code: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `Run \`npm start\`
then open
\`localhost\`
\`*not bold*\``;

const SAMPLE_1 = `Type \`\` \`ls\` \`\`
to show a tick`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wrap words in `backticks`' });

  liveDemo(stage, {
    samples: [
      { label: 'Commands', text: SAMPLE_0 },
      { label: 'Backticks', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'Inside backticks nothing is formatted, so *stars* stay stars. To show a backtick, wrap it in double backticks with spaces.',
  });

  return () => stage.dispose();
};

export default mount;
