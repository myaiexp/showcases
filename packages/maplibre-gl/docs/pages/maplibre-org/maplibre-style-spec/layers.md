<!-- source: https://maplibre.org/maplibre-style-spec/layers/ -->

# Layers¶

A style's

```
layers
```

property lists all the layers available in that style. The type of layer is specified by the

```
type
```

property, and must be one of

```
background
```

,

```
fill
```

,

```
line
```

,

```
symbol
```

,

```
raster
```

,

```
circle
```

,

```
fill-extrusion
```

,

```
heatmap
```

,

```
hillshade
```

,

```
color-relief
```

.

Except for layers of the

```
background
```

type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```
```
"layers": [
    {
        "id": "coastline",
        "source": "maplibre",
        "source-layer": "countries",
        "type": "line",
        "paint": {"line-color": "#198EC8"}
    }
]
```
```

## Layer Properties¶

### id¶

Required string.

Unique layer name.

### type¶

Required enum. Possible values:

```
fill
```

,

```
line
```

,

```
symbol
```

,

```
circle
```

,

```
heatmap
```

,

```
fill-extrusion
```

,

```
raster
```

,

```
hillshade
```

,

```
color-relief
```

,

```
background
```

.

Rendering type of this layer.

* ```
  fill
  ```

  : A filled polygon with an optional stroked border.
* ```
  line
  ```

  : A stroked line.
* ```
  symbol
  ```

  : An icon or a text label.
* ```
  circle
  ```

  : A filled circle.
* ```
  heatmap
  ```

  : A heatmap.
* ```
  fill-extrusion
  ```

  : An extruded (3D) polygon.
* ```
  raster
  ```

  : Raster map textures such as satellite imagery.
* ```
  hillshade
  ```

  : Client-side hillshading visualization based on DEM data. The implementation supports Mapbox Terrain RGB, Mapzen Terrarium tiles and custom encodings.
* ```
  color-relief
  ```

  : Client-side elevation coloring based on DEM data. The implementation supports Mapbox Terrain RGB, Mapzen Terrarium tiles and custom encodings.
* ```
  background
  ```

  : The background color or pattern of the map.

### metadata¶

Optional.

Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.

### source¶

Optional string.

Name of a source description to be used for this layer. Required for all layer types except

```
background
```

.

### source-layer¶

Optional string.

Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.

### minzoom¶

Optional number in range

```
[0, 24]
```

.

The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.

### maxzoom¶

Optional number in range

```
[0, 24]
```

.

The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.

### filter¶

Optional filter.

A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The

```
feature-state
```

expression is not supported in filter expressions.

### layout¶

Optional layout.

Layout properties for the layer.

### paint¶

Optional paint.

Default paint properties for this layer.

## Background¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### background-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Disabled by

```
background-pattern
```

. Supports interpolate expressions. Transitionable.

The color with which the background will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### background-pattern¶

Paint property. Optional resolvedImage. Transitionable.

Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | Not supported yet | Not supported yet | Not supported yet |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### background-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

The opacity at which the background will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Fill¶

### fill-sort-key¶

Layout property. Optional number.

Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 1.2.0 | 9.1.0 | 5.8.0 |
| data-driven styling | 1.2.0 | 9.1.0 | 5.8.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### fill-antialias¶

Paint property. Optional boolean. Defaults to

```
true
```

.

Whether or not the fill should be antialiased.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity of the entire fill layer. In contrast to the

```
fill-color
```

, this value will also affect the 1px stroke around the fill, if the stroke is used.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.21.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-layer-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

Opacity applied to the layer as a whole. Unlike

```
fill-opacity
```

and alpha values in

```
fill-color
```

, which are applied per feature and accumulate where fills overlap,

```
fill-layer-opacity
```

is applied once so overlapping fills appear as a single surface at the given opacity. When both

```
fill-opacity
```

and

```
fill-layer-opacity
```

are set, the per-feature, overlap accumulation is preserved, then

```
fill-layer-opacity
```

