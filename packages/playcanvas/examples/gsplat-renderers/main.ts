// Choosing the splat renderer: CPU sorting everywhere, GPU sorting on WebGPU
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, galaxyCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { showNotice } from '../../shared/notice.ts';

const RENDERERS = {
  'GSPLAT_RENDERER_AUTO': pc.GSPLAT_RENDERER_AUTO,
  'GSPLAT_RENDERER_RASTER_CPU_SORT': pc.GSPLAT_RENDERER_RASTER_CPU_SORT,
  'GSPLAT_RENDERER_RASTER_GPU_SORT': pc.GSPLAT_RENDERER_RASTER_GPU_SORT,
} as const;
type Renderer = keyof typeof RENDERERS;

const nameOf = (value: number): string => Object.entries(RENDERERS).find(([, v]) => v === value)?.[0] ?? String(value);

const mount: Mount = async (el, ctx) => {
  // Ask for WebGPU where the browser has it (cards stay on WebGL 2 to stay light).
  const scene = await createSplatScene(el, ctx, { device: ctx.preview ? 'webgl2' : 'webgpu', distance: 6, pitch: -30, autoRotate: 14 });
  const { app, stage } = scene;
  scene.add(cloudContainer(stage.device, galaxyCloud(24000, 9, 3)), 'galaxy');
  if (!ctx.preview && !stage.device.isWebGPU) {
    showNotice(el, 'This browser gave a WebGL 2 device, so GPU sorting falls back to CPU sorting in a worker.');
  }

  // Swing the camera quickly to make asynchronous (CPU) sorting visible as brief lag.
  let shake = false;
  let time = 0;
  const base = scene.orbit.pitch;
  app.on('update', (dt: number) => {
    time += dt;
    if (!shake) return;
    scene.orbit.yaw += Math.sin(time * 9) * 3;
    scene.orbit.pitch = base + Math.sin(time * 7) * 10;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const status = panel.readout();
    const show = (): void => {
      status.textContent = `${stage.device.deviceType}: requested ${nameOf(app.scene.gsplat.renderer)}, in effect ${nameOf(app.scene.gsplat.currentRenderer)}`;
    };
    panel.select<Renderer>('scene.gsplat.renderer', Object.keys(RENDERERS) as Renderer[], 'GSPLAT_RENDERER_AUTO', (name) => {
      app.scene.gsplat.renderer = RENDERERS[name];
      show();
    });
    panel.check('Shake the camera', false, (on) => (shake = on));
    show();
    app.on('update', show);
  }

  return () => scene.dispose();
};

export default mount;
