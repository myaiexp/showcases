// Deterministic generator for variable-length chat messages
const WORDS =
  'the a measure text height layout row list scroll window offset exact browser line width cached prepare pretext message hello thanks sure maybe later quick slow render paint frame pixel font wrap break lines paragraph virtual visible only needed'.split(
    ' ',
  );

export const SAMPLE_TEXT = WORDS.join(' ');

export function makeMessages(count: number): string[] {
  let seed = 12345;
  const rand = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    // Mostly short, sometimes long: squaring skews the length distribution.
    const n = 1 + Math.floor(rand() * rand() * 70);
    const words: string[] = [];
    for (let w = 0; w < n; w++) words.push(WORDS[Math.floor(rand() * WORDS.length)] ?? '');
    const first = words[0] ?? '';
    words[0] = first.charAt(0).toUpperCase() + first.slice(1);
    out.push(`${words.join(' ')}.`);
  }
  return out;
}
