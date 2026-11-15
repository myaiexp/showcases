// A vertex and a fragment shader; the time uniform animates it without a tick() handler
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform vec3 color;
uniform float timeMsec; // A-Frame time in milliseconds.

void main() {
  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.
  // sin(time) curves over time and decides the mix of two colours:
  // (a) a dynamic colour where R and G come from a modulus of the UV coordinates,
  // (b) the base colour.
  gl_FragColor = mix(
    vec4(mod(vUv , 0.05) * 20.0, 1.0, 1.0),
    vec4(color, 1.0),
    sin(time)
  );
}
`;

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerShader('grid-glitch', {
      schema: {
        color: { type: 'color', is: 'uniform' },
        timeMsec: { type: 'time', is: 'uniform' },
      },
      vertexShader,
      fragmentShader,
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-sphere material="shader: grid-glitch; color: blue" radius="0.9" position="-1.4 1.6 -3"
                animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-sphere>
      <a-box material="shader: grid-glitch; color: #ff5ea0" position="1.4 1.6 -3"
             animation="property: rotation; to: 360 360 0; dur: 12000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
