// Clips playing together blend as a weighted average: idle, walk and run with live weights
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { animScene, loadGlb } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
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

  // All three play at once; each weight is its share of the average
  const clips = ['idle', 'walk', 'run'] as const;
  const weights: Record<(typeof clips)[number], number> = { idle: 3, walk: 7, run: 5 };
  const playbacks = clips.map((name) => animSet.play(name, { repeat: 0, weight: weights[name] })!);

  const out = stage.readout();
  const show = (): void => {
    const sum = playbacks.reduce((s, p) => s + p.weight, 0);
    const text = playbacks.map((p) => `${p.clip.name} ${p.weight.toFixed(1)} (${Math.round((100 * p.weight) / sum)}%)`).join('   ');
    if (out) out.textContent = text;
    stage.caption(playbacks.map((p) => `${p.clip.name} ${p.weight.toFixed(1)}`).join(' : '));
  };
  show();

  if (stage.bar) {
    playbacks.forEach((p) =>
      slider(stage.bar!, `${p.clip.name} weight`, [0, 10, 0.1], p.weight, (v) => {
        // A playback's weight is writable while it plays; keep a sliver so the sum never hits 0
        p.weight = Math.max(v, 0.001);
        show();
      }),
    );
  } else {
    // Cards: slide the weight from idle through walk to run and back
    myApp.on('tick', (_dt: number, elapsed: number) => {
      const t = elapsed / 1000;
      playbacks[0]!.weight = 0.05 + 4 * Math.max(0, Math.cos(t * 0.7));
      playbacks[1]!.weight = 0.05 + 4 * Math.max(0, Math.sin(t * 0.7));
      playbacks[2]!.weight = 0.05 + 4 * Math.max(0, -Math.cos(t * 0.7));
      show();
    });
  }
  myApp.run();
});
