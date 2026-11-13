// HTML labels pinned to 3D cubes: project() to screen space, hide when occluded or out of the frustum
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { h } from '@/ui/dom.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(0, 2, 6);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444466, 2));
  const sun = new THREE.DirectionalLight(0xffffff, 2);
  sun.position.set(-1, 2, 4);
  scene.add(sun);

  // Canvas and label layer share one positioned wrapper so they overlap.
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  const labelLayer = h('div', { class: 'labels' });
  const wrap = h('div', { class: 'wrap' }, canvas, labelLayer);
  el.append(wrap);

  // Cubes overlap on purpose so occlusion matters.
  const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  const items = (preview ? ['Aqua', 'Purple', 'Gold'] : ['Aqua Box', 'Purple Box', 'Gold Box', 'Rose Box']).map(
    (name, i) => {
      const material = new THREE.MeshStandardMaterial({ color: [0x44aa88, 0x8844aa, 0xaa8844, 0xcc4466][i] });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((i - 1) * 1.8, 0, (i % 2) * -1.2);
      scene.add(mesh);
      const label = h('div', {}, name);
      labelLayer.append(label);
      return { mesh, material, label };
    },
  );

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h2 } = canvas;
    if (w === 0 || h2 === 0) return;
    renderer.setSize(w, h2, false);
    camera.aspect = w / h2;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const opts = { occlusion: true, frustum: true };
  let controls: OrbitControls | null = null;
  if (!preview) {
    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    const toggle = (key: keyof typeof opts, text: string): HTMLElement => {
      const box = h('input', { type: 'checkbox', checked: '' });
      box.addEventListener('change', () => (opts[key] = box.checked));
      return h('label', {}, box, ` ${text}`);
    };
    el.append(
      h(
        'div',
        { class: 'panel' },
        toggle('occlusion', 'Hide labels of occluded cubes (raycast)'),
        toggle('frustum', 'Hide labels outside the depth range (|z| > 1)'),
        h('span', { class: 'hint' }, 'Orbit and zoom to test both.'),
      ),
    );
  }

  const tempV = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const meshes = items.map((i) => i.mesh);

  const placeLabels = (): void => {
    for (const { mesh, label } of items) {
      mesh.updateWorldMatrix(true, false);
      mesh.getWorldPosition(tempV);
      // project() maps world space to normalised device coordinates (x, y, z in -1..+1).
      tempV.project(camera);
      ndc.set(tempV.x, tempV.y);

      // Ask the raycaster what is first along the ray through that point: if it is not
      // this cube, something is in front of it.
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(meshes);
      const occluded = opts.occlusion && !(hits.length > 0 && hits[0]?.object === mesh);
      const outside = opts.frustum && Math.abs(tempV.z) > 1;

      if (occluded || outside) {
        label.style.display = 'none';
        continue;
      }
      label.style.display = '';
      // NDC to CSS pixels (y flips: NDC +1 is the top).
      const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;
      label.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    }
  };

  await renderer.init();
  resize();

  const t0 = performance.now();
  renderer.setAnimationLoop(() => {
    const time = (performance.now() - t0) / 1000;
    items.forEach(({ mesh }, i) => {
      mesh.rotation.x = time * (0.4 + i * 0.1);
      mesh.rotation.y = time * (0.4 + i * 0.1);
    });
    if (preview) {
      // Swing the camera so cubes pass in front of each other and labels drop out.
      camera.position.set(Math.sin(time * 0.5) * 6, 2, Math.cos(time * 0.5) * 6);
      camera.lookAt(0, 0, 0);
    }
    controls?.update();
    camera.updateMatrixWorld();
    // Labels must be placed after the camera has moved this frame.
    placeLabels();
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    geometry.dispose();
    for (const i of items) i.material.dispose();
    renderer.dispose();
  };
};

export default mount;
