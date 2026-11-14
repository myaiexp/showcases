// Primitive explorer: every Zdog shape class, one at a time, with its size and stroke
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const KINDS = [
  'Shape (dot)',
  'Rect',
  'RoundedRect',
  'Ellipse',
  'Polygon',
  'Hemisphere',
  'Cone',
  'Cylinder',
  'Box',
] as const;
type Kind = (typeof KINDS)[number];

// Each class takes its own size options; `size` is the one number the slider changes.
function build(kind: Kind, addTo: Zdog.Anchor, size: number, stroke: number): Zdog.Shape {
  switch (kind) {
    case 'Shape (dot)':
      return new Zdog.Shape({ addTo, stroke: size, color: '#a35ac9' });
    case 'Rect':
      return new Zdog.Rect({ addTo, width: size, height: size * 0.7, stroke, color: '#E62' });
    case 'RoundedRect':
      return new Zdog.RoundedRect({ addTo, width: size, height: size * 0.7, cornerRadius: size / 5, stroke, color: '#EA0' });
    case 'Ellipse':
      return new Zdog.Ellipse({ addTo, diameter: size, stroke, color: '#C25' });
    case 'Polygon':
      return new Zdog.Polygon({ addTo, radius: size / 2, sides: 5, stroke, color: '#EA0' });
    case 'Hemisphere':
      return new Zdog.Hemisphere({ addTo, diameter: size, stroke: false, color: '#C25', backface: '#EA0' });
    case 'Cone':
      return new Zdog.Cone({ addTo, diameter: size * 0.8, length: size, stroke: false, color: '#a35ac9', backface: '#C25' });
    case 'Cylinder':
      return new Zdog.Cylinder({ addTo, diameter: size * 0.8, length: size, stroke: false, color: '#C25', frontFace: '#EA0', backface: '#E62' });
    case 'Box':
      return new Zdog.Box({
        addTo, width: size, height: size * 0.8, depth: size * 0.7, stroke: false,
        color: '#C25', leftFace: '#EA0', rightFace: '#E62', topFace: '#ED0', bottomFace: '#a35ac9',
      });
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to rotate.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.4 },
    dragRotate: true,
  });

  let kind: Kind = 'Box';
  let size = 110;
  let stroke = 16;
  let shape = build(kind, illo, size, stroke);
  const rebuild = (): void => {
    shape.remove(); // take the old shape out of the scene graph
    shape = build(kind, illo, size, stroke);
  };

  if (stage.bar) {
    select(stage.bar, 'class', KINDS, (v) => { kind = v; rebuild(); }, kind);
    slider(stage.bar, 'size', 40, 160, 1, size, (v) => { size = v; rebuild(); });
    slider(stage.bar, 'stroke', 0, 40, 1, stroke, (v) => { stroke = v; rebuild(); });
  } else {
    // cards walk through the whole catalogue
    let i = KINDS.indexOf(kind);
    stage.every(1800, () => {
      kind = KINDS[++i % KINDS.length]!;
      rebuild();
    });
  }

  stage.loop(() => {
    illo.rotate.y += 0.02;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
