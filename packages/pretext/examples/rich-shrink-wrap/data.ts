// Sample chat messages as runs: plain text, mentions and inline code
import type { Run } from './paint.ts';

export const BODY = '400 14px "Inter Variable"';
const MENTION = '600 12px "Inter Variable"';
const CODE = '500 12px "JetBrains Mono"';
export const FONTS = [BODY, MENTION, CODE];
export const LINE_HEIGHT = 20;

const body = (text: string): Run => ({ text, font: BODY });
const mention = (text: string): Run => ({ text, font: MENTION, cls: 'mention', never: true, pad: { x: 5, border: 0 } });
const code = (text: string): Run => ({ text, font: CODE, cls: 'code', pad: { x: 4, border: 0 } });

export type Message = { mine: boolean; runs: Run[] };

export const MESSAGES: Message[] = [
  { mine: false, runs: [mention('@dana'), body(' did the deploy go out?')] },
  {
    mine: true,
    runs: [body('Yes, but run '), code('pnpm check'), body(' before you merge, the lockfile moved.')],
  },
  {
    mine: false,
    runs: [body('On it. '), mention('@lee'), body(' can you review '), code('rich-inline.ts'), body(' too?')],
  },
  { mine: true, runs: [body('Sure.')] },
];
