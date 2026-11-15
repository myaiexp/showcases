// Initialisation: rendererConfig reaches the WebGLRenderer: antialias off beside the default, and preserveDrawingBuffer for snapshots
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['antialias: false', 'antialias: true + preserveDrawingBuffer'],
    hint: 'Look at the thin links: without antialiasing every edge steps.',
  });
  const [left, right] = stage.panes as [(typeof stage.panes)[number], (typeof stage.panes)[number]];

  const make = (pane: typeof left, rendererConfig: WebGLContextAttributes) =>
    stage
      .own(new ForceGraph3D(pane.container, { rendererConfig }), pane)
      .graphData(randomTree(stage.preview ? 40 : 70, 8))
      .nodeResolution(12)
      .linkOpacity(0.7)
      .linkColor(() => '#c0caf5')
      .backgroundColor('#000011');

  // The config replaces the library's default { antialias: true, alpha: true }, so keep alpha.
  const rough = make(left, { antialias: false, alpha: true });
  const smooth = make(right, { antialias: true, alpha: true, preserveDrawingBuffer: true });
  const both = [rough, smooth];

  // Same data, same layout: turn both cameras together so the comparison stays fair.
  const spins = both.map((g) => spin(stage, () => g, 0.2));
  smooth.cooldownTime(2500).onEngineStop(() => spins.forEach((s) => s.fit(10)));
  rough.cooldownTime(2500);

  if (stage.bar) {
    const log = readout(stage.bar, 'preserveDrawingBuffer lets the right canvas be read back at any time.');
    const shot = document.createElement('img');
    shot.style.cssText = 'width:200px;border-radius:6px;display:none';
    shot.alt = 'Snapshot of the right graph';
    stage.box.append(shot);
    button(stage.bar, 'Snapshot right graph', () => {
      // Without preserveDrawingBuffer this would read a blank canvas.
      shot.src = smooth.renderer().domElement.toDataURL('image/png');
      shot.style.display = 'block';
      log.textContent = 'Saved a PNG of the right canvas below.';
    });
  }

  return stage.dispose;
};

export default mount;
