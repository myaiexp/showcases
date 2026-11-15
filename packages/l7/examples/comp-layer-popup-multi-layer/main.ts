// LayerPopup items for several layers, found by instance, by name or by id
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

  const capitals = dots(PLACES.filter((p) => p.kind === 'capital'), { name: 'capitals', color: '#ffd166', size: 11 });
  const ports = dots(PLACES.filter((p) => p.kind === 'port'), { name: 'ports', color: '#4ecdc4', size: 11 });
  scene.addLayer(capitals);
  scene.addLayer(ports);

  addPopup(
    stage,
    scene,
    new LayerPopup({
      items: [
        // The layer by instance: its population.
        { layer: capitals, title: 'Capital', fields: ['name', 'pop'] },
        // The layer by its name: another set of fields.
        { layer: 'ports', title: 'Port', fields: ['name', 'kind'] },
      ],
      trigger: 'hover',
    }),
  );
  const out = stage.readout();
  if (out) out.textContent = "items: [{ layer: capitals, … }, { layer: 'ports', … }]: each layer has its own title and fields.\nHover a yellow and a teal dot.";
  if (stage.preview) hoverTour(stage, scene, [[2.35, 48.86], [9.99, 53.55], [12.5, 41.9], [5.37, 43.3]], { ms: 450, click: false });

  return () => stage.dispose();
};

export default mount;
