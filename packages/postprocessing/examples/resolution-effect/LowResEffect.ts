// A custom effect that keeps a Resolution and renders a down-scaled copy of the frame into it
import { NearestFilter, Uniform, WebGLRenderTarget, type WebGLRenderer } from 'three';
import { CopyPass, Effect, Resolution } from 'postprocessing';

const fragmentShader = /* glsl */ `
uniform sampler2D lowRes;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = vec4(texture2D(lowRes, uv).rgb, inputColor.a);
}
`;

export class LowResEffect extends Effect {
  /** Effective size = the composer's size times `scale`, unless a preferred size is set. */
  readonly resolution = new Resolution(null, Resolution.AUTO_SIZE, Resolution.AUTO_SIZE, 0.12);
  private readonly target = new WebGLRenderTarget(1, 1, { minFilter: NearestFilter, magFilter: NearestFilter, depthBuffer: false });
  // autoResize false: this effect sizes the target itself, from the Resolution.
  private readonly copy = new CopyPass(this.target, false);

  constructor() {
    super('LowResEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['lowRes', new Uniform(null)]]) });
    this.uniforms.get('lowRes')!.value = this.target.texture;
    this.resolution.addEventListener('change' as never, () => this.target.setSize(this.resolution.width, this.resolution.height));
  }

  override setSize(width: number, height: number): void {
    this.resolution.setBaseSize(width, height);
  }

  override initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: number): void {
    this.copy.initialize(renderer, alpha, frameBufferType);
  }

  override update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget): void {
    // The CopyPass draws the full frame into the small target; its output buffer is unused.
    this.copy.render(renderer, inputBuffer, null as never, 0, false);
  }
}
