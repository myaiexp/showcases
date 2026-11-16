// A schema names a component's properties; each parses the markup into this.data
import { aframeExample } from '../../shared/frame.ts';
import { select, slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // The docs' bar component: a colour with an inferred type and an int size.
    AFRAME.registerComponent<{ color: string; size: number }>('bar', {
      schema: {
        color: { default: '#FFF' },
        size: { type: 'int', default: 5 },
      },
      update() {
        // Shown as a sphere whose radius in metres is size / 10.
        this.el.setAttribute('geometry', { primitive: 'sphere', radius: this.data.size / 10 });
        this.el.setAttribute('material', 'color', this.data.color);
        this.el.emit('bar-updated', { ...this.data });
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" bar="color: red; size: 20" position="0 1.5 -4"></a-entity>
      ${board('board', '0 4 -5', 5, 0.9, 50)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const el = stage.scene.querySelector('#e') as Entity;
    el.addEventListener('bar-updated', (evt) => log(`this.data: ${JSON.stringify(evt.detail)}`));
    const set = (value: string): void => el.setAttribute('bar', value);
    if (stage.preview) {
      sway(stage);
      const values = ['color: #4CC3D9; size: 10', 'color: #ffc65d; size: 14.9', 'color: red; size: 20'];
      stage.every(1600, (i) => set(values[i % 3]!));
    } else if (stage.bar) {
      slider(stage.bar, 'size (int)', [0, 30, 0.5], 20, (v) => el.setAttribute('bar', 'size', v));
      select(stage.bar, 'color', ['red', '#4CC3D9', '#ffc65d', 'white'], 'red', (v) => el.setAttribute('bar', 'color', v));
    }
  },
});
