// Inline SVG icons for the rich text examples: no image files, no network
/** A filled circle with one character in it. */
export function badge(fill: string, char: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="11" fill="${fill}"/><text x="12" y="17" font-size="14" font-weight="bold" text-anchor="middle" fill="white" font-family="sans-serif">${char}</text></svg>`;
}

/** A small triangle pointing up or down. */
export function arrow(up: boolean, fill: string): string {
  const d = up ? 'M12 4 L22 20 H2 Z' : 'M12 20 L22 4 H2 Z';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="${d}" fill="${fill}"/></svg>`;
}
