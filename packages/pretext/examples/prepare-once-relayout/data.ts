// Twelve sample paragraphs of varying length for the relayout demo
export const PARAGRAPHS: string[] = [
  'Resizing is the hot path.',
  'Pretext splits each paragraph into segments and measures them once, so a resize only has to add up cached widths.',
  'Short one.',
  'Browsers re-run layout for every width change, and reading a height back in the middle of it forces the work to happen right now. Here the heights come from arithmetic instead, so nothing is read from the page at all.',
  'A paragraph with 春天到了 and بدأت الرحلة 🚀 in it.',
  'Lines wrap at spaces, between CJK characters and, for a word wider than the line, between letters.',
  'The preparation cost is paid again only when the text, the font or an option changes.',
  'Medium length paragraph that wraps a couple of times at typical widths.',
  'Typography is the craft of arranging type to make written language legible, readable and appealing when displayed. The arrangement involves selecting typefaces, point sizes, line lengths, line spacing and letter spacing.',
  'Tiny.',
  'Drag the width slider: only layout() runs, once per paragraph, and the numbers below are how long a whole pass over all twelve takes.',
  'Supercalifragilisticexpialidocious is longer than a narrow column, so it breaks between letters.',
];
