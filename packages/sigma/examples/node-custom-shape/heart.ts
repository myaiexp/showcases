// A heart as a custom SDFShape: a GLSL signed distance function plus the metadata sigma needs
import type { SDFShape } from 'sigma/rendering';

// The function name must be sdf_{name}. uv is the position in the node's quad, in [-1, 1]
// with (0, 0) at the centre; size is the shape's half-size in the same units (about 1).
// The body is the classic heart distance function, remapped so the heart fills that quad.
const GLSL = /* glsl */ `
float sdf_heart(vec2 uv, float size) {
  // The heart spans about x in [-0.6, 0.6] and y in [0, 1.1] in its own units.
  const float k = 0.6;
  vec2 p = uv / size * k + vec2(0.0, 0.55);
  p.x = abs(p.x);
  float d;
  if (p.y + p.x > 1.0) {
    vec2 q = p - vec2(0.25, 0.75);
    d = sqrt(dot(q, q)) - sqrt(2.0) / 4.0;
  } else {
    vec2 a = p - vec2(0.0, 1.0);
    vec2 b = p - 0.5 * max(p.x + p.y, 0.0);
    d = sqrt(min(dot(a, a), dot(b, b))) * sign(p.x - p.y);
  }
  // Back to uv units: negative inside, positive outside.
  return d / k * size;
}
`;

export function sdfHeart(): SDFShape {
  return {
    name: 'heart',
    glsl: GLSL,
    uniforms: [],
    // Ratio of inradius to circumradius, used to size backdrops and depth-aware layers.
    inradiusFactor: 0.35,
  };
}
