// Sample files built in code, so no example ever reads or sends a real file

/** A file of `size` bytes of filler, named `name`. Nothing is read from disk. */
export function makeFile(name: string, size: number, type: string): File {
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) bytes[i] = (i * 31) % 251;
  return new File([bytes], name, { type });
}

/** A text file holding `text`. */
export function textFile(name: string, text: string): File {
  return new File([text], name, { type: 'text/plain' });
}
