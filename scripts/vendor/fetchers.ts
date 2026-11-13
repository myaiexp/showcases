// Vendoring network calls: git sparse checkout, tfish fetch, raw HTML for links
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { isAbsolute, join, normalize } from 'node:path';

export interface FetchedPage {
  url: string;
  markdown: string;
}

/**
 * Sparse, shallow clone of `repo` at `ref`; copies `paths` into `dest`. Returns the commit
 * the ref resolved to, so MANIFEST pins exactly what was read.
 */
export function vendorGit(repo: string, ref: string, paths: readonly string[], dest: string): string {
  const tmp = mkdtempSync(join(tmpdir(), 'vendor-docs-'));
  try {
    const git = (...args: string[]): string =>
      execFileSync('git', args, { cwd: tmp, env: cleanGitEnv(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
    git('clone', '--quiet', '--depth=1', '--filter=blob:none', '--sparse', '--branch', ref, '--', repo, '.');
    git('sparse-checkout', 'set', '--no-cone', ...paths.map((p) => `/${p}`));
    const commit = git('rev-parse', 'HEAD').trim();
    for (const p of paths) {
      if (isAbsolute(p) || normalize(p).startsWith('..')) throw new Error(`path escapes the repo: ${p}`);
      // A glob path (e.g. "docs/pages/*.md") copies only the tracked files it matches,
      // so a repo that ships each page in two formats can vendor just one of them.
      const files = /[*?[]/.test(p) ? git('ls-files', '-z', '--', `:(glob)${p}`).split('\0').filter(Boolean) : [p];
      if (files.length === 0) throw new Error(`${repo}@${ref} has nothing matching ${p}`);
      for (const f of files) {
        const from = join(tmp, f);
        if (!existsSync(from)) throw new Error(`${repo}@${ref} has no ${f}`);
        const to = join(dest, f);
        mkdirSync(join(to, '..'), { recursive: true });
        cpSync(from, to, { recursive: true });
      }
    }
    return commit;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

interface TfishEnvelope {
  results: { url: string; final_url?: string; text: string }[];
  errors?: { url: string; error: string }[];
}

/** Fetches pages as markdown through tfish, 10 per call (tfish's per-call limit). */
export function fetchPages(urls: readonly string[]): FetchedPage[] {
  const pages: FetchedPage[] = [];
  for (let i = 0; i < urls.length; i += 10) {
    const batch = urls.slice(i, i + 10);
    for (const url of batch) if (!/^https?:\/\//.test(url)) throw new Error(`not an http(s) URL: ${url}`);
    const env = JSON.parse(tfishFetch(batch)) as TfishEnvelope;
    for (const err of env.errors ?? []) console.warn(`  ! ${err.url}: ${err.error}`);
    for (const r of env.results) pages.push({ url: r.url, markdown: r.text });
    console.log(`  fetched ${Math.min(i + 10, urls.length)}/${urls.length}`);
  }
  return pages;
}

const RATE_LIMITED = /\b429\b|RATE_LIMIT/;

/**
 * One tfish fetch call. tfish allows 150 URLs a minute per account, shared by every
 * session vendoring at once, so a 429 waits and retries instead of failing a long run.
 */
function tfishFetch(batch: readonly string[]): string {
  for (let attempt = 1; ; attempt++) {
    try {
      return execFileSync('tfish', ['fetch', ...batch, '--json', '--full'], {
        encoding: 'utf8',
        maxBuffer: 256 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (err) {
      const stderr = String((err as { stderr?: unknown }).stderr ?? '');
      if (attempt >= 8 || !RATE_LIMITED.test(stderr)) {
        process.stderr.write(stderr);
        throw err;
      }
      const wait = 15 * attempt;
      console.warn(`  rate limited, retrying in ${wait}s (attempt ${attempt})`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, wait * 1000);
    }
  }
}

/**
 * Raw HTML of one official docs page and the URL it resolved to after redirects, used
 * only to discover links for a crawl: tfish returns extracted content with navigation
 * stripped, so it cannot see the links. Null when the page fails to load.
 */
export async function fetchHtml(url: string): Promise<{ url: string; html: string } | null> {
  const res = await fetch(url, { headers: { 'user-agent': 'showcases-vendor-docs' } });
  if (!res.ok) {
    console.warn(`  ! ${url}: HTTP ${res.status}`);
    return null;
  }
  return { url: res.url || url, html: await res.text() };
}

/** Env without inherited GIT_* repo pointers, so the clone can never touch this repo. */
function cleanGitEnv(): NodeJS.ProcessEnv {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (key.startsWith('GIT_')) delete env[key];
  return env;
}
