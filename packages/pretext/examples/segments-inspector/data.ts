// Sample strings (with tabs, newlines, ZWSP, soft hyphen, NBSP) and a function that makes invisible characters visible
export const SAMPLES: Array<{ name: string; text: string }> = [
  { name: 'Spaces, tab and newline', text: 'Two  spaces,\ta tab\nand a second line.' },
  {
    name: 'Zero-width and soft hyphen',
    text: 'zero​width break, soft­hyphen and non breaking space',
  },
  { name: 'Mixed scripts', text: 'AGI 春天到了. بدأت الرحلة 🚀' },
  { name: 'Punctuation', text: 'well-known (a/b) “quoted”, end.' },
];

const MARKS: Record<string, string> = {
  ' ': '␠',
  '\t': '⇥',
  '\n': '↵',
  '​': '‹ZWSP›',
  '­': '‹SHY›',
  ' ': '‹NBSP›',
};

export function visible(segment: string): string {
  return Array.from(segment, (ch) => MARKS[ch] ?? ch).join('');
}
