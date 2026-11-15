// poolSize lets several instances of one sound ring at once
import { q } from '../../shared/comp-dom.ts';
import { button, slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sounds } from '../../shared/comp-audio.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><audio id="chime" src="${sounds.chime()}" preload="auto"></audio></a-assets>
      <a-box id="bell" position="0 1.6 -3" color="#FFC65D" sound="src: #chime; poolSize: 1"
             animation__hit="property: scale; from: 0.8 0.8 0.8; to: 1 1 1; dur: 250; easing: easeOutBack; startEvents: hit"></a-box>
    </a-scene>`,
  run(stage) {
    const bell = q(stage, '#bell');
    const play = (): void => {
      (bell.components.sound as unknown as { playSound(): void }).playSound();
      bell.emit('hit', null, false);
    };
    stage.caption(`poolSize: 1 (press play twice quickly)`);
    slider(stage.bar!, 'poolSize', [1, 6, 1], 1, (v) => {
      bell.setAttribute('sound', 'poolSize', v);
      stage.caption(`poolSize: ${v}`);
    });
    button(stage.bar!, 'playSound()', play);
  },
});
