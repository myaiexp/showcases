// loadSVGFromString: one group with groupSVGElements, or separate objects
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect x="20" y="30" width="80" height="60" rx="8" fill="#3b7dd8"/>
  <circle cx="140" cy="70" r="30" fill="#e94b3c" stroke="#7a1f17" stroke-width="3"/>
  <path d="M40 160 L100 120 L160 160 Z" fill="#2e9e5b"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'The parser returns an array of objects and the svg options. groupSVGElements(objects, options) makes one Group (or the single object) of them; without it each shape is its own object.',
    onEdit: (text) => void load(text),
  });
  let source = SOURCE;
  let grouped = true;
  let token = 0;

  async function load(text: string): Promise<void> {
    source = text;
    const mine = ++token;
    // objects: one fabric object per drawable element; options: width, height, viewBox of the document
    const { objects, options } = await loadSVGFromString(text);
    if (mine !== token || lab.stage.disposed) return;
    const shapes = objects.filter((o): o is FabricObject => o !== null);
    showParsed(lab.canvas, grouped ? [util.groupSVGElements(shapes, options)] : shapes);
    lab.say(grouped ? `1 object (grouped) from ${shapes.length} shapes` : `${shapes.length} separate objects`);
  }

  lab.setSource(SOURCE);
  void load(SOURCE);
  if (lab.stage.bar) checkbox(lab.stage.bar, 'groupSVGElements', true, (on) => ((grouped = on), void load(source)));
  else {
    lab.stage.every(1800, () => {
      grouped = !grouped;
      void load(source).then(() => lab.canvas.setActiveObject(lab.canvas.item(0)));
    });
  }

  return lab.stage.dispose;
};

export default mount;
