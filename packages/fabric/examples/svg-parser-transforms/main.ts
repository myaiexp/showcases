// SVG: transform attributes become object angle, scale, skew and position
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect x="20" y="20" width="60" height="40" fill="#3b7dd8" transform="rotate(20 50 40)"/>
  <rect x="110" y="20" width="60" height="40" fill="#e94b3c" transform="skewX(-25)"/>
  <g transform="translate(30 110) scale(1.5 1)">
    <circle cx="30" cy="30" r="25" fill="#2e9e5b"/>
    <rect x="0" y="62" width="60" height="14" fill="#8e5bd6"/>
  </g>
  <rect x="120" y="120" width="50" height="50" fill="#d99a1c" transform="matrix(1 0.3 -0.3 1 20 0)"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'rotate, skewX, translate, scale and matrix in transform attributes are applied by the parser: nested groups compose their matrices. Edit an angle.',
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
      const text = flip ? SOURCE.replaceAll('rotate(20', 'rotate(60') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
