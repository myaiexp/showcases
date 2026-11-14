// The processing pass that writes paint, and the copy modifier that shows it
export const processGLSL = /* glsl */ `
  uniform vec4 uBrushSphere;  // xyz = centre in splat space, w = radius
  uniform vec4 uBrushColor;
  uniform float uClear;

  void process() {
    vec3 center = getCenter();
    float falloff = max(0.0, 1.0 - distance(center, uBrushSphere.xyz) / uBrushSphere.w);
    writeCustomColor(uClear > 0.5 ? vec4(0.0) : uBrushColor * falloff);
  }
`;
export const processWGSL = /* wgsl */ `
  uniform uBrushSphere: vec4f;
  uniform uBrushColor: vec4f;
  uniform uClear: f32;

  fn process() {
    let center = getCenter();
    let falloff = max(0.0, 1.0 - distance(center, uniform.uBrushSphere.xyz) / uniform.uBrushSphere.w);
    if (uniform.uClear > 0.5) {
      writeCustomColor(vec4f(0.0));
    } else {
      writeCustomColor(uniform.uBrushColor * falloff);
    }
  }
`;

// Copy stage: add the painted colour on top of the splat's own colour.
export const copyGLSL = /* glsl */ `
  void modifySplatCenter(inout vec3 center) {}
  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {}
  void modifySplatColor(vec3 center, inout vec4 color) {
    vec4 paint = loadCustomColor();
    color.rgb += paint.rgb * 2.5;
  }
`;
export const copyWGSL = /* wgsl */ `
  fn modifySplatCenter(center: ptr<function, vec3f>) {}
  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {}
  fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    let paint = loadCustomColor();
    *color = vec4f((*color).rgb + paint.rgb * 2.5, (*color).a);
  }
`;
