// GALACEAN_animation_event in a glTF feeds AnimationClip.events
import { Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';

class Listener extends Script {
  log: string[] = [];
  heard(parameter: string): void {
    this.log = [...this.log.slice(-3), parameter];
  }
}

const make = () => {
  const gltf = robotGlb();
  const wave = (gltf.json.animations as { name: string; extensions?: unknown }[]).find((a) => a.name === 'Wave')!;
  // Extension data in the file: the loader turns it into AnimationEvents on the clip.
  wave.extensions = {
    GALACEAN_animation_event: {
      events: [
        { time: 0.3, functionName: 'heard', parameter: 'hello' },
        { time: 0.9, functionName: 'heard', parameter: 'goodbye' },
      ],
    },
  };
  return gltf;
};

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, make);
  if (!r) return NOOP;
  const { stage, animator, model, gltf, say } = r;
  const listener = model.addComponent(Listener);
  animator.play('Wave');
  const clip = gltf.animations!.find((c) => c.name === 'Wave')!;
  tick(model, () => say(`Wave events from the file: ${clip.events.map((e) => `${e.functionName}@${e.time}`).join(', ')}\nheard: ${listener.log.join(', ')}`));
  return stage.dispose;
};

export default mount;
