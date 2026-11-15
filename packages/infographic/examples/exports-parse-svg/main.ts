// parseSVG(): an SVG string becomes a page element, or null if it is not SVG
import { parseSVG } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const INPUTS = [
  { name: 'a circle', text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#61DDAA"/></svg>' },
  { name: 'two shapes', text: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><rect x="10" y="10" width="60" height="80" rx="8" fill="#F6BD16"/><polygon points="90,90 120,10 150,90" fill="#F08BB4"/></svg>' },
  { name: 'text, not svg', text: 'this is not markup <<<' },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 240 });
  stage.box.style.cssText += ';background:#161618;display:flex;align-items:center;justify-content:center';

  stage.cycle(
    INPUTS.map(({ name, text }) => ({
      run: () => {
        let node: SVGSVGElement | null = null;
        let failure = '';
        try {
          node = parseSVG<SVGSVGElement>(text);
        } catch (err) {
          failure = err instanceof Error ? err.message : String(err);
        }
        if (!node) {
          stage.box.replaceChildren();
          stage.say(`parseSVG(${name}) -> null${failure ? ` (threw: ${failure.slice(0, 40)})` : ''}`, 'warn');
          return;
        }
        node.setAttribute('width', ctx.preview ? '90' : '200');
        node.setAttribute('height', ctx.preview ? '90' : '200');
        stage.box.replaceChildren(node);
        stage.say(`parseSVG(${name}) -> <${node.tagName}> viewBox="${node.getAttribute('viewBox')}"`, 'ok');
      },
      hold: 1500,
    })),
  );
  return () => stage.dispose();
};

export default mount;
