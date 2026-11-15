// Scale options metric and imperial: kilometre and mile bars, alone or together
import { Scale, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { toggle } from '../../shared/controls.ts';
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

  const scale = addControl(stage, scene, new Scale({ position: 'bottomleft', metric: true, imperial: false }));
  const out = stage.readout();
  const state = { metric: true, imperial: false };
  const apply = (): void => {
    scale.setOptions(state);
    if (out) out.textContent = `metric: ${state.metric} (km), imperial: ${state.imperial} (miles)`;
  };
  apply();
  if (stage.bar) {
    toggle(stage.bar, 'metric', true, (v) => ((state.metric = v), apply()));
    toggle(stage.bar, 'imperial', false, (v) => ((state.imperial = v), apply()));
  } else {
    const combos = [[true, false], [false, true], [true, true]] as const;
    stage.every(1300, (i) => {
      const [metric, imperial] = combos[i % 3] ?? combos[0];
      Object.assign(state, { metric, imperial });
      apply();
    });
  }

  return () => stage.dispose();
};

export default mount;
