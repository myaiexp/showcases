// renderer.heading adds a # link and an id to every heading, like GitHub
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render, slugify } from '../../shared/renderer-kit.ts';
import './style.css';

const TRIP = `# Lisbon trip
## Packing list
## Food to try
## Getting around`;

const NOTES = `# Weekend notes

Plenty to do.

## Saturday plan

Market, then lunch by the river.

## Sunday plan

Slow morning, train at 4.

## Things to buy

Tiles, tinned fish, coffee.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a # link: the page jumps to that heading' });

  const anchored = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}">#</a>${text}</h${depth}>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [
      { label: 'Trip', text: TRIP },
      { label: 'Weekend notes', text: NOTES },
    ],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'heading override', render: (md) => render(anchored, md) },
    ],
    caption:
      'Every heading gets an id and a small # link in front of it, so a reader can copy a link straight to that section. Click one: the pane jumps to it.',
  });

  return () => stage.dispose();
};

export default mount;
