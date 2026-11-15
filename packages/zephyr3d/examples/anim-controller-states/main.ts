// AnimationController: idle, walk and run states, switched by dispatch() events
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { AnimationController, Application, Scene } from '@zephyr3d/scene';
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

  // Bind the controller to the model's AnimationSet; states play clips by name from this set
  const controller = new AnimationController(model.animationSet);
  const loop = (clip: string) => ({ timeline: { steps: [{ type: 'play' as const, clip, options: { repeat: 0 } }] } });
  controller
    .addState('idle', {
      ...loop('idle'),
      transition: 0.2,
      responses: [
        { event: 'move', target: { targetState: 'walk' } },
        { event: 'run', target: { targetState: 'run' } },
      ],
    })
    .addState('walk', {
      ...loop('walk'),
      transition: 0.25,
      responses: [
        { event: 'stop', target: { targetState: 'idle' } },
        { event: 'run', target: { targetState: 'run' } },
      ],
    })
    .addState('run', {
      ...loop('run'),
      transition: 0.25,
      responses: [
        { event: 'slow', target: { targetState: 'walk' } },
        { event: 'stop', target: { targetState: 'idle' } },
      ],
    });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 8);
  controller.on('statechange', (state, prev) => {
    log(`state: ${prev ?? '(none)'} -> ${state}`);
    stage.caption(`state: ${state}`);
  });
  // Fires after every dispatch(), including events the current state ignores
  controller.on('event', (event, _payload, result) => log(`dispatch('${event}') -> policy '${result.policy}', handled ${result.handled}`));
  controller.setState('idle');

  const events = ['move', 'run', 'slow', 'stop'];
  if (stage.bar) events.forEach((e) => button(stage.bar!, `dispatch('${e}')`, () => controller.dispatch(e)));
  else {
    const script = ['move', 'run', 'slow', 'stop'];
    stage.every(2200, (i) => controller.dispatch(script[(i - 1) % script.length]!));
  }
  myApp.run();
});
