// updateSchema extends the schema when a property changes, as geometry does for primitive
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, clobber, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

// schemaChange marks the property whose changes call updateSchema (geometry does this for primitive).
const KIND = { default: 'ring', oneOf: ['ring', 'cone'], schemaChange: true };

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // Like geometry: the primitive property decides which other properties exist.
    AFRAME.registerComponent<{ kind: string; inner: number; edges: number }>('shape', {
      schema: { kind: KIND },
      updateSchema(newData) {
        // Calls arrive with the data being applied; compare with the kind seen last.
        if (newData.kind === this.lastKind) return;
        this.lastKind = newData.kind;
        const schema = this.schema as Record<string, unknown>;
        delete schema.inner;
        delete schema.edges;
        this.extendSchema(newData.kind === 'ring' ? { inner: { default: 0.3 } } : { edges: { default: 5 } });
      },
      update() {
        const d = this.data;
        const geometry = d.kind === 'ring' ? { primitive: 'ring', radiusInner: d.inner, radiusOuter: 0.8 } : { primitive: 'cone', segmentsRadial: d.edges, radiusBottom: 0.7 };
        clobber(this.el, 'geometry', geometry);
        this.el.emit('step', `schema keys: ${Object.keys(this.schema).join(', ')}`);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" shape="kind: ring" material="color: #ffc65d; side: double" position="0 1.5 -3"
                animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.5 -4', 6, 1, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const el = stage.scene.querySelector('#e') as Entity;
    el.addEventListener('step', (evt) => log(evt.detail));
    log(`schema keys: ${Object.keys(el.components.shape!.schema).join(', ')}`);
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => el.setAttribute('shape', i % 2 ? 'kind: cone; edges: 5' : 'kind: ring; inner: 0.3'));
    } else if (stage.bar) {
      button(stage.bar, 'kind: ring; inner: 0.3', () => el.setAttribute('shape', 'kind: ring; inner: 0.3'));
      button(stage.bar, 'kind: cone; edges: 5', () => el.setAttribute('shape', 'kind: cone; edges: 5'));
    }
  },
});
