// setEnable switches logging on and off: layers built while it is off leave no log
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { flattenLog } from '../../shared/debug-view.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // No debug option: logging starts off and is switched on by hand.
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [40, 30], zoom: ctx.preview ? 0.6 : 1.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  const debugService = scene.getDebugService();
  const show = valuePanel(stage.container, 'bl');

  let enabled = false;
  let layer: ILayer | null = null;
  const build = (): void => {
    if (layer) scene.removeLayer(layer);
    const current = new PointLayer().source(cityFeatures()).shape(enabled ? 'circle' : 'square').size(6).color(enabled ? '#7fdbff' : '#888');
    layer = current;
    current.on('inited', () =>
      show({ setEnable: String(enabled), [`getLog('${current.id}')`]: `${flattenLog(debugService.getLog(current.id)).length} steps` }),
    );
    scene.addLayer(current);
  };
  // The docs call it serEnable; the method is setEnable.
  const enable = (on: boolean): void => {
    enabled = on;
    debugService.setEnable(on);
  };
  build();

  if (stage.bar) {
    toggle(stage.bar, 'setEnable', false, enable);
    button(stage.bar, 'Rebuild the layer', build);
  }
  if (stage.preview) stage.every(1800, (i) => {
    enable(i % 2 === 1);
    build();
  });

  return () => stage.dispose();
};

export default mount;
