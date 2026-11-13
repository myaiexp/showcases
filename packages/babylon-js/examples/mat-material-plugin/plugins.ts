// Two MaterialPluginBase subclasses: greyscale, and a tint with scanlines
import { Color3, MaterialPluginBase, ShaderLanguage, type Material, type UniformBuffer } from '@babylonjs/core';

/** Converts the final fragment colour to grey, always on. */
export class GreyscalePlugin extends MaterialPluginBase {
  constructor(material: Material) {
    // name, priority (lower runs first), and the defines whose changes trigger a recompile.
    super(material, 'Greyscale', 200, { GREYSCALE: false });
    this._enable(true);
  }
  override prepareDefines(defines: Record<string, unknown>): void {
    defines['GREYSCALE'] = true;
  }
  override getClassName(): string {
    return 'GreyscalePlugin';
  }
  override isCompatible(shaderLanguage: ShaderLanguage): boolean {
    return shaderLanguage === ShaderLanguage.GLSL;
  }
  override getCustomCode(shaderType: string): Record<string, string> | null {
    if (shaderType !== 'fragment') return null;
    return {
      CUSTOM_FRAGMENT_MAIN_END: `
        float luma = gl_FragColor.r * 0.299 + gl_FragColor.g * 0.587 + gl_FragColor.b * 0.114;
        gl_FragColor = vec4(luma, luma, luma, 1.0);
      `,
    };
  }
}

/** Multiplies the colour by a tint and darkens moving horizontal bands; can be toggled. */
export class ScanlinePlugin extends MaterialPluginBase {
  tint = new Color3(0.4, 1, 0.6);
  time = 0;
  private _isEnabled = false;

  constructor(material: Material) {
    super(material, 'Scanline', 210, { SCANLINE: false });
  }
  get isEnabled(): boolean {
    return this._isEnabled;
  }
  set isEnabled(on: boolean) {
    if (this._isEnabled === on) return;
    this._isEnabled = on;
    // Defines changed, so the shader must be rebuilt.
    this.markAllDefinesAsDirty();
    this._enable(on);
  }
  override prepareDefines(defines: Record<string, unknown>): void {
    defines['SCANLINE'] = this._isEnabled;
  }
  override getUniforms() {
    return {
      ubo: [
        { name: 'scanTint', size: 3, type: 'vec3' },
        { name: 'scanTime', size: 1, type: 'float' },
      ],
      fragment: `#ifdef SCANLINE
          uniform vec3 scanTint;
          uniform float scanTime;
        #endif`,
    };
  }
  // Called when the material is bound to a mesh: push our values into the uniform buffer.
  override bindForSubMesh(uniformBuffer: UniformBuffer): void {
    if (!this._isEnabled) return;
    uniformBuffer.updateColor3('scanTint', this.tint);
    uniformBuffer.updateFloat('scanTime', this.time);
  }
  override getClassName(): string {
    return 'ScanlinePlugin';
  }
  override isCompatible(shaderLanguage: ShaderLanguage): boolean {
    return shaderLanguage === ShaderLanguage.GLSL;
  }
  override getCustomCode(shaderType: string): Record<string, string> | null {
    if (shaderType !== 'fragment') return null;
    return {
      CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: `
        #ifdef SCANLINE
          color.rgb *= scanTint * (0.65 + 0.35 * step(0.5, fract(gl_FragCoord.y / 6.0 + scanTime)));
        #endif
      `,
    };
  }
}
