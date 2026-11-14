// Types for the PlanarRenderer script the docs name, which ships without any
declare module 'playcanvas/scripts/esm/planar-renderer.mjs' {
  import type { Entity, Mat4, Script, Texture } from 'playcanvas';

  export class PlanarRenderer extends Script {
    sceneCameraEntity: Entity | null;
    mode: string;
    scale: number;
    mipmaps: boolean;
    hdr: boolean;
    readonly viewProjectionMatrix: Mat4;
    frameUpdate(): Texture | null;
  }
}
