// main.scalingMode: whose scale the particles follow
import { ParticleScaleMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const MODES = ['Local', 'World', 'Hierarchy'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'the parent scale pulses | scalingMode: Local, World, Hierarchy');
  const parents = MODES.map((mode, i) => {
    const parent = root.createChild(`parent-${mode}`);
    parent.transform.setPosition(-2.8 + i * 2.8, -1.8, 0);
    const e = emitter(stage, parent, { position: [0, 0, 0], tint: [[1, 0.6, 0.4], [0.5, 1, 0.6], [0.5, 0.7, 1]][i] as [number, number, number] });
    e.gen.main.scalingMode = ParticleScaleMode[mode];
    e.gen.main.startSize.constant = 0.3;
    e.gen.main.startLifetime.constant = 1.5;
    return parent;
  });
  const scale = (s: number): void => parents.forEach((p) => p.transform.setScale(s, s, s));
  if (stage.preview) tick(root, (_dt, t) => scale(1.2 + 0.9 * Math.sin(t * 1.3)));
  else slider(stage.bar, 'parent scale', 0.3, 2.5, 0.05, 1.2, scale);
  scale(1.2);
  return stage.dispose;
};

export default mount;
