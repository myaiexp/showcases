// <a-sound>: a positional sound circling the listener
import { sounds } from '../../shared/comp-audio.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10141c">
      <a-assets>
        <!-- A looping chord rendered in code, preloaded as an <audio> asset. -->
        <audio id="drone" src="${sounds.drone()}" preload="auto"></audio>
      </a-assets>
      <!-- The sound rides on a turning arm, so it passes left, behind and right of the camera. -->
      <a-entity position="0 1.6 0" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true">
        <a-sound id="voice" src="#drone" autoplay="true" loop="true" position="0 0 -3"></a-sound>
        <a-sphere radius="0.25" color="#FFC65D" position="0 0 -3"></a-sphere>
      </a-entity>
      <a-ring color="#334" radius-inner="2.95" radius-outer="3.05" rotation="-90 0 0" position="0 0.01 0"></a-ring>
    </a-scene>`,

  run(stage) {
    const voice = stage.scene.querySelector('#voice')!;
    // The sound component's methods; browsers only start audio after a click in the page.
    const sound = (): { playSound(): void; stopSound(): void } => voice.components.sound as never;
    if (stage.bar) {
      button(stage.bar, 'Play', () => sound().playSound());
      button(stage.bar, 'Stop', () => sound().stopSound());
    }
    stage.caption('Press Play: the chord circles your head (headphones help)');
  },
});
