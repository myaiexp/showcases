// Engine fragment chunks gammaPS, tonemappingPS and fogPS versus a raw colour
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';

const VERTEX = /* glsl */ `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    uniform mat4 matrix_model;
    uniform mat3 matrix_normal;
    uniform mat4 matrix_viewProjection;
    varying vec3 vNormalW;
    void main(void) {
        vNormalW = normalize(matrix_normal * aNormal);
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
`;

// The linear colour is computed once; the left material then runs it through the engine chunks
// (fog, tone mapping, gamma) like a StandardMaterial would, the right one writes it as it is.
const SHADE = /* glsl */ `
    varying vec3 vNormalW;
    uniform vec3 uColor;
    vec3 shadeLinear() {
        float light = 0.25 + 1.6 * max(dot(normalize(vNormalW), normalize(vec3(0.4, 0.9, 0.5))), 0.0);
        return gammaCorrectInput(uColor) * light;   // an sRGB colour made linear
    }
`;

const withChunks: ShaderDesc = {
  uniqueName: 'ShaderGammaTonemapFogChunks',
  vertexGLSL: VERTEX,
  fragmentGLSL: /* glsl */ `
    #include "gammaPS"
    #include "tonemappingPS"
    #include "fogPS"
    ${SHADE}
    void main(void) {
        vec3 color = shadeLinear();
        color = addFog(color);
        color = toneMap(color);
        gl_FragColor = vec4(gammaCorrectOutput(color), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const raw: ShaderDesc = {
  uniqueName: 'ShaderGammaTonemapFogRaw',
  vertexGLSL: VERTEX,
  fragmentGLSL: /* glsl */ `
    #include "gammaPS"
    ${SHADE}
    void main(void) {
        gl_FragColor = vec4(shadeLinear(), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const TONES = { TONEMAP_LINEAR: pc.TONEMAP_LINEAR, TONEMAP_FILMIC: pc.TONEMAP_FILMIC, TONEMAP_ACES: pc.TONEMAP_ACES, TONEMAP_NEUTRAL: pc.TONEMAP_NEUTRAL } as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 12, pitch: -8, yaw: 0, autoRotate: 0, clear: '#9fb4c8', target: new pc.Vec3(0, 0, -6) });
  const { app, camera } = scene;
  const cam = camera.camera!;
  cam.gammaCorrection = pc.GAMMA_SRGB;
  cam.toneMapping = pc.TONEMAP_ACES;

  const fog = app.scene.fog;
  fog.type = pc.FOG_LINEAR;
  fog.color = new pc.Color().fromString('#9fb4c8');
  fog.start = 4;
  fog.end = 26;

  const chunked = new pc.ShaderMaterial(withChunks);
  const rawMaterial = new pc.ShaderMaterial(raw);
  for (const m of [chunked, rawMaterial]) m.setParameter('uColor', [1, 0.55, 0.2]);
  for (let i = 0; i < 7; i++) {
    addShape(app, 'sphere', chunked, [-1.6, 0, -i * 3], 2);
    addShape(app, 'sphere', rawMaterial, [1.6, 0, -i * 3], 2);
  }

  // Cards slowly slide the camera along the row so the fog depth reads.
  onTick(app, (t) => {
    if (ctx.preview) scene.orbit.yaw = Math.sin(t * 0.5) * 20;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('camera.toneMapping', Object.keys(TONES) as (keyof typeof TONES)[], 'TONEMAP_ACES', (name) => (cam.toneMapping = TONES[name]));
    panel.check('camera.gammaCorrection = SRGB', true, (on) => (cam.gammaCorrection = on ? pc.GAMMA_SRGB : pc.GAMMA_NONE));
    panel.check('scene fog', true, (on) => (fog.type = on ? pc.FOG_LINEAR : pc.FOG_NONE));
    panel.readout('left column: engine chunks; right column: raw colour');
  }

  return () => scene.dispose();
};

export default mount;
