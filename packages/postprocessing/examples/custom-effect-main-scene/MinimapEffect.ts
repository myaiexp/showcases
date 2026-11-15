// A custom effect that renders the main scene into its own render target during update()
import {
  HalfFloatType,
  OrthographicCamera,
  Uniform,
  WebGLRenderTarget,
  type Camera,
  type Scene,
  type WebGLRenderer,
} from 'three';
import { Effect } from 'postprocessing';

// The minimap is composited in the bottom-left corner, kept square with the aspect uniform.
const fragmentShader = /* glsl */ `
uniform sampler2D minimap;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float edge = 0.3;
  vec2 local = (uv - 0.02) / vec2(edge / aspect, edge);
  vec3 colour = inputColor.rgb;
  bool inside = all(greaterThan(local, vec2(0.0))) && all(lessThan(local, vec2(1.0)));
  bool frame = all(greaterThan(local, vec2(-0.02))) && all(lessThan(local, vec2(1.02)));
  if (inside) {
    colour = texture2D(minimap, local).rgb;
  } else if (frame) {
    colour = vec3(1.0);
  }
  outputColor = vec4(colour, inputColor.a);
}
`;

export class MinimapEffect extends Effect {
  private scene: Scene | null = null;
  private target = new WebGLRenderTarget(256, 256);
  private topDown = new OrthographicCamera(-6, 6, 6, -6, 0.1, 40);

  constructor() {
    super('MinimapEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['minimap', new Uniform(null)]]) });
    this.topDown.position.set(0, 20, 0);
    this.topDown.up.set(0, 0, -1);
    this.topDown.lookAt(0, 0, 0);
    this.uniforms.get('minimap')!.value = this.target.texture;
  }

  // These two setters are called by composer.setMainScene() / setMainCamera(), not by addPass.
  override set mainScene(scene: Scene) {
    this.scene = scene;
  }
  override set mainCamera(_camera: Camera) {}

  override initialize(_renderer: WebGLRenderer, _alpha: boolean, _frameBufferType: number): void {
    // Called when the pass joins a composer. Half float keeps the linear, brighter-than-1 scene.
    this.target.dispose();
    this.target = new WebGLRenderTarget(256, 256, { type: HalfFloatType });
    this.uniforms.get('minimap')!.value = this.target.texture;
  }

  override update(renderer: WebGLRenderer): void {
    if (this.scene === null) return;
    renderer.setRenderTarget(this.target);
    renderer.render(this.scene, this.topDown);
    // The EffectPass sets its own target right after update(), so nothing to restore.
  }
}
