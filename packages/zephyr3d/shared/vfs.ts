// An in-memory VFS holding an example's generated files (runtimeOptions.VFS)
import { MemoryFS } from '@zephyr3d/base';

/** File contents by VFS path; promises (from png()) are awaited before writing. */
export type Files = Record<string, ArrayBuffer | string | Promise<ArrayBuffer | string>>;

/**
 * Builds a MemoryFS and writes `files` into it, creating their directories. Pass the
 * result as `runtimeOptions: { VFS }`, and resourceManager.fetchTexture('/textures/x.png')
 * and friends read from memory instead of the network.
 */
export async function memoryFiles(files: Files): Promise<MemoryFS> {
  const fs = new MemoryFS();
  await writeFiles(fs, files);
  return fs;
}

/** Writes files into an existing VFS, creating their directories. */
export async function writeFiles(fs: MemoryFS, files: Files): Promise<void> {
  for (const [path, data] of Object.entries(files)) {
    const dir = path.slice(0, path.lastIndexOf('/'));
    if (dir && !(await fs.exists(dir))) await fs.makeDirectory(dir, true);
    const body = await data;
    await fs.writeFile(path, body, { encoding: typeof body === 'string' ? 'utf8' : 'binary', create: true });
  }
}
