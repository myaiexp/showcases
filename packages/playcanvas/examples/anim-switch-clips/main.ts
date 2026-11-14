// Giving each clip a state and switching with a cross-fade or a cut
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, jumpClip, locomotion, waveClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

const CLIPS = ['Idle', 'Walk', 'Run', 'Wave', 'Jump'] as const;

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;

  // assignAnimation(path, track, layerName, speed, loop) gives each clip a state of its own.
  anim.assignAnimation('Idle', idleClip());
  anim.assignAnimation('Walk', locomotion('Walk', 1, 1));
  anim.assignAnimation('Run', locomotion('Run', 0.6, 1.6));
  anim.assignAnimation('Wave', waveClip());
  // The last arguments: layer (default), speed 1, and loop false, so Jump holds its last frame.
  anim.assignAnimation('Jump', jumpClip(), undefined, 1, false);

  const layer = anim.baseLayer!;

  if (ctx.preview) {
    let t = 0;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2) {
        t = 0;
        layer.transition(CLIPS[++i % CLIPS.length]!, 0.4);
      }
    });
  } else {
    const panel = createPanel(el);
    let fade = 0.4;
    for (const name of CLIPS) panel.button(`${name}`, () => (fade > 0 ? layer.transition(name, fade) : layer.play(name)));
    panel.row();
    panel.slider('cross-fade (0 = play() cut)', 0, 2, 0.1, fade, (v) => (fade = v));
    panel.row();
    const info = panel.readout();
    app.on('update', () => {
      // A clip that plays forwards once has finished when its time reaches its duration.
      const done = layer.activeStateCurrentTime >= layer.activeStateDuration;
      info.textContent = `active ${layer.activeState} (${layer.activeStateCurrentTime.toFixed(2)} of ${layer.activeStateDuration.toFixed(2)} s) | previous ${layer.previousState ?? '-'} | transitioning ${layer.transitioning} | played through ${done}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
