// ExportImage: onExport receives a base64 picture of the map
import { ExportImage, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    // The docs' note: keep the drawing buffer so the canvas can be read back.
    preserveDrawingBuffer: true,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(PLACES, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size('pop', [4, 14]).color('#ffd166'));

  // Exported pictures pile up in a strip over the map.
  const strip = document.createElement('div');
  strip.style.cssText = 'position:absolute;left:6px;bottom:6px;z-index:4;display:flex;gap:4px;pointer-events:none';
  stage.container.append(strip);
  stage.own(() => strip.remove());
  const exporter = addControl(
    stage,
    scene,
    new ExportImage({
      position: 'topright',
      onExport: (base64: string) => {
        if (stage.disposed) return;
        const img = new Image();
        img.src = base64;
        img.style.cssText = 'height:60px;border:2px solid #fff;border-radius:4px;background:#0b131c';
        img.title = `${Math.round(base64.length / 1024)} KB data URL`;
        strip.prepend(img);
        while (strip.children.length > 3) strip.lastElementChild?.remove();
      },
    }),
  );
  const out = stage.readout();
  if (out) out.textContent = 'Click the control: onExport(base64) runs and the picture lands bottom left.';
  if (stage.preview) {
    stage.every(60, (i) => scene.setRotation(Math.sin(i / 40) * 25));
    // A card has no pointer: press the control's own button, without letting the click bubble to the card link.
    stage.every(1800, () => exporter.getContainer().querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: false })));
  }

  return () => stage.dispose();
};

export default mount;
