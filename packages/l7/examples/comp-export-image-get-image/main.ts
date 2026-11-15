// ExportImage imageType and getImage(), without the control click
import { ExportImage, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    preserveDrawingBuffer: true,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(PLACES, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('hexagon').size('pop', [5, 16]).color('#4ecdc4'));

  const exporter = addControl(stage, scene, new ExportImage({ position: 'topright', imageType: 'png' }));
  const shot = document.createElement('img');
  shot.style.cssText = 'position:absolute;left:6px;bottom:6px;z-index:4;height:70px;border:2px solid #fff;border-radius:4px;background:#0b131c;pointer-events:none';
  stage.container.append(shot);
  stage.own(() => shot.remove());
  const out = stage.readout();
  const grab = async (): Promise<void> => {
    const base64 = await exporter.getImage();
    if (stage.disposed) return;
    shot.src = base64;
    if (out) out.textContent = `getImage() resolved: ${base64.slice(0, 30)}… (${Math.round(base64.length / 1024)} KB)\nimageType: ${exporter.getOptions().imageType}`;
  };
  if (stage.bar) {
    select(stage.bar, 'imageType', ['png', 'jpeg'] as const, 'png', (v) => exporter.setOptions({ imageType: v }));
    button(stage.bar, 'getImage()', () => void grab());
  } else {
    stage.every(60, (i) => scene.setRotation(Math.sin(i / 40) * 25));
    stage.every(1500, (i) => {
      exporter.setOptions({ imageType: i % 2 ? 'jpeg' : 'png' });
      void grab();
    });
  }

  return () => stage.dispose();
};

export default mount;
