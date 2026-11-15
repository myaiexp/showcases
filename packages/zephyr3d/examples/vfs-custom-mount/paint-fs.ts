// A read-only VFS that has no files: it paints a PNG for whatever path is read
import { VFS, VFSError } from '@zephyr3d/base';
import type { FileMetadata, FileStat, ReadOptions } from '@zephyr3d/base';
import { brickHeight, checker, grey, normalsFrom, png, type Painter } from '../../shared/textures.ts';

/** Painters by file name; a trailing -N in the name sets the count, e.g. checker-8.png. */
function painterFor(name: string): Painter | null {
  const m = /^([a-z]+)(?:-(\d+))?\.png$/.exec(name);
  if (!m) return null;
  const n = Number(m[2] ?? 8);
  if (m[1] === 'checker') return checker(n);
  if (m[1] === 'stripes') return grey((u) => (Math.floor(u * n) % 2 ? 0.9 : 0.25));
  if (m[1] === 'bricks') return normalsFrom((u, v) => brickHeight(u, v, n, n / 2), 3);
  return null;
}

/**
 * Extends VFS by implementing its abstract methods, the way the docs' cached HTTP file
 * system does. Reads synthesise PNG bytes and are counted; everything else is read-only.
 */
export class PaintFS extends VFS {
  reads: string[] = [];
  constructor() {
    super(true);
  }
  protected async _readFile(path: string, _options?: ReadOptions): Promise<ArrayBuffer> {
    const paint = painterFor(path.slice(path.lastIndexOf('/') + 1));
    if (!paint) throw new VFSError('No such file', 'ENOENT', path);
    this.reads.push(path);
    return png(128, 128, paint);
  }
  protected async _exists(path: string): Promise<boolean> {
    return path === '/' || painterFor(path.slice(path.lastIndexOf('/') + 1)) !== null;
  }
  protected async _stat(path: string): Promise<FileStat> {
    if (!(await this._exists(path))) throw new VFSError('No such file', 'ENOENT', path);
    const now = new Date();
    return { size: 0, isFile: path !== '/', isDirectory: path === '/', created: now, modified: now };
  }
  protected async _readDirectory(): Promise<FileMetadata[]> {
    return [];
  }
  private refuse(): never {
    throw new VFSError('Read-only', 'EROFS');
  }
  protected async _makeDirectory(): Promise<void> {
    this.refuse();
  }
  protected async _deleteDirectory(): Promise<void> {
    this.refuse();
  }
  protected async _writeFile(): Promise<void> {
    this.refuse();
  }
  protected async _deleteFile(): Promise<void> {
    this.refuse();
  }
  protected async _deleteFileSystem(): Promise<void> {
    this.refuse();
  }
  protected async _wipe(): Promise<void> {
    this.refuse();
  }
  protected async _move(): Promise<void> {
    this.refuse();
  }
}
