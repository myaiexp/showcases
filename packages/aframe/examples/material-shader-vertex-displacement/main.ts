// A vertex-displacement shader whose myOffset uniform a component sets from the camera position
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const vertexShader = `
varying vec2 vUv;
uniform float timeMsec;
uniform vec3 myOffset;

void main() {
  vUv = uv;
  float t = timeMsec / 1000.0;
  // Push each vertex outward along its normal by a travelling sine wave of position + offset.
  float wave = sin((position.x + myOffset.x) * 6.0 + t * 3.0) * sin((position.y + myOffset.z) * 6.0 + t * 2.0);
  vec3 displaced = position + normal * wave * 0.12;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(vUv.x, 0.45 + 0.4 * vUv.y, 1.0 - vUv.x, 1.0);
}
`;

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerShader('displacement-offset', {
      schema: {
        timeMsec: { type: 'time', is: 'uniform' },
        myOffset: { type: 'vec3', is: 'uniform' },
      },
      vertexShader,
      fragmentShader,
    });

    AFRAME.registerComponent('myoffset-updater', {
      init() {
        this.offset = new THREE.Vector3();
      },
      tick() {
        this.offset.copy(this.el.sceneEl.camera.el.getAttribute('position'));
        this.offset.y = 0;
        // The three-argument form of setAttribute creates no garbage per tick.
        this.el.setAttribute('material', 'myOffset', this.offset);
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-sphere material="shader: displacement-offset" myoffset-updater geometry="radius: 0.8; segmentsWidth: 64; segmentsHeight: 48" position="0 1.5 -2.5"
                animation="property: scale; dir: alternate; dur: 5000; loop: true; to: 1.5 1.5 1.5; easing: easeInOutSine"></a-sphere>
      <a-box color="#ccc" width="3" depth="3" height="0.1" position="0 0 -2.5"></a-box>
    </a-scene>`,
  run(stage) {
    stage.caption('WASD moves the camera, which moves the ripples');
    if (stage.preview) sway(stage, { yaw: 14 });
  },
});
