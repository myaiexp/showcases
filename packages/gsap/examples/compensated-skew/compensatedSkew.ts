// The official compensatedSkew() helper, copied from the docs (typed; reads GSAP's internal _gsap cache)
// Source: docs/v3/HelperFunctions/helpers/compensatedSkew
// Applied via onUpdate, it renders skews the old GSAP 2 `skewType: "compensated"` way. It
// changes the element's scaleX/scaleY while rendering (hence "compensated"). The docs note this
// is not an officially supported method.
interface GsapCache {
  scaleX: number;
  scaleY: number;
  skewX: number | string;
  skewY: number | string;
  renderTransform: (ratio: number, cache: GsapCache) => void;
}

export function compensatedSkew(this: gsap.core.Tween): void {
  const targets = this.targets() as Array<{ _gsap: GsapCache }>;
  let i = targets.length;
  const DEG2RAD = Math.PI / 180;
  while (i--) {
    const cache = (targets[i] as { _gsap: GsapCache })._gsap;
    const scaleY = cache.scaleY;
    const scaleX = cache.scaleX;
    cache.scaleY *= Math.cos(parseFloat(String(cache.skewX)) * DEG2RAD);
    cache.scaleX *= Math.cos(parseFloat(String(cache.skewY)) * DEG2RAD);
    cache.renderTransform(1, cache);
    cache.scaleY = scaleY;
    cache.scaleX = scaleX;
  }
}
