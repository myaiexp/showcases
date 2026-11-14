// Built-in screen_size and viewport_size: screen-space halftone dots
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, type ShaderDesc } from '../../shared/shaders.ts';

const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderScreenSizeGrid',
  vertexGLSL: /* glsl */ `
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
  `,
  fragmentGLSL: /* glsl */ `
    uniform vec4 screen_size;    // drawing buffer: width, height, 1/width, 1/height
    uniform vec4 viewport_size;  // camera viewport: the same layout
    uniform float cellPixels;
    varying vec3 vNormalW;
    void main(void) {
        // gl_FragCoord is in pixels, so the grid is the same size on the screen whatever the mesh does.
        vec2 pixel = gl_FragCoord.xy;
        vec2 local = fract(pixel / cellPixels) - 0.5;
        float light = 0.5 + 0.5 * dot(normalize(vNormalW), normalize(vec3(0.5, 0.8, 0.4)));
        float radius = 0.62 * sqrt(light);
        float dotMask = 1.0 - smoothstep(radius - 0.08, radius, length(local));

        // The screen position as 0..1, built from the inverse sizes the engine provides.
        vec2 screenUv = pixel * viewport_size.zw;
        vec3 ink = mix(vec3(1.0, 0.45, 0.2), vec3(0.2, 0.6, 1.0), screenUv.x);
        gl_FragColor = vec4(mix(vec3(0.06, 0.07, 0.1), ink, dotMask), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 8, pitch: -14, autoRotate: 14 });
  const { app, stage } = scene;
  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('cellPixels', ctx.preview ? 8 : 12);
  addShape(app, 'sphere', material, [-2.4, 0, 0], 2.8);
  addShape(app, 'cone', material, [0.4, 0, 0], [2.2, 2.8, 2.2]);
  addShape(app, 'box', material, [3, 0, 0], 2);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('cell size (device pixels)', 4, 40, 1, 12, (v) => material.setParameter('cellPixels', v));
    const size = panel.readout();
    // The drawing buffer is what screen_size reports, not the CSS size.
    app.on('update', () => (size.textContent = `screen_size.xy = ${stage.canvas.width} x ${stage.canvas.height}`));
  }

  return () => scene.dispose();
};

export default mount;
