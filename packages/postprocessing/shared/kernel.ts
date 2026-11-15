// A typed view of GaussKernel: the 6.39.6 typings declare only its constructor
import type { GaussKernel } from 'postprocessing';

export interface KernelData {
  /** Discrete weights from the centre tap outwards, normalised so the whole kernel sums to 1. */
  weights: Float64Array;
  /** Offsets of the discrete taps in texels: 0, 1, 2, ... */
  offsets: ArrayLike<number>;
  /** Weights and offsets when pairs of taps are merged into single bilinear fetches. */
  linearWeights: Float64Array;
  linearOffsets: Float64Array;
  steps: number;
  linearSteps: number;
}

export const kernelOf = (kernel: GaussKernel): KernelData => kernel as unknown as KernelData;
