// Built-in controls (navigation, scale, fullscreen, attribution) in corners
import {
  Map,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
  AttributionControl,
} from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, button, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 50],
    zoom: preview ? 2 : 3,
    pitch: preview ? 0 : 20,
    interactive: !preview,
    // The default attribution is replaced below, so it can be positioned and customised.
    attributionControl: false,
  });

  // Each control takes a corner as the second argument to addControl.
  map.addControl(new NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), 'top-right');
  const scale = new ScaleControl({ maxWidth: 120, unit: 'metric' });
  map.addControl(scale, 'bottom-left');
  map.addControl(
    new AttributionControl({ compact: true, customAttribution: 'Shapes: Natural Earth' }),
    'bottom-right',
  );
  if (!preview) map.addControl(new FullscreenControl(), 'top-left');

  let frame = 0;
  if (preview) {
    // The controls are static; the map drifts underneath so the scale bar keeps changing.
    let t = 0;
    const drift = (): void => {
      t += 1;
      map.jumpTo({ center: [20 + 25 * Math.sin(t / 250), 50 + 8 * Math.cos(t / 180)], zoom: 2.5 + 0.8 * Math.sin(t / 150) });
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  } else {
    const bar = controlBar(el);
    const out = readout(el, 'Scale unit: metric');
    for (const unit of ['metric', 'imperial', 'nautical'] as const) {
      button(bar, unit, () => {
        scale.setUnit(unit);
        out.textContent = `Scale unit: ${unit}`;
      });
    }
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
