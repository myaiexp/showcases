// Generated SVG pictures as data URLs, so sample images never fetch
function svg(body: string, w = 160, h = 100): string {
  const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(doc)}`;
}

/** A small landscape: sky, sun and two hills. */
export const landscape = svg(
  '<rect width="160" height="100" fill="#3b6ea8"/><circle cx="118" cy="30" r="14" fill="#f6c945"/>' +
    '<path d="M0 80 Q40 40 80 75 T160 70 V100 H0Z" fill="#3f8f4f"/><path d="M0 92 Q60 70 160 90 V100 H0Z" fill="#2c6b3a"/>',
);

/** A cat face. */
export const cat = svg(
  '<rect width="160" height="100" fill="#2b2f3a"/><path d="M55 35 L62 15 L72 32 M105 35 L98 15 L88 32" fill="#e8a25a" stroke="#e8a25a" stroke-width="4"/>' +
    '<circle cx="80" cy="55" r="30" fill="#e8a25a"/><circle cx="70" cy="50" r="4" fill="#222"/><circle cx="90" cy="50" r="4" fill="#222"/>' +
    '<path d="M76 62 L80 66 L84 62" stroke="#222" stroke-width="2" fill="none"/>',
);

/** A bar chart picture. */
export const chart = svg(
  '<rect width="160" height="100" fill="#20242c"/><rect x="20" y="55" width="20" height="35" fill="#6aa9ff"/>' +
    '<rect x="50" y="35" width="20" height="55" fill="#6aa9ff"/><rect x="80" y="20" width="20" height="70" fill="#6aa9ff"/>' +
    '<rect x="110" y="45" width="20" height="45" fill="#6aa9ff"/><path d="M12 90 H150" stroke="#888"/>',
);

/** A round avatar with initials. */
export function avatar(initials: string, hue: number): string {
  return svg(
    `<circle cx="20" cy="20" r="20" fill="hsl(${hue} 55% 45%)"/>` +
      `<text x="20" y="26" font-family="sans-serif" font-size="15" fill="#fff" text-anchor="middle">${initials}</text>`,
    40,
    40,
  );
}
