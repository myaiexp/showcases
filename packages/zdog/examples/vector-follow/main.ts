// Vector follow: a bee eases towards a flower with lerp, showing the distance
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 0.95, rotate: { x: -0.2 } });

  // the flower: where the bee is heading
  const flower = new Zdog.Anchor({ addTo: illo });
  new Zdog.Shape({ addTo: flower, path: [{ y: 0 }, { y: 150 }], stroke: 6, color: '#2a8a4a' }); // stem
  for (let i = 0; i < 6; i++) {
    const v = new Zdog.Vector({ y: -20 }).rotate({ z: (i * TAU) / 6 });
    new Zdog.Shape({ addTo: flower, translate: { x: v.x, y: v.y }, stroke: 22, color: '#C25' });
  }
  new Zdog.Shape({ addTo: flower, translate: { z: 6 }, stroke: 18, color: '#ED0' });

  // the bee: a stripy body and two wings
  const bee = new Zdog.Shape({ addTo: illo, translate: { x: -90, y: -40 }, stroke: 28, color: '#ED0' });
  new Zdog.Shape({ addTo: bee, translate: { x: 16, y: 2 }, stroke: 16, color: '#222' }); // head
  new Zdog.Shape({ addTo: bee, translate: { x: -17 }, stroke: 10, color: '#222' }); // stinger end
  const wings = [-1, 1].map((side) =>
    new Zdog.Ellipse({ addTo: bee, width: 22, height: 12, translate: { y: -14, z: side * 10 }, rotate: { x: 0.6 * side }, stroke: 3, fill: true, color: '#fff' }));

  // a thin guide from the bee to the flower: its length is what magnitude() measures
  const from = { x: 0, y: 0, z: 0 };
  const to = { x: 0, y: 0, z: 0 };
  const guide = new Zdog.Shape({ addTo: illo, path: [from, to], closed: false, stroke: 1.5, color: '#666' });

  let ease = 0.04;
  const info = stage.bar ? readout(stage.bar) : null;
  if (stage.bar) slider(stage.bar, 'ease', 0.01, 0.3, 0.01, ease, (v) => (ease = v), (v) => v.toFixed(2));

  const target = new Zdog.Vector();
  stage.loop((_, t) => {
    // the flower drifts on a loop that goes forward and back in depth
    target.set({ x: Math.sin(t * 0.7) * 90, y: Math.sin(t * 1.4) * 40 - 10, z: Math.cos(t * 0.7) * 60 });
    flower.translate.set(target);
    // each frame the bee moves a fraction of the way to the flower
    // the bee hovers just above the blossom rather than inside it
    const hover = target.copy().add({ y: -46, z: 24 });
    bee.translate.lerp(hover, ease);
    const gap = hover.copy().subtract(bee.translate);
    wings.forEach((w, i) => (w.rotate.x = (i ? 1 : -1) * (0.5 + 0.5 * Math.sin(t * 40))));
    Object.assign(from, bee.translate);
    Object.assign(to, hover);
    guide.updatePath();
    illo.rotate.y = Math.sin(t * 0.3) * 0.6;
    if (info) info.textContent = `distance ${gap.magnitude().toFixed(0)}`;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
