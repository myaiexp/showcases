// A shader spotlight whose vec2 uniform is animated one axis at a time: focusX and focusY get different transitions
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const fragmentShader = /* glsl */ `
  uniform vec2 focus; // 0..1 across the plane, y up
  uniform vec2 size;  // plane size in world units, so circles stay round
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * size;
    float d = distance(p, focus * size);
    float spot = smoothstep(1.2, 0.0, d);
    vec2 cell = abs(fract(p * 3.0 - 0.5) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.04, min(cell.x, cell.y));
    float ring = 1.0 - smoothstep(0.0, 0.02, abs(d - 0.14));
    vec3 col = vec3(0.04, 0.05, 0.09) + spot * 0.12;
    col += line * vec3(0.22, 0.35, 0.85) * (0.12 + spot * 1.3);
    col += ring * vec3(1.0, 0.8, 0.35);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const STOPS: [number, number][] = [[0.15, 0.2], [0.82, 0.3], [0.7, 0.85], [0.2, 0.75], [0.5, 0.5]];

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview, 340);
  host.style.position = 'relative';
  host.style.cursor = preview ? '' : 'crosshair';

  const uniforms = { focus: { value: new THREE.Vector2(0.5, 0.5) }, size: { value: new THREE.Vector2(1, 1) } };
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader }));

  // A 2D canvas laid over the stage draws where the focus has been, so the two axes' paths are visible.
  const trail = document.createElement('canvas');
  trail.className = 'trail';
  host.append(trail);
  const ctx = trail.getContext('2d')!;
  const points: [number, number][] = [];

  const stage = threeStage(host, {
    preview,
    lights: false,
    position: [0, 0, 3.3],
    beforeRender() {
      // Fit the plane to the canvas (visible height at z=3.3 and fov 40 is 2.4 units).
      const h = 2.4;
      const w = h * stage.camera.aspect;
      plane.scale.set(w, h, 1);
      uniforms.size.value.set(w, h);
      if (trail.width !== host.clientWidth) trail.width = host.clientWidth;
      if (trail.height !== host.clientHeight) trail.height = host.clientHeight;
      points.push([uniforms.focus.value.x * trail.width, (1 - uniforms.focus.value.y) * trail.height]);
      if (points.length > 90) points.shift();
      ctx.clearRect(0, 0, trail.width, trail.height);
      ctx.beginPath();
      points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = 'rgba(255, 210, 120, 0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();
    },
  });
  stage.scene.add(plane);

  let bounce = 0.55;
  let seconds = 0.9;
  const ui = panel(el);
  if (preview) ui.el.remove();

  const scope = scopeMotion(el, () => {
    const moveTo = (x: number, y: number): void => {
      // focus is one Vector2 uniform. The X and Y suffixes address its axes separately, so each
      // axis takes its own transition: a bouncy spring across, a smooth ease up and down.
      animate(plane, { focusX: x }, { type: 'spring', visualDuration: seconds, bounce });
      animate(plane, { focusY: y }, { duration: seconds, ease: 'easeInOut' });
    };

    if (preview) {
      let i = 0;
      const tick = (): void => {
        const [x, y] = STOPS[i++ % STOPS.length]!;
        moveTo(x, y);
        delay(tick, 1.6);
      };
      delay(tick, 0.4);
      return;
    }
    host.addEventListener('pointerdown', (e) => {
      const r = host.getBoundingClientRect();
      moveTo((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    });
    ui.slider('X bounce', { min: 0, max: 0.8, step: 0.05, value: bounce }, (v) => (bounce = v));
    ui.slider('duration (s)', { min: 0.3, max: 2, step: 0.1, value: seconds }, (v) => (seconds = v));
    hint(el, 'Click anywhere on the grid. Sideways the spot overshoots on a spring; up and down it eases. The orange line is its path.');
  });

  return () => {
    scope.cancel();
    ui.dispose();
    stage.dispose();
  };
};

export default mount;
