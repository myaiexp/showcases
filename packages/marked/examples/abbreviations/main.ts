// *[ABBR]: meaning lines, then every use of ABBR wrapped in <abbr title>
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `The NHS letter says to bring your ID and
the GP referral. Ask the HR team if the PDF
form is missing.

*[NHS]: National Health Service
*[GP]: General Practitioner
*[HR]: Human Resources
*[PDF]: Portable Document Format`;

const CARD = `Ask HR for the PDF
form.

*[HR]: Human Resources
*[PDF]: Portable Document Format`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Define with "*[ABC]: meaning" on its own line' });

  let abbrs = new Map<string, string>();
  const pattern = (): RegExp => new RegExp(`\\b(?:${[...abbrs.keys()].join('|')})\\b`);

  const md = new Marked({
    hooks: {
      preprocess(src) {
        abbrs = new Map(); // fresh table for every parse
        return src;
      },
    },
    extensions: [
      {
        name: 'abbrDef',
        level: 'block',
        start: (src) => src.search(/^\*\[[^\]\n]+\]:/m),
        tokenizer(src) {
          const match = /^\*\[([^\]\n]+)\]:[ \t]*([^\n]*)(?:\n|$)/.exec(src);
          if (!match) return undefined;
          abbrs.set(match[1]!, match[2]!.trim());
          return { type: 'abbrDef', raw: match[0] };
        },
        renderer: () => '',
      },
      {
        name: 'abbr',
        level: 'inline',
        // The definitions were all read in the block pass, so the inline pass knows every word to look for.
        start: (src) => (abbrs.size ? src.search(pattern()) : undefined),
        tokenizer(src) {
          if (!abbrs.size) return undefined;
          const match = new RegExp(`^(?:${[...abbrs.keys()].join('|')})\\b`).exec(src);
          return match ? { type: 'abbr', raw: match[0], word: match[0], title: abbrs.get(match[0]) ?? '' } : undefined;
        },
        renderer: (token) => `<abbr tabindex="0" title="${esc(String(token.title))}">${esc(String(token.word))}</abbr>`,
      },
    ],
  });

  // Cards have no pointer: one abbreviation at a time shows its tooltip.
  let peek = 0;
  const show = (body: HTMLElement): void => {
    const all = body.querySelectorAll('abbr');
    all.forEach((a, i) => a.classList.toggle('peek', i === peek % all.length));
  };
  const live = liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (src) => render(md, src),
    caption: 'Every defined word in the text gets a dotted underline; hover or focus it to read what it stands for. The *[ABC]: lines themselves disappear from the page.',
    after: (doc) => {
      if (stage.preview) show(doc.body);
    },
  });
  if (stage.preview) {
    stage.every(1300, () => {
      peek++;
      show(live.doc.body);
    });
  }

  return () => stage.dispose();
};

export default mount;
