// A layered state: lower-body run, upper-body run synced to it, a wave insert and a full-body dodge
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { AnimationController, Application, Mesh, Scene, SphereShape } from '@zephyr3d/scene';
import { animScene, flat, loadGlb, logTo } from '../../shared/anim-kit.ts';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;
  animSet.createSkeletalMaskedAnimation('run', 'run_lower', { type: 'humanoid', preset: 'lowerBody' });
  animSet.createSkeletalMaskedAnimation('run', 'run_upper', { type: 'humanoid', preset: 'upperBody' });
  animSet.createSkeletalMaskedAnimation('wave', 'wave_upper', { type: 'humanoid', preset: 'upperBody' });

  const lampOff = flat(0.25, 0.25, 0.3);
  const lampOn = flat(1, 0.4, 0.2);
  const lamp = new Mesh(scene, new SphereShape({ radius: 0.1 }), lampOff);
  lamp.position.setXYZ(0.6, 1.9, 0);

  const controller = new AnimationController(animSet);
  controller
    .addState('layeredRun', {
      timeline: {
        steps: [
          // The lower body is the phase reference
          { type: 'play', clip: 'run_lower', id: 'lowerLoop', options: { repeat: 0 } },
          { type: 'play', clip: 'run_upper', id: 'upperLoop', options: { repeat: 0, sync: { target: 'lowerLoop', mode: 'time' } } },
        ],
      },
      responses: [
        {
          event: 'wave',
          target: {
            steps: [
              // Stop only the upper loop: lowerLoop keeps running as the phase source
              { type: 'stop', target: 'upperLoop', options: { fadeOut: 0.08 } },
              {
                type: 'parallel',
                steps: [
                  { type: 'play', clip: 'wave_upper', id: 'waveUpper', options: { repeat: 1, fadeIn: 0.08 }, wait: 'complete' },
                  {
                    type: 'sequence',
                    steps: [
                      { type: 'wait', seconds: 0.35 },
                      { type: 'emit', event: 'wave-mid' },
                    ],
                  },
                ],
              },
              // Restore the upper loop at the lower body's phase; reusing the id lets the next wave find it
              { type: 'play', clip: 'run_upper', id: 'upperLoop', options: { repeat: 0, fadeIn: 0.12, sync: { target: 'lowerLoop', mode: 'time' } } },
            ],
          },
          // Keep the lower-body branch alive: the response replaces only the upper body
          onActive: 'keep',
        },
        {
          // Full-body insert: fade the whole layered state out, jump, return
          event: 'dodge',
          target: { targetState: 'dodge', returnTo: true, returnTransition: 0.15 },
          onActive: { fadeOut: 0.1 },
        },
      ],
    })
    .addState('dodge', {
      transition: 0.1,
      timeline: { steps: [{ type: 'play', clip: 'jump', options: { repeat: 1 }, wait: 'complete' }] },
    });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 7);
  let lit = 0;
  controller.on('emit', (event) => {
    log(`emit: ${event}`);
    lamp.material = lampOn;
    lit = 400;
  });
  controller.on('event', (event, _p, result) => log(`dispatch('${event}') -> policy '${result.policy}'`));
  controller.on('statechange', (state) => {
    log(`state: ${state}`);
    stage.caption(`state: ${state}`);
  });
  myApp.on('tick', (dt: number) => {
    if (lit > 0 && (lit -= dt) <= 0) lamp.material = lampOff;
  });
  controller.setState('layeredRun');

  const events = ['wave', 'dodge'];
  if (stage.bar) events.forEach((e) => button(stage.bar!, `dispatch('${e}')`, () => controller.dispatch(e)));
  else stage.every(2600, (i) => controller.dispatch(events[i % events.length]!));
  myApp.run();
});
