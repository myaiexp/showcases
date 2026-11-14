// A preprocess hook fills {{name}} placeholders before Marked reads the text
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const LETTER = `# Table for {{guests}}, {{name}}

Dear **{{name}}**, your table is booked for *{{time}}*.

Please tell us about allergies: {{unknown}}`;

const CARD = `Dear **{{name}}**,
table for {{guests}}
at *{{time}}*.`;

const GUESTS: Record<string, Record<string, string>> = {
  Ana: { name: 'Ana', guests: '2', time: 'Friday 19:30' },
  Ben: { name: 'Ben', guests: '6', time: 'Saturday 13:00' },
  Chloe: { name: 'Chloe', guests: '4', time: 'Sunday 18:15' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a guest: the same letter is filled in again' });
  let guest = 'Ana';

  const m = new Marked({
    hooks: {
      // Runs on the raw text, so the filled-in values are read as Markdown too.
      preprocess(markdown) {
        const values = GUESTS[guest]!;
        // A placeholder with no value is left as it is, so a typo stays visible.
        return markdown.replace(/\{\{\s*(\w+)\s*\}\}/g, (whole, key: string) => values[key] ?? whole);
      },
    },
  });

  const demo = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : LETTER }],
    render: (md) => render(m, md),
    caption: 'Every {{word}} is replaced before Marked sees the text. {{unknown}} has no value, so it stays as typed.',
  });

  if (stage.bar) {
    select(stage.bar, 'Guest', Object.keys(GUESTS), (g) => {
      guest = g;
      demo.refresh();
    });
  } else {
    // Cards swap the guest now and then so the blanks visibly change.
    stage.every(2200, () => {
      const names = Object.keys(GUESTS);
      guest = names[(names.indexOf(guest) + 1) % names.length]!;
      demo.refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;
