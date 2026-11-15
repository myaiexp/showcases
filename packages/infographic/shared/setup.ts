// Page-wide setup, run once: local fonts and an offline icon/illustration loader
import { loadSVGResource, registerResourceLoader } from '@antv/infographic';
import { installLocalFonts } from './fonts.ts';
import { iconSvg, loadIcons } from './icons.ts';
import { illusSvg } from './illus.ts';

/** The config a resource loader receives (the library does not export the type). */
export type ResourceConfig = Parameters<Parameters<typeof registerResourceLoader>[0]>[0];
export type ResourceLoader = Parameters<typeof registerResourceLoader>[0];

/**
 * Answers any icon or illustration keyword from bundled art. It never returns null: the library
 * sends whatever a loader leaves unanswered to its online icon search.
 */
export function offlineResource(config: ResourceConfig): ReturnType<typeof loadSVGResource> {
  const keyword = String(config.data ?? '').trim() || 'shapes';
  return loadSVGResource(config.scene === 'illus' ? illusSvg(keyword) : iconSvg(keyword));
}

/** The gallery's page-wide loader. An example that registers its own restores this on cleanup. */
export function installOfflineLoader(): void {
  registerResourceLoader(async (config) => offlineResource(config));
}

let ready: Promise<void> | null = null;

/** Resolves once fonts and icons are local and the offline loader is registered. */
export function infographicReady(): Promise<void> {
  ready ??= Promise.all([installLocalFonts(), loadIcons()]).then(installOfflineLoader);
  return ready;
}
