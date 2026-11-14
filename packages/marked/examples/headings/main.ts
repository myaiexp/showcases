// Headings: # to ######: one Markdown syntax, typed and rendered
import { marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';

const SAMPLE_0 = `# Trip notes
## Day 1
### Packing
#### Shoes`;

const SAMPLE_1 = `# Pasta night
## Shopping
### Pantry
#### Dairy
##### Cheese
###### Parmesan

#hashtag is no heading`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove # signs' });

  liveDemo(stage, {
    samples: [
      { label: 'Trip notes', text: SAMPLE_0 },
      { label: 'All six levels', text: SAMPLE_1 },
    ],
    // The whole library call: Markdown string in, HTML string out.
    render: (markdown) => marked.parse(markdown, { async: false }),
    caption:
      'One # is the page title, six is the smallest sub-heading. Remove the space after the # and the line stops being a heading.',
  });

  return () => stage.dispose();
};

export default mount;
