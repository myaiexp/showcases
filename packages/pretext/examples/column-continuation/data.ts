// Sample article for the column example
export const ARTICLE = [
  'Newspapers set their stories in narrow columns because short lines are quick to read, and a story that does not fit one column carries on at the top of the next.',
  'That hand-off is the whole trick here. When a column has no room for another row, the layout does not start over: it keeps the cursor from the last line it placed, a segment index and a grapheme index, and begins the next column exactly there.',
  'Because the cursor counts segments and graphemes rather than characters of the raw string, it stays valid when a long word has to be split across the break, in which case the grapheme index is not zero.',
  'Change the height of the columns and every break moves, yet the text is never measured again. Only the loop that routes lines into columns runs, and it costs a few additions per line.',
  'The same idea paginates a book, fills the tiles of a magazine spread, or feeds a text that flows from one box into another elsewhere on a page.',
  'When the last column fills before the article ends, the rest simply has nowhere to go, and the cursor under that column says where the next page would pick up.',
].join(' ');
