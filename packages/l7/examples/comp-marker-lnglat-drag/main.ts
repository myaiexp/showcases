// Marker setLnglat, getLnglat and setDraggable: move it from code or by dragging
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, badge, EUROPE_CENTER, europeZoom, eventLog } from '../../shared/comp-demo.ts';
import { button, toggle } from '../../shared/controls.ts';
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

  const marker = addMarker(stage, scene, new Marker({ element: badge('drag me', '#ffd166') }).setLnglat({ lng: 11, lat: 49 }));
  const log = eventLog(stage, 3);
  const report = (what: string): void => {
    const { lng, lat } = marker.getLnglat();
    log(`${what}\ngetLnglat(): { lng: ${lng.toFixed(2)}, lat: ${lat.toFixed(2)} }, getDraggable(): ${marker.getDraggable()}`);
  };
  report('start');
  if (stage.bar) {
    toggle(stage.bar, 'setDraggable', false, (v) => {
      marker.setDraggable(v);
      report(`setDraggable(${v})`);
    });
    button(stage.bar, 'setLnglat({ lng, lat })', () => {
      marker.setLnglat({ lng: 4 + Math.random() * 14, lat: 44 + Math.random() * 10 });
      report('setLnglat({ lng, lat })');
    });
    button(stage.bar, 'setLnglat([lng, lat])', () => {
      marker.setLnglat([4 + Math.random() * 14, 44 + Math.random() * 10] as unknown as { lng: number; lat: number }); // an array works at runtime; the types only list ILngLat here
      report('setLnglat([lng, lat])');
    });
    // Dragging reports itself too: the marker emits dragend through its own listeners.
    marker.getElement().addEventListener('mouseup', () => setTimeout(() => report('after a drag'), 50));
  } else {
    // Cards cannot drag: the marker is moved with setLnglat round a circle.
    stage.every(60, (i) => marker.setLnglat({ lng: 11 + Math.cos(i / 10) * 7, lat: 49 + Math.sin(i / 10) * 4 }));
  }

  return () => stage.dispose();
};

export default mount;
