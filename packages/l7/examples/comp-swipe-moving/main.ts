// Swipe 'moving' event: the size and ratio reported while dragging
import { Scene, Swipe } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { COOL, countryFill, WARM } from '../../shared/comp-swipe.ts';
import { createStage } from '../../shared/stage.ts';
import { valuePanel } from '../../shared/scene-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);

  const warm = countryFill('warm', WARM);
  const cool = countryFill('cool', COOL);
  scene.addLayer(warm);
  scene.addLayer(cool);

  const swipe = addControl(stage, scene, new Swipe({ orientation: 'horizontal', ratio: 0.5, layers: [warm], rightLayers: [cool], className: 'my-swipe' }));
  const show = valuePanel(stage.container, 'bl');
  show({ moving: 'drag the handle' });
  swipe.on('moving', (data: { size: number[]; ratio: number[] }) => show({ 'data.size': JSON.stringify(data.size.map(Math.round)), 'data.ratio': JSON.stringify(data.ratio.map((r) => +r.toFixed(2))) }));
  stage.own(() => swipe.removeAllListeners());
  // Cards cannot drag the handle, so the curtain is moved with setOptions.
  if (stage.preview) stage.every(70, (i) => swipe.setOptions({ ratio: 0.5 + 0.35 * Math.sin(i / 14) }));

  return () => stage.dispose();
};

export default mount;
