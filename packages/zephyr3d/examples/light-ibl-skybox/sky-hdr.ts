// A sunset panorama encoded as a Radiance .hdr file (flat RGBE pixels), standing in for Wide_Street.hdr

/** Writes one pixel as RGBE. */
function rgbe(out: Uint8Array, i: number, r: number, g: number, b: number): void {
  const m = Math.max(r, g, b);
  if (m < 1e-32) {
    out.set([0, 0, 0, 0], i);
    return;
  }
  const e = Math.ceil(Math.log2(m));
  const scale = 256 / 2 ** e;
  out.set([Math.min(255, r * scale), Math.min(255, g * scale), Math.min(255, b * scale), e + 128], i);
}

/** An equirectangular sky: deep blue zenith, orange horizon, a hot sun disc and a dark ground. */
export function sunsetHdr(width = 512, height = 256): ArrayBuffer {
  const head = new TextEncoder().encode(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`);
  const pixels = new Uint8Array(width * height * 4);
  const sunLon = 0.9 * Math.PI;
  const sunLat = 0.1 * Math.PI; // above the horizon
  for (let y = 0; y < height; y++) {
    const lat = (0.5 - y / height) * Math.PI; // +90 deg at the top
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * 2 * Math.PI;
      const up = Math.max(0, Math.sin(lat));
      let r = 0.9 * (1 - up) ** 3 + 0.05;
      let g = 0.45 * (1 - up) ** 3 + 0.1 * (1 - up) + 0.08;
      let b = 0.2 * (1 - up) ** 3 + 0.5 * up + 0.12;
      if (lat < 0) {
        r = 0.05;
        g = 0.045;
        b = 0.04;
      }
      // The sun: an angular distance test on the sphere
      const cosd = Math.sin(lat) * Math.sin(sunLat) + Math.cos(lat) * Math.cos(sunLat) * Math.cos(lon - sunLon);
      const d = Math.acos(Math.min(1, cosd));
      if (d < 0.12) {
        r += 40;
        g += 32;
        b += 18;
      } else if (d < 0.5) {
        const f = (0.5 - d) / 0.38;
        r += 3 * f * f;
        g += 1.6 * f * f;
        b += 0.5 * f * f;
      }
      rgbe(pixels, (y * width + x) * 4, r, g, b);
    }
  }
  const file = new Uint8Array(head.length + pixels.length);
  file.set(head, 0);
  file.set(pixels, head.length);
  return file.buffer;
}
