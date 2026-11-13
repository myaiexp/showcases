// Sample article for the circle example
const PARAGRAPH =
  'Text wraps around a shape the way water goes around a stone. For every row the circle takes a slice out of the line, so the row has two free intervals, one on each side, and the paragraph has to fill the left one before the right. Pretext does not know about circles. It only knows how to lay out one line at a width and hand back where it stopped, so the whole effect is a loop that picks a width, takes a line, and passes the end cursor on. ';
export const ARTICLE = PARAGRAPH.repeat(3).trim();
