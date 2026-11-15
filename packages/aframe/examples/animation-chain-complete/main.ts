// animationcomplete__<id> chains animations: each finished leg emits the start event of the next
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="walker" position="-1.5 0.6 -4" color="#c58bff" scale="0.8 0.8 0.8"
             animation__east="property: position; to: 1.5 0.6 -4; dur: 900; easing: easeInOutQuad; startEvents: east"
             animation__up="property: position; to: 1.5 2.6 -4; dur: 900; easing: easeInOutQuad; startEvents: up"
             animation__west="property: position; to: -1.5 2.6 -4; dur: 900; easing: easeInOutQuad; startEvents: west"
             animation__down="property: position; to: -1.5 0.6 -4; dur: 900; easing: easeInOutQuad; startEvents: down"></a-box>
    </a-scene>`,
  run(stage) {
    const walker = q(stage, '#walker');
    const log = logger(stage, 5);
    const next: Record<string, string> = { east: 'up', up: 'west', west: 'down', down: 'east' };
    for (const id of Object.keys(next)) {
      walker.addEventListener(`animationcomplete__${id}`, (e) => {
        log(`animationcomplete__${id}  detail.name = ${(e.detail as { name: string }).name}`);
        walker.emit(next[id]!, null, false);
      });
    }
    walker.emit('east', null, false);
  },
});
