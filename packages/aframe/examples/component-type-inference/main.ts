// A schema infers a property's type from its default, and a default from its type
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('infer', {
      schema: {
        fromNumber: { default: 10 },
        fromString: { default: 'foo' },
        fromArray: { default: [1, 2, 3] },
        justNumber: { type: 'number' },
        justString: { type: 'string' },
        justVec3: { type: 'vec3' },
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" infer position="0 1.5 -3" geometry="primitive: icosahedron; radius: 0.6" material="color: #7be0c3; flat-shading: true"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.6 -4', 6.6, 2.2, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    // No attributes set: every value is the default the schema worked out.
    const schema = stage.AFRAME.components.infer!.schema as Record<string, { type: string; default: unknown }>;
    log.show(
      Object.entries(schema)
        .map(([k, def]) => `${k.padEnd(11)} type ${def.type.padEnd(7)} default ${JSON.stringify(def.default)}  data ${JSON.stringify(el.getAttribute('infer')[k])}`)
        .join('\n'),
    );
    stage.caption('{default: 10} is a number, {type: "vec3"} defaults to 0 0 0');
    if (stage.preview) sway(stage);
  },
});
