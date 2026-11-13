// CreateViewerForCanvas: the Viewer driven from code with loadModel
import type { Observable } from '@babylonjs/core';
import { CreateViewerForCanvas } from '@babylonjs/viewer';
import type { Viewer } from '@babylonjs/viewer';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb, sampleStl } from '../../shared/sample-model.ts';

const mount: Mount = async (el, ctx) => {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: ctx.preview ? '200px' : '440px', outline: 'none', touchAction: 'none' });
  el.append(canvas);

  const glb = await sampleGlb();
  let disposed = false;
  let viewer: Viewer | undefined;
  const subscriptions: Array<() => void> = [];

  // The options are the same ones the <babylon-viewer> element takes.
  viewer = await CreateViewerForCanvas(canvas, {
    clearColor: [0.04, 0.05, 0.09, 1],
    cameraAutoOrbit: { enabled: true, speed: ctx.preview ? 0.5 : 0.25, delay: 0 },
    animationAutoPlay: true,
    postProcessing: { toneMapping: 'neutral' },
    shadowConfig: { quality: ctx.preview ? 'none' : 'normal' },
    onFaulted: (error) => console.error(error),
  });
  if (disposed) {
    viewer.dispose();
    return () => undefined;
  }
  await viewer.loadModel(glb, { pluginExtension: '.glb' });

  if (!ctx.preview) {
    const v = viewer;
    const panel = createPanel(el);
    const readout = panel.readout('Loading...');
    const status = (): void => {
      readout.textContent = `animations: ${v.animations.join(', ') || 'none'}  |  playing: ${v.isAnimationPlaying}  |  progress: ${v.animationProgress.toFixed(2)}`;
    };
    // The Viewer exposes Babylon Observables for every piece of state.
    for (const observable of [v.onModelChanged, v.onAnimationProgressChanged, v.onAnimationSpeedChanged] as Array<Observable<unknown>>) {
      const observer = observable.add(status);
      subscriptions.push(() => observable.remove(observer));
    }
    panel.row();
    panel.button('Load a glb', () => void v.loadModel(glb, { pluginExtension: '.glb' }));
    panel.button('Load the STL totem', async () => v.loadModel(new Uint8Array(await sampleStl(true).then((d) => d.buffer as ArrayBuffer)), { pluginExtension: '.stl' }));
    panel.button('toggleAnimation()', () => v.toggleAnimation());
    panel.button('resetCamera()', () => v.resetCamera());
    panel.button('updateCamera(...)', () => v.updateCamera({ alpha: Math.random() * 6.28, beta: 0.8 + Math.random() * 0.8, radius: 6 + Math.random() * 4 }));
    panel.row();
    panel.slider('animationSpeed', 0.5, 2, 0.5, 1, (s) => (v.animationSpeed = s));
    panel.slider('postProcessing.exposure', 0.4, 2.5, 0.1, 1, (e) => (v.postProcessing = { exposure: e }));
    panel.select('toneMapping', ['neutral', 'standard', 'aces', 'none'] as const, 'neutral', (m) => (v.postProcessing = { toneMapping: m }));
    panel.check('cameraAutoOrbit', true, (on) => (v.cameraAutoOrbit = { ...v.cameraAutoOrbit, enabled: on }));
    status();
  }

  return () => {
    disposed = true;
    for (const off of subscriptions) off();
    viewer?.dispose(); // disposes its engine and scene
    canvas.remove();
  };
};

export default mount;
