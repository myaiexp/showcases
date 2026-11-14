// A preprocess hook reads a --- settings block and changes this.options
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';

const SAMPLES = [
  { label: 'breaks: true', text: '---\nbreaks: true\n---\n\nMilk\nEggs\nBread' },
  { label: 'no settings', text: 'Milk\nEggs\nBread' },
];

const CARD = [{ text: '---\nbreaks: true\n---\nMilk\nEggs' }, { text: 'Milk\nEggs' }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Delete the --- block, or write breaks: false, and the lines run together again' });

  const m = new Marked({
    hooks: {
      // `this` is the Hooks object: this.options holds the settings for this one parse call.
      preprocess(markdown) {
        const block = /^---\n([\s\S]*?)\n---\n?/.exec(markdown);
        if (!block) return markdown;
        for (const line of block[1]!.split('\n')) {
          const [key, ...rest] = line.split(':');
          const name = key!.trim();
          // Only the true/false settings that change how text reads; never hooks, async and the like.
          if (['breaks', 'gfm', 'pedantic'].includes(name)) (this.options as Record<string, unknown>)[name] = rest.join(':').trim() === 'true';
        }
        return markdown.slice(block[0].length);
      },
    },
  });

  liveDemo(stage, {
    samples: stage.preview ? CARD : SAMPLES,
    render: (md) => render(m, md),
    caption:
      'With breaks: true in the block, each line becomes its own line on the page. Without the block, Marked runs the three lines together into one paragraph.',
  });
  return () => stage.dispose();
};

export default mount;
