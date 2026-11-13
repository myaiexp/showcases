// Shadows: a DirectionalLight with castShadow, its shadow camera helper, map type and size
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { checkbox, panel, select, slider } from './panel.ts';
import './style.css';

const TYPES = {
  BasicShadowMap: THREE.BasicShadowMap,
  PCFShadowMap: THREE.PCFShadowMap,
  VSMShadowMap: THREE.VSMShadowMap,
} as const;
type TypeName = keyof typeof TYPES;

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x12151b);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(-12, 15, 21);
  camera.lookAt(0, 1, 0);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  // Shadows are opt-in on the renderer too, then per light and per mesh.
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = 'stage';
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement);
  el.append(view);

  // Scene: ground that receives, a cube and a bobbing sphere that cast.
  const floorGeo = new THREE.PlaneGeometry(30, 30);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x9aa3ad });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  const cubeGeo = new THREE.BoxGeometry(3, 3, 3);
  const cubeMat = new THREE.MeshStandardMaterial({ color: 0x77aadd });
  const cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.position.set(3, 1.5, 0);
  const ballGeo = new THREE.SphereGeometry(1.6, 32, 16);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xddaa77 });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  for (const m of [cube, ball]) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  scene.add(floor, cube, ball, new THREE.HemisphereLight(0xffffff, 0x334455, 0.6));

  // The light owns a shadow camera (orthographic for a DirectionalLight) and a shadow map.
  // Changing mapSize or the map type means building a new light, so rebuild it.
  const cfg = { type: 'PCFShadowMap' as TypeName, size: preview ? 512 : 1024, extent: 14, radius: 2, orbit: true, helper: true, cast: true };
  let light: THREE.DirectionalLight | null = null;
  let lightHelper: THREE.DirectionalLightHelper | null = null;
  let camHelper: THREE.CameraHelper | null = null;
  const buildLight = (): void => {
    if (light && lightHelper && camHelper) {
      scene.remove(light, light.target, lightHelper, camHelper);
      lightHelper.dispose();
      camHelper.dispose();
      light.dispose();
    }
    renderer.shadowMap.type = TYPES[cfg.type];
    light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.castShadow = cfg.cast;
    light.shadow.mapSize.set(cfg.size, cfg.size);
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 30;
    light.position.set(6, 10, 4);
    lightHelper = new THREE.DirectionalLightHelper(light, 1.5);
    // The CameraHelper outlines the box in which shadows are drawn.
    camHelper = new THREE.CameraHelper(light.shadow.camera);
    lightHelper.visible = camHelper.visible = cfg.helper;
    scene.add(light, light.target, lightHelper, camHelper);
    applyShadowCamera();
  };
  // These two can change live, no rebuild needed. After editing a camera, refresh its projection.
  const applyShadowCamera = (): void => {
    if (!light) return;
    light.shadow.radius = cfg.radius;
    const cam = light.shadow.camera;
    cam.left = cam.bottom = -cfg.extent / 2;
    cam.right = cam.top = cfg.extent / 2;
    cam.updateProjectionMatrix();
  };
  buildLight();

  let controls: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();
    const rebuild = (): void => buildLight();
    panelEl = panel(
      select('map type', Object.keys(TYPES) as TypeName[], cfg.type, (v) => ((cfg.type = v), rebuild())).row,
      select('mapSize', ['128', '256', '512', '1024', '2048'], String(cfg.size), (v) => ((cfg.size = Number(v)), rebuild())).row,
      slider('camera size', 4, 30, 0.5, cfg.extent, (v) => ((cfg.extent = v), applyShadowCamera()), 1).row,
      slider('radius (blur)', 1, 12, 0.5, cfg.radius, (v) => ((cfg.radius = v), applyShadowCamera()), 1).row,
      checkbox('light.castShadow', cfg.cast, (v) => {
        cfg.cast = v;
        if (light) light.castShadow = v;
      }).row,
      checkbox('cube/sphere castShadow', true, (v) => (cube.castShadow = ball.castShadow = v)).row,
      checkbox('floor.receiveShadow', true, (v) => {
        floor.receiveShadow = v;
        floorMat.needsUpdate = true;
      }).row,
      checkbox('Show helpers', cfg.helper, (v) => {
        cfg.helper = v;
        if (lightHelper && camHelper) lightHelper.visible = camHelper.visible = v;
      }).row,
      checkbox('Move the light', cfg.orbit, (v) => (cfg.orbit = v)).row,
    );
    el.append(panelEl);
  }

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ht } = renderer.domElement;
    if (w === 0 || ht === 0) return;
    renderer.setSize(w, ht, false);
    camera.aspect = w / ht;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);
  await renderer.init();
  resize();

  let clock = 0;
  let last = 0;
  renderer.setAnimationLoop((time) => {
    if (cfg.orbit) clock += (time - last) / 1000;
    last = time;
    ball.position.set(-3, 2.2 + Math.sin(time / 700) * 1, Math.sin(time / 1900) * 3);
    if (light && lightHelper && camHelper) {
      light.position.set(Math.cos(clock * 0.5) * 8, 10, Math.sin(clock * 0.5) * 8);
      light.updateMatrixWorld();
      light.target.updateMatrixWorld();
      lightHelper.update();
      camHelper.update();
    }
    controls?.update();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    panelEl?.remove();
    lightHelper?.dispose();
    camHelper?.dispose();
    light?.dispose();
    for (const d of [floorGeo, floorMat, cubeGeo, cubeMat, ballGeo, ballMat]) d.dispose();
    renderer.dispose();
  };
};

export default mount;
