// A procedural Earth-sized globe in ECEF coordinates, with city markers
import {
  Color3,
  Color4,
  EcefFromLatLonAltToRef,
  LatLonFromDegreesToRef,
  MeshBuilder,
  StandardMaterial,
  Vector3,
  VertexBuffer,
  type Mesh,
  type Scene,
} from '@babylonjs/core';

/** Earth's mean radius in metres, as the geospatial camera docs use. */
export const PLANET_RADIUS = 6371000;

/** A sphere "ellipsoid": no flattening, so ECEF positions sit on the globe mesh. */
const SPHERE = { semiMajorAxis: PLANET_RADIUS, firstEccentricitySquared: 0 };

export const CITIES = [
  { name: 'Helsinki', lat: 60.17, lon: 24.94 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69 },
  { name: 'Nairobi', lat: -1.29, lon: 36.82 },
  { name: 'Lima', lat: -12.05, lon: -77.04 },
  { name: 'Vancouver', lat: 49.28, lon: -123.12 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
] as const;

/** ECEF position (Z up through the north pole) for degrees of latitude and longitude. */
export function ecef(latDeg: number, lonDeg: number, alt = 0): Vector3 {
  const ll = LatLonFromDegreesToRef(latDeg, lonDeg, { lat: 0, lon: 0 });
  return EcefFromLatLonAltToRef({ ...ll, alt }, SPHERE, new Vector3());
}

/** Made-up continents: a sum of waves over latitude and longitude, thresholded. */
function land(lat: number, lon: number): number {
  return (
    Math.sin(lat * 3.1 + 0.6) * Math.cos(lon * 2.0 - 0.4) +
    0.6 * Math.sin(lon * 3.7 + lat * 1.3) +
    0.35 * Math.cos(lat * 7.0 - lon * 5.0)
  );
}

/**
 * A globe mesh named "globe" centred at the origin, coloured per vertex from each
 * vertex's own latitude and longitude, plus a marker sphere at each city.
 */
export function createGlobe(scene: Scene): { globe: Mesh; markers: Mesh[] } {
  const globe = MeshBuilder.CreateSphere('globe', { diameter: PLANET_RADIUS * 2, segments: 96 }, scene);
  const positions = globe.getVerticesData(VertexBuffer.PositionKind)!;
  const colors: number[] = [];
  const ocean = new Color3(0.08, 0.22, 0.45);
  const shore = new Color3(0.75, 0.7, 0.45);
  const grass = new Color3(0.22, 0.5, 0.22);
  const snow = new Color3(0.92, 0.94, 0.97);
  for (let i = 0; i < positions.length; i += 3) {
    const [x, y, z] = [positions[i]!, positions[i + 1]!, positions[i + 2]!];
    const r = Math.hypot(x, y, z);
    const lat = Math.asin(z / r);
    const lon = Math.atan2(y, x);
    const h = land(lat, lon);
    let c = h > 0.55 ? grass : h > 0.45 ? shore : ocean;
    if (Math.abs(lat) > 1.25) c = snow;
    colors.push(c.r, c.g, c.b, 1);
  }
  globe.setVerticesData(VertexBuffer.ColorKind, colors);
  const mat = new StandardMaterial('globe', scene);
  mat.specularColor = new Color3(0.1, 0.1, 0.1);
  globe.material = mat;

  const markerMat = new StandardMaterial('marker', scene);
  markerMat.emissiveColor = new Color3(1, 0.4, 0.2);
  markerMat.disableLighting = true;
  const markers = CITIES.map((city) => {
    const m = MeshBuilder.CreateSphere(city.name, { diameter: PLANET_RADIUS * 0.03 }, scene);
    m.position = ecef(city.lat, city.lon);
    m.material = markerMat;
    return m;
  });
  scene.clearColor = new Color4(0.01, 0.01, 0.03, 1);
  return { globe, markers };
}
