// new Marker({ element }).setLnglat(...) and scene.addMarker: DOM labels on the map
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { heatColor } from '../../shared/point-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.6 : 3.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const europe = cities.filter((c) => c.continent === 'Europe');
  const labels: { el: HTMLLabelElement; base: number }[] = [];
  europe.forEach((c, i) => {
    const label = document.createElement('label');
    label.style.cssText = 'padding:1px 6px;border:1px solid #fff;border-radius:9px;color:#102a43;font:600 11px/1.5 system-ui,sans-serif;white-space:nowrap';
    const base = 5 + ((i * 7) % 30);
    label.textContent = `${base}℃`;
    label.style.background = heatColor(base);
    const marker = new Marker({ element: label }).setLnglat({ lng: c.lng, lat: c.lat });
    scene.addMarker(marker);
    labels.push({ el: label, base });
  });

  // The tags warm and cool a little so the card is alive.
  stage.every(500, (i) => {
    labels.forEach((l, k) => {
      const v = Math.round(l.base + Math.sin(i / 3 + k) * 4);
      l.el.textContent = `${v}℃`;
      l.el.style.background = heatColor(v);
    });
  });

  return () => stage.dispose();
};

export default mount;
