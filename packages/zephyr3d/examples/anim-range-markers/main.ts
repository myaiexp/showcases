// PlayAnimationOptions.range: loop a slice of a clip given in seconds, frames or marker names
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene, type AnimationTimeRef } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

type Range = { label: string; start?: AnimationTimeRef; end?: AnimationTimeRef };

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { shadows: !stage.preview });
  const model = await loadGlb(scene, '/models/figure.glb');
  const animSet = model.animationSet;

  const clip = animSet.getAnimationClip('run')!;
  clip.addMarker({ name: 'lift', time: 0.1 });
  clip.addMarker({ name: 'plant', time: 0.45 });

  // The same slice written three ways: seconds, frames (clip.frameRate, or fps) and marker names
  const ranges: Range[] = [
    { label: 'whole clip' },
    { label: 'seconds', start: 0.1, end: { time: 0.45 } },
    { label: 'frames', start: { frame: 3 }, end: { frame: 13 } },
    { label: 'markers', start: { marker: 'lift' }, end: { marker: 'plant' } },
    { label: 'from marker to end', start: { marker: 'plant' } },
  ];
  const out = stage.readout();
  let current = ranges[0]!;
  const play = (r: Range): void => {
    current = r;
    animSet.stopAnimation('run');
    animSet.play('run', { repeat: 0, range: { start: r.start, end: r.end } });
    const from = clip.resolveTimeRef(r.start ?? 0);
    const to = clip.resolveTimeRef(r.end ?? clip.timeDuration);
    const text = `range '${r.label}': ${from?.toFixed(2)} s to ${to?.toFixed(2)} s of ${clip.timeDuration.toFixed(2)} s, frameRate ${clip.frameRate}`;
    stage.caption(`range: ${r.label}`);
    if (out) out.textContent = text;
  };
  play(current);
  if (stage.bar) {
    select(stage.bar, 'range', ranges.map((r) => r.label), current.label, (label) => play(ranges.find((r) => r.label === label)!));
  } else {
    stage.every(2200, (i) => play(ranges[i % ranges.length]!));
  }
  myApp.run();
});
