// LayerPopup fields: formatField, formatValue (function or element), getValue
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

  const bar = document.createElement('div');
  bar.style.cssText = 'height:6px;width:60px;background:#ffd166;border-radius:3px';
  addPopup(
    stage,
    scene,
    new LayerPopup({
      items: [
        {
          layer,
          fields: [
            // The value is trimmed and upper-cased, the label is relabelled.
            { field: 'name', formatField: 'CITY', formatValue: (name?: string) => (name ?? '').trim().toUpperCase() },
            // formatField may be a function of (field, feature), formatValue a number turned into text.
            { field: 'pop', formatField: (field: string) => `${field} (millions)`, formatValue: (v: number) => v.toFixed(1) },
            // getValue computes the value from the feature: here, a longitude made absolute.
            { field: 'lng', formatField: 'degrees from Greenwich', getValue: (feature: { lng: number }) => `${Math.abs(feature.lng).toFixed(1)}°` },
            // formatValue may also be a ready DOM element.
            { field: 'kind', formatValue: bar },
          ],
        },
      ],
      trigger: 'hover',
    }),
  );
  const out = stage.readout();
  if (out) out.textContent = 'fields: [{ field, formatField, formatValue, getValue }, …]\nHover a dot.';
  if (stage.preview) hoverTour(stage, scene, PLACES.map((p): [number, number] => [p.lng, p.lat]).slice(2, 8), { ms: 450, click: false });

  return () => stage.dispose();
};

export default mount;
