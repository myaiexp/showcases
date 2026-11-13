// Projection formulas as { project, unproject } pairs, in the shape geo.projection takes

type Pt = [number, number];
export interface Projection {
  project: (p: number[]) => Pt;
  unproject: (p: number[]) => Pt;
}

const RAD = Math.PI / 180;

// Screen y grows downward, so every projection below returns -y of the usual math convention.

const mercator: Projection = {
  // Latitude is clamped: the poles would project to infinity.
  project: ([lon = 0, lat = 0]) => {
    const phi = Math.max(-85, Math.min(85, lat)) * RAD;
    return [lon * RAD, -Math.log(Math.tan(Math.PI / 4 + phi / 2))];
  },
  unproject: ([x = 0, y = 0]) => [x / RAD, (2 * Math.atan(Math.exp(-y)) - Math.PI / 2) / RAD],
};

const sinusoidal: Projection = {
  project: ([lon = 0, lat = 0]) => [lon * RAD * Math.cos(lat * RAD), -lat * RAD],
  unproject: ([x = 0, y = 0]) => [x / Math.cos(-y) / RAD, -y / RAD],
};

const mollweide: Projection = {
  project: ([lon = 0, lat = 0]) => {
    const phi = lat * RAD;
    // Solve 2θ + sin 2θ = π sin φ with a few Newton steps.
    let theta = phi;
    for (let i = 0; i < 8; i++) {
      const f = 2 * theta + Math.sin(2 * theta) - Math.PI * Math.sin(phi);
      const d = 2 + 2 * Math.cos(2 * theta);
      if (Math.abs(d) < 1e-9) break;
      theta -= f / d;
    }
    return [((2 * Math.SQRT2) / Math.PI) * lon * RAD * Math.cos(theta), -Math.SQRT2 * Math.sin(theta)];
  },
  unproject: ([x = 0, y = 0]) => {
    const theta = Math.asin(Math.max(-1, Math.min(1, -y / Math.SQRT2)));
    const phi = Math.asin(Math.max(-1, Math.min(1, (2 * theta + Math.sin(2 * theta)) / Math.PI)));
    return [(Math.PI * x) / (2 * Math.SQRT2 * Math.cos(theta)) / RAD, phi / RAD];
  },
};

// Looking down on the north pole: distance from the pole is the radius, longitude the angle.
const polar: Projection = {
  project: ([lon = 0, lat = 0]) => [(90 - lat) * Math.sin(lon * RAD), (90 - lat) * Math.cos(lon * RAD)],
  unproject: ([x = 0, y = 0]) => [Math.atan2(x, y) / RAD, 90 - Math.hypot(x, y)],
};

// Albers equal-area conic with standard parallels at 20 and 50 degrees north.
const albers: Projection = (() => {
  const p1 = 20 * RAD;
  const p2 = 50 * RAD;
  const n = (Math.sin(p1) + Math.sin(p2)) / 2;
  const c = Math.cos(p1) ** 2 + 2 * n * Math.sin(p1);
  const rho0 = Math.sqrt(c) / n;
  return {
    project: ([lon = 0, lat = 0]) => {
      const rho = Math.sqrt(c - 2 * n * Math.sin(lat * RAD)) / n;
      const theta = n * lon * RAD;
      return [rho * Math.sin(theta), -(rho0 - rho * Math.cos(theta))];
    },
    unproject: ([x = 0, y = 0]) => {
      const yy = rho0 + y;
      const rho = Math.hypot(x, yy) * Math.sign(n);
      const theta = Math.atan2(x, yy);
      return [theta / n / RAD, Math.asin(Math.max(-1, Math.min(1, (c - (rho * n) ** 2) / (2 * n)))) / RAD];
    },
  };
})();

export const PROJECTIONS: Record<string, Projection | null> = {
  'Linear (no projection)': null,
  Mercator: mercator,
  Sinusoidal: sinusoidal,
  Mollweide: mollweide,
  'Polar (north pole)': polar,
  'Albers conic': albers,
};
