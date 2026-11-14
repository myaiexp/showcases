// Transform playground: translate, rotate and scale one paper plane
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the picture to turn the whole scene; the sliders move the plane.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.5,
    rotate: { x: -0.5, y: -0.8 },
    dragRotate: !stage.preview,
  });

  // an Anchor is the plane's handle: everything added to it follows its translate/rotate/scale
  const plane = new Zdog.Anchor({ addTo: illo, scale: 1 });
  const nose = { x: 60, y: 0, z: 0 };
  const tail = { x: -50, y: 0, z: 0 };
  const paper = { addTo: plane, closed: true, fill: true, stroke: 2 };
  new Zdog.Shape({ ...paper, path: [nose, { x: -50, y: -10, z: -48 }, tail], color: '#fff' });
  new Zdog.Shape({ ...paper, path: [nose, { x: -50, y: -10, z: 48 }, tail], color: '#FDB' });
  new Zdog.Shape({ ...paper, path: [nose, tail, { x: -50, y: 18, z: 0 }], color: '#C25' });
  // a gold dot marks the origin the transforms are measured from
  new Zdog.Shape({ addTo: illo, stroke: 6, color: '#EA0' });

  const code = stage.bar ? readout(stage.bar) : null;
  const show = (): void => {
    if (!code) return;
    const d = (r: number): number => Math.round((r * 180) / Math.PI);
    code.textContent =
      `translate: { x: ${plane.translate.x}, y: ${plane.translate.y} }\n` +
      `rotate: { x: ${d(plane.rotate.x)}deg, y: ${d(plane.rotate.y)}deg, z: ${d(plane.rotate.z)}deg }\n` +
      `scale: ${plane.scale.x}`;
  };
  if (stage.bar) {
    const bar = stage.bar;
    const deg = (v: number): string => `${v}deg`;
    const rad = (v: number): number => (v * Math.PI) / 180;
    slider(bar, 'translate x', -60, 60, 1, 0, (v) => { plane.translate.x = v; show(); });
    slider(bar, 'translate y', -60, 60, 1, 0, (v) => { plane.translate.y = v; show(); });
    slider(bar, 'rotate x', -180, 180, 1, 0, (v) => { plane.rotate.x = rad(v); show(); }, deg);
    slider(bar, 'rotate y', -180, 180, 1, 0, (v) => { plane.rotate.y = rad(v); show(); }, deg);
    slider(bar, 'rotate z', -180, 180, 1, 0, (v) => { plane.rotate.z = rad(v); show(); }, deg);
    slider(bar, 'scale', 0.4, 1.8, 0.05, 1, (v) => { plane.scale.x = plane.scale.y = plane.scale.z = v; show(); });
    show();
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      // the card flies a loop-the-loop with all three transforms
      const a = t * 1.4;
      plane.translate.x = 45 * Math.cos(a);
      plane.translate.y = 45 * Math.sin(a);
      plane.rotate.z = a + Math.PI / 2;
      plane.rotate.x = 0.5 * Math.sin(a * 2);
      const s = 0.85 + 0.2 * Math.sin(a);
      plane.scale.x = plane.scale.y = plane.scale.z = s;
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
