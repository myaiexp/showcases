// GSplatProcessor: a GPU pass paints a per-instance stream, shown on copy
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { cloudContainer, createSplatScene, discShellCloud, hue } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';
import { showNotice } from '../../shared/notice.ts';
import { copyGLSL, copyWGSL, processGLSL, processWGSL } from './shaders.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 6, pitch: -20, autoRotate: 10 });
  const { app, stage } = scene;

  // Dark grey splats, so the paint stands out.
  const cloud = discShellCloud(3200, 1.4);
  for (let i = 0; i < cloud.count; i++) cloud.colors.set([0.3, 0.3, 0.34, 1], i * 4);
  const container = cloudContainer(stage.device, cloud);

  // An extra stream with one texture per gsplat component: add it before the component exists.
  container.format.addExtraStreams([{ name: 'customColor', format: pc.PIXELFORMAT_RGBA8, storage: pc.GSPLAT_STREAM_INSTANCE }]);
  const ball = scene.add(container, 'ball');
  const gs = ball.gsplat!;
  // The paint is read while the splats are copied into the work buffer, and it changes every frame.
  gs.setWorkBufferModifier({ glsl: copyGLSL, wgsl: copyWGSL });
  gs.workBufferUpdate = pc.WORKBUFFER_UPDATE_ALWAYS;

  let processor: pc.GSplatProcessor | null = null;
  try {
    // Read all the splat data of the component; write only the customColor stream.
    processor = new pc.GSplatProcessor(stage.device, { component: gs }, { component: gs, streams: ['customColor'] }, { processGLSL, processWGSL });
    // Additive blending makes strokes accumulate instead of replacing each other.
    processor.blendState = pc.BlendState.ADDBLEND;
  } catch (error) {
    showNotice(el, `GSplatProcessor is not available here: ${(error as Error).message}`);
  }

  const params = { radius: 0.55, strength: 0.14, speed: 1 };
  let time = 0;
  let failed = false;
  const stroke = (clear: boolean): void => {
    if (!processor || failed) return;
    try {
      const a = time * 1.3 * params.speed;
      const b = time * 0.8 * params.speed;
      processor.setParameter('uBrushSphere', [Math.sin(a) * Math.cos(b) * 1.4, Math.cos(a) * 1.4, Math.sin(a) * Math.sin(b) * 1.4, params.radius]);
      const [r, g, bl] = hue((time * 0.07) % 1, 0.85, 1);
      const s = params.strength;
      processor.setParameter('uBrushColor', [r * s, g * s, bl * s, s]);
      processor.setParameter('uClear', clear ? 1 : 0);
      processor.blendState = clear ? pc.BlendState.NOBLEND : pc.BlendState.ADDBLEND;
      processor.process();
    } catch (error) {
      failed = true;
      showNotice(el, `The processor pass failed: ${(error as Error).message}`);
    }
  };
  app.on('update', (dt: number) => {
    time += dt;
    stroke(false);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Brush radius', 0.2, 1.2, 0.05, params.radius, (v) => (params.radius = v));
    panel.slider('Strength', 0.03, 0.4, 0.01, params.strength, (v) => (params.strength = v));
    panel.slider('Brush speed', 0, 3, 0.1, 1, (v) => (params.speed = v));
    panel.button('Clear the paint', () => stroke(true));
  }

  return () => {
    processor?.destroy();
    scene.dispose();
  };
};

export default mount;
