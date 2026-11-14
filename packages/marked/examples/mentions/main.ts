// An inline extension turns @name into a chip with the person's avatar
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { avatar } from '../../shared/images.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const PEOPLE: Record<string, { name: string; hue: number }> = {
  ana: { name: 'Ana', hue: 12 },
  ben: { name: 'Ben', hue: 210 },
  chloe: { name: 'Chloe', hue: 150 },
};

const SAMPLE = `Standup notes:
- @ana booked the venue
- @ben, can you send the invoice?
- Thanks @chloe and @sam (not on the team list)`;

const CARD = `@ana booked it.
@ben sends the bill.
Thanks @chloe, @sam`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Known names: @ana @ben @chloe. Others stay plain text' });

  const chat = new Marked({
    extensions: [
      {
        name: 'mention',
        level: 'inline',
        start: (src) => src.search(/@\w/),
        tokenizer(src) {
          const match = /^@(\w+)/.exec(src);
          const person = match && PEOPLE[match[1]!.toLowerCase()];
          // Unknown names return nothing, so the text stays as typed.
          if (!match || !person) return undefined;
          return { type: 'mention', raw: match[0], who: person.name, hue: person.hue };
        },
        renderer(token) {
          const who = String(token.who);
          const pic = avatar(who.slice(0, 1), Number(token.hue));
          return `<span class="chip"><img src="${pic}" alt="">${esc(who)}</span>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(chat, md),
    caption: 'Each known @name becomes a rounded chip with a coloured avatar. @sam is not in the team list, so the tokenizer returns nothing and it stays text.',
  });

  return () => stage.dispose();
};

export default mount;
