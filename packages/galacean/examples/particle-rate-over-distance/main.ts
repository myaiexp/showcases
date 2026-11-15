// emission.rateOverDistance: particles per unit travelled
import { ParticleSimulationSpace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1, 10], target: [0, 1, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { position: [0, 0, 0], tint: [1, 0.8, 0.4], rotation: [0, 0, 0] });
  e.gen.emission.rateOverTime = constant(0);
  e.gen.emission.rateOverDistance = constant(8);
  e.gen.main.startSpeed.constant = 0;
  e.gen.main.startLifetime.constant = 1.6;
  e.gen.main.startSize.constant = 0.3;
  e.gen.main.simulationSpace = ParticleSimulationSpace.World; //: the trail stays where it was laid
  let amp = 2.6;
  tick(e.entity, (_dt, t) => {
    // Pause every few seconds: no movement, no particles.
    const moving = Math.sin(t * 0.5) > -0.35;
    e.entity.transform.setPosition(moving ? amp * Math.sin(t * 1.4) : e.entity.transform.position.x, 0.6 * Math.sin(t * 2.3), 0);
    say(`rateOverTime 0, rateOverDistance ${e.gen.emission.rateOverDistance.constant} | ${moving ? 'moving' : 'paused: nothing emitted'}`);
  });
  if (!stage.preview) {
    slider(stage.bar, 'rateOverDistance', 0, 20, 1, 8, (v) => (e.gen.emission.rateOverDistance.constant = v));
    slider(stage.bar, 'sweep width', 0.5, 3, 0.1, amp, (v) => (amp = v));
  }
  return stage.dispose;
};

export default mount;