composites the result. This property affects only the layer it is set on and cannot be used to composite multiple layers together or control how this layer blends with layers above or below it.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 6.0.0 | ❌ (#4298) | ❌ (#4298) |
| ``` global-state ```  expression | 6.0.0 | ❌ (#4298) | ❌ (#4298) |

### fill-layer-blend¶

Paint property. Optional enum. Possible values:

```
normal
```

,

```
multiply
```

,

```
color
```

,

```
luminosity
```

,

```
plus-lighter
```

,

```
screen
```

,

```
overlay
```

. Defaults to

```
"normal"
```

.

Controls how the layer is composited with the content already rendered beneath it. Unlike per-feature opacity properties such as

```
fill-opacity
```

, this property affects the final composited layer output and determines how it interacts with the existing map contents.

* ```
  normal
  ```

  : Normal blending. The layer is drawn on top of existing content using standard alpha compositing.
* ```
  multiply
  ```

  : Multiply blending. The layer color is multiplied with the colors underneath, producing darker results. Useful for textures, hillshades, and combining raster and vector content.
* ```
  color
  ```

  : Color blending. Creates a color with the hue and saturation of the layer and the luminosity of the content underneath, preserving its gray levels. Useful for tinting monochrome content such as a hillshade.
* ```
  luminosity
  ```

  : Luminosity blending. Creates a color with the luminosity of the layer and the hue and saturation of the content underneath. The inverse of

  ```
  color
  ```

  .
* ```
  plus-lighter
  ```

  : Plus-lighter blending. Additive blending. The layer color is added to the colors underneath, producing brighter results. Useful for glow and heat accumulation effects.
* ```
  screen
  ```

  : Screen blending. The inverse of the colors is multiplied, producing lighter results. Useful for glow, heatmap, and light-based effects.
* ```
  overlay
  ```

  : Overlay blending. Multiplies or screens colors depending on the colors underneath, preserving highlights and shadows while adding contrast.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | ❌ (#48) | ❌ (#2963) | ❌ (#2963) |

### fill-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Supports feature-state and interpolate expressions. Transitionable.

The color of the filled part of this layer. This color can be specified as

```
rgba
```

with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used. When used with an SDF fill pattern, this serves as the foreground color of the pattern.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.19.0 | 5.0.0 | 3.5.0 |
| SDF fill pattern colorization | ❌ (#8342) | ❌ (#4526) | ❌ (#4526) |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-outline-color¶

Paint property. Optional color. Disabled by

```
fill-pattern
```

. Requires

```
fill-antialias
```

to be

```
true
```

. Supports feature-state and interpolate expressions. Transitionable.

The outline color of the fill. Matches the value of

```
fill-color
```

if unspecified.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.19.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Supports interpolate expressions. Transitionable.

The geometry's offset. Values are

```
[x, y]
```

where negatives indicate left and up, respectively.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
fill-translate
```

.

Controls the frame of reference for

```
fill-translate
```

.

* ```
  map
  ```

  : The fill is translated relative to the map.
* ```
  viewport
  ```

  : The fill is translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-pattern¶

Paint property. Optional resolvedImage. Transitionable.

Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.49.0 | 6.5.0 | 4.4.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Circle¶

### circle-sort-key¶

Layout property. Optional number.

Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 1.2.0 | 9.2.0 | 5.9.0 |
| data-driven styling | 1.2.0 | 9.2.0 | 5.9.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### circle-radius¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
5
```

. Supports feature-state and interpolate expressions. Transitionable.

Circle radius.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.18.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Supports feature-state and interpolate expressions. Transitionable.

The fill color of the circle.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.18.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-blur¶

Paint property. Optional number. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.20.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity at which the circle will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.20.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Supports interpolate expressions. Transitionable.

The geometry's offset. Values are

```
[x, y]
```

where negatives indicate left and up, respectively.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
circle-translate
```

.

Controls the frame of reference for

```
circle-translate
```

.

* ```
  map
  ```

  : The circle is translated relative to the map.
* ```
  viewport
  ```

  : The circle is translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-pitch-scale¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

.

Controls the scaling behavior of the circle when the map is pitched.

* ```
  map
  ```

  : Circles are scaled according to their apparent distance to the camera.
* ```
  viewport
  ```

  : Circles are not scaled.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.21.0 | 4.2.0 | 3.4.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-pitch-alignment¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"viewport"
```

.

Orientation of circle when map is pitched.

* ```
  map
  ```

  : The circle is aligned to the plane of the map.
* ```
  viewport
  ```

  : The circle is aligned to the plane of the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.39.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-stroke-width¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

The width of the circle's stroke. Strokes are placed outside of the

```
circle-radius
```

.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.29.0 | 5.0.0 | 3.5.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-stroke-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Supports feature-state and interpolate expressions. Transitionable.

The stroke color of the circle.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.29.0 | 5.0.0 | 3.5.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### circle-stroke-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity of the circle's stroke.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.29.0 | 5.0.0 | 3.5.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Heatmap¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### heatmap-radius¶

Paint property. Optional number in range

```
[1, ∞)
```

. Units in pixels. Defaults to

```
30
```

. Supports feature-state and interpolate expressions. Transitionable.

Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| data-driven styling | 0.43.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### heatmap-weight¶

Paint property. Optional number in range

```
[0, ∞)
```

. Defaults to

```
1
```

. Supports feature-state and interpolate expressions.

A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| data-driven styling | 0.41.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### heatmap-intensity¶

Paint property. Optional number in range

```
[0, ∞)
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

Similar to

```
heatmap-weight
```

but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### heatmap-color¶

Paint property. Optional color. Defaults to

```
["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
```

. Supports interpolate expressions.

Defines the color of each pixel based on its density value in a heatmap. Should be an expression that uses

```
["heatmap-density"]
```

as input.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| data-driven styling | Not supported yet | Not supported yet | Not supported yet |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### heatmap-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

The global opacity at which the heatmap layer will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.41.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Fill-extrusion¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### fill-extrusion-rounded-corner-distance¶

Layout property. Optional number in range

```
[0, ∞)
```

. Units in meters. Defaults to

```
0
```

.

The distance from each fill extrusion corner, measured along the adjacent edges, that is replaced by a rounded corner. A value of

```
0
```

disables rounded corners.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 6.2.0 | 13.4.0 | 6.28.0 |

### fill-extrusion-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-extrusion-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Disabled by

```
fill-extrusion-pattern
```

. Supports feature-state and interpolate expressions. Transitionable.

The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root

```
light
```

settings. If this color is specified as

```
rgba
```

with an alpha component, the alpha component will be ignored; use

```
fill-extrusion-opacity
```

to set layer opacity.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| data-driven styling | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |
| ``` elevation ```  expression | ❌ (#8799) | ❌ (#4787) | ❌ (#4787) |

### fill-extrusion-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Supports interpolate expressions. Transitionable.

The geometry's offset. Values are

```
[x, y]
```

where negatives indicate left and up (on the flat plane), respectively.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-extrusion-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
fill-extrusion-translate
```

.

Controls the frame of reference for

```
fill-extrusion-translate
```

.

* ```
  map
  ```

  : The fill extrusion is translated relative to the map.
* ```
  viewport
  ```

  : The fill extrusion is translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-extrusion-pattern¶

Paint property. Optional resolvedImage. Transitionable.

Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| data-driven styling | 0.49.0 | 6.5.0 | 4.4.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### fill-extrusion-height¶

Paint property. Optional number. Units in meters. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

The height with which to extrude this layer. Negative values extrude below ground level, so a floor that is entirely underground can be expressed.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| data-driven styling | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |
| negative values | ❌ (#8051) | ❌ (#4455) | ❌ (#4455) |

### fill-extrusion-base¶

Paint property. Optional number. Units in meters. Defaults to

```
0
```

. Requires

```
fill-extrusion-height
```

. Supports feature-state and interpolate expressions. Transitionable.

The height with which to extrude the base of this layer. Must be less than or equal to

```
fill-extrusion-height
```

. Negative values extrude below ground level, e.g. underground floors.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.27.0 | 5.1.0 | 3.6.0 |
| data-driven styling | 0.27.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |
| negative values | ❌ (#8051) | ❌ (#4455) | ❌ (#4455) |

### fill-extrusion-vertical-gradient¶

Paint property. Optional boolean. Defaults to

```
true
```

.

Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.50.0 | 7.0.0 | 4.7.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Line¶

### line-cap¶

Layout property. Optional enum. Possible values:

```
butt
```

,

```
round
```

,

```
square
```

. Defaults to

```
"butt"
```

.

The display of line endings.

* ```
  butt
  ```

  : A cap with a squared-off end which is drawn to the exact endpoint of the line.
* ```
  round
  ```

  : A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line.
* ```
  square
  ```

  : A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 5.22.0 | ❌ (#4194) | ❌ (#4194) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### line-join¶

Layout property. Optional enum. Possible values:

```
bevel
```

,

```
round
```

,

```
miter
```

. Defaults to

```
"miter"
```

.

The display of lines when joining.

* ```
  bevel
  ```

  : A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width.
* ```
  round
  ```

  : A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line.
* ```
  miter
  ```

  : A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.40.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### line-miter-limit¶

Layout property. Optional number. Defaults to

```
2
```

. Requires

```
line-join
```

to be

```
miter
```

. Supports interpolate expressions.

Used to automatically convert miter joins to bevel joins for sharp angles.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 5.22.0 | ❌ (#4194) | ❌ (#4194) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### line-round-limit¶

Layout property. Optional number. Defaults to

```
1.05
```

. Requires

```
line-join
```

to be

```
round
```

. Supports interpolate expressions.

Used to automatically convert round joins to miter joins for shallow angles.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 5.22.0 | ❌ (#4194) | ❌ (#4194) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### line-sort-key¶

Layout property. Optional number.

Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 1.2.0 | 9.1.0 | 5.8.0 |
| data-driven styling | 1.2.0 | 9.1.0 | 5.8.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### line-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity at which the line will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-layer-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

Opacity applied to the layer as a whole. Unlike

```
line-opacity
```

and alpha values in

```
line-color
```

, which are applied per feature and accumulate where lines overlap,

```
line-layer-opacity
```

is applied once so overlapping lines appear as a single surface at the given opacity. When both

```
line-opacity
```

and

```
line-layer-opacity
```

are set, the per-feature, overlap accumulation is preserved, then layer-opacity composites the result. This property affects only the layer it is set on and cannot be used to composite multiple layers together or control how this layer blends with layers above or below it.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 6.0.0 | ❌ (#4298) | ❌ (#4298) |
| ``` global-state ```  expression | 6.0.0 | ❌ (#4298) | ❌ (#4298) |

### line-layer-blend¶

Paint property. Optional enum. Possible values:

```
normal
```

,

```
multiply
```

,

```
color
```

,

```
luminosity
```

,

```
plus-lighter
```

,

```
screen
```

,

```
overlay
```

. Defaults to

```
"normal"
```

.

Controls how the layer is composited with the content already rendered beneath it. Unlike per-feature opacity properties such as

```
line-opacity
```

, this property affects the final composited layer output and determines how it interacts with the existing map contents.

* ```
  normal
  ```

  : Normal blending. The layer is drawn on top of existing content using standard alpha compositing.
* ```
  multiply
  ```

  : Multiply blending. The layer color is multiplied with the colors underneath, producing darker results. Useful for textures, hillshades, and combining raster and vector content.
* ```
  color
  ```

  : Color blending. Creates a color with the hue and saturation of the layer and the luminosity of the content underneath, preserving its gray levels. Useful for tinting monochrome content such as a hillshade.
* ```
  luminosity
  ```

  : Luminosity blending. Creates a color with the luminosity of the layer and the hue and saturation of the content underneath. The inverse of

  ```
  color
  ```

  .
* ```
  plus-lighter
  ```

  : Plus-lighter blending. Additive blending. The layer color is added to the colors underneath, producing brighter results. Useful for glow and heat accumulation effects.
* ```
  screen
  ```

  : Screen blending. The inverse of the colors is multiplied, producing lighter results. Useful for glow, heatmap, and light-based effects.
* ```
  overlay
  ```

  : Overlay blending. Multiplies or screens colors depending on the colors underneath, preserving highlights and shadows while adding contrast.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | ❌ (#48) | ❌ (#2963) | ❌ (#2963) |

### line-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Disabled by

```
line-pattern
```

. Supports feature-state and interpolate expressions. Transitionable.

The color with which the line will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.23.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Supports interpolate expressions. Transitionable.

The geometry's offset. Values are

```
[x, y]
```

where negatives indicate left and up, respectively.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
line-translate
```

.

Controls the frame of reference for

```
line-translate
```

.

* ```
  map
  ```

  : The line is translated relative to the map.
* ```
  viewport
  ```

  : The line is translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-width¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
1
```

. Supports feature-state and interpolate expressions. Transitionable.

Stroke thickness.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.39.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-gap-width¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-offset¶

Paint property. Optional number. Units in pixels. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.12.1 | 3.0.0 | 3.1.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-blur¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Supports feature-state and interpolate expressions. Transitionable.

Blur applied to the line, in pixels.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-dasharray¶

Paint property. Optional array in range

```
[0, ∞)
```

. Units in line widths. Disabled by

```
line-pattern
```

. Transitionable.

Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. GeoJSON sources with

```
lineMetrics: true
```

specified won't render dashed lines to the expected scale. Zoom-dependent expressions will be evaluated only at integer zoom levels. The only way to create an array value is using

```
["literal", [...]]
```

; arrays cannot be read from or derived from feature properties.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 5.8.0 | ❌ (#744) | ❌ (#744) |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-pattern¶

Paint property. Optional resolvedImage. Transitionable.

Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.49.0 | 6.5.0 | 4.4.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### line-gradient¶

Paint property. Optional color. Disabled by

```
line-dasharray
```

. Disabled by

```
line-pattern
```

. Requires source to be

```
geojson
```

. Supports interpolate expressions.

Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify

```
"lineMetrics": true
```

.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.45.0 | 6.5.0 | 4.4.0 |
| data-driven styling | Not supported yet | Not supported yet | Not supported yet |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Symbol¶

### symbol-placement¶

Layout property. Optional enum. Possible values:

```
point
```

,

```
line
```

,

```
line-center
```

. Defaults to

```
"point"
```

.

Label placement relative to its geometry.

* ```
  point
  ```

  : The label is placed at the point where the geometry is located.
* ```
  line
  ```

  : The label is placed along the line of the geometry. Can only be used on

  ```
  LineString
  ```

  and

  ```
  Polygon
  ```

  geometries.
* ```
  line-center
  ```

  : The label is placed at the center of the line of the geometry. Can only be used on

  ```
  LineString
  ```

  and

  ```
  Polygon
  ```

  geometries. Note that a single feature in a vector tile may contain multiple line geometries.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` line-center ```  value | 0.47.0 | 6.4.0 | 4.3.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### symbol-spacing¶

Layout property. Optional number in range

```
[1, ∞)
```

. Units in pixels. Defaults to

```
250
```

. Requires

```
symbol-placement
```

to be

```
line
```

. Supports interpolate expressions.

Distance between two symbol anchors.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### symbol-avoid-edges¶

Layout property. Optional boolean. Defaults to

```
false
```

.

If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer. When using a client that supports global collision detection, like MapLibre GL JS version 0.42.0 or greater, enabling this property is not needed to prevent clipped labels at tile boundaries.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### symbol-sort-key¶

Layout property. Optional number.

Sorts features in ascending order based on this value. Features with lower sort keys are drawn and placed first. When

```
icon-allow-overlap
```

or

```
text-allow-overlap
```

is

```
false
```

, features with a lower sort key will have priority during placement. When

```
icon-allow-overlap
```

or

```
text-allow-overlap
```

is set to

```
true
```

, features with a higher sort key will overlap over features with a lower sort key.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.53.0 | 7.4.0 | 4.11.0 |
| data-driven styling | 0.53.0 | 7.4.0 | 4.11.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### symbol-z-order¶

Layout property. Optional enum. Possible values:

```
auto
```

,

```
viewport-y
```

,

```
source
```

. Defaults to

```
"auto"
```

.

Determines whether overlapping symbols in the same layer are rendered in the order that they appear in the data source or by their y-position relative to the viewport. To control the order and prioritization of symbols otherwise, use

```
symbol-sort-key
```

.

* ```
  auto
  ```

  : Sorts symbols by

  ```
  symbol-sort-key
  ```

  if set. Otherwise, sorts symbols by their y-position relative to the viewport if

  ```
  icon-allow-overlap
  ```

  or

  ```
  text-allow-overlap
  ```

  is set to

  ```
  true
  ```

  or

  ```
  icon-ignore-placement
  ```

  or

  ```
  text-ignore-placement
  ```

  is

  ```
  false
  ```

  .
* ```
  viewport-y
  ```

  : Sorts symbols by their y-position relative to the viewport if

  ```
  icon-allow-overlap
  ```

  or

  ```
  text-allow-overlap
  ```

  is set to

  ```
  true
  ```

  or

  ```
  icon-ignore-placement
  ```

  or

  ```
  text-ignore-placement
  ```

  is

  ```
  false
  ```

  .
* ```
  source
  ```

  : Sorts symbols by

  ```
  symbol-sort-key
  ```

  if set. Otherwise, no sorting is applied; symbols are rendered in the same order as the source data.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.49.0 | 6.6.0 | 4.5.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-allow-overlap¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
icon-image
```

. Disabled by

```
icon-overlap
```

.

If true, the icon will be visible even if it collides with other previously drawn symbols.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-overlap¶

Layout property. Optional enum. Possible values:

```
never
```

,

```
always
```

,

```
cooperative
```

. Requires

```
icon-image
```

.

Allows for control over whether to show an icon when it overlaps other symbols on the map. If

```
icon-overlap
```

is not set,

```
icon-allow-overlap
```

is used instead.

* ```
  never
  ```

  : The icon will be hidden if it collides with any other previously drawn symbol.
* ```
  always
  ```

  : The icon will be visible even if it collides with any other previously drawn symbol.
* ```
  cooperative
  ```

  : If the icon collides with another previously drawn symbol, the overlap mode for that symbol is checked. If the previous symbol was placed using

  ```
  never
  ```

  overlap mode, the new icon is hidden. If the previous symbol was placed using

  ```
  always
  ```

  or

  ```
  cooperative
  ```

  overlap mode, the new icon is visible.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 2.1.0 | ❌ (#251) | ❌ (#251) |
| ``` global-state ```  expression | 5.7.0 | ❌ (#251) | ❌ (#251) |

### icon-ignore-placement¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
icon-image
```

.

If true, other symbols can be visible even if they collide with the icon.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-optional¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
icon-image
```

. Requires

```
text-field
```

.

If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-rotation-alignment¶

Layout property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

,

```
auto
```

. Defaults to

```
"auto"
```

. Requires

```
icon-image
```

.

In combination with

```
symbol-placement
```

, determines the rotation behavior of icons.

* ```
  map
  ```

  : When

  ```
  symbol-placement
  ```

  is set to

  ```
  point
  ```

  , aligns icons east-west. When

  ```
  symbol-placement
  ```

  is set to

  ```
  line
  ```

  or

  ```
  line-center
  ```

  , aligns icon x-axes with the line.
* ```
  viewport
  ```

  : Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of

  ```
  symbol-placement
  ```

  .
* ```
  auto
  ```

  : When

  ```
  symbol-placement
  ```

  is set to

  ```
  point
  ```

  , this is equivalent to

  ```
  viewport
  ```

  . When

  ```
  symbol-placement
  ```

  is set to

  ```
  line
  ```

  or

  ```
  line-center
  ```

  , this is equivalent to

  ```
  map
  ```

  .

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | ❌ (#3461) | ❌ (#4517) | ❌ (#4517) |
| ``` auto ```  value | 0.25.0 | 4.2.0 | 3.4.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-size¶

Layout property. Optional number in range

```
[0, ∞)
```

. Units in factor of the original icon size. Defaults to

```
1
```

. Requires

```
icon-image
```

. Supports interpolate expressions.

Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by

```
icon-size
```

. 1 is the original size; 3 triples the size of the image.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.35.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-text-fit¶

Layout property. Optional enum. Possible values:

```
none
```

,

```
width
```

,

```
height
```

,

```
both
```

. Defaults to

```
"none"
```

. Requires

```
icon-image
```

. Requires

```
text-field
```

.

Scales the icon to fit around the associated text.

* ```
  none
  ```

  : The icon is displayed at its intrinsic aspect ratio.
* ```
  width
  ```

  : The icon is scaled in the x-dimension to fit the width of the text.
* ```
  height
  ```

  : The icon is scaled in the y-dimension to fit the height of the text.
* ```
  both
  ```

  : The icon is scaled in both x- and y-dimensions.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.21.0 | 4.2.0 | 3.4.0 |
| stretchable icons | 1.6.0 | 9.2.0 | 5.8.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-text-fit-padding¶

Layout property. Optional array. Units in pixels. Defaults to

```
[0,0,0,0]
```

. Requires

```
icon-image
```

. Requires

```
text-field
```

. Requires

```
icon-text-fit
```

to be one of

```
both
```

,

```
width
```

,

```
height
```

. Supports interpolate expressions.

Size of the additional area added to dimensions determined by

```
icon-text-fit
```

, in clockwise order: top, right, bottom, left.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.21.0 | 4.2.0 | 3.4.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-image¶

Layout property. Optional resolvedImage.

Name of image in sprite to use for drawing an image background.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.35.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-rotate¶

Layout property. Optional number. Units in degrees. Defaults to

```
0
```

. Requires

```
icon-image
```

. Supports interpolate expressions.

Rotates the icon clockwise.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.21.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-padding¶

Layout property. Optional padding. Units in pixels. Defaults to

```
[2]
```

. Requires

```
icon-image
```

. Supports interpolate expressions.

Size of additional area round the icon bounding box used for detecting symbol collisions.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 2.2.0 | ❌ (#2754) | ❌ (#2754) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-keep-upright¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
icon-image
```

. Requires

```
icon-rotation-alignment
```

to be

```
map
```

. Requires

```
symbol-placement
```

to be one of

```
line
```

,

```
line-center
```

.

If true, the icon may be flipped to prevent it from being rendered upside-down.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-offset¶

Layout property. Optional array. Defaults to

```
[0,0]
```

. Requires

```
icon-image
```

. Supports interpolate expressions.

Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of

```
icon-size
```

to obtain the final offset in pixels. When combined with

```
icon-rotate
```

the offset will be as if the rotated direction was up.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.29.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-anchor¶

Layout property. Optional enum. Possible values:

```
center
```

,

```
left
```

,

```
right
```

,

```
top
```

,

```
bottom
```

,

```
top-left
```

,

```
top-right
```

,

```
bottom-left
```

,

```
bottom-right
```

. Defaults to

```
"center"
```

. Requires

```
icon-image
```

.

Part of the icon placed closest to the anchor.

* ```
  center
  ```

  : The center of the icon is placed closest to the anchor.
* ```
  left
  ```

  : The left side of the icon is placed closest to the anchor.
* ```
  right
  ```

  : The right side of the icon is placed closest to the anchor.
* ```
  top
  ```

  : The top of the icon is placed closest to the anchor.
* ```
  bottom
  ```

  : The bottom of the icon is placed closest to the anchor.
* ```
  top-left
  ```

  : The top left corner of the icon is placed closest to the anchor.
* ```
  top-right
  ```

  : The top right corner of the icon is placed closest to the anchor.
* ```
  bottom-left
  ```

  : The bottom left corner of the icon is placed closest to the anchor.
* ```
  bottom-right
  ```

  : The bottom right corner of the icon is placed closest to the anchor.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.40.0 | 5.2.0 | 3.7.0 |
| data-driven styling | 0.40.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### icon-pitch-alignment¶

Layout property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

,

```
auto
```

. Defaults to

```
"auto"
```

. Requires

```
icon-image
```

.

Orientation of icon when map is pitched.

* ```
  map
  ```

  : The icon is aligned to the plane of the map.
* ```
  viewport
  ```

  : The icon is aligned to the plane of the viewport.
* ```
  auto
  ```

  : Automatically matches the value of

  ```
  icon-rotation-alignment
  ```

  .

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.39.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-pitch-alignment¶

Layout property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

,

```
auto
```

. Defaults to

```
"auto"
```

. Requires

```
text-field
```

.

Orientation of text when map is pitched.

* ```
  map
  ```

  : The text is aligned to the plane of the map.
* ```
  viewport
  ```

  : The text is aligned to the plane of the viewport.
* ```
  auto
  ```

  : Automatically matches the value of

  ```
  text-rotation-alignment
  ```

  .

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.21.0 | 4.2.0 | 3.4.0 |
| ``` auto ```  value | 0.25.0 | 4.2.0 | 3.4.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-rotation-alignment¶

Layout property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

,

```
viewport-glyph
```

,

```
auto
```

. Defaults to

```
"auto"
```

. Requires

```
text-field
```

.

In combination with

```
symbol-placement
```

, determines the rotation behavior of the individual glyphs forming the text.

* ```
  map
  ```

  : When

  ```
  symbol-placement
  ```

  is set to

  ```
  point
  ```

  , aligns text east-west. When

  ```
  symbol-placement
  ```

  is set to

  ```
  line
  ```

  or

  ```
  line-center
  ```

  , aligns text x-axes with the line.
* ```
  viewport
  ```

  : Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of

  ```
  symbol-placement
  ```

  .
* ```
  viewport-glyph
  ```

  : When

  ```
  symbol-placement
  ```

  is set to

  ```
  point
  ```

  , aligns text to the x-axis of the viewport. When

  ```
  symbol-placement
  ```

  is set to

  ```
  line
  ```

  or

  ```
  line-center
  ```

  , aligns glyphs to the x-axis of the viewport and places them along the line.
* ```
  auto
  ```

  : When

  ```
  symbol-placement
  ```

  is set to

  ```
  point
  ```

  , this is equivalent to

  ```
  viewport
  ```

  . When

  ```
  symbol-placement
  ```

  is set to

  ```
  line
  ```

  or

  ```
  line-center
  ```

  , this is equivalent to

  ```
  map
  ```

  .

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` auto ```  value | 0.25.0 | 4.2.0 | 3.4.0 |
| ``` viewport-glyph ```  value | 2.1.8 | ❌ (#250) | ❌ (#250) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-field¶

Layout property. Optional formatted. Defaults to

```
""
```

.

Value to use for a text label. If a plain

```
string
```

is provided, it will be treated as a

```
formatted
```

with default/inherited formatting options.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-font¶

Layout property. Optional array. Defaults to

```
["Open Sans Regular","Arial Unicode MS Regular"]
```

. Requires

```
text-field
```

.

Fonts to use for displaying text. If the

```
glyphs
```

root property is specified, this array is joined together and interpreted as a font stack name. Otherwise, it is interpreted as a cascading fallback list of local font names.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.43.0 | 6.0.0 | 4.0.0 |
| local fonts | ❌ (#3302) | ❌ (#165) | ❌ (#165) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-size¶

Layout property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
16
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Font size.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.35.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-max-width¶

Layout property. Optional number in range

```
[0, ∞)
```

. Units in ems. Defaults to

```
10
```

. Requires

```
text-field
```

. Supports interpolate expressions.

The maximum line width for text wrapping.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.40.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-line-height¶

Layout property. Optional number. Units in ems. Defaults to

```
1.2
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Text leading value for multi-line text.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-letter-spacing¶

Layout property. Optional number. Units in ems. Defaults to

```
0
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Text tracking amount.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.40.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-justify¶

Layout property. Optional enum. Possible values:

```
auto
```

,

```
left
```

,

```
center
```

,

```
right
```

. Defaults to

```
"center"
```

. Requires

```
text-field
```

.

Text justification options.

* ```
  auto
  ```

  : The text is aligned towards the anchor position.
* ```
  left
  ```

  : The text is aligned to the left.
* ```
  center
  ```

  : The text is centered.
* ```
  right
  ```

  : The text is aligned to the right.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.39.0 | 5.2.0 | 3.7.0 |
| auto | 0.54.0 | 7.4.0 | 4.10.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-radial-offset¶

Layout property. Optional number. Units in ems. Defaults to

```
0
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Radial offset of text, in the direction of the symbol's anchor. Useful in combination with

```
text-variable-anchor
```

, which defaults to using the two-dimensional

```
text-offset
```

if present.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.54.0 | 7.4.0 | 4.10.0 |
| data-driven styling | 0.54.0 | 7.4.0 | 4.10.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-variable-anchor¶

Layout property. Optional array. Requires

```
text-field
```

. Requires

```
symbol-placement
```

to be

```
point
```

.

To increase the chance of placing high-priority labels on the map, you can provide an array of

```
text-anchor
```

locations: the renderer will attempt to place the label at each location, in order, before moving onto the next label. Use

```
text-justify: auto
```

to choose justification based on anchor position. To apply an offset, use the

```
text-radial-offset
```

or the two-dimensional

```
text-offset
```

.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.54.0 | 7.4.0 | 4.10.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-variable-anchor-offset¶

Layout property. Optional. Requires

```
text-field
```

. Requires

```
symbol-placement
```

to be

```
point
```

. Supports interpolate expressions.

To increase the chance of placing high-priority labels on the map, you can provide an array of

```
text-anchor
```

locations, each paired with an offset value. The renderer will attempt to place the label at each location, in order, before moving on to the next location+offset. Use

```
text-justify: auto
```

to choose justification based on anchor position.

The length of the array must be even, and must alternate between enum and point entries. i.e., each anchor location must be accompanied by a point, and that point defines the offset when the corresponding anchor location is used. Positive offset values indicate right and down, while negative values indicate left and up. Anchor locations may repeat, allowing the renderer to try multiple offsets to try and place a label using the same anchor.

When present, this property takes precedence over

```
text-anchor
```

,

```
text-variable-anchor
```

,

```
text-offset
```

, and

```
text-radial-offset
```

.

When the renderer chooses the

```
top
```

anchor,

```
[0, 4]
```

will be used for

```
text-offset
```

; the text will be shifted down by 4 ems.

When the renderer chooses the

```
left
```

anchor,

```
[3, 0]
```

will be used for

```
text-offset
```

; the text will be shifted right by 3 ems.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 3.3.0 | 11.6.0 | 6.8.0 |
| data-driven styling | 3.3.0 | ❌ (#2358) | ❌ (#2358) |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-anchor¶

Layout property. Optional enum. Possible values:

```
center
```

,

```
left
```

,

```
right
```

,

```
top
```

,

```
bottom
```

,

```
top-left
```

,

```
top-right
```

,

```
bottom-left
```

,

```
bottom-right
```

. Defaults to

```
"center"
```

. Requires

```
text-field
```

. Disabled by

```
text-variable-anchor
```

.

Part of the text placed closest to the anchor.

* ```
  center
  ```

  : The center of the text is placed closest to the anchor.
* ```
  left
  ```

  : The left side of the text is placed closest to the anchor.
* ```
  right
  ```

  : The right side of the text is placed closest to the anchor.
* ```
  top
  ```

  : The top of the text is placed closest to the anchor.
* ```
  bottom
  ```

  : The bottom of the text is placed closest to the anchor.
* ```
  top-left
  ```

  : The top left corner of the text is placed closest to the anchor.
* ```
  top-right
  ```

  : The top right corner of the text is placed closest to the anchor.
* ```
  bottom-left
  ```

  : The bottom left corner of the text is placed closest to the anchor.
* ```
  bottom-right
  ```

  : The bottom right corner of the text is placed closest to the anchor.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.39.0 | 5.2.0 | 3.7.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-max-angle¶

Layout property. Optional number. Units in degrees. Defaults to

```
45
```

. Requires

```
text-field
```

. Requires

```
symbol-placement
```

to be one of

```
line
```

,

```
line-center
```

. Supports interpolate expressions.

Maximum angle change between adjacent characters.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-writing-mode¶

Layout property. Optional array. Requires

```
text-field
```

. Requires

```
symbol-placement
```

to be

```
point
```

.

The property allows control over a symbol's orientation. Note that the property values act as a hint, so that a symbol whose language doesn’t support the provided orientation will be laid out in its natural orientation. Example: English point symbol will be rendered horizontally even if array value contains single 'vertical' enum value. The order of elements in an array define priority order for the placement of an orientation variant.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 1.3.0 | 8.3.0 | 5.3.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-rotate¶

Layout property. Optional number. Units in degrees. Defaults to

```
0
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Rotates the text clockwise.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.35.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-padding¶

Layout property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
2
```

. Requires

```
text-field
```

. Supports interpolate expressions.

Size of the additional area around the text bounding box used for detecting symbol collisions.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-keep-upright¶

Layout property. Optional boolean. Defaults to

```
true
```

. Requires

```
text-field
```

. Requires

```
text-rotation-alignment
```

to be

```
map
```

. Requires

```
symbol-placement
```

to be one of

```
line
```

,

```
line-center
```

.

If true, the text may be flipped vertically to prevent it from being rendered upside-down.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-transform¶

Layout property. Optional enum. Possible values:

```
none
```

,

```
uppercase
```

,

```
lowercase
```

. Defaults to

```
"none"
```

. Requires

```
text-field
```

.

Specifies how to capitalize text, similar to the CSS

```
text-transform
```

property.

* ```
  none
  ```

  : The text is not altered.
* ```
  uppercase
  ```

  : Forces all letters to be displayed in uppercase.
* ```
  lowercase
  ```

  : Forces all letters to be displayed in lowercase.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-offset¶

Layout property. Optional array. Units in ems. Defaults to

```
[0,0]
```

. Requires

```
text-field
```

. Disabled by

```
text-radial-offset
```

. Supports interpolate expressions.

Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up. If used with text-variable-anchor, input values will be taken as absolute values. Offsets along the x- and y-axis will be applied automatically based on the anchor position.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.35.0 | 5.1.0 | 3.6.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-allow-overlap¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
text-field
```

. Disabled by

```
text-overlap
```

.

If true, the text will be visible even if it collides with other previously drawn symbols.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-overlap¶

Layout property. Optional enum. Possible values:

```
never
```

,

```
always
```

,

```
cooperative
```

. Requires

```
text-field
```

.

Allows for control over whether to show symbol text when it overlaps other symbols on the map. If

```
text-overlap
```

is not set,

```
text-allow-overlap
```

is used instead

* ```
  never
  ```

  : The text will be hidden if it collides with any other previously drawn symbol.
* ```
  always
  ```

  : The text will be visible even if it collides with any other previously drawn symbol.
* ```
  cooperative
  ```

  : If the text collides with another previously drawn symbol, the overlap mode for that symbol is checked. If the previous symbol was placed using

  ```
  never
  ```

  overlap mode, the new text is hidden. If the previous symbol was placed using

  ```
  always
  ```

  or

  ```
  cooperative
  ```

  overlap mode, the new text is visible.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 2.1.0 | ❌ (#251) | ❌ (#251) |
| ``` global-state ```  expression | 5.7.0 | ❌ (#251) | ❌ (#251) |

### text-ignore-placement¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
text-field
```

.

If true, other symbols can be visible even if they collide with the text.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### text-optional¶

Layout property. Optional boolean. Defaults to

```
false
```

. Requires

```
text-field
```

. Requires

```
icon-image
```

.

If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.7.0 | 13.7.1 | 7.0.0 |

### symbol-height-offset¶

Layout property. Optional number. Units in meters. Defaults to

```
0
```

. Requires

```
symbol-placement
```

to be

```
point
```

. Supports interpolate expressions.

The height above the anchor, in meters, at which the symbol is placed. Use

```
symbol-height-anchor
```

to control what this height is measured from.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 6.6.0 | ❌ (#1929) | ❌ (#1929) |
| data-driven styling | 6.6.0 | ❌ (#1929) | ❌ (#1929) |

### symbol-height-anchor¶

Layout property. Optional enum. Possible values:

```
ground
```

,

```
absolute
```

. Defaults to

```
"ground"
```

. Requires

```
symbol-height-offset
```

.

Defines what

```
symbol-height-offset
```

is measured from.

* ```
  ground
  ```

  :

  ```
  symbol-height-offset
  ```

  is measured from the ground below the symbol, i.e. the terrain elevation at the symbol's location, or zero when terrain is not enabled.
* ```
  absolute
  ```

  :

  ```
  symbol-height-offset
  ```

  is measured from sea level, ignoring the terrain elevation at the symbol's location.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | ❌ (#644) | ❌ (#1929) | ❌ (#1929) |

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### icon-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Requires

```
icon-image
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity at which the icon will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Requires

```
icon-image
```

. Supports feature-state and interpolate expressions. Transitionable.

The color of the icon. This can only be used with SDF icons.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-halo-color¶

Paint property. Optional color. Defaults to

```
"rgba(0, 0, 0, 0)"
```

. Requires

```
icon-image
```

. Supports feature-state and interpolate expressions. Transitionable.

The color of the icon's halo. Icon halos can only be used with SDF icons.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-halo-width¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Requires

```
icon-image
```

. Supports feature-state and interpolate expressions. Transitionable.

Distance of halo to the icon outline.

The unit is in pixels only for SDF sprites that were created with a blur radius of 8, multiplied by the display density. I.e., the radius needs to be 16 for

```
@2x
```

sprites, etc.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-halo-blur¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Requires

```
icon-image
```

. Supports feature-state and interpolate expressions. Transitionable.

Fade out the halo towards the outside.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Requires

```
icon-image
```

. Supports interpolate expressions. Transitionable.

Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### icon-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
icon-image
```

. Requires

```
icon-translate
```

.

Controls the frame of reference for

```
icon-translate
```

.

* ```
  map
  ```

  : Icons are translated relative to the map.
* ```
  viewport
  ```

  : Icons are translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Requires

```
text-field
```

. Supports feature-state and interpolate expressions. Transitionable.

The opacity at which the text will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Requires

```
text-field
```

. Supports feature-state and interpolate expressions. Transitionable.

The color with which the text will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-halo-color¶

Paint property. Optional color. Defaults to

```
"rgba(0, 0, 0, 0)"
```

. Requires

```
text-field
```

. Supports feature-state and interpolate expressions. Transitionable.

The color of the text's halo, which helps it stand out from backgrounds.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-halo-width¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Requires

```
text-field
```

. Supports feature-state and interpolate expressions. Transitionable.

Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-halo-blur¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in pixels. Defaults to

```
0
```

. Requires

```
text-field
```

. Supports feature-state and interpolate expressions. Transitionable.

The halo's fadeout distance towards the outside.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| data-driven styling | 0.33.0 | 5.0.0 | 3.5.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-translate¶

Paint property. Optional array. Units in pixels. Defaults to

```
[0,0]
```

. Requires

```
text-field
```

. Supports interpolate expressions. Transitionable.

Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### text-translate-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"map"
```

. Requires

```
text-field
```

. Requires

```
text-translate
```

.

Controls the frame of reference for

```
text-translate
```

.

* ```
  map
  ```

  : The text is translated relative to the map.
* ```
  viewport
  ```

  : The text is translated relative to the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Raster¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### raster-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

The opacity at which the image will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-layer-blend¶

Paint property. Optional enum. Possible values:

```
normal
```

,

```
multiply
```

,

```
color
```

,

```
luminosity
```

,

```
plus-lighter
```

,

```
screen
```

,

```
overlay
```

. Defaults to

```
"normal"
```

.

Controls how the layer is composited with the content already rendered beneath it. Unlike

```
raster-opacity
```

, which only fades the layer, this property determines how its colors interact with the existing map contents.

* ```
  normal
  ```

  : Normal blending. The layer is drawn on top of existing content using standard alpha compositing.
* ```
  multiply
  ```

  : Multiply blending. The layer color is multiplied with the colors underneath, producing darker results. Useful for textures, hillshades, and combining raster and vector content.
* ```
  color
  ```

  : Color blending. Creates a color with the hue and saturation of the layer and the luminosity of the content underneath, preserving its gray levels. Useful for tinting monochrome content such as a hillshade.
* ```
  luminosity
  ```

  : Luminosity blending. Creates a color with the luminosity of the layer and the hue and saturation of the content underneath. The inverse of

  ```
  color
  ```

  .
* ```
  plus-lighter
  ```

  : Plus-lighter blending. Additive blending. The layer color is added to the colors underneath, producing brighter results. Useful for glow and heat accumulation effects.
* ```
  screen
  ```

  : Screen blending. The inverse of the colors is multiplied, producing lighter results. Useful for glow, heatmap, and light-based effects.
* ```
  overlay
  ```

  : Overlay blending. Multiplies or screens colors depending on the colors underneath, preserving highlights and shadows while adding contrast.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | ❌ (#48) | ❌ (#2963) | ❌ (#2963) |

### raster-hue-rotate¶

Paint property. Optional number. Units in degrees. Defaults to

```
0
```

. Supports interpolate expressions. Transitionable.

Rotates hues around the color wheel.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-brightness-min¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
0
```

. Supports interpolate expressions. Transitionable.

Increase or reduce the brightness of the image. The value is the minimum brightness.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-brightness-max¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

Increase or reduce the brightness of the image. The value is the maximum brightness.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-saturation¶

Paint property. Optional number in range

```
[-1, 1]
```

. Defaults to

```
0
```

. Supports interpolate expressions. Transitionable.

Increase or reduce the saturation of the image.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-contrast¶

Paint property. Optional number in range

```
[-1, 1]
```

. Defaults to

```
0
```

. Supports interpolate expressions. Transitionable.

Increase or reduce the contrast of the image.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### resampling¶

Paint property. Optional enum. Possible values:

```
linear
```

,

```
nearest
```

. Defaults to

```
"linear"
```

.

The resampling/interpolation method to use for overscaling, also known as texture magnification filter.

* ```
  linear
  ```

  : (Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled
* ```
  nearest
  ```

  : Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.20.0 | ❌ (#4117) | ❌ (#4117) |
| ``` global-state ```  expression | 5.6.0 | ❌ (#4117) | ❌ (#4117) |

### raster-resampling¶

Paint property. Optional enum. Possible values:

```
linear
```

,

```
nearest
```

. Defaults to

```
"linear"
```

.

The resampling/interpolation method to use for overscaling, also known as texture magnification filter. It is advised to use the generic

```
resampling
```

paint property instead.

* ```
  linear
  ```

  : (Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled
* ```
  nearest
  ```

  : Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.47.0 | 6.3.0 | 4.2.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### raster-fade-duration¶

Paint property. Optional number in range

```
[0, ∞)
```

. Units in milliseconds. Defaults to

```
300
```

. Supports interpolate expressions.

Fade duration when a new tile is added, or when a video is started or its coordinates are updated.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.10.0 | 2.0.1 | 2.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

## Hillshade¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### hillshade-illumination-direction¶

Paint property. Optional numberArray with value(s) in range

```
[0, 359]
```

. Defaults to

```
335
```

. Supports interpolate expressions.

The direction of the light source(s) used to generate the hillshading with 0 as the top of the viewport if

```
hillshade-illumination-anchor
```

is set to

```
viewport
```

and due north if

```
hillshade-illumination-anchor
```

is set to

```
map
```

. Only when

```
hillshade-method
```

is set to

```
multidirectional
```

can you specify multiple light sources.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| multidirectional | 5.5.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-illumination-altitude¶

Paint property. Optional numberArray with value(s) in range

```
[0, 90]
```

. Defaults to

```
45
```

. Supports interpolate expressions.

The altitude of the light source(s) used to generate the hillshading with 0 as sunset and 90 as noon. Only when

```
hillshade-method
```

is set to

```
multidirectional
```

can you specify multiple light sources.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.5.0 | 13.0.0 | 6.24.0 |
| multidirectional | 5.5.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-illumination-anchor¶

Paint property. Optional enum. Possible values:

```
map
```

,

```
viewport
```

. Defaults to

```
"viewport"
```

.

Direction of light source when map is rotated.

* ```
  map
  ```

  : The hillshade illumination is relative to the north direction.
* ```
  viewport
  ```

  : The hillshade illumination is relative to the top of the viewport.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-exaggeration¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
0.5
```

. Supports interpolate expressions. Transitionable.

Intensity of the hillshade

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-shadow-color¶

Paint property. Optional colorArray. Defaults to

```
"#000000"
```

. Supports interpolate expressions. Transitionable.

The shading color of areas that face away from the light source(s). Only when

```
hillshade-method
```

is set to

```
multidirectional
```

can you specify multiple light sources.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| multidirectional | 5.5.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-highlight-color¶

Paint property. Optional colorArray. Defaults to

```
"#FFFFFF"
```

. Supports interpolate expressions. Transitionable.

The shading color of areas that faces towards the light source(s). Only when

```
hillshade-method
```

is set to

```
multidirectional
```

can you specify multiple light sources.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| multidirectional | 5.5.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-accent-color¶

Paint property. Optional color. Defaults to

```
"#000000"
```

. Supports interpolate expressions. Transitionable.

The shading color used to accentuate rugged terrain like sharp cliffs and gorges.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 0.43.0 | 6.0.0 | 4.0.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### hillshade-method¶

Paint property. Optional enum. Possible values:

```
standard
```

,

```
basic
```

,

```
combined
```

,

```
igor
```

,

```
multidirectional
```

. Defaults to

```
"standard"
```

.

The hillshade algorithm to use, one of

```
standard
```

,

```
basic
```

,

```
combined
```

,

```
igor
```

, or

```
multidirectional
```

.

* ```
  standard
  ```

  : The legacy hillshade method.
* ```
  basic
  ```

  : Basic hillshade. Uses a simple physics model where the reflected light intensity is proportional to the cosine of the angle between the incident light and the surface normal. Similar to GDAL's

  ```
  gdaldem
  ```

  default algorithm.
* ```
  combined
  ```

  : Hillshade algorithm whose intensity scales with slope. Similar to GDAL's

  ```
  gdaldem
  ```

  with

  ```
  -combined
  ```

  option.
* ```
  igor
  ```

  : Hillshade algorithm which tries to minimize effects on other map features beneath. Similar to GDAL's

  ```
  gdaldem
  ```

  with

  ```
  -igor
  ```

  option.
* ```
  multidirectional
  ```

  : Hillshade with multiple illumination directions. Uses the basic hillshade model with multiple independent light sources.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.5.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### resampling¶

Paint property. Optional enum. Possible values:

```
linear
```

,

```
nearest
```

. Defaults to

```
"linear"
```

.

The resampling/interpolation method to use for overscaling, also known as texture magnification filter.

* ```
  linear
  ```

  : (Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled
* ```
  nearest
  ```

  : Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.20.0 | ❌ (#4117) | ❌ (#4117) |
| ``` global-state ```  expression | 5.6.0 | ❌ (#4117) | ❌ (#4117) |

## Color-relief¶

### visibility¶

Layout property. Optional enum. Possible values:

```
visible
```

,

```
none
```

. Defaults to

```
"visible"
```

.

Whether this layer is displayed.

* ```
  visible
  ```

  : The layer is shown.
* ```
  none
  ```

  : The layer is not shown.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.6.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.16.0 | 13.7.1 | 7.0.0 |

### color-relief-opacity¶

Paint property. Optional number in range

```
[0, 1]
```

. Defaults to

```
1
```

. Supports interpolate expressions. Transitionable.

The opacity at which the color-relief will be drawn.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.6.0 | 13.0.0 | 6.24.0 |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### color-relief-color¶

Paint property. Optional color. Supports interpolate expressions.

Defines the color of each pixel based on its elevation. Should be an expression that uses the

```
elevation
```

expression as input.

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.6.0 | 13.0.0 | 6.24.0 |
| data-driven styling | Not supported yet | Not supported yet | Not supported yet |
| ``` global-state ```  expression | 5.6.0 | 13.7.1 | 7.0.0 |

### resampling¶

Paint property. Optional enum. Possible values:

```
linear
```

,

```
nearest
```

. Defaults to

```
"linear"
```

.

The resampling/interpolation method to use for overscaling, also known as texture magnification filter.

* ```
  linear
  ```

  : (Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled
* ```
  nearest
  ```

  : Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.20.0 | ❌ (#4117) | ❌ (#4117) |
| ``` global-state ```  expression | 5.6.0 | ❌ (#4117) | ❌ (#4117) |
