// Composition over inheritance: a car, boat, motorcycle and airplane from a few reusable components
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

const KINDS: Record<string, { wheels?: string; wing?: string }> = {
  car: { wheels: 'count: 4' },
  motorcycle: { wheels: 'count: 2' },
  boat: {},
  airplane: { wing: 'span: 2.6' },
};

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    // Each component knows nothing about the others.
    AFRAME.registerComponent<{ count: number }>('wheels', {
      schema: { count: { default: 4 } },
      update() {
        const g = new THREE.Group();
        for (let i = 0; i < this.data.count; i++) {
          const w = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 16), new THREE.MeshStandardMaterial({ color: '#222' }));
          w.rotation.z = Math.PI / 2;
          const side = this.data.count === 2 ? 0 : i % 2 ? 0.55 : -0.55;
          w.position.set(side, -0.35, ((i >> 1) - (this.data.count === 2 ? 0.5 : 0.5)) * 1.3 * (this.data.count === 2 ? 1.6 : 1) + (this.data.count === 2 ? (i ? 0.4 : -0.4) : 0.65));
          g.add(w);
        }
        this.el.setObject3D('wheels', g);
      },
      remove() {
        this.el.removeObject3D('wheels');
      },
    });
    AFRAME.registerComponent<{ span: number }>('wing', {
      schema: { span: { default: 2 } },
      update() {
        this.el.setObject3D('wing', new THREE.Mesh(new THREE.BoxGeometry(this.data.span, 0.06, 0.6), new THREE.MeshStandardMaterial({ color: '#e8e8e8' })));
      },
      remove() {
        this.el.removeObject3D('wing');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="vehicle" geometry="primitive: box; width: 0.9; height: 0.5; depth: 1.8" material="color: #ef2d5e" position="0 0.9 -3.5"
                animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.6 -5', 7, 1.2, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#vehicle') as Entity;
    const make = (kind: string): void => {
      const spec = KINDS[kind]!;
      for (const c of ['wheels', 'wing']) el.removeAttribute(c);
      if (spec.wheels) el.setAttribute('wheels', spec.wheels);
      if (spec.wing) el.setAttribute('wing', spec.wing);
      log.show(`${kind}: ${['geometry', 'material', ...Object.keys(spec)].join(' + ')}\ncomponents on the entity: ${Object.keys(el.components).filter((c) => ['geometry', 'material', 'wheels', 'wing'].includes(c)).join(', ')}`);
    };
    make('car');
    stage.caption('mix and match components');
    const kinds = Object.keys(KINDS);
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => make(kinds[i % kinds.length]!));
    } else if (stage.bar) {
      select(stage.bar, 'vehicle', kinds, 'car', make);
    }
  },
});
