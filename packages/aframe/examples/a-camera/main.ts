// <a-camera> in a rig: the rig moves the view, the camera keeps its controls
import { slider, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: ({ preview }) => `
    <a-scene background="color: #16202b">
      <!-- The rig circles the scene; the camera inside it still looks around and walks. -->
      <a-entity id="rig" position="0 0 0"
                ${preview ? 'animation="property: rotation; to: 0 360 0; dur: 20000; easing: linear; loop: true"' : ''}>
        <a-camera id="camera" position="0 1.6 4" fov="80" near="0.5" far="10000"></a-camera>
      </a-entity>
      <a-box color="#4CC3D9" position="-1 0.5 0" rotation="0 45 0"></a-box>
      <a-sphere color="#EF2D5E" position="0.6 0.75 -0.8" radius="0.75"></a-sphere>
      <a-cylinder color="#FFC65D" position="1.2 0.75 0.8" radius="0.5" height="1.5"></a-cylinder>
      <a-plane rotation="-90 0 0" width="12" height="12" color="#7BC8A4"></a-plane>
    </a-scene>`,

  run(stage) {
    const camera = stage.scene.querySelector('#camera')!;
    if (!stage.bar) {
      stage.caption('The rig turns; the camera rides along');
      return;
    }
    // Each attribute maps to a component property: fov → camera.fov, and so on.
    slider(stage.bar, 'fov', [30, 120, 1], 80, (v) => camera.setAttribute('fov', v));
    slider(stage.bar, 'rig y', [0, 6, 0.1], 0, (v) => stage.scene.querySelector('#rig')!.setAttribute('position', `0 ${v} 0`));
    toggle(stage.bar, 'look-controls-enabled', true, (v) => camera.setAttribute('look-controls-enabled', v));
    toggle(stage.bar, 'wasd-controls-enabled', true, (v) => camera.setAttribute('wasd-controls-enabled', v));
    toggle(stage.bar, 'reverse-mouse-drag', false, (v) => camera.setAttribute('reverse-mouse-drag', v));
    stage.caption('Drag to look, WASD to walk (click the view first)');
  },
});
