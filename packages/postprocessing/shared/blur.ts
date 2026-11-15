// Typed views of blur pass members the 6.39.6 type definitions leave out
import type { BoxBlurPass, GaussianBlurPass, Pass } from 'postprocessing';

/** BoxBlurPass.blurMaterial and iterations exist (see the JSDoc) but are missing from index.d.ts. */
export interface BoxBlurMembers {
  iterations: number;
  blurMaterial: { kernelSize: number; bilateral: boolean; worldDistanceThreshold: number };
}

/** GaussianBlurPass.blurMaterial and iterations, likewise missing from index.d.ts. */
export interface GaussianBlurMembers {
  iterations: number;
  blurMaterial: { kernelSize: number };
}

export const boxBlur = (pass: BoxBlurPass): BoxBlurPass & BoxBlurMembers => pass as BoxBlurPass & BoxBlurMembers;
export const gaussianBlur = (pass: GaussianBlurPass): GaussianBlurPass & GaussianBlurMembers => pass as GaussianBlurPass & GaussianBlurMembers;

// TiltShiftBlurPass is exported at runtime (src/passes/index.js) but index.d.ts declares no class for it.
declare module 'postprocessing' {
  interface TiltShiftBlurOptions {
    offset?: number;
    rotation?: number;
    focusArea?: number;
    feather?: number;
    kernelSize?: number;
    resolutionScale?: number;
  }
  export class TiltShiftBlurPass extends Pass {
    constructor(options?: TiltShiftBlurOptions);
    blurMaterial: { offset: number; rotation: number; focusArea: number; feather: number };
  }
}
