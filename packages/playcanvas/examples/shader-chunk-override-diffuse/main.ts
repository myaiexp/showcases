// Overriding diffusePS with a world-space checker and shaderChunksVersion
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick } from '../../shared/shaders.ts';

// getAlbedo() fills dAlbedo. The override keeps the material_diffuse uniform of the original
// chunk and multiplies a 3D checker of world-space cells into it, so the pattern ignores the uvs.
const GLSL = /* glsl */ `
    uniform vec3 material_diffuse;
    uniform float uCell;
    void getAlbedo() {
        vec3 cell = floor(vPositionW * uCell);
        float parity = mod(cell.x + cell.y + cell.z, 2.0);
        dAlbedo = material_diffuse.rgb * mix(0.3, 1.0, parity);
    }
`;
const WGSL = /* wgsl */ `
    uniform material_diffuse: vec3f;
    uniform uCell: f32;
    fn getAlbedo() {
        let cell = floor(vPositionW * uniform.uCell);
        let parity = abs((cell.x + cell.y + cell.z) % 2.0);
        dAlbedo = uniform.material_diffuse * mix(0.3, 1.0, parity);
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 9, pitch: -20, sun: { angles: [55, 25, 0], intensity: 1.1 } });
  const { app } = scene;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);

  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString('#e8794a');
  material.useMetalness = true;
  material.metalness = 0;
  material.gloss = 0.5;
  material.getShaderChunks(pc.SHADERLANGUAGE_GLSL).set('diffusePS', GLSL);
  material.getShaderChunks(pc.SHADERLANGUAGE_WGSL).set('diffusePS', WGSL);
  // Chunks written against this engine release are flagged with it, which silences the
  // debug build's warnings about chunk API changes (major.minor of the running engine).
  material.shaderChunksVersion = pc.version.split('.').slice(0, 2).join('.');
  material.setParameter('uCell', 2);
  material.update();

  const shapes = [
    addShape(app, 'sphere', material, [-2.6, 0, 0], 2.4),
    addShape(app, 'box', material, [0, 0, 0], 2),
    addShape(app, 'cone', material, [2.6, 0, 0], [2, 2.4, 2]),
  ];

  let cell = 2;
  onTick(app, (t) => {
    // The cells are fixed in the world, so moving a shape slides the pattern over it.
    shapes.forEach((s, i) => s.setLocalPosition(s.getLocalPosition().x, Math.sin(t * 0.8 + i * 1.7) * 0.5, 0));
    if (ctx.preview) cell = 2 + Math.sin(t * 0.4) * 0.8;
    material.setParameter('uCell', cell);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('uCell (cells per unit)', 0.5, 6, 0.1, 2, (v) => (cell = v));
    panel.readout('the shapes bob through fixed world-space cells');
  }

  return () => scene.dispose();
};

export default mount;
