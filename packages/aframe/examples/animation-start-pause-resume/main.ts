// startEvents restart an animation, pauseEvents freeze it, resumeEvents continue it
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="box" position="-2 1.4 -4" color="#FFC65D"
             animation="property: position; to: 2 1.4 -4; dur: 3000; easing: easeInOutQuad; dir: alternate; loop: true;
                        startEvents: go; pauseEvents: freeze; resumeEvents: thaw"></a-box>
      <a-text value="startEvents: go    pauseEvents: freeze    resumeEvents: thaw" position="0 0.4 -4" width="6" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    const box = q(stage, '#box');
    const log = logger(stage);
    for (const name of ['animationbegin', 'animationcomplete']) {
      box.addEventListener(name, (e) => log(`${name}: ${(e.detail as { name: string }).name}`));
    }
    // The third argument false keeps the event from bubbling to other entities.
    const send = (name: string): void => {
      box.emit(name, null, false);
      log(`emit('${name}')`);
    };
    if (stage.bar) {
      button(stage.bar, 'go (restart)', () => send('go'));
      button(stage.bar, 'freeze', () => send('freeze'));
      button(stage.bar, 'thaw', () => send('thaw'));
    }
    if (stage.preview) {
      // An animation with startEvents does not autoplay, so a card sends the events itself.
      const script = ['go', 'freeze', 'thaw', 'freeze', 'thaw'];
      stage.every(1400, (i) => send(script[(i - 1) % script.length]!));
      send('go');
    }
  },
});
