// Children of the camera entity stay fixed in view: a heads-up display
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity camera look-controls position="0 1.6 0">
        <a-entity geometry="primitive: plane; height: 0.2; width: 0.5" position="-0.5 -0.32 -1"
                  material="color: gray; opacity: 0.6; transparent: true"
                  text="value: HUD; width: 0.5; align: center; color: #ffffff"></a-entity>
        <a-entity geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.015" material="shader: flat; color: #FFC65D" position="0 0 -1"></a-entity>
      </a-entity>
      ${[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return `<a-box position="${(Math.sin(a) * 4).toFixed(2)} 1.2 ${(-Math.cos(a) * 4).toFixed(2)}" color="hsl(${i * 60}, 70%, 60%)"></a-box>`;
      }).join('')}
      <a-plane rotation="-90 0 0" width="20" height="20" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('drag to look: the panel and reticle are children of the camera');
    if (stage.preview) sway(stage, { yaw: 60, seconds: 8 });
  },
});
