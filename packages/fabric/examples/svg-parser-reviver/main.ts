// SVG: the parser reviver sees each svg element and its new object, and can edit the object
import { loadSVGFromString, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect id="header" data-locked="true" x="10" y="10" width="180" height="40" fill="#3b7dd8"/>
  <circle id="knob" cx="50" cy="110" r="30" fill="#e94b3c"/>
  <circle id="lamp" data-locked="true" cx="120" cy="110" r="30" fill="#f2b134"/>
  <rect id="footer" x="10" y="155" width="180" height="35" fill="#2e9e5b"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'The reviver is the second argument of loadSVGFromString. It gets (element, object) for each shape: here it reads id and data-locked, which fabric ignores, and locks those objects. Try dragging them.',
    onEdit: (text) => void load(text),
  });
  let token = 0;

  async function load(text: string): Promise<void> {
    const mine = ++token;
    const names: string[] = [];
    const { objects } = await loadSVGFromString(text, (element, object) => {
      const locked = element.getAttribute('data-locked') === 'true';
      // Properties outside fabric's own list stay on the instance, like any custom property.
      Object.assign(object, { name: element.getAttribute('id') });
      if (locked) object.set({ selectable: false, evented: false, opacity: 0.55 });
      names.push(`${element.getAttribute('id')}${locked ? ' (locked)' : ''}`);
    });
    if (mine !== token || lab.stage.disposed) return;
    // Added one by one: the shapes keep their own positions, so they can be dragged apart.
    showParsed(lab.canvas, objects.filter((o): o is FabricObject => o !== null));
    lab.say(names.join(', '));
  }

  lab.setSource(SOURCE);
  void load(SOURCE);
  if (!lab.stage.bar) {
    let flip = false;
    lab.stage.every(1500, () => {
      flip = !flip;
      const text = flip ? SOURCE.replace('id="knob"', 'id="knob" data-locked="true"') : SOURCE;
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
