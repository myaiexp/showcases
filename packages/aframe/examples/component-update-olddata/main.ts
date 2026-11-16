// update(oldData) compared with this.data tells a component exactly which properties changed
import { aframeExample } from '../../shared/frame.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { diff } = AFRAME.utils;
    AFRAME.registerComponent<{ radius: number; color: string; spin: boolean }>('gem', {
      schema: { radius: { default: 0.6 }, color: { default: '#7be0c3' }, spin: { default: true } },
      update(oldData) {
        const changed = Object.keys(diff(oldData, this.data));
        const mesh = this.el.getObject3D('mesh');
        // Granular work: only rebuild or recolour what changed.
        if (!mesh) {
          this.el.setAttribute('geometry', { primitive: 'icosahedron', radius: this.data.radius });
          this.el.setAttribute('material', { color: this.data.color, flatShading: true });
        } else {
          if (changed.includes('radius')) this.el.setAttribute('geometry', 'radius', this.data.radius);
          if (changed.includes('color')) this.el.setAttribute('material', 'color', this.data.color);
        }
        this.el.object3D.userData.spin = this.data.spin;
        this.el.emit('changed', `update(): changed ${changed.join(', ') || 'nothing'}`);
      },
      tick(_t, dt) {
        if (this.data.spin) this.el.object3D.rotation.y += dt / 1500;
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" gem position="0 1.5 -3"></a-entity>
      ${board('board', '0 3.5 -4', 6, 1.4, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const el = stage.scene.querySelector('#e') as Entity;
    el.addEventListener('changed', (evt) => log(evt.detail));
    if (stage.preview) {
      sway(stage);
      const steps: [string, unknown][] = [['radius', 0.9], ['color', '#ef2d5e'], ['spin', false], ['radius', 0.5], ['color', '#7be0c3'], ['spin', true]];
      stage.every(1500, (i) => {
        const [k, v] = steps[(i - 1) % steps.length]!;
        el.setAttribute('gem', k, v);
      });
    } else if (stage.bar) {
      slider(stage.bar, 'radius', [0.3, 1.2, 0.1], 0.6, (v) => el.setAttribute('gem', 'radius', v));
      select(stage.bar, 'color', ['#7be0c3', '#ef2d5e', '#4CC3D9'], '#7be0c3', (v) => el.setAttribute('gem', 'color', v));
      toggle(stage.bar, 'spin', true, (v) => el.setAttribute('gem', 'spin', v));
    }
  },
});
