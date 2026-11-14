// Paragraphs and line breaks: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `12 Oak Lane··
Leeds··
UK

Call after six.`;

const SAMPLE_1 = String.raw`Milk
Eggs

Bread\
Jam`;

// The · stands for a space so trailing spaces are visible; swap them back before parsing.

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A · is a space; two at a line end break the line' });

  liveDemo(stage, {
    samples: [
      { label: 'Address', text: SAMPLE_0 },
      { label: 'Soft vs hard', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown.replaceAll('·', ' '), { async: false }),
    caption:
      'A dot in the Markdown stands for a space, so the invisible trailing spaces can be seen. Two of them, or a backslash, end a line with a <br>; a plain newline does not.',
  });

  return () => stage.dispose();
};

export default mount;
