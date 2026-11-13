// Which backend did WebGPURenderer pick? A readout plus a forceWebGL toggle that rebuilds the renderer
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// The renderer exposes its backend; each backend class carries an `is...Backend` flag.
type BackendFlags = { isWebGPUBackend?: boolean; isWebGLBackend?: boolean };
const backendName = (renderer: THREE.WebGPURenderer): string =>
  (renderer.backend as BackendFlags).isWebGPUBackend ? 'WebGPU' : 'WebGL 2';

const mount: Mount = async (el, { preview }) => {
  // The scene outlives the renderer: only the renderer is rebuilt when the toggle changes.
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 4.5);
  const geometry = new THREE.TorusKnotGeometry(1, 0.35, 128, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x4f9dff, roughness: 0.35, metalness: 0.3 });
  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot, new THREE.HemisphereLight(0xffffff, 0x223344, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 2.5);
  sun.position.set(3, 4, 5);
  scene.add(sun);

  const wrap = h('div', { class: 'stage-wrap' });
  const badge = h('div', { class: 'badge' }, 'starting…');
  wrap.append(badge);
  el.append(wrap);

  let renderer: THREE.WebGPURenderer | null = null;
  let observer: ResizeObserver | null = null;
  let disposed = false;
  let generation = 0;

  const resize = (): void => {
    if (!renderer) return;
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };

  const teardown = (): void => {
    renderer?.setAnimationLoop(null);
    observer?.disconnect();
    renderer?.domElement.remove();
    renderer?.dispose();
    renderer = null;
  };

  // Build a renderer. `forceWebGL: true` skips WebGPU and uses the WebGL 2 backend.
  const build = async (forceWebGL: boolean): Promise<void> => {
    const mine = ++generation;
    teardown();
    const next = new THREE.WebGPURenderer({ antialias: true, forceWebGL });
    next.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
    next.domElement.className = 'stage';
    wrap.prepend(next.domElement);
    renderer = next;
    observer = new ResizeObserver(resize);
    observer.observe(next.domElement);
    await next.init();
    // A newer build (or unmount) replaced this one while init() was pending.
    if (disposed || mine !== generation) {
      if (renderer !== next) {
        next.domElement.remove();
        next.dispose();
      }
      return;
    }
    resize();
    badge.textContent = backendName(next);
    onBackend?.(backendName(next), forceWebGL);
    next.setAnimationLoop((time) => {
      knot.rotation.x = time / 2500;
      knot.rotation.y = time / 1500;
      next.render(scene, camera);
    });
  };

  let onBackend: ((name: string, forced: boolean) => void) | null = null;

  if (!preview) {
    const forceBox = h('input', { type: 'checkbox', id: 'force-webgl' });
    const readout = h('dd', {}, '…');
    const gpuApi = h('dd', {}, 'gpu' in navigator ? 'navigator.gpu is present' : 'navigator.gpu is missing');
    const requested = h('dd', {}, 'forceWebGL: false');
    el.append(
      h(
        'div',
        { class: 'panel' },
        h('label', { class: 'toggle' }, forceBox, 'forceWebGL (rebuild the renderer)'),
        h('dl', {}, h('dt', {}, 'renderer.backend'), readout, h('dt', {}, 'WebGPU API'), gpuApi, h('dt', {}, 'Requested'), requested),
      ),
    );
    onBackend = (name, forced) => {
      readout.textContent = name;
      requested.textContent = `forceWebGL: ${forced}`;
    };
    forceBox.addEventListener('change', () => {
      forceBox.disabled = true;
      badge.textContent = 'rebuilding…';
      void build(forceBox.checked).finally(() => {
        forceBox.disabled = false;
      });
    });
  }

  await build(false);

  return () => {
    disposed = true;
    teardown();
    geometry.dispose();
    material.dispose();
  };
};

export default mount;
