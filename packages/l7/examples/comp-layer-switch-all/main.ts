// LayerSwitch with no layers option: every layer in the scene is listed
import { LayerSwitch, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
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

  const capitals = dots(PLACES.filter((p) => p.kind === 'capital'), { name: 'Capitals', color: '#ffd166', size: 12 });
  const ports = dots(PLACES.filter((p) => p.kind === 'port'), { name: 'Ports', color: '#4ecdc4', size: 12 });
  scene.addLayer(capitals);
  scene.addLayer(ports);

  // No layers option: the control lists every layer, the basemap's land and borders too.
  const sw = addControl(stage, scene, new LayerSwitch({ position: 'topright', popperTrigger: 'click' }));
  const out = stage.readout();
  if (out) out.textContent = 'new LayerSwitch(): with no layers it reads all of them, including the example scenery (basemap-land, basemap-borders).';
  if (stage.preview) {
    const press = (el: Element | null | undefined): void => void el?.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    stage.every(900, (i) => {
      const box = sw.getContainer();
      if (i === 1) press(box.querySelector('button'));
      else press(document.querySelectorAll('.l7-select-control-item')[i % 4]);
    });
  }

  return () => stage.dispose();
};

export default mount;
