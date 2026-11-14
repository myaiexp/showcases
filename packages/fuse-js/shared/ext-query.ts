// Reads an extended-search query the way Fuse.js does: OR groups of AND terms
import type Fuse from 'fuse.js';

export type OpType = 'fuzzy' | 'exact' | 'include' | 'inverse' | 'prefix' | 'inverse-prefix' | 'suffix' | 'inverse-suffix';

export interface Operator {
  type: OpType;
  /** Example token from the docs table. */
  token: string;
  name: string;
  /** Plain English, finishing the sentence "Keeps items that ...". */
  plain: string;
  /** Short verb for a chip, such as "starts with". */
  verb: string;
}

/** The docs' operator table, in the docs' order. */
export const OPERATORS: readonly Operator[] = [
  { type: 'fuzzy', token: 'jscript', name: 'fuzzy match', plain: 'roughly look like the word, typos allowed', verb: 'looks like' },
  { type: 'exact', token: '=scheme', name: 'exact match', plain: 'are exactly this word and nothing more', verb: 'is exactly' },
  { type: 'include', token: "'python", name: 'include match', plain: 'contain these exact letters somewhere', verb: 'contains' },
  { type: 'inverse', token: '!ruby', name: 'inverse match', plain: 'do NOT contain these letters anywhere', verb: 'lacks' },
  { type: 'prefix', token: '^java', name: 'prefix match', plain: 'start with these letters', verb: 'starts with' },
  { type: 'inverse-prefix', token: '!^erlang', name: 'inverse prefix match', plain: 'do NOT start with these letters', verb: 'does not start with' },
  { type: 'suffix', token: '.js$', name: 'suffix match', plain: 'end with these letters', verb: 'ends with' },
  { type: 'inverse-suffix', token: '!.go$', name: 'inverse suffix match', plain: 'do NOT end with these letters', verb: 'does not end with' },
];

export const operatorOf = (type: OpType): Operator => OPERATORS.find((o) => o.type === type)!;

export interface Term {
  /** The token as typed, pipes still escaped: safe to hand back to Fuse. */
  raw: string;
  /** What the operator is applied to: quotes and operator characters removed. */
  text: string;
  op: OpType;
}

export interface Group {
  terms: Term[];
  /** The group alone as a query, to ask Fuse which items it matches. */
  query: string;
}

const PIPE = '\u0000';

// The same checks, in the same order, as the docs' src/search/extended/matchers.ts.
const DEFS: { op: OpType; multi: RegExp; single: RegExp }[] = [
  { op: 'exact', multi: /^="(.*)"$/, single: /^=(.*)$/ },
  { op: 'include', multi: /^'"(.*)"$/, single: /^'(.*)$/ },
  { op: 'prefix', multi: /^\^"(.*)"$/, single: /^\^(.*)$/ },
  { op: 'inverse-prefix', multi: /^!\^"(.*)"$/, single: /^!\^(.*)$/ },
  { op: 'inverse-suffix', multi: /^!"(.*)"\$$/, single: /^!(.*)\$$/ },
  { op: 'suffix', multi: /^"(.*)"\$$/, single: /^(.*)\$$/ },
  { op: 'inverse', multi: /^!"(.*)"$/, single: /^!(.*)$/ },
  { op: 'fuzzy', multi: /^"(.*)"$/, single: /^(.*)$/ },
];

// Port of the docs' tokenize(): a token with an opening quote runs to the closing quote.
function tokenize(pattern: string): string[] {
  const tokens: string[] = [];
  const len = pattern.length;
  let i = 0;
  while (i < len) {
    while (i < len && pattern[i] === ' ') i++;
    if (i >= len) break;
    let j = i;
    while (j < len && pattern[j] !== ' ' && pattern[j] !== '"') j++;
    if (j < len && pattern[j] === '"') {
      j++;
      while (j < len) {
        if (pattern[j] === '"') {
          const next = j + 1;
          if (next >= len || pattern[next] === ' ') {
            j++;
            break;
          }
          if (pattern[next] === '$' && (next + 1 >= len || pattern[next + 1] === ' ')) {
            j += 2;
            break;
          }
        }
        j++;
      }
    } else {
      while (j < len && pattern[j] !== ' ') j++;
    }
    tokens.push(pattern.substring(i, j));
    i = j;
  }
  return tokens;
}

function readTerm(token: string): Term {
  const unescape = (s: string): string => s.replaceAll(PIPE, '|');
  for (const def of DEFS) {
    const m = token.match(def.multi);
    if (m?.[1]) return { raw: token.replaceAll(PIPE, '\\|'), text: unescape(m[1]), op: def.op };
  }
  for (const def of DEFS) {
    const m = token.match(def.single);
    if (m?.[1]) return { raw: token.replaceAll(PIPE, '\\|'), text: unescape(m[1]), op: def.op };
  }
  return { raw: token, text: token, op: 'fuzzy' };
}

/** The query as OR groups of AND terms. Empty groups are dropped. */
export function parseExt(query: string): Group[] {
  return query
    .replace(/\\\|/g, PIPE)
    .split('|')
    .map((part) => tokenize(part.trim()).filter((t) => t.trim()).map(readTerm))
    .filter((terms) => terms.length > 0)
    .map((terms) => ({ terms, query: terms.map((t) => t.raw).join(' ') }));
}

/**
 * For each hit, the first OR group that matches it (Fuse stops at the first group that
 * matches). Keyed by refIndex.
 */
export function groupOf<T>(fuse: Fuse<T>, groups: readonly Group[]): Map<number, number> {
  const out = new Map<number, number>();
  groups.forEach((g, i) => {
    for (const r of fuse.search(g.query)) if (!out.has(r.refIndex)) out.set(r.refIndex, i);
  });
  return out;
}
