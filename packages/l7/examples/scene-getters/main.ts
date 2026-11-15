// Reading the camera back: getZoom, getCenter, getPitch, getSize, getType and zoom limits
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [100, 30], zoom: 2, minZoom: 1, maxZoom: 8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size('pop', [3, 12]).color('#ffb347'));

  const show = valuePanel(stage.container, ctx.preview ? 'tl' : 'bl');
  const report = (): void => {
    const c = scene.getCenter();
    const [w, h] = scene.getSize();
    const range = scene.getPointSizeRange();
    show({
      'getZoom()': scene.getZoom().toFixed(2),
      'getCenter()': `${c.lng.toFixed(2)}, ${c.lat.toFixed(2)}`,
      'getPitch()': scene.getPitch().toFixed(1),
      'getSize()': `${w} × ${h}`,
      ...(ctx.preview
        ? {}
        : {
            'getType()': scene.getType(),
            'getMinZoom/MaxZoom': `${scene.getMinZoom()} / ${scene.getMaxZoom()}`,
            'getPointSizeRange()': `${range[0]}–${range[1]}`,
            'scene.loaded': String(scene.loaded),
          }),
    });
  };
  scene.on('mapmove', report);
  report();

  // Cards: the camera wanders, so the values change.
  if (stage.preview) stage.frame((t) => {
    scene.setZoomAndCenter(2 + Math.sin(t * 0.5), [100 + 25 * Math.sin(t * 0.3), 30]);
    scene.setPitch(20 + 20 * Math.sin(t * 0.7));
  });

  return () => stage.dispose();
};

export default mount;
