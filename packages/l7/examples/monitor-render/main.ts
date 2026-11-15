// renderDebug(true) and the renderEnd event: the duration of every frame
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { scatter } from '../../shared/data.ts';
import { sparkline } from '../../shared/debug-view.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

interface RenderInfo {
  renderUid: string;
  renderStart: number;
  renderEnd: number;
  renderDuration: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [60, 30], zoom: ctx.preview ? 0.6 : 1.5 }),
    debug: true,
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  // An animated layer, so the scene renders every frame.
  scene.addLayer(
    new PointLayer()
      .source(scatter(ctx.preview ? 300 : 3000), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size('value', [4, 18])
      .color('#ff6b6b')
      .animate(true),
  );

  // IDebugService's type leaves out renderDebug, on and off; the DebugService class (an
  // EventEmitter) has all three, as the docs describe.
  const debugService = scene.getDebugService() as unknown as {
    renderDebug(enable: boolean): void;
    on(name: 'renderEnd', fn: (info: RenderInfo) => void): void;
    off(name: 'renderEnd', fn: (info: RenderInfo) => void): void;
  };
  const plot = sparkline(stage.container, 'renderDuration');
  const onRender = (info: RenderInfo): void => plot(info.renderDuration);
  const monitor = (on: boolean): void => {
    debugService.renderDebug(on);
    if (on) debugService.on('renderEnd', onRender);
    else debugService.off('renderEnd', onRender);
  };
  monitor(true);
  stage.own(() => monitor(false));

  if (stage.bar) toggle(stage.bar, 'renderDebug', true, monitor);

  return () => stage.dispose();
};

export default mount;
