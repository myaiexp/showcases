// sound on / stopOn / pauseOn: three events decide when the sound plays, stops and pauses
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';
import { sounds } from '../../shared/comp-audio.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><audio id="music" src="${sounds.drone()}" preload="auto"></audio></a-assets>
      <a-entity id="zone" geometry="primitive: ring; radiusInner: 0.8; radiusOuter: 1.1" material="color: #7BC8A4; side: double" position="0 1.6 -3"
                sound="src: #music; loop: true; on: zone-enter; stopOn: zone-leave; pauseOn: menu-open"></a-entity>
    </a-scene>`,
  run(stage) {
    const zone = q(stage, '#zone');
    const log = logger(stage, 5);
    const send = (name: string) => () => {
      zone.emit(name, null, false);
      log(`emit('${name}')`);
    };
    stage.caption('on: zone-enter   stopOn: zone-leave   pauseOn: menu-open');
    button(stage.bar!, 'zone-enter (play)', send('zone-enter'));
    button(stage.bar!, 'menu-open (pause)', send('menu-open'));
    button(stage.bar!, 'zone-leave (stop)', send('zone-leave'));
  },
});
