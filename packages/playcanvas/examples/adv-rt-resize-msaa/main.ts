// Resizing a render target at runtime, and MSAA through its samples option
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, createFeed, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const feed = createFeed(app);
  onTick(app, (t) => feed.animate(t));

  let width = ctx.preview ? 96 : 192;
  let samples = ctx.preview ? 1 : 4;
  let texture = renderTexture(stage.device, width, (width * 3) / 4, pc.PIXELFORMAT_RGBA8, pc.FILTER_NEAREST);
  let target: pc.RenderTarget;
  let camera: pc.Entity;
  let material = screenMaterial(texture);
  const screen = addScreen(app, material, [0, 0, 0], 8, 6);

  // `samples` is fixed when the target is created, so changing it builds a new target
  // (and camera) around the same texture. Resolving the MSAA samples fills `texture`.
  const buildTarget = (): void => {
    camera?.destroy();
    target?.destroy();
    target = new pc.RenderTarget({ colorBuffer: texture, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP, samples });
    camera = feed.addCamera({ renderTarget: target, priority: -1 });
  };
  buildTarget();

  // A card shows the resize on its own: the target sweeps between coarse and fine.
  onTick(app, (t) => {
    if (!ctx.preview) return;
    const w = Math.round(48 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 208);
    target.resize(w, Math.round((w * 3) / 4));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout();
    const show = (): void => {
      readout.textContent = `${target.width} x ${target.height} texels, ${samples} sample${samples > 1 ? 's' : ''}`;
    };
    panel.slider('width', 16, 512, 8, width, (v) => {
      width = v;
      target.resize(width, Math.round((width * 3) / 4)); // contents are not preserved; the next frame refills them
      show();
    });
    panel.select('samples', ['1', '4'], String(samples) as '1' | '4', (v) => {
      samples = Number(v);
      buildTarget();
      show();
    });
    panel.select('texture filter', ['nearest', 'linear'], 'nearest', (v) => {
      texture.minFilter = texture.magFilter = v === 'nearest' ? pc.FILTER_NEAREST : pc.FILTER_LINEAR;
    });
    show();
  }

  return () => {
    camera.destroy();
    target.destroy();
    texture.destroy(); // a render target does not own its texture
    material.destroy();
    screen.destroy();
    feed.dispose();
    scene.dispose();
  };
};

export default mount;
