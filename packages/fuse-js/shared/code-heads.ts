// Keeps column headings that hold code, like shouldSort: false, in their written case
import type { Column } from './widgets.ts';
import './code-heads.css';

/** Marks the columns' row so its headings are not upper-cased. */
export function codeHeads(cols: readonly Column[]): void {
  cols[0]?.el.parentElement?.classList.add('fz-code-heads');
}
