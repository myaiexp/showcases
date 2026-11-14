// PICK_PASS in a custom shader: pickPS lets the Picker find a custom mesh
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, createShaderScene, firstInstance, onTick, type ShapeType, type ShaderDesc } from '../../shared/shaders.ts';

// PICK_PASS is defined while the Picker renders mesh instance IDs. getPickOutput() from pickPS
// returns the ID encoded as a colour, so in that pass the fragment shader writes it instead of shading.
const shaderDesc: ShaderDesc = {
  uniqueName: 'ShaderPickPass',
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
    #ifdef PICK_PASS
        #include "pickPS"
    #endif

    varying vec3 vNormalW;
    uniform vec3 uColor;
    uniform float uHot;

    void main(void) {
        #ifdef PICK_PASS
            gl_FragColor = getPickOutput();
        #else
            float light = 0.4 + 0.6 * max(dot(normalize(vNormalW), normalize(vec3(0.4, 0.8, 0.5))), 0.0);
            vec3 color = mix(uColor, vec3(1.0, 0.85, 0.3), uHot);
            gl_FragColor = vec4(color * light, 1.0);
        #endif
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aNormal: pc.SEMANTIC_NORMAL },
};

const SHAPES: ShapeType[] = ['sphere', 'box', 'cone', 'cylinder', 'torus', 'capsule'];

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { distance: 10, pitch: -25, autoRotate: 0 });
  const { app, camera, stage } = scene;
  const { canvas } = stage;

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uColor', [0.35, 0.55, 0.9]);
  material.setParameter('uHot', 0);
  const shapes = SHAPES.map((type, i) => {
    const entity = addShape(app, type, material, [((i % 3) - 1) * 3, i < 3 ? 1.4 : -1.4, 0], 2);
    entity.name = type;
    return entity;
  });

  // A pick buffer at half the canvas size; the same Picker serves every material that supports PICK_PASS.
  const scale = 0.5;
  const picker = new pc.Picker(app, canvas.clientWidth * scale, canvas.clientHeight * scale);
  const observer = new ResizeObserver(() => picker.resize(canvas.clientWidth * scale, canvas.clientHeight * scale));
  observer.observe(canvas);

  const probe = document.createElement('div');
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  canvas.before(wrap);
  wrap.append(canvas, probe);
  Object.assign(probe.style, { position: 'absolute', left: '0', top: '0', width: '18px', height: '18px', margin: '-9px 0 0 -9px', border: '2px solid #ffb020', borderRadius: '50%', pointerEvents: 'none' });
  const pointer = { x: 0, y: 0, over: false };
  const onMove = (e: PointerEvent): void => {
    const box = canvas.getBoundingClientRect();
    pointer.x = e.clientX - box.left;
    pointer.y = e.clientY - box.top;
    pointer.over = true;
  };
  const onLeave = (): void => void (pointer.over = false);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);

  const readout = ctx.preview ? null : createPanel(el).readout('move over the shapes');
  let busy = false;
  let hotInstance: pc.MeshInstance | null = null;
  onTick(app, (t, dt) => {
    shapes.forEach((s, i) => s.rotate(0, (i % 2 ? -25 : 25) * dt, 0));
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const x = pointer.over ? pointer.x : w * (0.5 + Math.sin(t * 0.7) * 0.3);
    const y = pointer.over ? pointer.y : h * (0.5 + Math.sin(t * 1.3) * 0.28);
    probe.style.transform = `translate(${x}px, ${y}px)`;

    picker.prepare(camera.camera!, app.scene);
    if (busy) return;
    busy = true;
    void picker
      .getSelectionAsync(x * scale, y * scale)
      .then((selection) => {
        const instance = (selection[0] as pc.MeshInstance | undefined) ?? null;
        const found = instance && shapes.some((s) => firstInstance(s) === instance) ? instance : null;
        if (found !== hotInstance) {
          hotInstance?.deleteParameter('uHot');
          found?.setParameter('uHot', 1);
          hotInstance = found;
        }
        if (readout) readout.textContent = found ? `picked: ${found.node.name}` : 'nothing under the probe';
      })
      .catch(() => undefined)
      .finally(() => (busy = false));
  });

  return () => {
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
    observer.disconnect();
    picker.destroy();
    scene.dispose();
  };
};

export default mount;
