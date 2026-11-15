// The attribution line a CC BY docs licence requires: whose docs, which licence
import type { DocsCredit } from '../types.ts';
import { h } from './dom.ts';

/** "Built from <work>, licensed <licence>; the examples adapt it." with both links. */
export function creditLine(credit: DocsCredit): HTMLParagraphElement {
  const link = (href: string, text: string): HTMLAnchorElement =>
    h('a', { href, target: '_blank', rel: 'noopener' }, text);
  return h(
    'p',
    { class: 'sc-credit dim' },
    'Built from ',
    link(credit.url, credit.text),
    ', licensed ',
    link(credit.licenseUrl, credit.license),
    '. The examples adapt that documentation; changes are ours.',
  );
}
