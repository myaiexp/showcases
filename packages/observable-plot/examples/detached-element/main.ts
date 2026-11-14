// Plot returns a detached element that the page appends, as in vanilla HTML
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';

const mount: Mount = (el, { preview }) => {
  const div = document.createElement('div');
  div.id = 'myplot';
  div.style.color = 'var(--fg-1)';
  const note = document.createElement('p');
  note.style.cssText = 'margin:8px 0 0;font-size:13px;color:var(--fg-2)';
  el.append(div);
  if (!preview) el.append(note);

  const draw = (): void => {
    // The getting-started snippet: uniform values from Math.random, binned and counted.
    const plot = Plot.rectY({ length: 10000 }, Plot.binX({ y: 'count' }, { x: Math.random })).plot(
      preview ? { width: 280, height: 190 } : {},
    );
    // The plot exists before it is in the page; replace the old one with it.
    note.textContent = `Plot returned a detached <${plot.tagName.toLowerCase()}> (isConnected: ${plot.isConnected}), then div.append(plot) put it in the page.`;
    div.replaceChildren();
    div.append(plot);
  };
  draw();
  const timer = setInterval(draw, preview ? 2200 : 3000);

  return () => {
    clearInterval(timer);
    div.remove();
    note.remove();
  };
};

export default mount;
