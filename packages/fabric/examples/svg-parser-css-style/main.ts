// SVG: a style element with class rules is applied to the parsed shapes
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <style>
    .warm { fill: #e94b3c; stroke: #7a1f17; stroke-width: 4 }
    .cool { fill: #3b7dd8 }
    circle.cool { stroke: #1d4a8c; stroke-width: 6; stroke-dasharray: 8 4 }
    #pick { fill: #d99a1c }
  </style>
  <rect class="warm" x="15" y="20" width="75" height="60" rx="8"/>
  <rect class="cool" x="110" y="20" width="75" height="60"/>
  <circle class="cool" cx="55" cy="140" r="32"/>
  <circle id="pick" class="warm" cx="145" cy="140" r="32"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'The parser reads the style element: class, tag.class and #id selectors are matched and the declarations applied. Precedence: style attribute, then CSS rules, then plain attributes.',
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
      const text = flip ? SOURCE.replaceAll('#e94b3c', '#8e5bd6') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
