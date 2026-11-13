// Fallback view for an unknown package or example slug

import { formatRoute } from '../router.ts';
import { h } from '../ui/dom.ts';

export function notFound(root: HTMLElement, message: string): () => void {
  root.replaceChildren(
    h('a', { class: 'sc-back', href: formatRoute({ view: 'home' }) }, '← All packages'),
    h('p', { class: 'dim' }, message),
  );
  return () => {};
}
