// LayerPopup on hover (the default trigger): fields shown as name/value rows
import { LayerPopup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, hoverTour, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    // Cards sit a little north so a bubble opening above a dot has room.
    map: new Map({ center: ctx.preview ? [11, 53] : EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = dots(PLACES, { name: 'places', size: 11 });
  scene.addLayer(layer);

  // fields takes plain field names; trigger 'hover' is the default.
  addPopup(stage, scene, new LayerPopup({ items: [{ layer, fields: ['name', 'pop', 'kind'] }], trigger: 'hover' }));
  const out = stage.readout();
  if (out) out.textContent = "new LayerPopup({ items: [{ layer, fields: ['name', 'pop', 'kind'] }], trigger: 'hover' })\nHover a dot.";
  if (stage.preview) hoverTour(stage, scene, PLACES.map((p): [number, number] => [p.lng, p.lat]).slice(2, 8), { ms: 450, click: false });

  return () => stage.dispose();
};

export default mount;
