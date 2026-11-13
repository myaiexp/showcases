// A custom ILoadingScreen replacing engine.loadingScreen while models load
import { ArcRotateCamera, Color4, HemisphericLight, LoadAssetContainerAsync, Vector3 } from '@babylonjs/core';
import type { AssetContainer } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';
import { OverlayLoadingScreen } from './loading-screen.ts';

const COUNT = 6;

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 14, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  // Replace the default screen with ours, then drive it through the engine's own API.
  const screen = new OverlayLoadingScreen(wrap, 'Loading...');
  engine.loadingScreen = screen;

  const glb = await sampleGlb();
  const containers: AssetContainer[] = [];
  let busy = false;
  let disposed = false;
  let delay = 350;

  const sleep = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));
  async function run(): Promise<void> {
    if (busy) return;
    busy = true;
    for (const c of containers.splice(0)) c.dispose();
    screen.setProgress(0);
    engine.displayLoadingUI(); // shows our overlay
    for (let i = 0; i < COUNT && !disposed; i++) {
      engine.loadingUIText = `Loading model ${i + 1} of ${COUNT}`;
      // An unmount mid-load disposes the scene, which rejects the pending load: expected then.
      const container = await LoadAssetContainerAsync(glb, scene).catch((err: unknown) => {
        if (disposed) return null;
        throw err;
      });
      await sleep(delay); // stands in for a slow download
      if (disposed || !container) return;
      container.addAllToScene();
      const root = container.rootNodes[0] as unknown as { position: Vector3 };
      root.position.x = (i - (COUNT - 1) / 2) * 2.4;
      containers.push(container);
      screen.setProgress((i + 1) / COUNT);
    }
    engine.hideLoadingUI();
    busy = false;
  }

  let timer = 0;
  if (ctx.preview) {
    delay = 300;
    void run();
    timer = window.setInterval(() => void run(), 6500);
  } else {
    const panel = createPanel(el);
    panel.slider('simulated delay per model (ms)', 0, 1000, 50, delay, (v) => (delay = v));
    panel.select('loadingUIBackgroundColor', ['#101830', '#3a1020', '#10301f'] as const, '#101830', (v) => (engine.loadingUIBackgroundColor = v));
    panel.button('Reload the six models', () => void run());
    void run();
  }

  return () => {
    disposed = true;
    window.clearInterval(timer);
    stage.dispose();
    screen.dispose();
    wrap.remove();
  };
};

export default mount;
