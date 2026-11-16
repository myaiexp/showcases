// registerPrimitive makes a new element from default components and attribute mappings
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { extendDeep } = AFRAME.utils as unknown as { extendDeep(...o: object[]): object };
    // The mesh mixin makes material a default component and maps the base material attributes.
    const meshMixin = AFRAME.primitives.getMeshMixin();

    // The docs' a-box registration, under a new name.
    AFRAME.registerPrimitive('a-crate', extendDeep({}, meshMixin, {
      defaultComponents: { geometry: { primitive: 'box' } },
      mappings: { depth: 'geometry.depth', height: 'geometry.height', width: 'geometry.width' },
    }));

    // Defaults plus a mapping that renames a property: segments -> geometry.segmentsRadial.
    AFRAME.registerPrimitive('a-pyramid', extendDeep({}, meshMixin, {
      defaultComponents: { geometry: { primitive: 'cone', segmentsRadial: 4, radiusBottom: 0.8, height: 1.4 }, rotation: { x: 0, y: 45, z: 0 } },
      mappings: { size: 'geometry.radiusBottom', sides: 'geometry.segmentsRadial', height: 'geometry.height' },
    }));
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-crate color="#ffc65d" width="1.2" height="0.8" position="-2 0.4 -3.5"></a-crate>
      <a-pyramid id="p" color="#7be0c3" position="0 0.7 -3.5"></a-pyramid>
      <a-pyramid color="#ef2d5e" sides="6" size="0.6" position="2 0.7 -3.5"></a-pyramid>
      ${board('board', '0 3.8 -4.5', 7.6, 1.6, 76)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const p = stage.scene.querySelector('#p') as Entity;
    const show = (): void => {
      const reg = stage.AFRAME.primitives.primitives['a-pyramid'];
      log.show(`registered a-pyramid mappings: ${JSON.stringify(reg.mappings)}\n<a-pyramid> geometry: ${JSON.stringify(p.getAttribute('geometry')).slice(0, 90)}`);
    };
    show();
    stage.caption('AFRAME.registerPrimitive("a-pyramid", {defaultComponents, mappings})');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => p.setAttribute('sides', 3 + (i % 5)));
    } else if (stage.bar) {
      slider(stage.bar, 'sides (mapped to geometry.segmentsRadial)', [3, 10, 1], 4, (v) => {
        p.setAttribute('sides', v);
        show();
      });
    }
  },
});
