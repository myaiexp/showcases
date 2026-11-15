// Reads every example's .ts files of one package, for tests that scan example code
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every .ts file of every example of `pkg`, as [example/file, source]. meta.ts files are left
 * out: they hold metadata, no running code.
 */
export function exampleSources(pkg: string): [string, string][] {
  const root = join(import.meta.dirname, '../packages', pkg, 'examples');
  const out: [string, string][] = [];
  for (const slug of readdirSync(root)) {
    let files: string[];
    try {
      files = readdirSync(join(root, slug));
    } catch {
      continue;
    }
    for (const f of files) {
      if (f.endsWith('.ts') && f !== 'meta.ts') out.push([`${slug}/${f}`, readFileSync(join(root, slug, f), 'utf8')]);
    }
  }
  return out;
}

