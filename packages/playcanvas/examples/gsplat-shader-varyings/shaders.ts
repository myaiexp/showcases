// Chunks for a clip box: the vertex stage classifies, the fragment clips
export const glslVS = /* glsl */ `
  uniform vec3 uClipCenter;
  uniform vec3 uClipHalf;

  void modifySplatCenter(inout vec3 center) {}

  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    // signed distance from the box surface (negative inside)
    vec3 d = abs(modifiedCenter - uClipCenter) - uClipHalf;
    float sdf = length(max(d, vec3(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);
    float radius = 2.0 * gsplatGetSizeFromScale(scale);
    if (sdf < -radius) {
      scale = vec3(0.0);   // fully inside: drop the splat
      setClipState(1u);
    } else if (sdf > radius) {
      setClipState(1u);    // fully outside: the fragment stage can skip it
    } else {
      setClipState(0u);    // straddles the surface: clip per pixel
    }
  }

  void modifySplatColor(vec3 center, inout vec4 color) {}
`;

export const glslPS = /* glsl */ `
  uniform vec3 uClipCenter;
  uniform vec3 uClipHalf;
  uniform mat4 uInvViewProj;
  uniform vec4 screen_size;

  void modifySplatColor(vec2 gaussianUV, inout vec4 color) {
    if (getClipState() == 1u) return;
    vec3 ndc = vec3(gl_FragCoord.xy * screen_size.zw, gl_FragCoord.z) * 2.0 - 1.0;
    vec4 world = uInvViewProj * vec4(ndc, 1.0);
    vec3 worldPos = world.xyz / world.w;
    vec3 d = abs(worldPos - uClipCenter) - uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) color.a = 0.0;
  }
`;

export const wgslVS = /* wgsl */ `
  uniform uClipCenter: vec3f;
  uniform uClipHalf: vec3f;

  fn modifySplatCenter(center: ptr<function, vec3f>) {}

  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    let d = abs(modifiedCenter - uniform.uClipCenter) - uniform.uClipHalf;
    let sdf = length(max(d, vec3f(0.0))) + min(max(d.x, max(d.y, d.z)), 0.0);
    let radius = 2.0 * gsplatGetSizeFromScale(*scale);
    if (sdf < -radius) {
      *scale = vec3f(0.0);
      setClipState(1u);
    } else if (sdf > radius) {
      setClipState(1u);
    } else {
      setClipState(0u);
    }
  }

  fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {}
`;

export const wgslPS = /* wgsl */ `
  uniform uClipCenter: vec3f;
  uniform uClipHalf: vec3f;
  uniform uInvViewProj: mat4x4f;
  uniform screen_size: vec4f;

  fn modifySplatColor(gaussianUV: vec2f, color: ptr<function, vec4f>) {
    if (getClipState() == 1u) {
      return;
    }
    let uv = pcPosition.xy * uniform.screen_size.zw;
    let ndc = vec3f(uv.x * 2.0 - 1.0, (1.0 - uv.y) * 2.0 - 1.0, pcPosition.z * 2.0 - 1.0);
    let world = uniform.uInvViewProj * vec4f(ndc, 1.0);
    let worldPos = world.xyz / world.w;
    let d = abs(worldPos - uniform.uClipCenter) - uniform.uClipHalf;
    if (max(d.x, max(d.y, d.z)) < 0.0) {
      *color = vec4f((*color).rgb, 0.0);
    }
  }
`;
