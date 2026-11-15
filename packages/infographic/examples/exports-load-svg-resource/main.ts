// loadSVGResource(): an <svg> string becomes a symbol reused at several sizes
import { loadSVGResource } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SVGS = [
  { name: 'a circle', svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>' },
  { name: 'a star', svg: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="currentColor"/></svg>' },
  { name: 'a ring and a dot', svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>' },
];
const COLOURS = ['#F6BD16', '#61DDAA', '#F08BB4'];
const SVGNS = 'http://www.w3.org/2000/svg';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 260 });
  stage.box.style.cssText += ';background:#161618;display:flex;flex-direction:column;gap:8px;padding:10px;justify-content:center';
  const stack = document.createElement('div');
  stack.style.cssText = 'display:flex;align-items:flex-end;justify-content:center;gap:14px';
  const markup = document.createElement('pre');
  markup.style.cssText = 'margin:0;font:10px monospace;color:#9cdcfe;white-space:pre-wrap;word-break:break-all;max-height:80px;overflow:hidden';
  stage.box.append(stack, markup);

  stage.cycle(
    SVGS.map(({ name, svg }, i) => ({
      say: `loadSVGResource(${name})`,
      run: () => {
        const symbol = loadSVGResource(svg);
        if (!symbol) return stage.say('loadSVGResource returned null', 'bad');
        const id = `showcase-symbol-${i}`;
        markup.textContent = `-> <${symbol.tagName} viewBox="${symbol.getAttribute('viewBox')}"> with ${symbol.children.length} child nodes`;
        const sizes = ctx.preview ? [28, 48, 72] : [32, 64, 128];
        // The symbol lives once in a defs block; every <use> draws it at its own size.
        const defs = document.createElementNS(SVGNS, 'svg');
        defs.setAttribute('width', '0');
        defs.setAttribute('height', '0');
        defs.style.position = 'absolute';
        // The returned symbol has no namespace of its own, so it is re-parsed from its markup to be drawn.
        defs.innerHTML = symbol.outerHTML.replace('<symbol', `<symbol id="${id}"`);
        stack.replaceChildren(
          defs,
          ...sizes.map((px) => {
            const holder = document.createElementNS(SVGNS, 'svg');
            holder.setAttribute('width', String(px));
            holder.setAttribute('height', String(px));
            holder.style.color = COLOURS[i] ?? '#fff';
            const use = document.createElementNS(SVGNS, 'use');
            use.setAttribute('href', `#${id}`);
            use.setAttribute('width', String(px));
            use.setAttribute('height', String(px));
            holder.append(use);
            return holder;
          }),
        );
      },
      hold: 1700,
    })),
  );
  return () => stage.dispose();
};

export default mount;
