// An inline extension turns #topic into a clickable tag pill
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Great day out! #hiking with the kids,
then pizza at the lake. #family #sunday-best

# This line is a heading, not a tag`;

const CARD = `Great day! #hiking
with the kids. #family
# A heading`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type # straight in front of a word' });

  const social = new Marked({
    extensions: [
      {
        name: 'hashtag',
        level: 'inline',
        start: (src) => src.search(/#[a-z]/i),
        tokenizer(src) {
          const match = /^#([a-z][\w-]*)/i.exec(src);
          return match ? { type: 'hashtag', raw: match[0], tag: match[1]! } : undefined;
        },
        renderer: (token) => `<a class="tag" href="#tag-${esc(String(token.tag))}">#${esc(String(token.tag))}</a>`,
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(social, md),
    caption: 'A # glued to a word becomes a tag pill. "# " followed by a space is still a heading, because block rules run first.',
  });

  return () => stage.dispose();
};

export default mount;
