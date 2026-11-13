// Perspective vs orthographic: two scissored views of one scene, the right one showing the left camera's frustum
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { panel, select, slider } from './panel.ts';
import './style.css';

type Kind = 'Perspective' | 'Orthographic';
const FRUSTUM_HEIGHT = 12; // world units visible vertically by the orthographic camera at zoom 1

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();

  // Subject: a ground plane and two rows of colourful spheres running away from the camera.
  const disposables: { dispose(): void }[] = [];
  const groundGeo = new THREE.PlaneGeometry(60, 60);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x889099 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  const ballGeo = new THREE.SphereGeometry(1.2, 24, 12);
  scene.add(ground, new THREE.HemisphereLight(0xffffff, 0x445566, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(6, 12, 8);
  scene.add(sun);
  disposables.push(groundGeo, groundMat, ballGeo);
  for (let i = 0; i < 14; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(i * 0.073, 0.8, 0.55) });
    const ball = new THREE.Mesh(ballGeo, mat);
    ball.position.set(i % 2 ? 3 : -3, 1.2, 8 - i * 3);
    scene.add(ball);
    disposables.push(mat);
  }

  // The camera under inspection (left view): perspective and orthographic variants.
  const persp = new THREE.PerspectiveCamera(50, 1, 1, 30);
  const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 30);
  for (const c of [persp, ortho]) c.position.set(6, 5, 16);
  // The overview camera (right view), always perspective, standing back to see the frustum.
  const overview = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
  overview.position.set(34, 22, 10);

  let kind: Kind = 'Perspective';
  const active = (): THREE.PerspectiveCamera | THREE.OrthographicCamera =>
    kind === 'Perspective' ? persp : ortho;

  // A CameraHelper draws a camera's frustum; one per camera, only the active one is visible.
  const helpers = { Perspective: new THREE.CameraHelper(persp), Orthographic: new THREE.CameraHelper(ortho) };
  scene.add(helpers.Perspective, helpers.Orthographic);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const tag = h('div', { class: 'tag' }, kind);
  // Two transparent halves lie over the canvas so each view gets its own OrbitControls.
  const left = h('div', { class: 'half left' });
  const right = h('div', { class: 'half right' });
  const view = h(
    'div',
    { class: preview ? 'view is-preview' : 'view' },
    renderer.domElement,
    h('div', { class: 'split' }, left, right),
    tag,
  );
  el.append(view);

  let controlsL: OrbitControls | null = null;
  let controlsR: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  let timer = 0;
  const setKind = (k: Kind): void => {
    kind = k;
    tag.textContent = `${k}Camera | left view`;
    if (controlsL) controlsL.object = active();
  };
  if (preview) {
    // No input in a card: swap camera type on a timer.
    timer = window.setInterval(() => setKind(kind === 'Perspective' ? 'Orthographic' : 'Perspective'), 2500);
  } else {
    controlsL = new OrbitControls(persp, left);
    controlsL.target.set(0, 1, -10);
    controlsL.update();
    controlsR = new OrbitControls(overview, right);
    controlsR.target.set(0, 0, -8);
    controlsR.update();
    const kindUi = select<Kind>('Camera', ['Perspective', 'Orthographic'], kind, (k) => {
      // Both cameras keep the same pose so the swap is easy to compare.
      const from = active();
      setKind(k);
      active().position.copy(from.position);
      active().quaternion.copy(from.quaternion);
      controlsL?.update();
    });
    panelEl = panel(
      kindUi.row,
      slider('fov (persp)', 10, 120, 1, persp.fov, (v) => (persp.fov = v), 0).row,
      slider('zoom (ortho)', 0.3, 3, 0.05, ortho.zoom, (v) => (ortho.zoom = v)).row,
      slider('near', 0.1, 20, 0.1, 1, (v) => (persp.near = ortho.near = v), 1).row,
      slider('far', 5, 60, 0.5, 30, (v) => (persp.far = ortho.far = v), 1).row,
    );
    el.append(panelEl);
  }
  tag.textContent = `${kind}Camera | left view`;

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ht } = renderer.domElement;
    if (w === 0 || ht === 0) return;
    renderer.setSize(w, ht, false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  const background = new THREE.Color();
  scene.background = background;
  renderer.setAnimationLoop((time) => {
    const w = renderer.domElement.clientWidth;
    const ht = renderer.domElement.clientHeight;
    const half = Math.floor(w / 2);
    if (preview) {
      const a = time / 4000;
      for (const c of [persp, ortho]) {
        c.position.set(Math.sin(a) * 8, 5, 16);
        c.lookAt(0, 1, -10);
      }
      overview.position.set(34, 22, 10);
      overview.lookAt(0, 0, -8);
    }

    // Each camera's aspect follows the half of the canvas it draws into.
    const aspect = half / ht;
    persp.aspect = aspect;
    ortho.left = (-FRUSTUM_HEIGHT * aspect) / 2;
    ortho.right = (FRUSTUM_HEIGHT * aspect) / 2;
    ortho.top = FRUSTUM_HEIGHT / 2;
    ortho.bottom = -FRUSTUM_HEIGHT / 2;
    overview.aspect = aspect;
    for (const c of [persp, ortho, overview]) c.updateProjectionMatrix();
    helpers.Perspective.update();
    helpers.Orthographic.update();

    // setScissor limits where pixels may be written; setViewport maps the camera onto the same box.
    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, half, ht);
    renderer.setViewport(0, 0, half, ht);
    helpers.Perspective.visible = helpers.Orthographic.visible = false;
    background.set(0x10141a);
    renderer.render(scene, active());

    renderer.setScissor(half, 0, w - half, ht);
    renderer.setViewport(half, 0, w - half, ht);
    helpers.Perspective.visible = kind === 'Perspective';
    helpers.Orthographic.visible = kind === 'Orthographic';
    background.set(0x0c1840);
    renderer.render(scene, overview);

    controlsL?.update();
    controlsR?.update();
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.clearInterval(timer);
    observer.disconnect();
    controlsL?.dispose();
    controlsR?.dispose();
    panelEl?.remove();
    helpers.Perspective.dispose();
    helpers.Orthographic.dispose();
    for (const d of disposables) d.dispose();
    renderer.dispose();
  };
};

export default mount;
