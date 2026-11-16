// viewBox and preserveAspectRatio decide how parsed SVG fits its size
import { loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const MODES = ['xMidYMid meet', 'xMinYMin meet', 'xMaxYMax meet', 'xMidYMid slice', 'none'] as const;

// A 200 x 100 document whose viewBox is a 100 x 100 square: the two aspect ratios differ.
const source = (mode: string): string => `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"
  viewBox="0 0 100 100" preserveAspectRatio="${mode}">
  <rect x="1" y="1" width="98" height="98" fill="#fff7d6" stroke="#2b2a33" stroke-width="2"/>
  <circle cx="50" cy="50" r="38" fill="#3b7dd8"/>
  <path d="M20 80 L50 15 L80 80 Z" fill="#e94b3c"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 100],
    hint: 'The document is 200 x 100 with a square viewBox. preserveAspectRatio chooses between meet (fit inside), slice (cover, cropped) and none (stretch), and the alignment.',
    onEdit: (text) => void load(text),
  });
  let token = 0;

  async function load(text: string): Promise<void> {
    const mine = ++token;
    const { objects, options } = await loadSVGFromString(text);
    if (mine !== token || lab.stage.disposed) return;
    const shapes = objects.filter((o): o is FabricObject => o !== null);
    showParsed(lab.canvas, shapes.length ? [util.groupSVGElements(shapes, options)] : []);
    lab.say(`${shapes.length} objects, size ${options.width} x ${options.height}`);
  }
  const use = (mode: string): void => {
    lab.setSource(source(mode));
    void load(source(mode));
  };

  use(MODES[0]);
  if (lab.stage.bar) select(lab.stage.bar, 'preserveAspectRatio', MODES, use);
  else {
    let i = 0;
    lab.stage.every(1500, () => use(MODES[++i % MODES.length]!));
  }

  return lab.stage.dispose;
};

export default mount;
