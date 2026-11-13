// Sample paragraph: body text, @mentions and #tag chips with their fonts and padding
import type { Run } from './paint.ts';

export const BODY = '400 15px "Inter Variable"';
const MENTION = '600 13px "Inter Variable"';
const TAG = '500 12px "Inter Variable"';
export const FONTS = [BODY, MENTION, TAG];
export const LINE_HEIGHT = 24;

const body = (text: string): Run => ({ text, font: BODY });
const mention = (text: string): Run => ({ text, font: MENTION, cls: 'mention', never: true, pad: { x: 6, border: 1 } });
const tag = (text: string): Run => ({ text, font: TAG, cls: 'tag', never: true, pad: { x: 7, border: 1 } });

// The space beside a chip goes in the text next to it, as the docs advise.
export const PIECES: Run[] = [
  body('Thanks '),
  mention('@maya'),
  body(' and '),
  mention('@jun-ho'),
  body(' for the review, the fix is in '),
  tag('#release-2.4'),
  body(' and tracked under '),
  tag('#layout'),
  body('. Ping '),
  mention('@sam'),
  body(' if the '),
  tag('#flaky-test'),
  body(' fails again tonight.'),
];
