// Transition duration, exit time and offset on a chain of non-looping states
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, jumpClip, waveClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

interface Settings {
  time: number;
  exitTime: number;
  offset: number;
}

// Idle waits for the 'go' trigger, then Wave, Jump and back to Idle, each a one-shot.
function graph({ time, exitTime, offset }: Settings): object {
  return {
    layers: [
      {
        name: 'Base',
        states: [{ name: 'START' }, { name: 'Idle', loop: true, defaultState: true }, { name: 'Wave', loop: false }, { name: 'Jump', loop: false }],
        transitions: [
          { from: 'START', to: 'Idle' },
          { from: 'Idle', to: 'Wave', time, conditions: [{ parameterName: 'go', predicate: pc.ANIM_EQUAL_TO, value: true }] },
          // exitTime is a fraction of the source clip; transitionOffset where the next clip starts.
          { from: 'Wave', to: 'Jump', time, exitTime, transitionOffset: offset },
          { from: 'Jump', to: 'Idle', time, exitTime: 1 },
        ],
      },
    ],
    parameters: { go: { name: 'go', type: pc.ANIM_PARAMETER_TRIGGER, value: false } },
  };
}

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;
  const tracks = { Idle: idleClip(), Wave: waveClip(), Jump: jumpClip() };
  const settings: Settings = { time: 0.4, exitTime: 1, offset: 0 };

  const load = (): void => {
    anim.loadStateGraph(graph(settings));
    for (const [name, track] of Object.entries(tracks)) anim.baseLayer!.assignAnimation(name, track);
  };
  load();
  const layer = (): pc.AnimComponentLayer => anim.baseLayer!;

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 4.5) {
        t = 0;
        anim.setTrigger('go');
      }
    });
    anim.setTrigger('go');
  } else {
    const panel = createPanel(el);
    panel.button("setTrigger('go')", () => anim.setTrigger('go'));
    panel.slider('transition time', 0, 1.5, 0.05, settings.time, (v) => {
      settings.time = v;
      load();
    });
    panel.row();
    panel.slider('Wave to Jump exitTime', 0.2, 1, 0.05, settings.exitTime, (v) => {
      settings.exitTime = v;
      load();
    });
    panel.slider('Wave to Jump transitionOffset', 0, 0.8, 0.05, settings.offset, (v) => {
      settings.offset = v;
      load();
    });
    panel.row();
    const info = panel.readout();
    app.on('update', () => {
      const l = layer();
      const progress = l.transitionProgress === null ? '-' : l.transitionProgress.toFixed(2);
      info.textContent = `activeState ${l.activeState} (${l.activeStateProgress.toFixed(2)} through) | transitioning ${l.transitioning} (${progress})`;
    });
  }
  return () => scene.dispose();
};

export default mount;
