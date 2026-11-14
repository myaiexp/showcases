// renderGraph slideshow: three off-scene souvenirs shown one at a time
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

// not added to any Illustration: each model is a free-standing Anchor
// inside `up`, +z points to the sky
function model(): { root: Zdog.Anchor; up: Zdog.Anchor } {
  const root = new Zdog.Anchor();
  const up = new Zdog.Anchor({ addTo: root, rotate: { x: TAU / 4 } });
  return { root, up };
}

function tree(): Zdog.Anchor {
  const { root, up } = model();
  new Zdog.Cylinder({ addTo: up, diameter: 24, length: 40, translate: { z: -70 }, stroke: false, color: '#8a4f20', frontFace: '#6b3a14', backface: '#6b3a14' });
  [[110, 70, -60, '#2a8a4a'], [86, 62, -22, '#35a85a'], [58, 54, 18, '#4ac06e']].forEach(([d, l, z, color]) =>
    new Zdog.Cone({ addTo: up, diameter: d as number, length: l as number, translate: { z: z as number }, stroke: false, color: color as string, backface: '#1d6a38' }));
  new Zdog.Shape({ addTo: up, translate: { z: 78 }, stroke: 14, color: '#ED0' });
  return root;
}

function mushroom(): Zdog.Anchor {
  const { root, up } = model();
  new Zdog.Cylinder({ addTo: up, diameter: 40, length: 56, translate: { z: -34 }, stroke: false, color: '#FDB', frontFace: '#e9c79a', backface: '#e9c79a' });
  new Zdog.Hemisphere({ addTo: up, diameter: 120, translate: { z: -6 }, stroke: false, color: '#C25', backface: '#fff' });
  for (const [x, y] of [[22, 14], [-24, 20], [4, -30], [-30, -16], [34, -12]] as const) {
    const z = Math.sqrt(60 * 60 - x * x - y * y) - 6;
    new Zdog.Shape({ addTo: up, translate: { x, y, z: z + 1 }, stroke: 16, color: '#fff' });
  }
  return root;
}

function iceCream(): Zdog.Anchor {
  const { root, up } = model();
  new Zdog.Cone({ addTo: up, diameter: 64, length: 100, translate: { z: -30 }, rotate: { y: TAU / 2 }, stroke: false, color: '#EA0', backface: '#E62' });
  new Zdog.Shape({ addTo: up, translate: { z: -30 }, stroke: 70, color: '#f7a8c4' });
  new Zdog.Shape({ addTo: up, translate: { z: 20 }, stroke: 60, color: '#a35ac9' });
  new Zdog.Shape({ addTo: up, translate: { z: 62 }, stroke: 16, color: '#C25' });
  return root;
}

const NAMES = ['pine tree', 'mushroom', 'ice cream'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // the Illustration holds no shapes of its own: only its view (rotate, zoom) is used
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 0.95, rotate: { x: -0.3 } });
  const models = [tree(), mushroom(), iceCream()];
  let index = 0;
  let shownAt = 0;
  let now = 0;
  const show = (i: number): void => {
    index = (i + models.length) % models.length;
    shownAt = now;
  };
  if (stage.bar) {
    button(stage.bar, 'previous', () => show(index - 1));
    button(stage.bar, 'next', () => show(index + 1));
    const label = document.createElement('span');
    label.style.fontSize = '13px';
    stage.bar.append(label);
    stage.loop(() => {
      label.textContent = `${index + 1} / ${models.length}: ${NAMES[index]}`;
    });
  } else {
    stage.every(2000, () => show(index + 1));
  }

  stage.loop((_, t) => {
    now = t;
    const item = models[index]!;
    // the new model pops in with an eased scale
    const grow = Zdog.easeInOut(Math.min(1, (t - shownAt) / 0.5), 3);
    item.scale.x = item.scale.y = item.scale.z = Math.max(0.01, grow);
    item.rotate.y = t * 0.9;
    // a detached item is not in the Illustration's graph: update it, then render it
    item.updateGraph();
    illo.renderGraph(item);
  });
  return stage.dispose;
};

export default mount;
