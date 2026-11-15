// ShaderMaterials for the Passes examples: fullscreen vertex, depth viewer
import * as THREE from 'three';

/** The fullscreen triangle's vertex shader: Pass gives positions in NDC, so uv is derived from them. */
export const FULLSCREEN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

/**
 * A ShaderMaterial for a ShaderPass: `fragment` reads `uniform sampler2D <input>` and writes gl_FragColor.
 * colorspace_fragment is appended, so the result is right whether the pass is the last one or not.
 */
export function passMaterial(body: string, uniforms: Record<string, THREE.IUniform>, input = 'inputBuffer'): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { [input]: { value: null }, ...uniforms },
    vertexShader: FULLSCREEN_VERT,
    fragmentShader: /* glsl */ `
      uniform sampler2D ${input};
      varying vec2 vUv;
      ${body}
      void main() {
        gl_FragColor = effect(texture2D(${input}, vUv));
        #include <colorspace_fragment>
      }
    `,
    blending: THREE.NoBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
}

/**
 * Shows a depth texture in grey (near is bright). `mode`: 0 raw red channel, 1 RGBA-packed depth,
 * 2 plain depth in the red channel (BasicDepthPacking). Depth is linearised with the camera's near and far.
 */
export function depthViewMaterial(camera: THREE.PerspectiveCamera): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      depthTex: { value: null },
      mode: { value: 1 },
      nearFar: { value: new THREE.Vector2(camera.near, camera.far) },
    },
    vertexShader: FULLSCREEN_VERT,
    fragmentShader: /* glsl */ `
      #include <packing>
      uniform sampler2D depthTex;
      uniform int mode;
      uniform vec2 nearFar;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D(depthTex, vUv);
        float depth = mode == 1 ? unpackRGBAToDepth(texel) : texel.r;
        vec3 c = vec3(depth);
        if (mode != 0) {
          float viewZ = perspectiveDepthToViewZ(depth, nearFar.x, nearFar.y);
          c = vec3(1.0 - viewZToOrthographicDepth(viewZ, nearFar.x, nearFar.y));
          if (depth >= 1.0) c = vec3(0.0);
        }
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }
    `,
    blending: THREE.NoBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
}
