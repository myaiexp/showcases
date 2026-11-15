// Drag events: dragstart, dragging and dragend while the map is dragged
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { eventBoard, valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const EVENTS = ['dragstart', 'dragging', 'dragend'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 1.8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  const flash = eventBoard(stage.container, EVENTS);
  const show = valuePanel(stage.container, 'br');
  for (const name of EVENTS) {
    scene.on(name, (e: { lngLat?: { lng: number; lat: number } }) => {
      flash(name);
      if (e.lngLat) show({ [name]: `${e.lngLat.lng.toFixed(1)}, ${e.lngLat.lat.toFixed(1)}` });
    });
  }

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(2000, (i) => {
      const dx = i % 2 ? 70 : -70;
      const path: [number, number][] = [];
      for (let k = 0; k <= 8; k++) path.push([130 - dx / 2 + (dx * k) / 8, 100 + 10 * Math.sin(k)]);
      void ghost.drag(path, 50);
    });
  }

  return () => stage.dispose();
};

export default mount;
