// LayerPopup title and customContent: fixed, or a function of the feature
import { LayerPopup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, hoverTour, badge, dots, EUROPE_CENTER, europeZoom, type Place, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const MODES = ['title function + fields', 'customContent function', 'customContent with fields (content wins)', 'fixed title and content'] as const;
type Mode = (typeof MODES)[number];
// The callbacks get the feature's properties (for json rows, the row itself).
type Item = Place;

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

  let popup: LayerPopup | undefined;
  const build = (mode: Mode): void => {
    if (popup) scene.removePopup(popup);
    const fields = ['pop', 'kind'];
    const item =
      mode === MODES[0]
        ? { layer, fields, title: (f: Item) => f.name }
        : mode === MODES[1]
          ? { layer, customContent: (f: Item) => badge(`${f.name}: ${f.pop} million`, f.kind === 'port' ? '#4ecdc4' : '#ffd166') }
          : mode === MODES[2]
            ? { layer, fields, customContent: (f: Item) => `custom content for ${f.name}; fields are ignored` }
            : { layer, title: 'Everywhere the same', customContent: 'Fixed text, whatever you hover' };
    popup = addPopup(stage, scene, new LayerPopup({ items: [item], trigger: 'hover' }));
    const out = stage.readout();
    if (out) out.textContent = `${mode}\nHover a dot.`;
  };
  build(MODES[0]);
  if (stage.bar) select(stage.bar, 'content', MODES, MODES[0], build);
  else {
    hoverTour(stage, scene, PLACES.map((p): [number, number] => [p.lng, p.lat]).slice(2, 8), { ms: 450, click: false });
    stage.every(2600, (i) => build(MODES[i % MODES.length] ?? MODES[0]));
  }

  return () => stage.dispose();
};

export default mount;
