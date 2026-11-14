// Integer, boolean and trigger parameters; a trigger kept or reset per frame
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, jumpClip, locomotion, waveClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

const GAITS = ['idle', 'walk', 'run'] as const;
const eq = (parameterName: string, value: number | boolean): object => ({ parameterName, predicate: pc.ANIM_EQUAL_TO, value });

const GAIT_STATES = ['Idle', 'Walk', 'Run'];

// An integer parameter picks the gait: every gait leads to the others on gait == n.
const gaitTransitions = GAIT_STATES.flatMap((from) =>
  GAIT_STATES.filter((to) => to !== from).map((to) => ({ from, to, time: 0.25, priority: 3, conditions: [eq('gait', GAIT_STATES.indexOf(to))] })),
);
// A boolean holds a mode for as long as it is set.
const waveTransitions = GAIT_STATES.map((from) => ({ from, to: 'Wave', time: 0.25, priority: 2, conditions: [eq('wave', true)] }));

const stateGraph = {
  layers: [
    {
      name: 'Base',
      states: [
        { name: 'START' },
        { name: 'Idle', loop: true, defaultState: true },
        { name: 'Walk', loop: true },
        { name: 'Run', loop: true },
        { name: 'Wave', loop: true },
        { name: 'Jump', loop: false },
        { name: 'ANY' },
      ],
      transitions: [
        { from: 'START', to: 'Idle' },
        ...gaitTransitions,
        ...waveTransitions,
        // != tests that the boolean was cleared; the gait transitions then take over from Idle.
        { from: 'Wave', to: 'Idle', time: 0.25, priority: 2, conditions: [{ parameterName: 'wave', predicate: pc.ANIM_NOT_EQUAL_TO, value: true }] },
        // A trigger is a boolean that a transition resets when it uses it. The lowest priority number wins.
        { from: 'ANY', to: 'Jump', time: 0.1, priority: 1, conditions: [eq('jump', true)] },
        { from: 'Jump', to: 'Idle', time: 0.2, priority: 1, exitTime: 1 },
      ],
    },
  ],
  parameters: {
    gait: { name: 'gait', type: pc.ANIM_PARAMETER_INTEGER, value: 0 },
    wave: { name: 'wave', type: pc.ANIM_PARAMETER_BOOLEAN, value: false },
    jump: { name: 'jump', type: pc.ANIM_PARAMETER_TRIGGER, value: false },
  },
};

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;
  anim.loadStateGraph(stateGraph);
  const layer = anim.baseLayer!;
  layer.assignAnimation('Idle', idleClip());
  layer.assignAnimation('Walk', locomotion('Walk', 1, 1));
  layer.assignAnimation('Run', locomotion('Run', 0.6, 1.6));
  layer.assignAnimation('Wave', waveClip());
  layer.assignAnimation('Jump', jumpClip());

  if (ctx.preview) {
    const script: (() => void)[] = [
      () => anim.setInteger('gait', 1),
      () => anim.setInteger('gait', 2),
      () => anim.setTrigger('jump'),
      () => anim.setBoolean('wave', true),
      () => {
        anim.setBoolean('wave', false);
        anim.setInteger('gait', 0);
      },
    ];
    let t = 1;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2.2) {
        t = 0;
        script[i++ % script.length]!();
      }
    });
  } else {
    const panel = createPanel(el);
    panel.select('gait (integer)', GAITS, 'idle', (g) => anim.setInteger('gait', GAITS.indexOf(g)));
    panel.check('wave (boolean)', false, (on) => anim.setBoolean('wave', on));
    panel.row();
    panel.button("setTrigger('jump')", () => anim.setTrigger('jump'));
    panel.button("setTrigger('jump', true)", () => anim.setTrigger('jump', true));
    panel.readout('Press the first jump button while already jumping: the trigger stays set and jumps again later. The second one is reset at the end of the frame.');
    panel.row();
    const info = panel.readout();
    app.on('update', () => {
      info.textContent = `state ${layer.activeState} | gait ${anim.getInteger('gait')} | wave ${anim.getBoolean('wave')} | jump trigger ${anim.getTrigger('jump')}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
