// The annotated GLSL source of the example's custom block, kept as a string
export const RIPPLE_GLSL = `// { "smartFilterBlockType": "RippleTintBlock" }

uniform sampler2D input;
// { "default": 0.02 }
uniform float amplitude;
// { "default": 18.0 }
uniform float frequency;
// { "default": 0.25 }
uniform float amount;
// { "default": { "r": 1, "g": 0.4, "b": 0.2 } }
uniform vec3 tint;
// { "default": 0.0 }
uniform float time;
// { "property": { "options": { "Ripple": 0, "Ripple and tint": 1 } } }
const float mode = 1.;

vec4 mainImage(vec2 vUV) { // main
    vec2 uv = vUV + vec2(0., sin(vUV.x * frequency + time * 3.) * amplitude);
    vec4 color = texture2D(input, uv);
    if (mode > 0.5) {
        color.rgb = mix(color.rgb, tint, amount);
    }
    return vec4(clamp(color.rgb, 0., 1.), color.a);
}
`;
