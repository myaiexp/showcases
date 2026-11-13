// Shared Mermaid setup: one initialize() for the page and a render helper
import mermaid from 'mermaid';
import type { MermaidConfig } from 'mermaid';
import './mermaid.css';

/**
 * The site is dark, so every diagram defaults to Mermaid's dark theme. Examples that are
 * about a theme, look or layout set it in the diagram's own frontmatter, which outranks
 * initialize() (theming.md § Per-diagram defaults), so they never touch this call.
 * startOnLoad is off because examples render on demand (usage.md § Using mermaid.run).
 *
 * initialize() is page-wide. An example about a site-level setting that frontmatter cannot
 * carry (securityLevel, say) calls initialize({ ...BASE_CONFIG, ... }) and restores
 * BASE_CONFIG in its cleanup.
 */
export const BASE_CONFIG: MermaidConfig = { startOnLoad: false, theme: 'dark' };
mermaid.initialize(BASE_CONFIG);

export { mermaid };

let counter = 0;
/** mermaid.render() needs a page-unique id for the SVG it builds. */
export const nextId = (): string => `mm-${++counter}`;

export interface Rendered {
  /** The svg element now inside the target, or null if the mount was aborted meanwhile. */
  svg: SVGSVGElement | null;
  diagramType: string;
}

/**
 * Renders `code` with mermaid.render() and puts the SVG into `target`, replacing what was
 * there, then calls bindFunctions so click handlers and tooltips work (usage.md § Binding
 * events). Throws Mermaid's parse error for invalid code.
 *
 * `measureIn` is render()'s svgContainingElement: Mermaid draws there while it measures.
 * Diagrams that size themselves from their container (Gantt takes its width from it) need
 * the visible box here when `target` is a detached staging element.
 */
export async function renderInto(
  target: HTMLElement,
  code: string,
  signal?: AbortSignal,
  measureIn?: Element,
): Promise<Rendered> {
  const { svg, bindFunctions, diagramType } = await mermaid.render(nextId(), code, measureIn);
  if (signal?.aborted) return { svg: null, diagramType };
  // The SVG string comes from mermaid.render(), which sanitizes labels itself at the
  // default 'strict' securityLevel; this is the insertion the usage docs show.
  target.innerHTML = svg;
  bindFunctions?.(target);
  return { svg: target.querySelector('svg'), diagramType };
}
