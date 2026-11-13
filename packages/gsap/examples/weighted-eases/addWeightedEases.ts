// The official addWeightedEases() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/addWeightedEases
// Run it once and every standard ease without its own configuration (power1.in, sine.inOut...)
// accepts a weighting ratio between -1 and 1, like "power2.inOut(0.5)".
type Weightable = ((p: number) => number) & { config?: (ratio: number) => (p: number) => number };

export function addWeightedEases(): void {
  const eases = gsap.parseEase() as unknown as Record<string, Weightable>;
  const createConfig = (ease: Weightable) => (ratio: number) => {
    const y = 0.5 + ratio / 2;
    return (p: number): number => ease(2 * (1 - p) * p * y + p * p);
  };
  for (const p in eases) {
    const ease = eases[p] as Weightable;
    if (!ease.config) ease.config = createConfig(ease);
  }
}
