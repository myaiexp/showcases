// Edge-detection fragment shader: Sobel on luminance, ink over colour
export const EDGE_FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec2 texelSize;
uniform float escale;
uniform float threshold;

float luma(vec2 uv) {
  return dot(texture2D(textureSampler, uv).rgb, vec3(0.299, 0.587, 0.114));
}

void main(void) {
  vec2 d = texelSize;
  float tl = luma(vUV + vec2(-d.x, d.y)), t = luma(vUV + vec2(0.0, d.y)), tr = luma(vUV + d);
  float l = luma(vUV - vec2(d.x, 0.0)), r = luma(vUV + vec2(d.x, 0.0));
  float bl = luma(vUV - d), b = luma(vUV - vec2(0.0, d.y)), br = luma(vUV + vec2(d.x, -d.y));
  float gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
  float gy = (tl + 2.0 * t + tr) - (bl + 2.0 * b + br);
  float edge = smoothstep(threshold, threshold + 0.1, length(vec2(gx, gy)) * escale);
  vec3 color = texture2D(textureSampler, vUV).rgb;
  gl_FragColor = vec4(mix(color, vec3(0.02, 0.02, 0.05), edge), 1.0);
}
`;
