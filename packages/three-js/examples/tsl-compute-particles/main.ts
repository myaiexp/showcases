// Compute particles: positions and velocities in storage buffers, stepped by a compute node each frame
import * as THREE from 'three/webgpu';
import { Fn, color, deltaTime, float, smoothstep, uv, hash, instanceIndex, instancedArray, min, mix, uniform, vec3 } from 'three/tsl';
import { h } from '@/ui/dom.ts';
import type { Mount } from '@/types.ts';
import { slider } from './panel.ts';
import './style.css';

const mount: Mount = async (el, { preview }) => {
  const particleCount = preview ? 1000 : 4000;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070a12);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  // Storage buffers live on the GPU: a vec3 position and velocity per particle.
  const positions = instancedArray(particleCount, 'vec3');
  const velocities = instancedArray(particleCount, 'vec3');

  const attractor = uniform(new THREE.Vector3());
  const pull = uniform(6);

  // Runs once per particle (instanceIndex) to scatter them. hash() is a per-index random.
  const computeInit = Fn(() => {
    const pos = positions.element(instanceIndex);
    const vel = velocities.element(instanceIndex);
    pos.assign(vec3(hash(instanceIndex), hash(instanceIndex.add(1)), hash(instanceIndex.add(2))).sub(0.5).mul(6));
    vel.assign(vec3(hash(instanceIndex.add(3)), hash(instanceIndex.add(4)), hash(instanceIndex.add(5))).sub(0.5).mul(1.5));
  })().compute(particleCount);

  // The simulation step: accelerate toward the attractor, damp, integrate.
  const computeUpdate = Fn(() => {
    const pos = positions.element(instanceIndex);
    const vel = velocities.element(instanceIndex);
    const dt = min(deltaTime, 0.03);
    const toTarget = attractor.sub(pos);
    const dist = toTarget.length().max(0.3);
    vel.addAssign(toTarget.div(dist).mul(pull).mul(dt).div(dist.add(0.5)).mul(3));
    vel.mulAssign(0.995);
    pos.addAssign(vel.mul(dt));
  })().compute(particleCount);

  // Draw: read the same buffers as attributes. Fast particles shade toward warm.
  const material = new THREE.SpriteNodeMaterial({
    scaleNode: float(preview ? 0.07 : 0.045),
    colorNode: mix(color(0x2f6bff), color(0xffa040), velocities.toAttribute().length().mul(0.35).saturate()),
    // Soft round points instead of square quads.
    opacityNode: float(1).sub(smoothstep(0.15, 0.5, uv().sub(0.5).length())),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  material.positionNode = positions.toAttribute();
  const particles = new THREE.Sprite(material);
  particles.count = particleCount;
  particles.frustumCulled = false;
  scene.add(particles);

  const renderer = new THREE.WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.className = 'stage';
  el.append(renderer.domElement);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: ch } = renderer.domElement;
    if (w === 0 || ch === 0) return;
    renderer.setSize(w, ch, false);
    camera.aspect = w / ch;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(renderer.domElement);

  // Full view: the attractor follows the pointer on the z = 0 plane. Otherwise it orbits.
  let pointer: THREE.Vector2 | null = null;
  const onMove = (e: PointerEvent): void => {
    const r = renderer.domElement.getBoundingClientRect();
    pointer = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
  };
  const onLeave = (): void => {
    pointer = null;
  };
  if (!preview) {
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerleave', onLeave);
    el.append(
      h(
        'div',
        { class: 'panel' },
        slider({ label: 'pull', min: 0, max: 20, step: 0.5, value: pull.value, onInput: (v) => (pull.value = v) }),
        h('p', { class: 'hint' }, `${particleCount.toLocaleString()} particles. Move the pointer over the canvas to steer the attractor.`),
      ),
    );
  }

  await renderer.init();
  resize();
  // Initialise the buffers once before the first frame.
  renderer.compute(computeInit);

  const target = new THREE.Vector3();
  renderer.setAnimationLoop((t) => {
    if (pointer) {
      // Unproject the pointer to the z = 0 plane.
      target.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
      target.multiplyScalar(-camera.position.z / target.z).add(camera.position);
    } else {
      target.set(Math.cos(t / 1400) * 2.2, Math.sin(t / 1900) * 1.4, Math.sin(t / 1100));
    }
    attractor.value.copy(target);
    // One compute dispatch per frame, before the draw that reads the buffers.
    renderer.compute(computeUpdate);
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    renderer.domElement.removeEventListener('pointermove', onMove);
    renderer.domElement.removeEventListener('pointerleave', onLeave);
    material.dispose();
    renderer.dispose();
  };
};

export default mount;
