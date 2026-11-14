// A state graph with a float parameter, a trigger, ANY and END
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, jumpClip, locomotion } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

// The graph is data: states, transitions with conditions, and the parameters they read.
const stateGraph = {
  layers: [
    {
      name: 'Base',
      states: [
        { name: 'START' },
        { name: 'Idle', loop: true, defaultState: true },
        { name: 'Walk', loop: true },
        { name: 'Jump', loop: false },
        { name: 'ANY' },
        { name: 'END' },
      ],
      transitions: [
        { from: 'START', to: 'Idle' },
        { from: 'Idle', to: 'Walk', time: 0.2, conditions: [{ parameterName: 'speed', predicate: pc.ANIM_GREATER_THAN, value: 0.5 }] },
        { from: 'Walk', to: 'Idle', time: 0.2, conditions: [{ parameterName: 'speed', predicate: pc.ANIM_LESS_THAN_EQUAL_TO, value: 0.5 }] },
        // ANY can be left from whichever state is active.
        { from: 'ANY', to: 'Jump', time: 0.1, conditions: [{ parameterName: 'jump', predicate: pc.ANIM_EQUAL_TO, value: true }] },
        // An exit time of 1 waits for the clip to play through; END goes back to START, then Idle.
        { from: 'Jump', to: 'END', time: 0.2, exitTime: 1 },
      ],
    },
  ],
  parameters: {
    speed: { name: 'speed', type: pc.ANIM_PARAMETER_FLOAT, value: 0 },
    jump: { name: 'jump', type: pc.ANIM_PARAMETER_TRIGGER, value: false },
  },
};

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;

  anim.loadStateGraph(stateGraph);
  // Layer.assignAnimation keeps the speed and loop the graph gave each state.
  const layer = anim.baseLayer!;
  layer.assignAnimation('Idle', idleClip());
  layer.assignAnimation('Walk', locomotion('Walk', 1, 1));
  layer.assignAnimation('Jump', jumpClip());

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      const before = t;
      t += dt;
      anim.setFloat('speed', Math.sin(t * 0.9) > 0 ? 1 : 0);
      if (Math.floor(before / 4) !== Math.floor(t / 4)) anim.setTrigger('jump');
    });
  } else {
    const panel = createPanel(el);
    panel.slider('speed (float parameter)', 0, 1.5, 0.05, 0, (v) => anim.setFloat('speed', v));
    panel.button("setTrigger('jump')", () => anim.setTrigger('jump'));
    panel.row();
    const info = panel.readout();
    app.on('update', () => {
      info.textContent = `activeState ${layer.activeState} | previousState ${layer.previousState ?? '-'} | transitioning ${layer.transitioning} | speed ${anim.getFloat('speed').toFixed(2)} | jump ${anim.getTrigger('jump')}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
