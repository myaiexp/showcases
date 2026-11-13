// Edge-case texts for the cursor table, and a function that makes spaces and breaks visible
export type Case = { name: string; text: string; width: number; preWrap: boolean };

export const CASES: Case[] = [
  { name: 'Spaces hang past the line end', text: 'The quick brown fox jumps over the lazy dog', width: 150, preWrap: false },
  {
    name: 'A long word breaks mid-segment',
    text: 'Say Supercalifragilisticexpialidocious twice',
    width: 110,
    preWrap: false,
  },
  { name: 'Empty string: zero lines', text: '', width: 200, preWrap: false },
  { name: 'pre-wrap text ending in a newline', text: 'first line\nsecond line\n', width: 200, preWrap: true },
];

export function visible(text: string): string {
  return Array.from(text, (ch) => (ch === ' ' ? '·' : ch === '\n' ? '↵' : ch === '\t' ? '⇥' : ch)).join('') || '(empty)';
}
