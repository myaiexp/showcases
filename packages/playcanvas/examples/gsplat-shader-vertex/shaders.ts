// The gsplatModifyVS chunk: twist, breathe and gold flashes, in GLSL and WGSL
export const glslVertex = /* glsl */ `
  uniform float uTime;
  uniform float uTwist;
  uniform float uBreath;
  uniform float uGold;

  // move the splat centre (model space): twist around Y, more with height
  void modifySplatCenter(inout vec3 center) {
    float a = sin(uTime * 1.2) * uTwist * center.y;
    float s = sin(a);
    float c = cos(a);
    center.xz = vec2(c * center.x - s * center.z, s * center.x + c * center.z);
  }

  // scale each splat up and down
  void modifySplatRotationScale(vec3 originalCenter, vec3 modifiedCenter, inout vec4 rotation, inout vec3 scale) {
    scale *= 1.0 + uBreath * sin(uTime * 3.0 + originalCenter.y * 4.0);
  }

  // flash splats gold when their own sine peaks
  void modifySplatColor(vec3 center, inout vec4 clr) {
    float peak = smoothstep(0.9, 1.0, abs(sin(uTime * 3.0 + center.y * 3.0)));
    clr.xyz = mix(clr.xyz, vec3(1.0, 0.85, 0.0), peak * uGold);
  }
`;

export const wgslVertex = /* wgsl */ `
  uniform uTime: f32;
  uniform uTwist: f32;
  uniform uBreath: f32;
  uniform uGold: f32;

  fn modifySplatCenter(center: ptr<function, vec3f>) {
    let a = sin(uniform.uTime * 1.2) * uniform.uTwist * (*center).y;
    let s = sin(a);
    let c = cos(a);
    let x = (*center).x;
    let z = (*center).z;
    (*center).x = c * x - s * z;
    (*center).z = s * x + c * z;
  }

  fn modifySplatRotationScale(originalCenter: vec3f, modifiedCenter: vec3f, rotation: ptr<function, vec4f>, scale: ptr<function, vec3f>) {
    *scale = *scale * (1.0 + uniform.uBreath * sin(uniform.uTime * 3.0 + originalCenter.y * 4.0));
  }

  fn modifySplatColor(center: vec3f, clr: ptr<function, vec4f>) {
    let peak = smoothstep(0.9, 1.0, abs(sin(uniform.uTime * 3.0 + center.y * 3.0)));
    *clr = vec4f(mix((*clr).xyz, vec3f(1.0, 0.85, 0.0), peak * uniform.uGold), (*clr).a);
  }
`;
