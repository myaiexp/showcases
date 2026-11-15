// Every Style function a Penrose example calls must appear in a docs file it cites
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compDict, constrDict, objDict } from '@penrose/core';
import { describe, expect, it } from 'vitest';

/**
 * The Function Library page renders constrDict, objDict and compDict from the core sources,
 * so a function an example uses is backed when its name appears in a cited file: the source
 * that defines it (Constraints.ts, Objectives.ts, Functions.ts) or a page that names it.
 * Calls are looked for inside template literals only, where the trios are written, so
 * TypeScript's own Math.max(…) never counts.
 */
const PKG = join(import.meta.dirname, '../packages/penrose');
const EXAMPLES = join(PKG, 'examples');
const NAMES = [...new Set([...Object.keys(constrDict), ...Object.keys(objDict), ...Object.keys(compDict)])];
const CALL = new RegExp(`(?<![\\w.\\\\])(${NAMES.join('|')})\\s*\\(`, 'g');

const docsCache = new Map<string, string>();
const docText = (ref: string): string => {
  let text = docsCache.get(ref);
  if (text === undefined) {
    text = readFileSync(join(PKG, 'docs', ref), 'utf8');
    docsCache.set(ref, text);
  }
  return text;
};

/** Function names called inside the template literals of an example's .ts files. */
function calledFunctions(dir: string): Set<string> {
  const found = new Set<string>();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'meta.ts')) {
    const source = readFileSync(join(dir, file), 'utf8');
    for (const [, literal] of source.matchAll(/`((?:\\.|[^`\\])*)`/gs)) {
      for (const [, name] of literal!.matchAll(CALL)) found.add(name!);
    }
  }
  return found;
}

const slugs = readdirSync(EXAMPLES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

describe.each(slugs)('penrose/%s', (slug) => {
  it('cites a docs file for every Style function it calls', async () => {
    const dir = join(EXAMPLES, slug);
    const { default: meta } = (await import(join(dir, 'meta.ts'))) as { default: { docs: readonly string[] } };
    const cited = meta.docs.map(docText);
    const unbacked = [...calledFunctions(dir)].filter(
      (name) => !cited.some((text) => new RegExp(`\\b${name}\\b`).test(text)),
    );
    expect(unbacked, `called but not in any cited file: ${unbacked.join(', ')}`).toEqual([]);
  });
});
