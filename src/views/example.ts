// Example view: one example full size, with its docs provenance and source files

import { runExample } from '../preview/run.ts';
import {
  type ExampleEntry,
  type PackageEntry,
  loadExamples,
  loadManifest,
  loadMount,
  loadSources,
} from '../registry.ts';
import { formatRoute } from '../router.ts';
import type { DocsManifest } from '../types.ts';
import { creditLine } from '../ui/credit.ts';
import { h } from '../ui/dom.ts';
import { renderSources } from '../ui/source-view.ts';
import { notFound } from './not-found.ts';

export function renderExample(
  root: HTMLElement,
  pkg: PackageEntry | undefined,
  slug: string,
): () => void {
  if (!pkg) return notFound(root, 'No such package.');
  let stop = (): void => {};
  let stopped = false;
  root.replaceChildren(h('p', { class: 'dim' }, 'Loading…'));

  Promise.all([loadExamples(pkg), loadManifest(pkg.slug)])
    .then(([examples, manifest]) => {
      if (stopped) return;
      const index = examples.findIndex((e) => e.slug === slug);
      const ex = examples[index];
      if (!ex) {
        notFound(root, 'No such example.');
        return;
      }
      const stage = h('div', { class: 'sc-stage sc-stage-full' });
      const sources = h('div', { class: 'sources' });
      root.replaceChildren(
        h('a', { class: 'sc-back', href: formatRoute({ view: 'package', pkg: pkg.slug }) }, `← ${pkg.name}`),
        header(ex),
        stage,
        pager(examples, index),
        docsRefs(ex, manifest, pkg),
        sources,
      );
      stop = runExample(stage, `${pkg.slug}/${slug}`, () => loadMount(pkg.slug, slug), false).stop;
      loadSources(pkg.slug, slug)
        .then((files) => renderSources(sources, files))
        .catch((err: unknown) => console.error('Source view failed', err));
    })
    .catch((err: unknown) => {
      console.error(err);
      root.replaceChildren(h('p', { class: 'sc-example-error' }, 'Could not load this example.'));
    });

  return () => {
    stopped = true;
    stop();
  };
}

function header(ex: ExampleEntry): HTMLElement {
  return h(
    'header',
    { class: 'sc-page-head' },
    h('h1', {}, ex.title),
    h('p', { class: 'dim' }, ex.summary),
    h(
      'p',
      { class: 'sc-tags' },
      h('span', { class: 'tag sc-tag' }, ex.section),
      ...ex.tags.map((t) => h('span', { class: 'tag sc-tag sc-tag-quiet' }, t)),
      ex.provenance === 'legacy'
        ? h(
            'span',
            { class: 'tag sc-tag sc-tag-legacy', title: 'Written before the docs-only rule; not derived from vendored docs' },
            'legacy',
          )
        : null,
    ),
  );
}

function pager(examples: ExampleEntry[], index: number): HTMLElement {
  const link = (ex: ExampleEntry | undefined, label: string): HTMLElement =>
    ex
      ? h('a', { class: 'btn', href: formatRoute({ view: 'example', pkg: ex.pkg, example: ex.slug }) }, label)
      : h('span', {});
  return h(
    'nav',
    { class: 'sc-pager' },
    link(examples[index - 1], '← Previous'),
    h('span', { class: 'dim' }, `${index + 1} / ${examples.length}`),
    link(examples[index + 1], 'Next →'),
  );
}

function docsRefs(ex: ExampleEntry, manifest: DocsManifest, pkg: PackageEntry): Node {
  if (ex.docs.length === 0) return document.createComment('no docs refs (legacy example)');
  return h(
    'section',
    { class: 'sc-docs-refs' },
    h('h2', { class: 'sc-h2' }, 'Built from'),
    pkg.credit ? creditLine(pkg.credit) : null,
    h(
      'ul',
      {},
      ...ex.docs.map((ref) => {
        const raw = manifest.files[ref]?.url;
        const url = raw && /^https?:\/\//.test(raw) ? raw : undefined;
        return h('li', {}, url ? h('a', { href: url, target: '_blank', rel: 'noopener' }, ref) : ref);
      }),
    ),
  );
}
