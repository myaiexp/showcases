// A custom effect that overrides setSize() so its tiles keep a fixed size in pixels
import { Uniform, Vector2 } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */ `
uniform vec2 cells;

void mainUv(inout vec2 uv) {
  uv = (floor(uv * cells) + 0.5) / cells;
}
`;

export class MosaicEffect extends Effect {
  /** Edge of a tile in frame buffer pixels. */
  tile: number;
  /** The size last passed to setSize(), for display. */
  lastSize = new Vector2();
  /** How often setSize() was called. */
  calls = 0;

  constructor(tile = 24) {
    super('MosaicEffect', fragmentShader, { uniforms: new Map<string, Uniform>([['cells', new Uniform(new Vector2(1, 1))]]) });
    this.tile = tile;
  }

  /** The pass calls this before initialize and whenever the composer is resized. */
  override setSize(width: number, height: number): void {
    this.calls++;
    this.lastSize.set(width, height);
    this.refresh();
  }

  setTile(tile: number): void {
    this.tile = tile;
    this.refresh();
  }

  private refresh(): void {
    const cells = this.uniforms.get('cells')!.value as Vector2;
    cells.set(Math.max(1, Math.round(this.lastSize.x / this.tile)), Math.max(1, Math.round(this.lastSize.y / this.tile)));
  }
}
