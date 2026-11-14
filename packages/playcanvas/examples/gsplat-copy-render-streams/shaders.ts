// Copy writes a component id; render reads it and looks up a colour
export const copyGLSL = /* glsl */ `
  uniform uint uComponentId;
  void modifySplatCenter(inout vec3 center) {}
  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {}
  void modifySplatColor(vec3 center, inout vec4 color) {
    writeSplatId(uvec4(uComponentId, 0u, 0u, 0u));
  }
`;
export const copyWGSL = /* wgsl */ `
  uniform uComponentId: u32;
  fn modifySplatCenter(center: ptr<function, vec3f>) {}
  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {}
  fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    writeSplatId(vec4u(uniform.uComponentId, 0u, 0u, 0u));
  }
`;

export const renderGLSL = /* glsl */ `
  uniform sampler2D uColorLookup;
  uint componentId;

  void modifySplatCenter(inout vec3 center) {
    componentId = loadSplatId().r;
  }
  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {}
  void modifySplatColor(vec3 center, inout vec4 color) {
    vec3 tint = texelFetch(uColorLookup, ivec2(int(componentId), 0), 0).rgb;
    color.rgb *= tint;
  }
`;
export const renderWGSL = /* wgsl */ `
  var uColorLookup: texture_2d<f32>;
  var<private> componentId: u32;

  fn modifySplatCenter(center: ptr<function, vec3f>) {
    componentId = loadSplatId().r;
  }
  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {}
  fn modifySplatColor(center: vec3f, color: ptr<function, vec4f>) {
    let tint = textureLoad(uColorLookup, vec2i(i32(componentId), 0), 0).rgb;
    *color = vec4f((*color).rgb * tint, (*color).a);
  }
`;
