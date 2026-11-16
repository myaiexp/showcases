// Each built-in property type parses a string from the markup into a different value
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import * as images from '../../shared/images.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('types', {
      schema: {
        list: { type: 'array' },
        flag: { type: 'boolean' },
        shade: { type: 'color' },
        count: { type: 'int' },
        ratio: { type: 'number' },
        target: { type: 'selector' },
        group: { type: 'selectorAll' },
        label: { type: 'string' },
        a2: { type: 'vec2' },
        a3: { type: 'vec3' },
        a4: { type: 'vec4' },
        tex: { type: 'asset' },
        pic: { type: 'map' },
      },
    });
  },

  scene: () => `
    <a-scene background="color: #0d1420">
      <a-assets><img id="pic" src="${images.checker(4)}"></a-assets>
      <a-box id="b1" class="item" position="-1.5 1 -3" color="#4CC3D9"></a-box>
      <a-box id="b2" class="item" position="1.5 1 -3" color="#ef2d5e"></a-box>
      <a-entity id="e" types="list: 1, 2, 3; flag: false; shade: #f80; count: 124.5; ratio: 124.5; target: #b1; group: .item;
                              label: hi there; a2: 1 -2; a3: 1 -2 3; a4: 1 -2 3 -4.5; tex: url(thing.png); pic: #pic"></a-entity>
      ${board('board', '0 3.3 -4', 7.6, 3.2, 84)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const d = el.getAttribute('types');
    const show = (v: unknown): string => {
      if (v instanceof HTMLElement) return `<${v.tagName.toLowerCase()} id=${v.id}>`;
      if (Array.isArray(v)) return `[${v.map(show).join(', ')}]${typeof v[0] === 'string' ? ' (strings)' : ''}`;
      return typeof v === 'string' ? JSON.stringify(v.length > 28 ? v.slice(0, 22) + '...' : v) : JSON.stringify(v);
    };
    log.show(
      Object.keys(d)
        .map((k) => `${k.padEnd(6)} ${typeof d[k] === 'object' && !Array.isArray(d[k]) && !(d[k] instanceof HTMLElement) ? 'object' : Array.isArray(d[k]) ? 'array' : typeof d[k]}: ${show(d[k])}`)
        .join('\n'),
    );
    stage.caption('int 124.5 -> ' + d.count + ', number 124.5 -> ' + d.ratio);
    if (stage.preview) sway(stage);
  },
});
