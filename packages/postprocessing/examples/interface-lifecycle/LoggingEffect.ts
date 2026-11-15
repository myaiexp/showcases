// An effect that logs each call of the Initializable, Resizable and Disposable contracts
import { Uniform, type WebGLRenderer, type WebGLRenderTarget } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */ `
uniform float flash;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = vec4(inputColor.rgb + vec3(0.12, 0.2, 0.3) * flash, inputColor.a);
}
`;

export class LoggingEffect extends Effect {
  readonly log: string[] = [];
  updates = 0;

  constructor() {
    super('LoggingEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['flash', new Uniform(0)]]) });
    this.say('constructor');
  }

  say(line: string): void {
    this.log.push(line);
    if (this.log.length > 40) this.log.shift();
  }

  /** Resizable: called with the composer's buffer size, before initialize() and on every resize. */
  override setSize(width: number, height: number): void {
    this.say(`setSize(${width}, ${height})`);
  }

  /** Initializable: called once when the pass joins a composer. */
  override initialize(_renderer: WebGLRenderer, alpha: boolean, frameBufferType: number): void {
    this.say(`initialize(renderer, alpha ${alpha}, frameBufferType ${frameBufferType})`);
  }

  /** Called before every render; a counter instead of a log line. */
  override update(_renderer: WebGLRenderer, _input: WebGLRenderTarget, deltaTime = 0): void {
    this.updates++;
    this.uniforms.get('flash')!.value = Math.max(0, 1 - (this.updates % 120) / 12) * (deltaTime > 0 ? 1 : 0);
  }

  /** Disposable: called when the pass or composer is disposed. */
  override dispose(): void {
    this.say('dispose()');
    super.dispose();
  }
}
