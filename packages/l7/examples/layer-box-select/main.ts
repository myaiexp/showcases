// layer.boxSelect([x1, y1, x2, y2], cb): the features inside a pixel rectangle
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 6 : 9, 4, [10, 46], 3), PARSER)
    .shape('circle')
    .size(ctx.preview ? 12 : 16)
    .color('#4ecdc4');
  const picked = new Set<number>();
  layer.color('id', (id: number) => (picked.has(id) ? '#ff4d4d' : '#4ecdc4'));
  scene.addLayer(layer);

  // A frame for the box, so the rectangle being tested is visible.
  const frame = document.createElement('div');
  frame.style.cssText = 'position:absolute;z-index:4;border:2px dashed #ffd166;background:rgba(255,209,102,.12);pointer-events:none';
  stage.container.append(frame);
  stage.own(() => frame.remove());
  const out = stage.readout();

  stage.every(250, (i) => {
    const w = stage.container.clientWidth;
    const h = stage.container.clientHeight;
    // The box slides left to right and back, a third of the width wide.
    const bw = w * 0.34;
    const x1 = (w - bw) * (0.5 - 0.5 * Math.cos(i / 6));
    const box: [number, number, number, number] = [x1, h * 0.2, x1 + bw, h * 0.8];
    Object.assign(frame.style, { left: `${box[0]}px`, top: `${box[1]}px`, width: `${bw}px`, height: `${box[3] - box[1]}px` });
    layer.boxSelect(box, (features: { id?: number; name?: string }[]) => {
      picked.clear();
      for (const f of features) if (f.id !== undefined) picked.add(f.id);
      layer.color('id', (id: number) => (picked.has(id) ? '#ff4d4d' : '#4ecdc4'));
      scene.render();
      if (out) out.textContent = `boxSelect([${box.map(Math.round).join(', ')}]) -> ${features.length} features`;
    });
  });

  return () => stage.dispose();
};

export default mount;
