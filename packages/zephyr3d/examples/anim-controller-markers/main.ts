// waitMarker steps turn clip markers into emitted events: an apex lamp and a return to idle
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

  // The generated clip has no markers, so add two: the top of the jump and the end
  const jump = model.animationSet.getAnimationClip('jump')!;
  jump.addMarker({ id: 'apex', name: 'apex', time: 0.62 });
  jump.addMarker({ id: 'end', name: 'end', time: jump.timeDuration });

  const lampOff = flat(0.25, 0.25, 0.3);
  const lampOn = flat(1, 0.85, 0.2);
  const lamp = new Mesh(scene, new SphereShape({ radius: 0.12 }), lampOff);
  lamp.position.setXYZ(0, 2.25, 0);

  const controller = new AnimationController(model.animationSet);
  controller.addState('idle', {
    transition: 0.2,
    timeline: { steps: [{ type: 'play', clip: 'idle', options: { repeat: 0 } }] },
    responses: [
      {
        event: 'jump',
        target: {
          steps: [
            // A local id lets waitMarker point at this playback
            { type: 'play', clip: 'jump', id: 'jumpPlayback', options: { repeat: 1, fadeIn: 0.08 }, wait: false },
            { type: 'waitMarker', marker: 'apex', target: 'jumpPlayback' },
            // Authored timing becomes a gameplay event
            { type: 'emit', event: 'apex-reached' },
            { type: 'waitMarker', marker: 'end', target: 'jumpPlayback' },
            { type: 'play', clip: 'idle', options: { repeat: 0, fadeIn: 0.2 } },
          ],
        },
      },
    ],
  });
  stage.own(() => controller.dispose());

  const log = logTo(stage.readout(), 6);
  let lit = 0;
  controller.on('emit', (event) => {
    log(`emit: ${event}`);
    stage.caption(`emit '${event}' at the apex marker`);
    lamp.material = lampOn;
    lit = 500;
  });
  controller.on('event', (event, _p, result) => log(`dispatch('${event}') -> ${result.policy}`));
  myApp.on('tick', (dt: number) => {
    if (lit > 0 && (lit -= dt) <= 0) lamp.material = lampOff;
  });
  controller.setState('idle');

  if (stage.bar) button(stage.bar, "dispatch('jump')", () => controller.dispatch('jump'));
  else stage.every(3000, () => controller.dispatch('jump'));
  myApp.run();
});
