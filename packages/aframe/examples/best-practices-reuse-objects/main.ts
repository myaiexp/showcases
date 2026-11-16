// Pass the same object to setAttribute and to emit on every tick to avoid garbage
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('foo', {
      init() {
        this.someData = [] as number[];
        this.evtDetail = { someData: this.someData };
      },
      tick(time: number) {
        const el = this.el;
        // The same temporary object is passed every tick, so A-Frame can skip type checking after the first.
        const rotationTmp = (this.rotationTmp = this.rotationTmp || { x: 0, y: 0, z: 0 });
        const rotation = el.getAttribute('rotation');
        rotationTmp.x = rotation.x + 0.1;
        rotationTmp.y = rotation.y + 0.6;
        rotationTmp.z = rotation.z + 0.1;
        el.setAttribute('rotation', rotationTmp);
        // And the same event detail object, with its array reused.
        if (this.someData.length < 100) this.someData.push(time);
        el.emit('bar', this.evtDetail);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" foo color="#ffc65d" position="0 1.4 -3"></a-box>
      ${board('board', '0 3.6 -4.5', 6.6, 1.4, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    let last: unknown = null;
    let same = 0;
    let events = 0;
    el.addEventListener('bar', (evt) => {
      events++;
      if (evt.detail === last) same++;
      last = evt.detail;
    });
    stage.every(300, () => log.show(`'bar' events: ${events}, detail object identical to the previous one: ${same}\ndetail.someData length: ${(last as { someData: number[] } | null)?.someData.length ?? 0}`));
    stage.caption('one rotationTmp and one evtDetail, reused every frame');
    if (stage.preview) sway(stage);
  },
});
