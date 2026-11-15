// Scene fog: Linear (start, end), Exponential and ExponentialSquared
import { FogMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = { None: FogMode.None, Linear: FogMode.Linear, Exponential: FogMode.Exponential, ExponentialSquared: FogMode.ExponentialSquared } as const;
type Name = keyof typeof MODES;

const mount: Mount = async (el, ctx) => {
  const sky = [0.16, 0.2, 0.3, 1] as const;
  const stage = await createStage(el, ctx, { background: [...sky], hint: 'The fog colour matches the background so far columns melt into the sky.' });
  const { engine, scene, root } = stage;
  lit(stage, [0, 2, 9], [0, 0.8, -10]);
  const column = PrimitiveMesh.createCylinder(engine, 0.5, 0.5, 3, 20);
  for (let i = 0; i < 14; i++) {
    for (const side of [-1, 1]) solid(root, column, phong(engine, PALETTE.amber), [side * 2.6, 0.5, -i * 3.2], 'column');
  }
  scene.fogColor.set(sky[0], sky[1], sky[2], 1);
  scene.fogStart = 4;
  scene.fogEnd = 34;
  scene.fogDensity = 0.07;
  const names = Object.keys(MODES) as Name[];
  let name: Name = 'Linear';
  let auto = true;
  const info = panel(stage);
  const choice = stage.preview ? undefined : select(stage.bar, 'fogMode', names, (n) => ((auto = false), (name = n)), name);
  if (!stage.preview) {
    slider(stage.bar, 'fogStart', 0, 30, 1, scene.fogStart, (v) => (scene.fogStart = v));
    slider(stage.bar, 'fogEnd', 5, 60, 1, scene.fogEnd, (v) => (scene.fogEnd = v));
    slider(stage.bar, 'fogDensity', 0.005, 0.2, 0.005, scene.fogDensity, (v) => (scene.fogDensity = v), (v) => v.toFixed(3));
  }
  tick(root, (_dt, t) => {
    if (auto) {
      name = names[Math.floor(t / 2.2) % names.length]!;
      if (choice) choice.value = name;
    }
    scene.fogMode = MODES[name];
    info.text(`scene.fogMode = FogMode.${name}\nstart ${scene.fogStart}  end ${scene.fogEnd}  density ${scene.fogDensity.toFixed(3)}`);
  });
  return stage.dispose;
};

export default mount;
