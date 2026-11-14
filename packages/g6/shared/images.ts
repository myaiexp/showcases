// Generated SVG data-URL images in place of the remote pictures the docs link
/**
 * The docs point image nodes, icons and backgrounds at pictures on alipayobjects.com. A
 * card must not fetch, so examples use these instead: each is an inline SVG turned into a
 * data URL, which G6 loads like any other image src.
 */

const HUES = [210, 28, 350, 160, 270, 48, 190, 120];

const url = (svg: string): string => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/** A round avatar: a coloured disc with a head-and-shoulders silhouette. */
export function avatar(i: number): string {
  const h = HUES[i % HUES.length]!;
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
      `<circle cx="32" cy="32" r="32" fill="hsl(${h} 60% 45%)"/>` +
      `<circle cx="32" cy="25" r="11" fill="hsl(${h} 70% 85%)"/>` +
      `<path d="M12 56c3-12 11-18 20-18s17 6 20 18z" fill="hsl(${h} 70% 85%)"/></svg>`,
  );
}

/** A landscape picture: sky gradient, sun and two hills, tinted by `i`. */
export function picture(i: number): string {
  const h = HUES[i % HUES.length]!;
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80">` +
      `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="hsl(${h} 70% 70%)"/><stop offset="1" stop-color="hsl(${h + 30} 70% 90%)"/>` +
      `</linearGradient></defs>` +
      `<rect width="120" height="80" fill="url(#s)"/>` +
      `<circle cx="88" cy="24" r="10" fill="hsl(45 95% 65%)"/>` +
      `<path d="M0 62 Q30 36 60 58 T120 50 V80 H0z" fill="hsl(${h + 120} 40% 40%)"/>` +
      `<path d="M0 72 Q40 56 80 70 T120 66 V80 H0z" fill="hsl(${h + 120} 45% 28%)"/></svg>`,
  );
}

/** A square glyph icon: a white symbol (one of a few shapes) on transparent ground. */
export function glyph(i: number, color = '#ffffff'): string {
  const shapes = [
    `<path d="M32 8 L38 26 L56 26 L41 37 L47 56 L32 44 L17 56 L23 37 L8 26 L26 26z"/>`,
    `<path d="M32 54 C10 38 8 24 18 16 C25 11 31 15 32 20 C33 15 39 11 46 16 C56 24 54 38 32 54z"/>`,
    `<path d="M10 30 L32 10 L54 30 V54 H38 V40 H26 V54 H10z"/>`,
    `<circle cx="32" cy="32" r="14" fill="none" stroke="${color}" stroke-width="8"/>`,
    `<path d="M36 6 L14 36 H30 L26 58 L50 26 H34z"/>`,
  ];
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="${color}">${shapes[i % shapes.length]!}</svg>`,
  );
}

/** A tiled background pattern: faint dots on a dark ground. */
export function pattern(color = '#1d2a44'): string {
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">` +
      `<rect width="24" height="24" fill="#05070c"/><circle cx="12" cy="12" r="1.6" fill="${color}"/></svg>`,
  );
}
