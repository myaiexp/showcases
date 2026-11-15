// TileLayer and WMSTileLayer whose tile requests go to the pretend tile server
import { TileLayer, WMSTileLayer, type Coords } from 'leaflet';
import { serveTile } from './tile-server.ts';

/** Attribution for tiles the pretend server paints (Natural Earth land via world-atlas). */
export const LAND_ATTRIBUTION = 'Land: <a href="https://www.naturalearthdata.com/">Natural Earth</a>';

/**
 * A real `TileLayer`: Leaflet builds every tile URL from the template and options exactly as
 * usual (`{s}`, `{z}`, `{x}`, `{y}`, `{r}`, custom `{keys}`, `tms`, `zoomOffset`…), then the
 * pretend server answers that URL with a painted image. Use `https://tiles.example/{z}/{x}/{y}.png`
 * (XYZ), `https://tms.example/…` (TMS rows) and an optional style segment:
 * `https://tiles.example/{style}/{z}/{x}/{y}.png` with dark, light, terrain, vintage, night or grid.
 */
export class LocalTileLayer extends TileLayer {
  /** The URL Leaflet built for these tile coords: what a real server would receive. */
  requestUrl(coords: Coords): string {
    return super.getTileUrl(coords);
  }

  override getTileUrl(coords: Coords): string {
    return serveTile(super.getTileUrl(coords));
  }
}

/**
 * A real `WMSTileLayer` pointed at `https://wms.example/ows`. LAYERS picks from ocean, land,
 * coast, borders, graticule, labels and tilegrid; STYLES picks the look (dark, light, terrain,
 * vintage, night, grid); CRS EPSG:3857, EPSG:3395 and EPSG:4326 are served.
 */
export class LocalWMSTileLayer extends WMSTileLayer {
  /** The GetMap URL Leaflet built for these tile coords. */
  requestUrl(coords: Coords): string {
    return super.getTileUrl(coords);
  }

  override getTileUrl(coords: Coords): string {
    return serveTile(super.getTileUrl(coords));
  }
}
