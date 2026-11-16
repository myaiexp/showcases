// A renderer capped at 160 x 100 pixels: a cheap way to bound the pixel count on big screens
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" renderer="maxCanvasWidth: 160; maxCanvasHeight: 100">
      <a-torus-knot position="0 1.6 -3" geometry="radius: 0.7; radiusTubular: 0.16" color="#FFC65D"
                    animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-torus-knot>
      <a-text value="small canvas, stretched" position="0 0.4 -3" width="4" align="center" color="#ffffff"></a-text>
    </a-scene>`,
  run(stage) {
    const c = stage.scene.canvas;
    stage.every(500, () => stage.caption(`maxCanvasWidth 160, maxCanvasHeight 100: canvas is ${c.width} x ${c.height} px (shown at ${c.clientWidth} x ${c.clientHeight} css px)`));
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
