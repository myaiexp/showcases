// Package view: the package's examples grouped by docs section, as live previews

import { PreviewHost } from '../preview/host.ts';
import {
  type ExampleEntry,
  type PackageEntry,
  loadComparisons,
  loadExamples,
  loadMount,
} from '../registry.ts';
import { formatRoute } from '../router.ts';
import type { ComparisonDef } from '../types.ts';
import { h } from '../ui/dom.ts';
import { notFound } from './not-found.ts';

/** Cards added per batch as the reader nears the bottom, so a huge package starts fast. */
const BATCH = 24;

export function renderPackage(root: HTMLElement, pkg: PackageEntry | undefined): () => void {
  if (!pkg) return notFound(root, 'No such package.');
  const host = new PreviewHost();
  const body = h('div', { class: 'sc-sections' }, h('p', { class: 'dim' }, 'Loading examples…'));
  root.replaceChildren(
    h('a', { class: 'sc-back', href: formatRoute({ view: 'home' }) }, '← All packages'),
    h(
      'header',
      { class: 'sc-page-head' },
      h('h1', {}, pkg.name),
      h('p', { class: 'dim' }, pkg.tagline),
      pkg.about ? h('p', { class: 'sc-about' }, pkg.about) : null,
      h(
        'p',
        { class: 'sc-links' },
        h('a', { href: pkg.docsUrl, target: '_blank', rel: 'noopener' }, 'Docs'),
        h('a', { href: pkg.repo, target: '_blank', rel: 'noopener' }, 'Source'),
        h('code', {}, `npm i ${pkg.npm}`),
      ),
    ),
    body,
  );

  let stopped = false;
  let sentinelObserver: IntersectionObserver | undefined;
  loadExamples(pkg)
    .then((examples) => {
      if (stopped) return;
      body.replaceChildren();
      if (examples.length === 0) body.append(h('p', { class: 'dim' }, 'No examples yet.'));
      sentinelObserver = renderInBatches(body, examples, host);
      // Comparisons are extra: a failure here is logged, never shown over the gallery.
      loadComparisons(pkg.slug)
        .then((list) => {
          if (!stopped && list.length > 0) root.append(community(list));
        })
        .catch((err: unknown) => console.error('Could not load comparisons', err));
    })
    .catch((err: unknown) => {
      console.error(err);
      body.replaceChildren(h('p', { class: 'sc-example-error' }, 'Could not load examples.'));
    });

  return () => {
    stopped = true;
    sentinelObserver?.disconnect();
    host.dispose();
  };
}

function renderInBatches(
  body: HTMLElement,
  examples: ExampleEntry[],
  host: PreviewHost,
): IntersectionObserver {
  const grids = new Map<string, HTMLElement>();
  const sentinel = h('div', { class: 'sc-sentinel' });
  let next = 0;

  const addBatch = (): void => {
    for (const ex of examples.slice(next, next + BATCH)) {
      let grid = grids.get(ex.section);
      if (!grid) {
        grid = h('div', { class: 'card-grid sc-example-grid' });
        grids.set(ex.section, grid);
        body.insertBefore(h('section', {}, h('h2', { class: 'sc-h2' }, ex.section), grid), sentinel);
      }
      grid.append(exampleCard(ex, host));
    }
    next += BATCH;
    if (next >= examples.length) {
      observer.disconnect();
      return;
    }
    // An observer only fires on a change of intersection: if the sentinel is still in
    // range after this batch, re-observing makes it report again so loading continues.
    observer.unobserve(sentinel);
    observer.observe(sentinel);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) addBatch();
    },
    { rootMargin: '600px 0px' },
  );
  body.append(sentinel);
  addBatch();
  return observer;
}

/** Community examples set beside ours (comparison phase). Links only; nothing embedded. */
function community(list: ComparisonDef[]): HTMLElement {
  return h(
    'section',
    { class: 'sc-community' },
    h('h2', { class: 'sc-h2' }, 'Community examples'),
    h(
      'ul',
      { class: 'sc-community-list' },
      ...list.map((c) =>
        h(
          'li',
          {},
          h('a', { href: c.sourceUrl, target: '_blank', rel: 'noopener' }, c.title),
          ` by ${c.author}. `,
          h('span', { class: 'dim' }, c.notes),
        ),
      ),
    ),
  );
}

function exampleCard(ex: ExampleEntry, host: PreviewHost): HTMLElement {
  const stage = h('div', { class: 'sc-stage' });
  const card = h(
    'a',
    { class: 'sc-card sc-example-card', href: formatRoute({ view: 'example', pkg: ex.pkg, example: ex.slug }) },
    stage,
    h('div', { class: 'sc-card-title' }, ex.title),
    h('p', { class: 'dim' }, ex.summary),
    ex.provenance === 'legacy' ? h('span', { class: 'tag sc-tag sc-tag-legacy' }, 'legacy') : null,
  );
  if (ex.audio) {
    stage.append(h('div', { class: 'sc-stage-static' }, '♪ Sound example: open to play'));
  } else {
    host.observe(stage, `${ex.pkg}/${ex.slug}`, () => loadMount(ex.pkg, ex.slug));
  }
  return card;
}
