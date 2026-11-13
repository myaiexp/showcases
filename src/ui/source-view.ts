// Tabbed, syntax-highlighted view of an example's source files

import type { SourceFile } from '../registry.ts';
import { h } from './dom.ts';

export async function renderSources(root: HTMLElement, files: SourceFile[]): Promise<void> {
  if (files.length === 0) return;
  // Prism loads here only, so the gallery views never pay for it.
  const { default: Prism } = await import('prismjs');
  await import('prismjs/components/prism-typescript');

  const tabs = h('div', { class: 'sc-tabs', role: 'tablist' });
  const pre = h('pre', { class: 'sc-code' });
  const show = (file: SourceFile, tab: HTMLElement): void => {
    for (const t of tabs.children) t.classList.toggle('active', t === tab);
    const grammar = file.name.endsWith('.css') ? Prism.languages['css'] : Prism.languages['typescript'];
    const code = h('code', {});
    // Prism.highlight escapes the source; its output is Prism's own token markup.
    if (grammar) code.innerHTML = Prism.highlight(file.code, grammar, file.name);
    else code.textContent = file.code;
    pre.replaceChildren(code);
  };
  for (const file of files) {
    const tab = h('button', { class: 'sc-tab', type: 'button', role: 'tab' }, file.name);
    tab.addEventListener('click', () => show(file, tab));
    tabs.append(tab);
  }
  root.replaceChildren(h('h2', { class: 'sc-h2' }, 'Source'), tabs, pre);
  const first = files[0];
  const firstTab = tabs.firstElementChild;
  if (first && firstTab instanceof HTMLElement) show(first, firstTab);
}
