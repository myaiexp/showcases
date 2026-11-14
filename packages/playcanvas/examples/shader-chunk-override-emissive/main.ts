// Overriding emissivePS on a StandardMaterial with getShaderChunks (GLSL, WGSL)
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick } from '../../shared/shaders.ts';

// The chunk replaces the engine's getEmission(), which fills dEmission. The StandardMaterial
// keeps its own lighting, shadows and tone mapping; only the emission comes from this code.
const GLSL = /* glsl */ `
    uniform float uPhase;
    uniform vec3 uGlowColor;
    void getEmission() {
        float band = 0.5 + 0.5 * sin(vPositionW.y * 6.0 - uPhase * 3.0);
        dEmission = uGlowColor * pow(band, 3.0) * 1.4;
    }
`;
const WGSL = /* wgsl */ `
    uniform uPhase: f32;
    uniform uGlowColor: vec3f;
    fn getEmission() {
        let band = 0.5 + 0.5 * sin(vPositionW.y * 6.0 - uniform.uPhase * 3.0);
        dEmission = uniform.uGlowColor * pow(band, 3.0) * 1.4;
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 9, pitch: -18, sun: { angles: [50, 30, 0], intensity: 1 } });
  const { app } = scene;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);

  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString('#5d6a80');
  material.useMetalness = true;
  material.metalness = 0.2;
  material.gloss = 0.6;
  const set = (on: boolean): void => {
    for (const [language, code] of [[pc.SHADERLANGUAGE_GLSL, GLSL], [pc.SHADERLANGUAGE_WGSL, WGSL]] as const) {
      const chunks = material.getShaderChunks(language);
      if (on) chunks.set('emissivePS', code);
      else chunks.delete('emissivePS');
    }
    // call update to apply the changes
    material.update();
  };
  set(true);
  material.setParameter('uGlowColor', [1, 0.45, 0.1]);

  addShape(app, 'sphere', material, [-2.6, 0, 0], 2.4);
  addShape(app, 'cylinder', material, [0, 0, 0], [1.6, 3, 1.6]);
  addShape(app, 'torus', material, [2.6, 0, 0], 2.4);

  let speed = 1;
  let phase = 0;
  onTick(app, (_t, dt) => {
    phase += dt * speed;
    material.setParameter('uPhase', phase);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('emissivePS overridden', true, set);
    panel.slider('uPhase speed', 0, 4, 0.1, 1, (v) => (speed = v));
    panel.select('glow', ['orange', 'cyan', 'green'] as const, 'orange', (name) => {
      material.setParameter('uGlowColor', { orange: [1, 0.45, 0.1], cyan: [0.1, 0.7, 1], green: [0.2, 1, 0.4] }[name]);
    });
  }

  return () => scene.dispose();
};

export default mount;
