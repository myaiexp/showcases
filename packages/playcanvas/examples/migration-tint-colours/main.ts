// 2.x tint rule: diffuse and emissive colours always multiply their textures
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture, checkerTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 8.5, pitch: -12, autoRotate: 8 }, floor: 0 });
  const { app } = scene;
  const device = scene.stage.device;

  const checker = checkerTexture(device, '#f0f0f0', '#707070', 6);
  const glow = canvasTexture(
    device,
    (g, s) => {
      g.fillStyle = '#000';
      g.fillRect(0, 0, s, s);
      g.fillStyle = '#ff9a3c';
      for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) if ((i + j) % 2 === 0) g.fillRect(i * (s / 6) + 8, j * (s / 6) + 8, s / 6 - 16, s / 6 - 16);
    },
    { name: 'glow' },
  );

  // Left: the diffuse map is multiplied by the diffuse colour, which is never skipped.
  const diffuse = new pc.StandardMaterial();
  diffuse.diffuseMap = checker;
  diffuse.diffuse = new pc.Color(1, 1, 1);
  diffuse.update();
  // Middle: an emissive map under the default black emissive colour contributes nothing.
  const blackEmissive = new pc.StandardMaterial();
  blackEmissive.diffuse = new pc.Color(0.15, 0.15, 0.18);
  blackEmissive.emissiveMap = glow;
  blackEmissive.update();
  // Right: the same map with a white emissive colour shows in full.
  const whiteEmissive = new pc.StandardMaterial();
  whiteEmissive.diffuse = new pc.Color(0.15, 0.15, 0.18);
  whiteEmissive.emissiveMap = glow;
  whiteEmissive.emissive = new pc.Color(1, 1, 1);
  whiteEmissive.update();

  const spheres = [addShape(app.root, 'sphere', diffuse, [-2.6, 0, 0], 2), addShape(app.root, 'sphere', blackEmissive, [0, 0, 0], 2), addShape(app.root, 'sphere', whiteEmissive, [2.6, 0, 0], 2)];
  app.on('update', (dt: number) => spheres.forEach((s) => s.rotate(0, 25 * dt, 0)));

  if (!ctx.preview) {
    const tint = { r: 1, g: 1, b: 1 };
    const apply = (): void => {
      diffuse.diffuse = new pc.Color(tint.r, tint.g, tint.b);
      diffuse.update();
    };
    const panel = createPanel(el);
    panel.slider('diffuse tint R', 0, 1, 0.01, 1, (v) => ((tint.r = v), apply()));
    panel.slider('G', 0, 1, 0.01, 1, (v) => ((tint.g = v), apply()));
    panel.slider('B', 0, 1, 0.01, 1, (v) => ((tint.b = v), apply()));
    panel.row();
    panel.select('emissive colour (middle sphere)', ['black (default)', 'white'], 'black (default)', (v) => {
      blackEmissive.emissive = v === 'white' ? new pc.Color(1, 1, 1) : new pc.Color(0, 0, 0);
      blackEmissive.update();
    });
  }

  return () => {
    checker.destroy();
    glow.destroy();
    scene.dispose();
  };
};

export default mount;
