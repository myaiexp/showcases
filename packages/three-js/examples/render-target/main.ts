// Render target: draw one scene into a texture, then wear that texture on cubes in a second scene
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import { checkbox, panel, select } from './panel.ts';
import './style.css';

const BACKGROUNDS = { red: 0xc03030, teal: 0x1f7a7a, navy: 0x1a2a5a } as const;
type Bg = keyof typeof BACKGROUNDS;

const mount: Mount = async (el, { preview }) => {
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const tag = h('div', { class: 'tag' });
  const view = h('div', { class: preview ? 'view is-preview' : 'view' }, renderer.domElement, tag);
  el.append(view);

  // 1) The scene that gets rendered into the texture: three spinning cubes and a light.
  let size = preview ? 128 : 256;
  const renderTarget = new THREE.RenderTarget(size, size);
  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color(BACKGROUNDS.red);
  // Aspect 1, because the texture goes on square cube faces rather than on the canvas.
  const rtCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
  rtCamera.position.z = 4;
  const rtLight = new THREE.DirectionalLight(0xffffff, 3);
  rtLight.position.set(-1, 2, 4);
  rtScene.add(rtLight, new THREE.AmbientLight(0xffffff, 0.6));
  const innerGeo = new THREE.BoxGeometry(1, 1, 1);
  const innerCubes = [0x44aa88, 0x8844aa, 0xaa8844].map((color, i) => {
    const mat = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(innerGeo, mat);
    cube.position.x = (i - 1) * 2;
    rtScene.add(cube);
    return cube;
  });

  // 2) The scene that shows up on screen: cubes whose material map is the render target's texture.
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x14171c);
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 0.6, 5);
  // Aim at the origin, where OrbitControls (full view only) also looks, so the card frames the same shot.
  camera.lookAt(0, 0, 0);
  const outerGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  const outerMat = new THREE.MeshBasicMaterial({ map: renderTarget.texture });
  const outerCubes = [-2.2, 0, 2.2].map((x) => {
    const cube = new THREE.Mesh(outerGeo, outerMat);
    cube.position.x = x;
    scene.add(cube);
    return cube;
  });

  const setLabel = (): void => {
    tag.textContent = `RenderTarget ${size}x${size}`;
  };
  setLabel();

  let paused = false;
  let controls: OrbitControls | null = null;
  let panelEl: HTMLElement | null = null;
  let timer = 0;
  if (preview) {
    // No input in a card: switch the inner background colour on a timer.
    const names = Object.keys(BACKGROUNDS) as Bg[];
    let i = 0;
    timer = window.setInterval(() => {
      i = (i + 1) % names.length;
      (rtScene.background as THREE.Color).set(BACKGROUNDS[names[i] ?? 'red']);
    }, 2000);
  } else {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    panelEl = panel(
      select('texture size', ['16', '64', '128', '256', '512'], String(size), (v) => {
        size = Number(v);
        // Resizing the target reallocates its texture; the aspect stays 1.
        renderTarget.setSize(size, size);
        setLabel();
      }).row,
      select<Bg>('inner background', Object.keys(BACKGROUNDS) as Bg[], 'red', (v) =>
        (rtScene.background as THREE.Color).set(BACKGROUNDS[v]),
      ).row,
      checkbox('Pause the inner scene', paused, (v) => (paused = v)).row,
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

  renderer.setAnimationLoop((time) => {
    const t = time / 1000;
    if (!paused) {
      innerCubes.forEach((cube, i) => {
        cube.rotation.x = t * (1 + i * 0.1);
        cube.rotation.y = t * (1 + i * 0.1);
      });
    }
    outerCubes.forEach((cube, i) => {
      cube.rotation.x = t * 0.5 + i;
      cube.rotation.y = t * 0.7 + i;
    });

    // Draw the inner scene into the texture, then go back to the canvas (null).
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
    controls?.update();
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.clearInterval(timer);
    observer.disconnect();
    controls?.dispose();
    panelEl?.remove();
    for (const c of innerCubes) (c.material as THREE.Material).dispose();
    innerGeo.dispose();
    outerGeo.dispose();
    outerMat.dispose();
    renderTarget.dispose();
    renderer.dispose();
  };
};

export default mount;
