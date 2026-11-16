// SVG: text elements become Text objects with the font, size, fill and anchor
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="200" height="200" fill="#fff7d6"/>
  <text x="100" y="60" font-size="34" font-weight="bold" font-family="sans-serif" fill="#3b7dd8" text-anchor="middle">Fabric</text>
  <text x="20" y="110" font-size="18" font-style="italic" font-family="serif" fill="#e94b3c">parsed text</text>
  <text x="20" y="150" font-size="14" font-family="monospace" fill="#2b2a33" stroke="#2e9e5b" stroke-width="0.6">fill and stroke</text>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'text elements turn into Text objects: font-family, font-size, weight, style, fill, stroke and text-anchor come across. Edit the words.',
    onEdit: (text) => void load(text),
  });
  let token = 0;

  async function load(text: string): Promise<void> {
    const mine = ++token;
    const { objects, options } = await loadSVGFromString(text);
    if (mine !== token || lab.stage.disposed) return;
    const shapes = objects.filter((o): o is FabricObject => o !== null);
    showParsed(lab.canvas, shapes.length ? [util.groupSVGElements(shapes, options)] : []);
    lab.say(`${shapes.length} objects: ${shapes.map((s) => (s.constructor as typeof FabricObject).type).join(', ')}`);
  }

  lab.setSource(SOURCE);
  void load(SOURCE);
  if (!lab.stage.bar) {
    let flip = false;
    lab.stage.every(1500, () => {
      flip = !flip;
      const text = flip ? SOURCE.replaceAll('Fabric', 'Parser') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
