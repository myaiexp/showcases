// loading-screen="dotsColor: red; backgroundColor: black", held on screen by an asset that never loads
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup() {
    document.title = 'Loading the scene';
  },
  scene: `
    <a-scene loading-screen="dotsColor: red; backgroundColor: black" background="color: #10151c">
      <!-- The scene waits for assets. This audio has no source, so it never finishes and the 3 s timeout ends the wait. -->
      <a-assets timeout="3000"><audio id="never" preload="auto"></audio></a-assets>
      <a-box position="0 1.6 -3" color="#EF2D5E" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
      <a-text value="the scene has loaded" position="0 0.4 -3" width="4" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    stage.caption('loading-screen="dotsColor: red; backgroundColor: black" (shown for the first 3 seconds)');
  },
});
