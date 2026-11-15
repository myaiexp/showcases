// Swipe orientation and ratio: a curtain between two colourings
import { Scene, Swipe } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { COOL, countryFill, WARM } from '../../shared/comp-swipe.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

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

  // layers: shown on the left (top) of the curtain; rightLayers: on the right (bottom).
  const swipe = addControl(stage, scene, new Swipe({ orientation: 'vertical', ratio: 0.5, layers: [warm], rightLayers: [cool] }));
  const out = stage.readout();
  const state: { orientation: 'vertical' | 'horizontal'; ratio: number } = { orientation: 'vertical', ratio: 0.5 };
  const apply = (): void => {
    swipe.setOptions(state);
    if (out) out.textContent = `orientation: '${state.orientation}', ratio: ${state.ratio.toFixed(2)}\nDrag the handle on the map too.`;
  };
  apply();
  if (stage.bar) {
    select(stage.bar, 'orientation', ['vertical', 'horizontal'] as const, 'vertical', (v) => ((state.orientation = v), apply()));
    slider(stage.bar, 'ratio', [0, 1, 0.01], 0.5, (v) => ((state.ratio = v), apply()));
  } else {
    stage.every(70, (i) => {
      state.ratio = 0.5 + 0.35 * Math.sin(i / 14);
      state.orientation = Math.floor(i / 110) % 2 ? 'horizontal' : 'vertical';
      if (i % 110 === 0 || i % 2 === 0) swipe.setOptions(state);
    });
  }

  return () => stage.dispose();
};

export default mount;
