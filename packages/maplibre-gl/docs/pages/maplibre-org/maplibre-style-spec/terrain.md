<!-- source: https://maplibre.org/maplibre-style-spec/terrain/ -->

# Terrain¶

The terrain configuration.

```
"terrain": {"source": "raster-dem-source", "exaggeration": 0.5}
```

## source¶

*Required string.*

The source for the terrain data.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 2.2.0 | ❌ (#252) | ❌ (#252) |

## exaggeration¶

*Optional number in range `[0, ∞)`. Defaults to `1`.*

The exaggeration of the terrain - how high it will look.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 2.2.0 | ❌ (#252) | ❌ (#252) |
