// An intro state: two parallel branches (a spin, a delayed wave), then an emit and a hand-off to idle
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { AnimationController, Application, NodeEulerRotationTrack, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb, logTo } from '../../shared/anim-kit.ts';
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

  // First register the node spin as a clip in the current AnimationSet
  const rotate = model.animationSet.createAnimation('rotate')!;
  rotate.timeDuration = 2;
  rotate.addTrack(
    model,
    new NodeEulerRotationTrack('linear', [
      { time: 0, value: new Vector3(0, 0, 0) },
      { time: 2, value: new Vector3(0, Math.PI * 2, 0) },
    ]),
  );

  const controller = new AnimationController(model.animationSet);
  controller
    .addState('intro', {
      timeline: {
        steps: [
          {
            // Start both branches together and continue when both have finished
            type: 'parallel',
            steps: [
              // Branch 1: spin once around Y
              { type: 'play', clip: 'rotate', options: { repeat: 1 }, wait: 'complete' },
              // Branch 2: wait 0.4 s, then wave
              {
                type: 'sequence',
                steps: [
                  { type: 'wait', seconds: 0.4 },
                  { type: 'play', clip: 'wave', options: { repeat: 1 }, wait: 'complete' },
                ],
              },
            ],
          },
          { type: 'emit', event: 'intro-finished' },
        ],
      },
    })
    .addState('idle', {
      transition: 0.2,
      timeline: { steps: [{ type: 'play', clip: 'idle', options: { repeat: 0 } }] },
    });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 6);
  controller.on('emit', (event) => {
    log(`emit: ${event}`);
    stage.caption(`emit '${event}'`);
  });
  controller.on('statechange', (state) => log(`state: ${state}`));
  // Looping states never complete; the one-shot intro does, and the listener moves on to idle
  controller.on('statecomplete', (state) => {
    log(`statecomplete: ${state}`);
    if (state === 'intro') controller.setState('idle');
  });
  const restart = (): void => {
    // force: true re-enters intro even when it is the current state
    controller.setState('intro', { force: true });
  };
  restart();

  if (stage.bar) button(stage.bar, 'reset intro', restart);
  else stage.every(7000, restart);
  myApp.run();
});
