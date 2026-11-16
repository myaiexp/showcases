// The AFRAME global: registries, prototypes, registration functions, THREE, utils and version
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="#4CC3D9" position="0 1.5 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 4 -4.5', 8, 3.4, 78)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const A = stage.AFRAME as unknown as Record<string, unknown> & { version: string };
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const size = (name: string): string => `${Object.keys(A[name] as object).length} registered`;
    const box = document.querySelector('a-box') as Entity;
    const rows: [string, string][] = [
      ['version', A.version],
      ['AComponent', typeof A.AComponent],
      ['AEntity', `${typeof A.AEntity}; a-box instanceof AEntity: ${box instanceof (A.AEntity as typeof HTMLElement)}`],
      ['ANode', `${typeof A.ANode}; instanceof: ${box instanceof (A.ANode as typeof HTMLElement)}`],
      ['AScene', `${typeof A.AScene}; scene instanceof: ${stage.scene instanceof (A.AScene as typeof HTMLElement)}`],
      ['components', size('components')],
      ['geometries', size('geometries')],
      ['primitives.primitives', `${Object.keys((A.primitives as { primitives: object }).primitives).length} registered`],
      ['shaders', size('shaders')],
      ['systems', size('systems')],
      ['registerComponent / registerGeometry', `${typeof A.registerComponent} / ${typeof A.registerGeometry}`],
      ['registerPrimitive / registerShader', `${typeof A.registerPrimitive} / ${typeof A.registerShader}`],
      ['schema, utils', `${typeof A.schema}, ${typeof A.utils}`],
      ['THREE.REVISION', String((A.THREE as { REVISION: string }).REVISION)],
      ['window.AFRAME === AFRAME', String((window as unknown as { AFRAME: unknown }).AFRAME === A)],
    ];
    log.show(rows.map(([k, v]) => `${k.padEnd(36)} ${v}`).join('\n'));
    stage.caption('AFRAME properties');
    if (stage.preview) sway(stage);
  },
});
