// Deterministic message text for a given id
const WORDS =
  'earlier older history message loaded from the server arrives later than the ones already on screen so it lands above them and would push everything down'.split(
    ' ',
  );

export function messageText(id: number): string {
  let seed = (id * 2654435761) >>> 0;
  const rand = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const n = 2 + Math.floor(rand() * rand() * 40);
  const words: string[] = [];
  for (let i = 0; i < n; i++) words.push(WORDS[Math.floor(rand() * WORDS.length)] ?? '');
  return `#${id} ${words.join(' ')}.`;
}

export const SAMPLE_TEXT = `${WORDS.join(' ')} #0123456789`;
