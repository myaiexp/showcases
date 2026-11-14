// Refilling a GSplatContainer: a colour wave and a growing splat count
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, galaxyCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 30000;
const h = pc.FloatPacking.float2Half;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 6.5, pitch: -35, autoRotate: 14 });
  const cloud = galaxyCloud(COUNT, 3, 3);
  const container = cloudContainer(scene.stage.device, cloud);
  scene.add(container, 'galaxy');

  // Distance of each splat from the core, for the wave.
  const dist = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) dist[i] = Math.hypot(cloud.positions[i * 3]!, cloud.positions[i * 3 + 2]!);

  let time = 0;
  let manual = -1; // the slider takes over from the automatic growth
  let wave = true;
  let shown = 0;
  const readout = ctx.preview ? null : createPanel(el);
  let label: HTMLElement | undefined;
  const state = { auto: true };
  if (readout) {
    readout.slider('Splats drawn', 0, COUNT, 500, COUNT, (v) => {
      manual = v;
      state.auto = false;
      auto.checked = false;
    });
    const auto = readout.check('Grow automatically', true, (on) => {
      state.auto = on;
      if (on) manual = -1;
    });
    readout.check('Colour wave', true, (on) => (wave = on));
    readout.row();
    label = readout.readout();
  }

  scene.app.on('update', (dt: number) => {
    time += dt;
    // numSplats can be anything up to maxSplats: only the first ones are drawn.
    shown = manual >= 0 ? manual : state.auto ? Math.floor(COUNT * Math.min(1, (time % 9) / 5)) : COUNT;

    if (wave) {
      const tex = container.getTexture('dataColor')!;
      const data = tex.lock() as Uint16Array;
      for (let i = 0; i < COUNT; i++) {
        const k = 0.65 + 0.55 * Math.sin(dist[i]! * 3 - time * 3);
        data[i * 4] = h(cloud.colors[i * 4]! * k);
        data[i * 4 + 1] = h(cloud.colors[i * 4 + 1]! * k);
        data[i * 4 + 2] = h(cloud.colors[i * 4 + 2]! * (1.4 - k * 0.5));
        data[i * 4 + 3] = h(cloud.colors[i * 4 + 3]!);
      }
      tex.unlock();
    }
    // The centers did not change, so skip the cost of re-cloning them in the sorter.
    container.update(shown, false);
    if (label) label.textContent = `numSplats ${shown} / maxSplats ${container.maxSplats}`;
  });

  return () => scene.dispose();
};

export default mount;
