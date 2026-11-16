// SVG: use elements copy a defs shape; the shape itself in defs is not drawn
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <g id="flower">
      <circle cx="0" cy="-14" r="10"/><circle cx="14" cy="0" r="10"/>
      <circle cx="0" cy="14" r="10"/><circle cx="-14" cy="0" r="10"/>
      <circle cx="0" cy="0" r="7" fill="#fff3b0"/>
    </g>
  </defs>
  <use href="#flower" x="50" y="50" fill="#e94b3c"/>
  <use href="#flower" x="140" y="70" fill="#8e5bd6"/>
  <use href="#flower" x="95" y="145" fill="#3b7dd8" transform="scale(1.4)"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'The flower group sits in defs and is never drawn alone; every use element is parsed into a copy, taking its own x, y, fill and transform.',
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
      const text = flip ? SOURCE.replaceAll('#e94b3c', '#2e9e5b') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
