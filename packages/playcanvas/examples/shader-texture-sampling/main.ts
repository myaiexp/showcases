// A texture passed with setParameter and sampled by a sampler2D uniform
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, onTick, type ShaderDesc } from '../../shared/shaders.ts';
import { canvasTexture } from '../../shared/textures.ts';

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderTextureSampling',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec2 vUv0;
    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec2 vUv0;
    uniform sampler2D uMap;
    uniform vec2 uTiling;
    uniform vec2 uOffset;
    void main(void) {
        vec4 texel = texture2D(uMap, vUv0 * uTiling + uOffset);
        gl_FragColor = vec4(texel.rgb, 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 7, pitch: -14 });
  const { app, stage } = scene;

  // A texture drawn in code. srgb:false keeps the stored values as drawn, since this shader writes
  // them straight to the screen.
  const texture = canvasTexture(
    stage.device,
    (g, s) => {
      g.fillStyle = '#1d2a44';
      g.fillRect(0, 0, s, s);
      g.strokeStyle = '#5fa8ff';
      g.lineWidth = 6;
      for (let i = 0; i <= 4; i++) {
        g.beginPath();
        g.moveTo((i * s) / 4, 0);
        g.lineTo((i * s) / 4, s);
        g.moveTo(0, (i * s) / 4);
        g.lineTo(s, (i * s) / 4);
        g.stroke();
      }
      g.fillStyle = '#ffb347';
      g.beginPath();
      g.arc(s / 2, s / 2, s * 0.22, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#10131a';
      g.font = `bold ${s * 0.2}px sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('UV', s / 2, s / 2);
    },
    { size: 256, name: 'shader-uv-grid', srgb: false },
  );

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uMap', texture);
  material.setParameter('uTiling', [1, 1]);
  material.setParameter('uOffset', [0, 0]);
  addShape(app, 'sphere', material, [-1.8, 0, 0], 2.6);
  addShape(app, 'box', material, [1.8, 0, 0], 2);

  let tiling = 1;
  let scroll = ctx.preview ? 0.12 : 0;
  onTick(app, (t) => {
    material.setParameter('uTiling', [tiling, tiling]);
    material.setParameter('uOffset', [t * scroll, 0]);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('tiling', 1, 6, 0.1, 1, (v) => (tiling = v));
    panel.slider('scroll', 0, 0.5, 0.01, 0, (v) => (scroll = v));
    panel.select('addressU', ['repeat', 'clamp', 'mirror'] as const, 'repeat', (mode) => {
      texture.addressU = texture.addressV = { repeat: pc.ADDRESS_REPEAT, clamp: pc.ADDRESS_CLAMP_TO_EDGE, mirror: pc.ADDRESS_MIRRORED_REPEAT }[mode];
    });
  }

  return () => {
    texture.destroy();
    scene.dispose();
  };
};

export default mount;
