// Marker element: your own DOM node as the marker, and setElement() to swap it later
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, badge, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The docs build a label per row and pass it as the marker's element.
  const markers = PLACES.map((p) => addMarker(stage, scene, new Marker({ element: badge(p.name, p.kind === 'port' ? '#4ecdc4' : '#ffd166') }).setLnglat({ lng: p.lng, lat: p.lat })));

  let round = false;
  const swap = (): void => {
    round = !round;
    // setElement replaces the DOM of an existing marker: here every label becomes a plain dot, or back.
    markers.forEach((m, i) => {
      const p = PLACES[i];
      if (!p) return;
      if (round) {
        const dot = document.createElement('div');
        dot.style.cssText = `width:${6 + p.pop}px;height:${6 + p.pop}px;border-radius:50%;background:#ff6b6b;border:2px solid #fff`;
        m.setElement(dot);
      } else m.setElement(badge(p.name, p.kind === 'port' ? '#4ecdc4' : '#ffd166'));
    });
    const out = stage.readout();
    if (out) out.textContent = round ? 'setElement(dot): every marker now wraps a sized dot' : 'setElement(label): back to the name labels';
  };
  const out = stage.readout();
  if (out) out.textContent = 'new Marker({ element: label }): any DOM node is a marker.';
  if (stage.bar) button(stage.bar, 'setElement()', swap);
  else stage.every(1500, swap);

  return () => stage.dispose();
};

export default mount;
