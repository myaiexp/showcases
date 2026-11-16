// utils deepEqual, diff, extend and extendDeep on plain objects
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-icosahedron color="#7be0c3" radius="0.7" position="0 1.5 -3" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-icosahedron>
      ${board('board', '0 4 -5', 7.6, 2.8, 76)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { deepEqual, diff, extend, extendDeep } = stage.AFRAME.utils as unknown as {
      deepEqual(a: unknown, b: unknown): boolean;
      diff(a: object, b: object): object;
      extend(t: object, ...s: object[]): object;
      extendDeep(t: object, ...s: object[]): object;
    };
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const show = (v: unknown): string => JSON.stringify(v, (_k, x) => (x === undefined ? '(undefined)' : x));
    const d = diff({ a: 1, b: 2, c: 3 }, { b: 2, c: 4 });
    const target = { a: { x: 1, y: 2 }, keep: true };
    const shallow = extend({ ...target }, { a: { x: 9 } });
    const deep = extendDeep({ a: { x: 1, y: 2 }, keep: true }, { a: { x: 9 } });
    log.show(
      [
        `deepEqual({a:1,b:{c:3}}, {a:1,b:{c:3}}) -> ${deepEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } })}`,
        `deepEqual({a:1,b:{c:3}}, {a:1,b:{c:4}}) -> ${deepEqual({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 4 } })}`,
        `diff({a:1,b:2,c:3}, {b:2,c:4}) -> ${show(d)}`,
        `extend({a:{x:1,y:2}}, {a:{x:9}}) -> ${show(shallow)}`,
        `extendDeep({a:{x:1,y:2}}, {a:{x:9}}) -> ${show(deep)}`,
      ].join('\n'),
    );
    stage.caption('deepEqual, diff, extend (shallow) and extendDeep');
    if (stage.preview) sway(stage);
  },
});
