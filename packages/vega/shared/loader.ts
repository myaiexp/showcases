// An offline Vega loader: data/* URLs read the vendored files, any other request fails
import * as vega from 'vega';
import type { Loader } from 'vega';
import { dataText } from './data.ts';

/**
 * A `vega.loader()` whose `http` never touches the network. Specs keep the docs' own
 * `"url": "data/airports.csv"`: the loader answers from the bundled copy. Image marks and
 * href links get their URL from `sanitize`, so it lets data: and blob: URLs through and
 * rejects every remote one (examples draw their images in code).
 */
export function offlineLoader(): Loader {
  const base = vega.loader();
  const sanitize = base.sanitize.bind(base);
  base.http = async (uri: string) => {
    const text = await dataText(uri);
    if (text == null) throw new Error(`vega loader: ${uri} is not a vendored data file (no network here)`);
    return text;
  };
  base.sanitize = async (uri, options) => {
    if (/^(data|blob):/.test(uri)) return { href: uri };
    if (/^(https?:)?\/\//.test(uri)) throw new Error(`vega loader: remote URL refused: ${uri}`);
    return sanitize(uri, options);
  };
  return base;
}
