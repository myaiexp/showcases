// AFRAME.registerShader: a schema whose uniforms feed a tiny fragment shader
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerShader('my-custom', {
      schema: {
        color: { type: 'color', is: 'uniform', default: 'red' },
        opacity: { type: 'number', is: 'uniform', default: 1.0 },
      },
      raw: false,
      fragmentShader: `
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  // A fragment shader can set the color via gl_FragColor,
  // or decline to draw anything via discard.
  void main () {
    gl_FragColor = vec4(color, opacity);
  }
`,
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <!-- A box using our shader, not fully opaque and blue. -->
      <a-box material="shader: my-custom; color: blue; opacity: 0.7; transparent: true" position="-1.2 1.6 -3"
             animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-box>
      <a-box material="shader: my-custom; color: #ffb347" position="1.2 1.6 -3"
             animation="property: material.color; from: #ffb347; to: #ff3d71; dur: 2500; dir: alternate; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
