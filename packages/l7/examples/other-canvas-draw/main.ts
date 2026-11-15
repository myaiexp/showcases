// CanvasLayer drawingOnCanvas: circles pinned to cities with lngLatToContainer, redrawn every frame
import { CanvasLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 2.7 : 3.6 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new CanvasLayer({}).style({
    drawingOnCanvas: (option) => {
      const { size, mapService } = option;
      const g = option.ctx as CanvasRenderingContext2D;
      const [width, height] = size;
      g.clearRect(0, 0, width, height);
      const t = performance.now() / 1000;
      cities.forEach((c, i) => {
        const { x, y } = mapService.lngLatToContainer([c.lng, c.lat]);
        const r = 4 + ((t * 8 + i * 3) % 18);
        g.strokeStyle = `rgba(255,209,102,${1 - r / 22})`;
        g.lineWidth = 2;
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.stroke();
        g.fillStyle = '#ffd166';
        g.beginPath();
        g.arc(x, y, 2.5, 0, Math.PI * 2);
        g.fill();
      });
    },
  });
  // animate(true) redraws every frame: without it the canvas only redraws when the map moves.
  layer.animate(true);
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [10, 47], 6);

  return () => stage.dispose();
};

export default mount;
