// SVG: linearGradient and radialGradient in defs become fabric Gradient fills
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2b134"/>
      <stop offset="1" stop-color="#e94b3c"/>
    </linearGradient>
    <radialGradient id="ball" cx="0.35" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#3b7dd8"/>
    </radialGradient>
  </defs>
  <rect x="15" y="20" width="170" height="70" rx="10" fill="url(#sky)"/>
  <circle cx="100" cy="145" r="42" fill="url(#ball)"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'Gradients are defined in defs and referenced with fill="url(#id)". The parser resolves them into Gradient objects on the fill. Edit a stop-color.',
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
      const text = flip ? SOURCE.replaceAll('#f2b134', '#2e9e5b') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
