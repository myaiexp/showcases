// renderer.blockquote turns "> Note: ..." into a coloured callout box
import { Marked, type Tokens } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `> Note: bring your ticket.

> Warning: the trail is closed after dark.

> Tip: pack a sandwich.

> Just a quote.`;

const CARD = `> Note: bring ID.

> Warning: it floods.

> A plain quote.`;

const KINDS = /^(note|warning|tip):\s*/i;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Start a quote with Note:, Warning: or Tip:' });

  const callouts = new Marked({
    renderer: {
      blockquote({ tokens }) {
        const first = tokens[0];
        const lead = first?.type === 'paragraph' ? (first as Tokens.Paragraph).tokens[0] : undefined;
        const kind = lead?.type === 'text' ? KINDS.exec(lead.raw)?.[1]?.toLowerCase() : undefined;
        // Not a callout: false hands the token back to the built-in blockquote.
        if (!kind || !first || !lead) return false;
        // Drop the "Note:" label from the first text token, then render the rest as usual.
        const para = first as Tokens.Paragraph;
        const rest = { ...lead, raw: lead.raw.replace(KINDS, ''), text: (lead as Tokens.Text).text.replace(KINDS, '') };
        const body = this.parser.parse([{ ...para, tokens: [rest, ...para.tokens.slice(1)] }, ...tokens.slice(1)]);
        return `<div class="callout ${kind}"><div class="callout-title">${kind}</div>${body}</div>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'blockquote override', render: (md) => render(callouts, md) },
    ],
    caption:
      'A quote that starts with Note, Warning or Tip becomes a coloured box with a title, like in documentation sites. Any other quote falls back to the built-in blockquote by returning false.',
  });

  return () => stage.dispose();
};

export default mount;
