// A spinning grid with one of every built-in geometry, labelled in the full view
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { PREVIEW_NAMES, SPECS } from './geometries.ts';
import './style.css';

const SPACING = 14;

const mount: Mount = async (el, { preview }) => {
  const specs = preview ? SPECS.filter((s) => PREVIEW_NAMES.includes(s.name)) : SPECS;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222831);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  const wrap = h('div', { class: 'wrap' }, renderer.domElement);
  el.append(wrap);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

  // Every geometry is centred, then its mesh is scaled to the same bounding radius so the
  // grid cells look even whatever the geometry's own units are.
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const cells: { spinner: THREE.Object3D; label: HTMLElement | null }[] = [];
  specs.forEach((spec, i) => {
    const geometry = spec.make();
    geometry.center();
    geometry.computeBoundingSphere();
    geometries.push(geometry);

    let object: THREE.Object3D;
    if (spec.lines) {
      const material = new THREE.LineBasicMaterial({ color: 0xffffff });
      materials.push(material);
      object = new THREE.LineSegments(geometry, material);
    } else {
      // DoubleSide because ShapeGeometry, CircleGeometry etc. are flat and have no inside.
      const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
      material.color.setHSL(i / specs.length, 0.85, 0.55);
      materials.push(material);
      object = new THREE.Mesh(geometry, material);
    }
    object.scale.setScalar(5.5 / (geometry.boundingSphere?.radius ?? 5.5));

    const spinner = new THREE.Object3D();
    spinner.add(object);
    scene.add(spinner);
    const label = preview ? null : h('span', { class: 'label' }, spec.name);
    if (label) wrap.append(label);
    cells.push({ spinner, label });
  });

  const ndc = new THREE.Vector3();
  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    const aspect = w / ch;
    camera.aspect = aspect;

    // Pick a column count that suits the canvas shape, lay the cells out, then back the
    // camera off until the whole grid fits both ways.
    const cols = preview ? 3 : aspect > 1.8 ? 7 : aspect > 1.1 ? 5 : 3;
    const rows = Math.ceil(specs.length / cols);
    cells.forEach(({ spinner }, i) => {
      spinner.position.set(
        (i % cols - (cols - 1) / 2) * SPACING,
        -(Math.floor(i / cols) - (rows - 1) / 2) * SPACING - (preview ? 0 : 1.5),
        0,
      );
    });
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitV = (rows * SPACING * 0.5 + 4) / tan;
    const fitH = (cols * SPACING * 0.5) / (tan * aspect);
    camera.position.z = Math.max(fitV, fitH);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    // Park each name label under its cell by projecting the cell position to the screen.
    cells.forEach(({ spinner, label }) => {
      if (!label) return;
      ndc.copy(spinner.position).setY(spinner.position.y - 6.8).project(camera);
      label.style.left = `${(ndc.x * 0.5 + 0.5) * 100}%`;
      label.style.top = `${(-ndc.y * 0.5 + 0.5) * 100}%`;
    });
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  await renderer.init();
  resize();

  renderer.setAnimationLoop((time) => {
    cells.forEach(({ spinner }, i) => {
      spinner.rotation.x = time / 2000 + i * 0.3;
      spinner.rotation.y = time / 1300 + i * 0.3;
    });
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
  };
};

export default mount;
