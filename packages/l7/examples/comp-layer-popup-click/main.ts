// LayerPopup trigger 'click' against 'hover': when the bubble opens
import { LayerPopup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, hoverTour, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
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

  const popup = addPopup(stage, scene, new LayerPopup({ items: [{ layer, fields: ['name', 'pop'] }], trigger: 'click' }));
  const out = stage.readout();
  if (out) out.textContent = "trigger: 'click': the bubble opens when you click a dot, not on hover";
  if (stage.bar)
    select(stage.bar, 'trigger', ['click', 'hover'] as const, 'click', (v) => {
      popup.setOptions({ trigger: v });
      if (out) out.textContent = `trigger: '${v}'`;
    });
  // Cards: the ghost rests on each dot and clicks it.
  if (stage.preview) hoverTour(stage, scene, PLACES.map((p): [number, number] => [p.lng, p.lat]).slice(2, 8), { ms: 450, click: true });

  return () => stage.dispose();
};

export default mount;
