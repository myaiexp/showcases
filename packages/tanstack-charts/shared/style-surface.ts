// Reads back what assistive technology gets from a mounted chart: roles, names, descriptions
export function describeSurface(box: HTMLElement): string {
  const root = box.querySelector('svg, [role="img"]');
  if (!root) return 'no chart surface yet';
  const lines = [`<${root.tagName.toLowerCase()}>`];
  for (const name of ['role', 'aria-roledescription', 'aria-label', 'tabindex', 'aria-hidden']) {
    const v = root.getAttribute(name);
    if (v !== null) lines.push(`  ${name}="${v}"`);
  }
  const desc = root.querySelector('desc');
  if (desc) lines.push(`  <desc>${desc.textContent}</desc>`);
  const title = root.querySelector('title');
  if (title) lines.push(`  <title>${title.textContent}</title>`);
  return lines.join('\n');
}

/** Lists every role, canvas and svg element under a chart box with its accessibility attributes. */
export function describeTree(box: HTMLElement): string {
  return [...box.querySelectorAll('[role], canvas, svg')]
    .map((e) => {
      const attrs = ['role', 'aria-label', 'aria-hidden', 'tabindex'].flatMap((n) => (e.hasAttribute(n) ? [`${n}="${e.getAttribute(n)}"`] : []));
      return `<${e.tagName.toLowerCase()}> ${attrs.join(' ')}`;
    })
    .join('\n');
}
