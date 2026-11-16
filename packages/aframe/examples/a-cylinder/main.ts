// <a-cylinder>: the docs' cylinder, hexagon, pac-man, pipe and tube
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #18222d">
      <!-- Basic cylinder. -->
      <a-cylinder color="crimson" height="1.5" radius="0.6" position="-3 0.75 -6"></a-cylinder>
      <!-- Hexagon. -->
      <a-cylinder color="cyan" segments-radial="6" radius="0.6" height="0.5" position="-1.5 0.25 -5"></a-cylinder>
      <!-- Pac-man: the arc starts at theta-start and spans theta-length degrees. -->
      <a-cylinder color="yellow" theta-start="50" theta-length="280" side="double" radius="0.6" height="0.4"
                  position="0 1.2 -4" rotation="90 0 0"
                  animation="property: geometry.thetaLength; from: 280; to: 350; dur: 300; dir: alternate; loop: true"></a-cylinder>
      <!-- Green pipe: open-ended removes the caps. -->
      <a-cylinder color="green" open-ended="true" radius="0.4" height="1.2" position="1.5 0.6 -5"></a-cylinder>
      <!-- A tube: open-ended, both sides drawn, lying on its side. -->
      <a-cylinder color="cyan" material="side: double" open-ended="true" rotation="90 0 0" radius="0.5" height="3"
                  position="3 0.5 -6"></a-cylinder>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
