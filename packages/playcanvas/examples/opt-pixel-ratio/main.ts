// Runtime device pixel ratio: maxPixelRatio set live, GPU-name tier check
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { checkerTexture } from '../../shared/textures.ts';

/** The docs' mobile check: some known slow GPUs by the name the browser reports. */
function isLowQualityGPU(device: pc.GraphicsDevice): boolean {
  const renderer = (device as unknown as { unmaskedRenderer?: string }).unmaskedRenderer;
  if (renderer && pc.platform.mobile) {
    return [/Adreno\D*3/, /Adreno\D*4/, /Adreno\D*505/, /Adreno\D*506/, /Mali\D*4/, /Mali\D*5/, /Mali\D*6/, /Mali\D*T7/, /Mali\D*T82/, /Mali\D*T83/].some((re) => re.test(renderer));
  }
  return false;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 6, pitch: -20, autoRotate: 12 }, sun: { angles: [40, 30, 0] }, clear: '#1b2030' });
  const { app, stage } = scene;
  const device = stage.device;

  // Fine detail shows the resolution: a 64-cell checker on a few shapes.
  const checker = checkerTexture(device, '#f2f4f8', '#1a1d26', 64, 512);
  const mat = material('#ffffff');
  mat.diffuseMap = checker;
  mat.update();
  for (const [type, x] of [['box', -1.8], ['sphere', 0], ['cylinder', 1.8]] as const) {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: mat });
    e.setLocalPosition(x, 0.6, 0);
    app.root.addChild(e);
  }

  const apply = (ratio: number): void => {
    // The new ratio takes effect on the next canvas resize, so ask for one.
    device.maxPixelRatio = ratio;
    app.updateCanvasSize();
  };
  const layer = addCanvasLabels(stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  let t = 0;
  let shown = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) {
      // Cards cannot be clicked, so swing between a coarse and a full-resolution ratio.
      const ratio = Math.sin(t * 0.9) > 0 ? 1 : 0.35;
      if (ratio !== device.maxPixelRatio) apply(ratio);
    }
    if (shown > 0.25) {
      shown = 0;
      out.textContent = [
        `window.devicePixelRatio ${window.devicePixelRatio}`,
        `device.maxPixelRatio    ${device.maxPixelRatio.toFixed(2)}`,
        `drawing buffer          ${stage.canvas.width} x ${stage.canvas.height}`,
        `fps                     ${app.stats.fps}`,
      ].join('\n');
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const renderer = (device as unknown as { unmaskedRenderer?: string }).unmaskedRenderer || 'not exposed by this browser';
    panel.slider('maxPixelRatio', 0.25, 3, 0.05, device.maxPixelRatio, apply);
    panel.button('high tier: devicePixelRatio', () => apply(window.devicePixelRatio));
    panel.button('low tier: 1', () => apply(1));
    panel.row();
    panel.readout(`unmaskedRenderer: ${renderer}; isLowQualityGPU(): ${isLowQualityGPU(device)}. The ratio is capped by the screen's own: ${window.devicePixelRatio}.`);
  }

  return () => {
    mat.destroy();
    checker.destroy();
    scene.dispose();
  };
};

export default mount;
