// A custom CameraFrameEffect: dots drawn over the image in the composition
import * as pc from 'playcanvas';

// The chunk runs inside the single compose pass, at COMPOSESLOT_LDR: it receives the tone mapped
// colour and the uv and returns a colour. `sceneTextureSize` is provided by the composition.
const GLSL = /* glsl */ `
    uniform float pixelationTilePixels;
    uniform float pixelationIntensity;

    vec3 applyPixelation(vec3 color, vec2 uv) {
        vec2 tileUV = vec2(pixelationTilePixels) * sceneTextureSize.zw;
        vec2 centerUv = (floor(uv / tileUV) + 0.5) * tileUV;

        vec2 local = (uv - centerUv) / tileUV;
        float dist = length(local);
        float edge = fwidth(dist) * 1.5;
        float mask = 1.0 - smoothstep(0.35, 0.35 + edge, dist);
        return mix(color, color * mask, pixelationIntensity);
    }
`;

const WGSL = /* wgsl */ `
    uniform pixelationTilePixels: f32;
    uniform pixelationIntensity: f32;

    fn applyPixelation(color: vec3f, uv: vec2f) -> vec3f {
        let tileUV = vec2f(uniform.pixelationTilePixels) * uniform.sceneTextureSize.zw;
        let centerUv = (floor(uv / tileUV) + vec2f(0.5, 0.5)) * tileUV;

        let local = (uv - centerUv) / tileUV;
        let dist = length(local);
        let edge = fwidth(dist) * 1.5;
        let mask = 1.0 - smoothstep(0.35, 0.35 + edge, dist);
        return mix(color, color * mask, uniform.pixelationIntensity);
    }
`;

export class PixelationEffect extends pc.CameraFrameEffect {
  /** The size of one tile, in screen pixels. */
  tilePixels = 8;

  /** The blend between the original image (0) and the dotted one (1). */
  intensity = 0.5;

  constructor(device: pc.GraphicsDevice) {
    super(device, 'pixelation', { slot: pc.COMPOSESLOT_LDR, glsl: GLSL, wgsl: WGSL });
  }

  // at zero intensity the effect leaves the image alone, so its chunk is left out of the shader
  override get active(): boolean {
    return this.enabled && this.intensity > 0;
  }

  // called by cameraFrame.update(): copy the parameters into the uniforms
  override update(): void {
    this.setUniform('pixelationTilePixels', this.tilePixels);
    this.setUniform('pixelationIntensity', this.intensity);
  }
}
