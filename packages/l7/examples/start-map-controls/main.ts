// scene.addControl(new Zoom({ position })) and new Scale({ position })
import { Scale, Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 3 : 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const zoomControl = new Zoom({ position: 'topright' });
  const scaleControl = new Scale({ position: 'bottomright' });
  scene.addControl(zoomControl);
  scene.addControl(scaleControl);
  stage.own(() => {
    scene.removeControl(zoomControl);
    scene.removeControl(scaleControl);
  });

  // Cards: zoom in and out so the scale bar changes length.
  if (stage.preview) stage.every(80, (i) => scene.setZoom(3 + Math.sin(i / 12) * 1.2));

  return () => stage.dispose();
};

export default mount;
