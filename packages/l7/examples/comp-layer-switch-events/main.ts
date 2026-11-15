// LayerSwitch events selectChange, popperShow and popperHide
import { LayerSwitch, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { eventLog } from '../../shared/comp-demo.ts';

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

  const flash = eventBoard(stage.container, ['popperShow', 'popperHide', 'selectChange']);
  const log = eventLog(stage, 4, 'Open the popper and tick the layers.');
  const sw = addControl(stage, scene, new LayerSwitch({ position: 'topright', layers: [capitals, ports], popperTrigger: 'click' }));
  sw.on('popperShow', () => flash('popperShow'));
  sw.on('popperHide', () => flash('popperHide'));
  sw.on('selectChange', (value: string | string[]) => {
    flash('selectChange');
    log(`selectChange(${JSON.stringify(value)}): the layers to show`);
  });
  stage.own(() => sw.removeAllListeners());
  if (stage.preview) {
    const press = (el: Element | null | undefined): void => void el?.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    stage.every(800, (i) => {
      const box = sw.getContainer();
      if (i % 5 === 1) press(box.querySelector('button'));
      else if (i % 5 !== 0) press(document.querySelectorAll('.l7-select-control-item')[i % 2]);
      else press(box.querySelector('button'));
    });
  }

  return () => stage.dispose();
};

export default mount;
