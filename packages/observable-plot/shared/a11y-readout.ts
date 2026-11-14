// Reads the ARIA attributes Plot wrote into a plot, for the Accessibility pages
import { plotSvg } from './plot.ts';

/** One line per attribute on the root svg, then one per mark group (aria-label, -hidden, -description). */
export function ariaTree(root: Element): string {
  const svg = plotSvg(root);
  if (!svg) return '';
  const lines = [
    `<svg> aria-label=${show(svg.getAttribute('aria-label'))} aria-description=${show(svg.getAttribute('aria-description'))}`,
  ];
  for (const g of svg.querySelectorAll(':scope > g')) {
    const hidden = g.getAttribute('aria-hidden') === 'true';
    const description = g.getAttribute('aria-description');
    lines.push(
      `  <g> aria-label=${show(g.getAttribute('aria-label'))}${description ? ` aria-description=${show(description)}` : ''}${hidden ? '  [aria-hidden: skipped by screen readers]' : ''}`,
    );
  }
  return lines.join('\n');
}

const show = (v: string | null): string => (v === null ? 'none' : `"${v}"`);

/** A text field in the control bar; calls back on every keystroke. */
export function textField(bar: HTMLElement, label: string, value: string, onInput: (v: string) => void): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.size = 34;
  input.addEventListener('input', () => onInput(input.value));
  const wrap = document.createElement('label');
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}

/** The readout under a plot, in full views only; update() rewrites it, remove() tears it down. */
export function ariaReadout(el: HTMLElement, preview: boolean): { update(root: Element): void; remove(): void } {
  const pre = preview ? null : document.createElement('pre');
  if (pre) {
    pre.className = 'op-readout';
    el.append(pre);
  }
  return {
    update: (root) => {
      if (pre) pre.textContent = ariaTree(root);
    },
    remove: () => pre?.remove(),
  };
}
