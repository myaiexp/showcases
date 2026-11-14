// Draws small SVG pictures from code, so the example needs no image files

const SCENES = {
  sunrise: { sky: '#f7b267', sun: '#fff3b0', hill: '#3d5a40' },
  night: { sky: '#1b2a49', sun: '#e8e8f4', hill: '#0d1b2a' },
} as const;

export type SceneName = keyof typeof SCENES;

/** An SVG picture as text: a sky, a sun or moon, and a hill. */
export function sceneSvg(name: SceneName): string {
  const c = SCENES[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" viewBox="0 0 160 100">
<rect width="160" height="100" fill="${c.sky}"/><circle cx="110" cy="38" r="16" fill="${c.sun}"/>
<path d="M0 100 L0 70 Q50 40 100 72 T160 66 L160 100 Z" fill="${c.hill}"/></svg>`;
}
