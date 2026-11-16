// SVG: clipPath elements become the clipPath of the objects that reference them
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <clipPath id="round"><circle cx="60" cy="60" r="40"/></clipPath>
    <clipPath id="bite"><rect x="110" y="110" width="60" height="60"/></clipPath>
  </defs>
  <rect x="10" y="10" width="100" height="100" fill="#3b7dd8" clip-path="url(#round)"/>
  <rect x="100" y="100" width="90" height="90" fill="#e94b3c" clip-path="url(#bite)"/>
  <path d="M20 190 L100 120 L180 190 Z" fill="#2e9e5b" opacity="0.8"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'clip-path="url(#id)" refers to a clipPath in defs. The parser gives the shape a fabric clipPath object built from the clip shapes.',
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
      const text = flip ? SOURCE.replaceAll('r="40"', 'r="25"') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
