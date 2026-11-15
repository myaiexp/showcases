// Response dispositions: onActive 'keep' overlays, enqueue waits its turn, { fadeOut } interrupts
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
  const animSet = model.animationSet;
  // The overlay only touches the upper body, so it can play on top of a walking figure
  animSet.createSkeletalMaskedAnimation('wave', 'wave_upper', { type: 'humanoid', preset: 'upperBody' });

  const controller = new AnimationController(animSet);
  controller
    .addState('walkOnce', {
      transition: 0.2,
      timeline: { steps: [{ type: 'play', clip: 'walk', options: { repeat: 3 }, wait: 'complete' }] },
      responses: [
        {
          // Keep the walk and run these steps beside it
          event: 'flinch',
          target: { steps: [{ type: 'play', clip: 'wave_upper', options: { repeat: 1, fadeIn: 0.05 }, wait: 'complete' }] },
          onActive: 'keep',
        },
        {
          // Wait until the current flow drains, then jump
          event: 'queueJump',
          target: {
            steps: [
              { type: 'play', clip: 'jump', options: { repeat: 1 }, wait: 'complete' },
              { type: 'emit', event: 'queued-jump-finished' },
            ],
          },
          enqueue: true,
        },
        // Fade the walk out over 0.3 s, then enter run
        { event: 'sprint', target: { targetState: 'run' }, onActive: { fadeOut: 0.3 } },
      ],
    })
    .addState('run', {
      transition: 0.2,
      timeline: { steps: [{ type: 'play', clip: 'run', options: { repeat: 3 }, wait: 'complete' }] },
    });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 8);
  controller.on('event', (event, _p, result) => log(`dispatch('${event}') -> policy '${result.policy}', handled ${result.handled}`));
  controller.on('emit', (event) => log(`emit: ${event}`));
  controller.on('statechange', (state) => stage.caption(`state: ${state}`));
  // One-shot states finish: start the walk again when all flows and the queue are done
  controller.on('statecomplete', (state) => {
    log(`statecomplete: ${state}`);
    controller.setState('walkOnce', { force: true });
  });
  controller.setState('walkOnce');

  const events = ['flinch', 'queueJump', 'sprint'];
  if (stage.bar) events.forEach((e) => button(stage.bar!, `dispatch('${e}')`, () => controller.dispatch(e)));
  else stage.every(2300, (i) => controller.dispatch(events[i % events.length]!));
  myApp.run();
});
