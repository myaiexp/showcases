// Turns a parsed JSON value into indented lines that name each part's kind

/** One line per part: key, value and what kind of thing it is. */
export function describe(value: unknown, indent = 0, key = ''): string[] {
  const pad = '  '.repeat(indent);
  const label = key ? `${key}: ` : '';
  if (Array.isArray(value)) {
    return [`${pad}${label}list of ${value.length}`, ...value.flatMap((v, i) => describe(v, indent + 1, `[${i}]`))];
  }
  if (value && typeof value === 'object') {
    return [`${pad}${label}object`, ...Object.entries(value).flatMap(([k, v]) => describe(v, indent + 1, k))];
  }
  const kind = typeof value === 'string' ? 'text' : typeof value === 'number' ? 'number' : 'yes/no';
  return [`${pad}${label}${JSON.stringify(value)}  (${kind})`];
}
