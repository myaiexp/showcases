// Sample paragraphs for the editor and the words the preview types into them
export const INITIAL_TEXT = [
  'Each line of this box is its own paragraph.',
  'Edit one and only its prepared handle is rebuilt; the others are reused as they are.',
  'Press Enter in the middle of a paragraph and two handles are rebuilt: the one before the break and the one after it.',
  'Short.',
  'Layout, by contrast, runs for every paragraph on every keystroke, because summing line counts is cheap arithmetic over cached widths.',
  'A paragraph that is long enough to wrap onto several lines at this width, so that its line count is visibly larger than the others in the strip below the box.',
  'Mixed scripts work too: 春天到了 and بدأت الرحلة.',
  'Seven.',
  'The numbered strip below shows one block per paragraph, as tall as its line count, with the re-prepared ones highlighted.',
  'Last paragraph, with no trailing newline.',
].join('\n');

export const PREVIEW_EDITS = [' edited', ' and more words', ' again', ' now longer', ' x'];
