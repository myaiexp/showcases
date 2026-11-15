// Puts a rendered D2 SVG into a box: parsed as XML, fitted, links made safe
import { boardOf } from './boards.ts';

/** What a click on one of the diagram's links does, by kind of link. */
export interface LinkHandlers {
  /** A link to another board ("layers.x"): the gallery's own hash routes must not see it. */
  onBoardLink?: (board: string) => void;
  /**
   * Keep D2's own sizing (width, height, preserveAspectRatio) instead of fitting the box,
   * for examples about the options that set it (scale, center).
   */
  raw?: boolean;
}

/** The SVG's own size from its viewBox, in user units. */
export function svgSize(svg: SVGSVGElement): { width: number; height: number } {
  const vb = svg.viewBox.baseVal;
  if (vb && vb.width > 0) return { width: vb.width, height: vb.height };
  const [, , w = '0', h = '0'] = (svg.getAttribute('viewBox') ?? '').split(/[\s,]+/);
  return { width: Number(w), height: Number(h) };
}

/**
 * Parses D2's SVG output and swaps it into `box`. It is parsed as XML, not set as HTML,
 * so the Markdown labels' foreignObject keeps its XHTML namespace and nothing runs.
 */
export function putSvg(box: HTMLElement, text: string, links: LinkHandlers = {}): SVGSVGElement {
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const error = doc.querySelector('parsererror');
  if (error) throw new Error(`D2 returned SVG the browser cannot parse: ${error.textContent ?? ''}`);
  const svg = document.importNode(doc.documentElement, true) as unknown as SVGSVGElement;
  if (!links.raw) {
    // D2 pins the top-left corner (xMinYMin); centring reads better in a fixed box.
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.classList.add('dd-svg');
  }
  for (const a of Array.from(svg.querySelectorAll('a'))) {
    const href = a.getAttribute('href') ?? a.getAttribute('xlink:href') ?? '';
    if (/^https?:\/\//i.test(href)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      continue;
    }
    // Board links come out as "root.layers.x": relative URLs that would leave the gallery.
    a.addEventListener('click', (event) => {
      event.preventDefault();
      links.onBoardLink?.(boardOf(href));
    });
  }
  box.replaceChildren(svg);
  return svg;
}
