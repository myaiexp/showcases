// Dressing a scene with a component, here a scatter written from scratch in place of the environment component
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    // The guide uses a community environment component. This stand-in does the one thing it shows:
    // one attribute fills the world with scenery, with a count and a seed.
    AFRAME.registerComponent<{ count: number; seed: number; radius: number }>('scatter', {
      schema: { count: { default: 100 }, seed: { default: 1 }, radius: { default: 22 } },
      update() {
        let s = this.data.seed * 9301 + 49297;
        const rnd = (): number => ((s = (s * 9301 + 49297) % 233280) / 233280);
        const g = new THREE.Group();
        const trunk = new THREE.CylinderGeometry(0.12, 0.16, 1, 6);
        const crown = new THREE.ConeGeometry(0.7, 1.8, 7);
        const trunkM = new THREE.MeshStandardMaterial({ color: '#6b4a2e' });
        const crownM = new THREE.MeshStandardMaterial({ color: '#2f7a4a', flatShading: true });
        for (let i = 0; i < this.data.count; i++) {
          const a = rnd() * Math.PI * 2;
          const r = 4 + rnd() * this.data.radius;
          const k = 0.7 + rnd() * 1.3;
          const tree = new THREE.Group();
          const t = new THREE.Mesh(trunk, trunkM);
          t.position.y = 0.5;
          const c = new THREE.Mesh(crown, crownM);
          c.position.y = 1.9;
          tree.add(t, c);
          tree.scale.setScalar(k);
          tree.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
          g.add(tree);
        }
        this.el.setObject3D('scatter', g);
      },
      remove() {
        this.el.removeObject3D('scatter');
      },
    });
  },

  scene: `
    <a-scene>
      <a-box color="red" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-entity id="world" scatter="count: 150; seed: 3"></a-entity>
      <a-plane rotation="-90 0 0" width="60" height="60" color="#3f5a40"></a-plane>
      <a-sky color="#9ec3d6"></a-sky>
    </a-scene>`,

  run(stage) {
    const world = stage.scene.querySelector('#world') as Entity;
    stage.caption('<a-entity scatter="count: 150; seed: 3">: one attribute, a whole forest');
    if (stage.preview) {
      sway(stage, { yaw: 60, seconds: 14 });
    } else if (stage.bar) {
      slider(stage.bar, 'count', [0, 400, 10], 150, (v) => world.setAttribute('scatter', 'count', v));
      slider(stage.bar, 'seed', [1, 20, 1], 3, (v) => world.setAttribute('scatter', 'seed', v));
    }
  },
});
