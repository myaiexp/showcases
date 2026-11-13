// Turns a viewer.export() result into printable text, or an image
import type { HTMLPerspectiveViewerElement } from '@perspective-dev/viewer';

/** What viewer.export() resolves to; the package does not export this type by name. */
type ExportData = Awaited<ReturnType<HTMLPerspectiveViewerElement['export']>>;

/** Writes a description of `data` into `box`; a PNG Blob is shown as an image. */
export async function describe(method: string, data: ExportData, box: HTMLElement): Promise<void> {
  if (typeof data === 'string') {
    box.textContent = `${method} → string, ${data.length} chars\n\n${data.slice(0, 1500)}`;
  } else if (data instanceof ArrayBuffer) {
    const head = [...new Uint8Array(data, 0, Math.min(16, data.byteLength))].map((b) => b.toString(16).padStart(2, '0'));
    box.textContent = `${method} → ArrayBuffer, ${data.byteLength} bytes\nfirst bytes: ${head.join(' ')}`;
  } else if (data instanceof Blob) {
    box.textContent = `${method} → Blob ${data.type}, ${data.size} bytes\n\n`;
    // The "plugin" method renders a chart to PNG; the datagrid answers with text.
    if (data.type.startsWith('image/')) {
      const img = new Image();
      img.src = URL.createObjectURL(data);
      img.onload = () => URL.revokeObjectURL(img.src);
      img.style.maxWidth = '100%';
      box.append(img);
    } else {
      box.append((await data.text()).slice(0, 1500));
    }
  } else {
    box.textContent = `${method} → object\n\n${JSON.stringify(data, null, 2).slice(0, 1500)}`;
  }
}
