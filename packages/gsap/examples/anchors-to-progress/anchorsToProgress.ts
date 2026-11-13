// The official anchorsToProgress() helper, copied from the docs (typed; needs MotionPathPlugin)
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Source: docs/v3/HelperFunctions/helpers/anchorsToProgress
// Returns an array with the progress value (0 to 1) of each anchor point along the path, so
// DrawSVG can animate point-by-point. cacheRawPathMeasurements() adds `samples` to each segment
// and `totalLength` to the raw path, which the published typings do not declare.
type MeasuredSegment = number[] & { samples: number[] };
type MeasuredRawPath = Array<number[]> & { totalLength: number };

export function anchorsToProgress(rawPathIn: gsap.plugins.RawPath | string | Element, resolutionIn?: number): number[] {
  const resolution = ~~(resolutionIn as number) || 12;
  const rawPath = (Array.isArray(rawPathIn) ? rawPathIn : MotionPathPlugin.getRawPath(rawPathIn as string)) as gsap.plugins.RawPath;
  MotionPathPlugin.cacheRawPathMeasurements(rawPath, resolution);
  const measured = rawPath as unknown as MeasuredRawPath;
  const progress = [0];
  for (let s = 0; s < measured.length; s++) {
    const segment = measured[s] as MeasuredSegment;
    const samples = segment.samples;
    const e = segment.length - 6;
    for (let i = 0; i < e; i += 6) {
      const length = samples[(i / 6 + 1) * resolution - 1] as number;
      progress.push(length / measured.totalLength);
    }
  }
  return progress;
}
