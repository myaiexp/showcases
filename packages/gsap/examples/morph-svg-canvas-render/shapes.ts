// Shape data for the canvas morph: four path strings in a 100 by 100 box, from the MorphSVG docs' canvas demo
export const SHAPES = {
  // drawn as a <circle> in the SVG and converted with convertToPath
  circle: { cx: 50, cy: 50, r: 36 },
  diamond: 'M50,1l49,49L50,99L1,50L50,1z',
  tablet: 'M20,1 85,1 85,66 51,98 51,66 20,66z',
  bolt: 'M47.1,0.8 73.3,0.8 61.9,37.2 77.1,37.2 30.7,99.4 45.8,51.9 29,51.9z',
};

export type RawPathLike = Array<number[] & { closed?: boolean }>;

/** Draws a RawPath (cubic bezier segments) into a canvas context; the caller sets up fill or stroke and path begin. */
export function tracePath(ctx: CanvasRenderingContext2D, rawPath: RawPathLike): void {
  for (const segment of rawPath) {
    const s = segment as number[];
    ctx.moveTo(s[0]!, s[1]!);
    for (let i = 2; i < s.length; i += 6) {
      ctx.bezierCurveTo(s[i]!, s[i + 1]!, s[i + 2]!, s[i + 3]!, s[i + 4]!, s[i + 5]!);
    }
    if (segment.closed) ctx.closePath();
  }
}
