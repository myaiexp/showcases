// Serializes a plot to SVG markup with outerHTML, as the Node.js section does
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';

const mount: Mount = async (el, { preview, signal }) => {
  const penguins = await csv('penguins.csv');
  if (signal.aborted) return () => {};

  // The Node section passes a JSDOM document as the `document` option; in a browser
  // the page's own document serves, so Plot builds the svg with it.
  const plot = Plot.plot({
    document,
    style: { color: '#ccc' },
    marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
  });
  plot.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
  plot.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
  const markup = plot.outerHTML;

  // The serialized string is a standalone SVG file: shown here as an <img>, never as live DOM.
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml' }));
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Penguin scatterplot rendered from serialized SVG';
  img.style.cssText = preview ? 'max-height:150px;max-width:100%' : 'max-width:100%';
  const info = document.createElement('pre');
  info.style.cssText = 'margin:8px 0 0;font-size:12px;white-space:pre-wrap;width:100%;color:var(--fg-2)';
  info.textContent = preview
    ? `${(markup.length / 1024).toFixed(0)} KB of SVG markup`
    : `${markup.length.toLocaleString()} characters of SVG markup:\n\n${markup.slice(0, 600)}…`;
  el.append(img, info);

  return () => {
    URL.revokeObjectURL(url);
    img.remove();
    info.remove();
  };
};

export default mount;
