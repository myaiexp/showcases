// containerToLngLat and lngLatToContainer convert between screen px and coordinates
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 1 : 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(4).color('#ffb347'));

  // An HTML tag placed with lngLatToContainer follows a city as the map moves.
  const tag = document.createElement('div');
  tag.style.cssText = 'position:absolute;z-index:4;transform:translate(-50%,-140%);padding:1px 6px;border-radius:3px;background:#ffd166;color:#111;font:11px ui-monospace,monospace;pointer-events:none';
  stage.container.append(tag);
  const show = valuePanel(stage.container, 'br');
  let city = cities[0]!;
  const place = (): void => {
    const p = scene.lngLatToContainer([city.lng, city.lat]);
    tag.style.left = `${p.x}px`;
    tag.style.top = `${p.y}px`;
    tag.textContent = `${city.name} → (${Math.round(p.x)}, ${Math.round(p.y)})`;
  };
  scene.on('mapmove', place);
  place();

  // The pointer's container position (the map engine's event.point), read back as a coordinate.
  scene.on('mousemove', (e: { point: { x: number; y: number } }) => {
    const { x, y } = e.point;
    const ll = scene.containerToLngLat([x, y]);
    show({ container: `(${Math.round(x)}, ${Math.round(y)})`, lngLat: `${ll.lng.toFixed(2)}, ${ll.lat.toFixed(2)}` });
  });

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    stage.every(700, (i) => {
      city = cities[(i >> 2) % 12]!;
      if (i % 4 === 0) scene.panTo([city.lng, city.lat]);
      ghost.move(60 + ((i * 53) % 150), 50 + ((i * 37) % 110));
      place();
    });
  }

  return () => stage.dispose();
};

export default mount;
