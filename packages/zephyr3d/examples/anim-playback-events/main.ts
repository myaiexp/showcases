// Playback events (start, loop, marker, complete, stop) and clip markers for footsteps
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, Mesh, Scene, type AnimationPlayback } from '@zephyr3d/scene';
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
  const log = logTo(stage.readout(), 9);

  // Two footprints that light up when a footstep marker is passed
  const dim = flat(0.2, 0.2, 0.25);
  const lit = flat(1, 0.8, 0.2);
  const pads = [-0.095, 0.095].map((x) => {
    const pad = new Mesh(scene, new BoxShape({ sizeX: 0.14, sizeY: 0.01, sizeZ: 0.3 }), dim);
    pad.position = new Vector3(x, 0.005, 0.05);
    return pad;
  });
  let fade = 0;
  const flash = (side: number): void => {
    pads[side]!.material = lit;
    pads[1 - side]!.material = dim;
    fade = 300;
  };
  myApp.on('tick', (dt: number) => {
    if (fade > 0 && (fade -= dt) <= 0) for (const p of pads) p.material = dim;
  });

  // Markers are named points on the clip's timeline; they are runtime only
  const walk = animSet.getAnimationClip('walk')!;
  walk.addMarker({ name: 'footstep', time: 0.275, payload: { foot: 'left' } });
  walk.addMarker({ name: 'footstep-right', time: 0.825, payload: { foot: 'right' } });

  const watch = (playback: AnimationPlayback, name: string): void => {
    playback.on('start', () => log(`${name}: start`));
    playback.on('loop', () => log(`${name}: loop`));
    playback.on('marker', (ev) => {
      const foot = (ev.marker.payload as { foot: string }).foot;
      log(`${name}: marker '${ev.marker.name}' at ${ev.time.toFixed(2)} s (${foot})`);
      flash(foot === 'left' ? 0 : 1);
      stage.caption(`marker ${ev.marker.name} (${foot})`);
    });
    playback.on('complete', () => log(`${name}: complete`));
    playback.on('stop', (ev) => log(`${name}: stop, reason '${ev.reason}'`));
  };

  const playWalk = (): void => {
    const pb = animSet.play('walk', { repeat: 0, fadeIn: 0.2 });
    if (pb) watch(pb, 'walk');
  };
  const playWave = (): void => {
    animSet.stopAnimation('walk', { fadeOut: 0.2 });
    const pb = animSet.play('wave', { repeat: 2, fadeIn: 0.2 });
    if (pb) watch(pb, 'wave');
  };
  playWalk();

  if (stage.bar) {
    button(stage.bar, 'walk (loops)', () => {
      animSet.stopAnimation('wave', { fadeOut: 0.2 });
      playWalk();
    });
    button(stage.bar, 'wave, twice', playWave);
    button(stage.bar, 'stop all', () => {
      animSet.stopAnimation('walk');
      animSet.stopAnimation('wave');
    });
  }
  myApp.run();
});
