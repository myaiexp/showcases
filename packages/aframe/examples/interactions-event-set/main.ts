// event-set: declarative setAttribute calls on events, on the entity or another entity
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { registerEventSet } from '../../shared/core-event-set.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    registerEventSet(AFRAME);
  },

  scene: `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: .hover" background="color: #0d1420">
      <a-box class="hover" position="-2.4 1.4 -4" rotation="0 45 0" color="#4CC3D9"
             event-set__enter="_event: mouseenter; color: #8FF7FF"
             event-set__leave="_event: mouseleave; color: #4CC3D9"></a-box>
      <a-cylinder class="hover" position="0 1.4 -4" radius="0.5" height="1.5" color="#FFC65D"
                  event-set__enter="_event: mouseenter; _target: #cylinderText; visible: true"
                  event-set__leave="_event: mouseleave; _target: #cylinderText; visible: false">
        <a-text id="cylinderText" value="This is a cylinder" align="center" color="#FFF" visible="false" position="0 -0.95 0.55"
                geometry="primitive: plane; width: 1.9; height: 0.3" material="color: #333"></a-text>
      </a-cylinder>
      <a-plane class="hover" position="2.4 1.4 -4" width="1.6" height="1.6" color="#7BC8A4"
               event-set__down="_event: mousedown; material.wireframe: true"
               event-set__up="_event: mouseup; material.wireframe: false"
               event-set__leave="_event: mouseleave; material.wireframe: false"></a-plane>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    stage.caption('hover the box and cylinder, press the plane');
    if (stage.preview) {
      const mouse = ghost(stage);
      const spots: [number, number][] = [[0.24, 0.55], [0.5, 0.55], [0.76, 0.55], [0.5, 0.9]];
      stage.every(1300, async (i) => {
        const [x, y] = spots[i % spots.length]!;
        await mouse.glide(x, y, 600);
        if (i % 4 === 3) return;
        if (x > 0.7) {
          mouse.click();
        }
      });
    }
  },
});
