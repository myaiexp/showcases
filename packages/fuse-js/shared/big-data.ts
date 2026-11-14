// Large seeded collections: random people, and the benchmark's random-word docs

/** A small fast seeded random generator, so every run builds the same data. */
export function seeded(seed = 1): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = ['Ada', 'Ben', 'Chloe', 'Dmitri', 'Elena', 'Farah', 'Gustav', 'Hana', 'Ivan', 'Julia', 'Kofi', 'Lena', 'Mateo', 'Nora', 'Oskar', 'Priya', 'Quinn', 'Rosa', 'Sami', 'Tomas', 'Uma', 'Viktor', 'Wen', 'Yara', 'Zoe'];
const LAST = ['Anders', 'Becker', 'Costa', 'Dubois', 'Eklund', 'Fischer', 'Garcia', 'Haddad', 'Ito', 'Jensen', 'Kowalski', 'Laine', 'Moreau', 'Novak', 'Okafor', 'Petrov', 'Quist', 'Rossi', 'Silva', 'Tanaka', 'Ulrich', 'Virtanen', 'Weber', 'Yilmaz', 'Zhang'];
const COMPANY = ['Northwind', 'Contoso', 'Fabrikam', 'Tailspin', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Wonka', 'Stark', 'Acme', 'Vandelay'];
const ROLE = ['designer', 'engineer', 'accountant', 'nurse', 'teacher', 'chef', 'pilot', 'lawyer', 'gardener', 'architect', 'translator', 'mechanic'];
const LIKES = ['hiking', 'chess', 'jazz', 'sailing', 'baking', 'cycling', 'photography', 'climbing', 'gardening', 'running', 'painting', 'birdwatching'];

export interface BigPerson {
  name: string;
  email: string;
  company: string;
  description: string;
}

/**
 * `n` random people with name, email, company and description, the shape the Web Workers
 * page describes for its dataset.
 */
export function people(n: number, seed = 7): BigPerson[] {
  const r = seeded(seed);
  const pick = <T>(xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;
  return Array.from({ length: n }, (_, i) => {
    const first = pick(FIRST);
    const last = pick(LAST);
    const company = pick(COMPANY);
    return {
      name: `${first} ${last}`,
      email: `${first}.${last}${i}@${company}.example`.toLowerCase(),
      company,
      description: `${pick(ROLE)} at ${company} who likes ${pick(LIKES)} and ${pick(LIKES)}`,
    };
  });
}

/** The word list from the Performance page's benchmark script. */
export const BENCH_WORDS = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot',
  'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima', 'mike', 'november',
  'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform',
  'victor', 'whiskey', 'xray', 'yankee', 'zulu', 'javascript', 'typescript',
  'python', 'rust', 'golang', 'swift', 'kotlin', 'scala', 'elixir'];

export interface BenchDoc {
  title: string;
  description: string;
  category: string;
  tags: string;
}

/** `n` docs shaped like the benchmark script's: random sentences of BENCH_WORDS. */
export function benchDocs(n: number, seed = 3): BenchDoc[] {
  const r = seeded(seed);
  const sentence = (len: number): string => Array.from({ length: len }, () => BENCH_WORDS[Math.floor(r() * BENCH_WORDS.length)]).join(' ');
  return Array.from({ length: n }, () => ({
    title: sentence(4),
    description: sentence(12),
    category: sentence(2),
    tags: sentence(6),
  }));
}
