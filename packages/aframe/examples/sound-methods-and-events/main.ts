// The sound component's methods and events
import { q } from '../../shared/comp-dom.ts';
import { button, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';
import { sounds } from '../../shared/comp-audio.ts';

type SoundComponent = { playSound(): void; pauseSound(): void; stopSound(): void };

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><audio id="pad" src="${sounds.drone()}" preload="auto"></audio></a-assets>
      <a-sphere id="source" position="0 1.6 -3" radius="0.6" color="#4CC3D9" sound="src: #pad; loop: false"
                animation="property: scale; from: 1 1 1; to: 1.25 1.25 1.25; dur: 700; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
    </a-scene>`,
  run(stage) {
    const el = q(stage, '#source');
    const log = logger(stage, 5);
    const sound = (): SoundComponent => el.components.sound as unknown as SoundComponent;
    el.addEventListener('sound-loaded', (e) => log(`sound-loaded ${JSON.stringify(e.detail)}`));
    el.addEventListener('sound-ended', (e) => log(`sound-ended ${JSON.stringify(e.detail)}`));
    stage.caption('Press play (browsers need a click before audio starts)');
    button(stage.bar!, 'playSound()', () => (sound().playSound(), log('playSound()')));
    button(stage.bar!, 'pauseSound()', () => (sound().pauseSound(), log('pauseSound()')));
    button(stage.bar!, 'stopSound()', () => (sound().stopSound(), log('stopSound()')));
    toggle(stage.bar!, 'loop', false, (v) => el.setAttribute('sound', 'loop', v));
  },
});
