// Files with known first bytes, and a hex dump view that highlights them

export interface Sample {
  bytes: Uint8Array<ArrayBuffer>;
  /** How many leading bytes identify the file type. */
  magic: number;
  kind: string;
}

const text = (s: string): number[] => [...s].map((c) => c.charCodeAt(0));
const filler = (n: number): number[] => Array.from({ length: n }, (_, i) => (i * 37 + 11) & 0xff);

export const SAMPLES: Record<string, Sample> = {
  png: { bytes: Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, ...filler(24)]), magic: 8, kind: 'a PNG image (starts 89 50 4E 47)' },
  pdf: { bytes: Uint8Array.from([...text('%PDF-1.7\n'), ...filler(23)]), magic: 5, kind: 'a PDF document (starts "%PDF-")' },
};

const hex = (n: number): string => n.toString(16).padStart(2, '0');

/** Draws rows of 8 bytes into `parent`; the first `magic` bytes get a highlight. */
export function drawHex(parent: HTMLElement, bytes: Uint8Array, magic: number): void {
  parent.replaceChildren();
  for (let at = 0; at < bytes.length; at += 8) {
    const row = document.createElement('div');
    row.className = 'hex-row';
    const offset = document.createElement('span');
    offset.className = 'hex-off';
    offset.textContent = at.toString(16).padStart(4, '0');
    row.append(offset);
    let ascii = '';
    bytes.slice(at, at + 8).forEach((b, i) => {
      const cell = document.createElement('span');
      cell.className = at + i < magic ? 'hex-b hex-magic' : 'hex-b';
      cell.textContent = hex(b);
      row.append(cell);
      ascii += b >= 32 && b < 127 ? String.fromCharCode(b) : '.';
    });
    const chars = document.createElement('span');
    chars.className = 'hex-ascii';
    chars.textContent = ascii;
    row.append(chars);
    parent.append(row);
  }
}
