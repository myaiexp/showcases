// A one-shot state with returnTo: true goes back to the loop it interrupted
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

  const controller = new AnimationController(model.animationSet);
  controller
    .addState('run', {
      transition: 0.2,
      timeline: { steps: [{ type: 'play', clip: 'run', options: { repeat: 0 } }] },
      responses: [
        {
          // jump plays to its end, then the controller returns to run
          event: 'jump',
          target: { targetState: 'jump', returnTo: true, returnTransition: 0.15 },
          // Fade run out over 0.12 s while jump fades in with the jump state's own transition
          onActive: { fadeOut: 0.12 },
        },
      ],
    })
    .addState('jump', {
      transition: 0.12,
      timeline: {
        // repeat: 1 plays once; wait: 'complete' keeps the state alive until the clip finishes
        steps: [{ type: 'play', clip: 'jump', options: { repeat: 1 }, wait: 'complete' }],
      },
    });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 7);
  controller.on('statechange', (state, prev) => {
    log(`statechange: ${prev ?? '(none)'} -> ${state}`);
    stage.caption(`state: ${state}`);
  });
  controller.on('statecomplete', (state) => log(`statecomplete: ${state}`));
  controller.setState('run');

  if (stage.bar) button(stage.bar, "dispatch('jump')", () => controller.dispatch('jump'));
  else stage.every(2800, () => controller.dispatch('jump'));
  myApp.run();
});
