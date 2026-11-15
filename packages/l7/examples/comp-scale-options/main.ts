// Scale options maxWidth and lockWidth: bar length and snapping
import { Scale, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { slider, toggle } from '../../shared/controls.ts';
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

  const scale = addControl(stage, scene, new Scale({ position: 'bottomleft', maxWidth: 100, lockWidth: true }));
  const out = stage.readout();
  const state = { maxWidth: 100, lockWidth: true };
  const apply = (): void => {
    scale.setOptions(state);
    if (out) out.textContent = `maxWidth: ${state.maxWidth}, lockWidth: ${state.lockWidth}\nlockWidth true: the bar is a round distance of fixed width; false: its width follows the zoom`;
  };
  apply();
  if (stage.bar) {
    slider(stage.bar, 'maxWidth', [40, 260, 10], 100, (v) => ((state.maxWidth = v), apply()));
    toggle(stage.bar, 'lockWidth', true, (v) => ((state.lockWidth = v), apply()));
  } else {
    stage.every(120, (i) => {
      state.maxWidth = Math.round(70 + 60 * Math.sin(i / 10));
      state.lockWidth = Math.floor(i / 60) % 2 === 0;
      apply();
      scene.setZoom(2.5 + Math.sin(i / 25) * 0.4);
    });
  }

  return () => stage.dispose();
};

export default mount;
