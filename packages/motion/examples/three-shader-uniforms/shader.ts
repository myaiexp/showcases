// GLSL for the dissolve shader: noise decides which parts of the shape are gone, tint colours the burning edge
export const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform float progress; // 0 = dissolved away, 1 = whole
  uniform vec3 tint;      // colour of the glowing edge
  varying vec3 vPos;
  varying vec3 vNormal;
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  void main() {
    float n = noise(vPos * 3.0) * 0.6 + noise(vPos * 8.0) * 0.4;
    float edge = progress * 1.15 - n;
    if (edge < 0.0) discard;
    float light = 0.3 + 0.7 * max(dot(normalize(vNormal), normalize(vec3(0.5, 0.8, 0.6))), 0.0);
    vec3 base = vec3(0.32, 0.42, 0.9) * light;
    float glow = 1.0 - smoothstep(0.0, 0.1, edge);
    gl_FragColor = vec4(mix(base, tint * 1.6, glow), 1.0);
  }
`;
