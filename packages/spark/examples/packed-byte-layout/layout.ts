// DOM for the 16-byte table: coloured hex cells and decoded values
import type { PackedSplats } from '@sparkjsdev/spark';
import { utils } from '@sparkjsdev/spark';

interface Field {
  name: string;
  /** Byte offsets of this field inside the 16 bytes. */
  bytes: number[];
  color: string;
}

const FIELDS: Field[] = [
  { name: 'rgba', bytes: [0, 1, 2, 3], color: '#e5737f' },
  { name: 'center', bytes: [4, 5, 6, 7, 8, 9], color: '#5aa9e6' },
  { name: 'quaternion', bytes: [10, 11, 15], color: '#c07be0' },
  { name: 'scales', bytes: [12, 13, 14], color: '#7fc77f' },
];

const BYTE_NAMES = ['R', 'G', 'B', 'A', 'x lo', 'x hi', 'y lo', 'y hi', 'z lo', 'z hi', 'oct U', 'oct V', 'sx', 'sy', 'sz', 'angle'];
const fieldOf = (byte: number): Field => FIELDS.find((f) => f.bytes.includes(byte))!;
const hex = (n: number): string => n.toString(16).padStart(2, '0');
const fmt = (n: number): string => n.toFixed(4);

export interface LayoutView {
  /** Fills the cells and decoded rows for splat `index`. */
  show(splats: PackedSplats, index: number): { header: string };
}

export function createLayoutView(parent: HTMLElement): LayoutView {
  const cells = document.createElement('div');
  cells.style.cssText = 'display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:3px;width:100%;padding:10px 4px 0;font:11px/1.3 ui-monospace,monospace;text-align:center';
  const boxes = BYTE_NAMES.map((name, i) => {
    const box = document.createElement('div');
    const color = fieldOf(i).color;
    box.style.cssText = `border:1px solid ${color};border-radius:3px;padding:3px 0;color:${color}`;
    const off = document.createElement('div');
    off.style.cssText = 'font-size:9px;opacity:0.7';
    off.textContent = `${i} ${name}`;
    const value = document.createElement('div');
    value.style.cssText = 'font-size:14px;color:var(--fg-1)';
    box.append(off, value);
    cells.append(box);
    return value;
  });
  const table = document.createElement('div');
  table.style.cssText = 'display:grid;grid-template-columns:auto 1fr;gap:2px 14px;width:100%;padding:10px 4px 0;font:12px/1.4 ui-monospace,monospace';
  parent.append(cells, table);

  return {
    show(splats, index) {
      const arr = splats.packedArray!;
      const bytes = new Uint8Array(arr.buffer, arr.byteOffset + index * 16, 16);
      bytes.forEach((b, i) => (boxes[i]!.textContent = hex(b)));
      // The same decode the renderer does, on the same 16 bytes.
      const s = utils.unpackSplat(arr, index);
      const rows: [Field, string][] = [
        [FIELDS[0]!, `rgb ${s.color.r.toFixed(3)} ${s.color.g.toFixed(3)} ${s.color.b.toFixed(3)}, opacity ${s.opacity.toFixed(3)}   (uint8 / 255)`],
        [FIELDS[1]!, `xyz ${fmt(s.center.x)} ${fmt(s.center.y)} ${fmt(s.center.z)}   (3 x float16)`],
        [FIELDS[2]!, `xyzw ${fmt(s.quaternion.x)} ${fmt(s.quaternion.y)} ${fmt(s.quaternion.z)} ${fmt(s.quaternion.w)}   (octahedral axis + angle)`],
        [FIELDS[3]!, `xyz ${s.scales.x.toFixed(5)} ${s.scales.y.toFixed(5)} ${s.scales.z.toFixed(5)}   (log-encoded uint8)`],
      ];
      table.replaceChildren(
        ...rows.flatMap(([f, text]) => {
          const name = document.createElement('span');
          name.style.color = f.color;
          name.textContent = f.name;
          const val = document.createElement('span');
          val.textContent = text;
          return [name, val];
        }),
      );
      return { header: bytes.reduce((acc, b) => `${acc}${hex(b)} `, '') };
    },
  };
}
