// Three.js adapter gotchas: shared vs cloned materials, the transparent flag, and group fades
import { animate } from 'animejs';
import 'animejs/adapters/three';
import * as THREE from 'three';
import type { Mount } from '@/types.ts';
import { createPanel, createStage } from '../../shared/three-stage.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const readout = document.createElement('pre');
  readout.className = 'readout';
  const sphere = new THREE.SphereGeometry(0.6, preview ? 16 : 32, preview ? 12 : 24);
  const box = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const mat = (color: string, transparent = true): THREE.MeshLambertMaterial =>
    new THREE.MeshLambertMaterial({ color, transparent });
  const put = (m: THREE.Mesh, x: number, y: number): THREE.Mesh => {
    m.position.set(x, y, 0);
    return m;
  };

  // Column 1: two meshes, ONE material. Column 2: the material cloned per mesh.
  const shared = mat('#ff7050');
  const sharedA = put(new THREE.Mesh(sphere, shared), -3, 0.9);
  const sharedB = put(new THREE.Mesh(sphere, shared), -3, -0.9);
  const base = mat('#50c0ff');
  const cloneA = put(new THREE.Mesh(sphere, base), -1, 0.9);
  const cloneB = put(new THREE.Mesh(sphere, base.clone()), -1, -0.9);
  // Column 3: opacity without transparent: true stays fully opaque.
  const opaqueFlag = put(new THREE.Mesh(sphere, mat('#ffd040', false)), 1, 0.9);
  const transparentFlag = put(new THREE.Mesh(sphere, mat('#ffd040', true)), 1, -0.9);
  // Column 4: a Group owns no material, so its opacity does nothing; its children do.
  const group = new THREE.Group();
  group.position.x = 3;
  group.add(put(new THREE.Mesh(box, mat('#80e080')), 0, 0.9), put(new THREE.Mesh(box, mat('#80e080')), 0, -0.9));

  let groupTarget = 'children array';
  const stage = createStage(el, {
    preview,
    cameraPosition: [0, 0, 9],
    fov: 40,
    onFrame: () => {
      if (preview) return;
      const o = (m: THREE.Mesh): string => (m.material as THREE.Material).opacity.toFixed(2);
      readout.textContent = [
        `shared material      A ${o(sharedA)}  B ${o(sharedB)}   (only A is animated)`,
        `cloned material      A ${o(cloneA)}  B ${o(cloneB)}   (only A is animated)`,
        `transparent flag     false ${o(opaqueFlag)}  true ${o(transparentFlag)}   (both animated)`,
        `group fade target    ${groupTarget}   child opacity ${o(group.children[0] as THREE.Mesh)}`,
      ].join('\n');
    },
  });
  stage.scene.add(sharedA, sharedB, cloneA, cloneB, opaqueFlag, transparentFlag, group, new THREE.AmbientLight('#ffffff', 0.7));
  const sun = new THREE.DirectionalLight('#ffffff', 2);
  sun.position.set(2, 3, 5);
  stage.scene.add(sun);

  const fade = { opacity: [1, 0.15], duration: 1800, loop: true, alternate: true, ease: 'inOutSine' } as const;
  const anims = [sharedA, cloneA, opaqueFlag, transparentFlag].map((m) => animate(m, fade));

  // Passing the descendants as an array is what fades a group; passing the Group itself does nothing.
  let groupAnim = animate(group.children, fade);
  if (!preview) {
    const panel = createPanel(el);
    panel.button('Fade group: children array / Group itself', () => {
      groupAnim.revert();
      group.children.forEach((c) => ((c as THREE.Mesh).material as THREE.Material).opacity = 1);
      const useGroup = groupTarget === 'children array';
      groupTarget = useGroup ? 'the Group (no effect)' : 'children array';
      groupAnim = animate(useGroup ? group : group.children, fade);
    });
    el.append(readout);
  }

  return () => {
    anims.forEach((a) => a.revert());
    groupAnim.revert();
    stage.destroy();
  };
};

export default mount;
