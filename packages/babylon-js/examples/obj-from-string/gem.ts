// Hand-written Wavefront OBJ text: a coloured octahedron with no normals
const TOP = [0, 1.3, 0];
const BOTTOM = [0, -1.3, 0];
const RING: Array<{ p: [number, number, number]; c: [number, number, number] }> = [
  { p: [1, 0, 0], c: [1, 0.2, 0.2] },
  { p: [0, 0, 1], c: [0.2, 1, 0.3] },
  { p: [-1, 0, 0], c: [0.3, 0.4, 1] },
  { p: [0, 0, -1], c: [1, 0.9, 0.2] },
];

/** `v x y z r g b` lines carry vertex colours (an extension, not part of the OBJ format). */
export function gemObj(): string {
  const lines = ['# octahedron gem', 'o gem'];
  lines.push(`v ${TOP.join(' ')} 1 1 1`, `v ${BOTTOM.join(' ')} 0.2 0.2 0.25`);
  for (const { p, c } of RING) lines.push(`v ${p.join(' ')} ${c.join(' ')}`);
  // 1 = top, 2 = bottom, 3..6 = the ring. Counter-clockwise seen from outside.
  for (let i = 0; i < 4; i++) {
    const a = 3 + i;
    const b = 3 + ((i + 1) % 4);
    lines.push(`f 1 ${b} ${a}`, `f 2 ${a} ${b}`);
  }
  return lines.join('\n');
}
