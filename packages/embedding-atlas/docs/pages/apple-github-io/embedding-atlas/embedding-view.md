<!-- source: https://apple.github.io/embedding-atlas/embedding-view.html -->

# EmbeddingView 

The

```
embedding-atlas
```

package contains a component for displaying up to a few million points from an embedding with x and y coordinates.

We also provide React and Svelte wrappers for the component to easily include it in your own application.

```
```
npm install embedding-atlas
```
```

To use the React wrapper:

```
```
import { EmbeddingView } from "embedding-atlas/react";

// Capture the view's tooltip with a state
let [tooltip, setTooltip] = useState(null);

let xColumn: Float32Array;
let yColumn: Float32Array;
let categoryColumn: Uint8Array; // optional

<EmbeddingView
  data={{x: xColumn, y: yColumn, category: categoryColumn}}
  tooltip={tooltip}
  onTooltip={setTooltip}
  ...
/>
```
```

To use the Svelte wrapper:

```
```
import { EmbeddingView } from "embedding-atlas/svelte";

// The tooltip as a state.
let tooltip = $state(null);

<EmbeddingView
  data={{ x: xColumn, y: yColumn, category: categoryColumn }}
  tooltip={tooltip}
  onTooltip={(v) => (tooltip = v)}
  ...
/>
```
```

If your application does not use React or Svelte, you may directly construct the component:

```
```
import { EmbeddingView } from "embedding-atlas";

let target = document.getElementById("container");
let props = {
  data: {
    x: xColumn,
    y: yColumn,
    category: categoryColumn,
    onTooltip: (value) => {
      // ...
    },
  },
};

// Create and mount the component
let component = new EmbeddingView(target, props);

// Update with new props
component.update(newProps);

// Destroy the component
component.destroy();
```
```

## Properties 

The view can be configured with the following properties (props):

### data ``` { x: Float32Array<ArrayBuffer>; y: Float32Array<ArrayBuffer>; category?: Uint8Array<ArrayBuffer> | null; } ``` 

Required. The data.

#### x ``` Float32Array<ArrayBuffer> ``` 

Required. An array of X coordinates, must be a

```
Float32Array
```

.

#### y ``` Float32Array<ArrayBuffer> ``` 

Required. An array of Y coordinates, must be a

```
Float32Array
```

.

#### category ``` Uint8Array<ArrayBuffer> | null ``` 

An array of category indices, must be a

```
Uint8Array
```

.

### categoryColors ``` string[] | null ``` 

The colors for the categories. Category

```
i
```

will use the

```
i
```

-th color from this list. If not specified, default colors will be used.

### labels ``` Label[] | null ``` 

Labels to display on the embedding view. Each label must have

```
x
```

,

```
y
```

, and

```
text
```

properties, and optionally

```
level
```

and

```
priority
```

.

### width ``` number | null ``` 

The width of the view.

### height ``` number | null ``` 

The height of the view.

### pixelRatio ``` number | null ``` 

The pixel ratio of the view.

### theme ``` ThemeConfig | null ``` 

Configure the theme of the view.

### config ``` EmbeddingViewConfig | null ``` 

Configure the embedding view.

### viewportState ``` ViewportState | null ``` 

The viewport state. You may use this to share viewport state across multiple views. If undefined or set to

```
null
```

, the view will use a default viewport state. To listen to viewport state change, use

```
onViewportState
```

.

### tooltip ``` DataPoint | null ``` 

The current tooltip. The tooltip is an object with the following fields:

```
x
```

,

```
y
```

,

```
category
```

,

```
text
```

,

```
identifier
```

. To listen for a tooltip change, use

```
onTooltip
```

.

### selection ``` DataPoint[] | null ``` 

The current single or multiple point selection. Selection is triggered by clicking on the points (shift/cmd+click will toggle points). The selection is an array of objects with the following fields:

```
x
```

,

```
y
```

,

```
category
```

,

```
text
```

,

```
identifier
```

. To listen to selection change, use

```
onSelection
```

.

### rangeSelection ``` Rectangle | null ``` 

A rectangle or a polygon (list of points) that represents the range selection. If the value is a list of points, it is interpreted as a lasso selection with a closed polygon with the list of points as vertices.

### onViewportState ``` ((value: ViewportState) => void) | null ``` 

A callback for when

```
viewportState
```

changes.

### onTooltip ``` ((value: DataPoint | null) => void) | null ``` 

A callback for when

```
tooltip
```

changes.

### onSelection ``` ((value: DataPoint[] | null) => void) | null ``` 

A callback for when

```
selection
```

changes.

### onRangeSelection ``` ((value: Rectangle | Point[] | null) => void) | null ``` 

A callback for when

```
rangeSelection
```

changes.

### querySelection ``` ((x: number, y: number, unitDistance: number) => Promise<DataPoint | null>) | null ``` 

An async function that returns a data point near the given (x, y) location. The

```
unitDistance
```

parameter is the distance of a single pixel in data domain. You can use this to determine the distance threshold for selecting a point.

### queryClusterLabels ``` ((clusters: Rectangle[][]) => Promise<(LabelContent | null)[]>) | null ``` 

An async function that returns labels for a list of clusters. Each cluster is given as a list of rectangles that approximately cover the region.

### customTooltip ``` CustomComponent<HTMLDivElement, { tooltip: DataPoint; }> | null ``` 

A custom renderer to draw the tooltip content.

### customOverlay ``` CustomComponent<HTMLDivElement, { proxy: OverlayProxy; }> | null ``` 

A custom renderer to draw overlay on top of the embedding view.

### cache ``` Cache | null ``` 

A cache for intermediate results.

## Config 

You can pass in an object with the following properties to the

```
config
```

property of the embedding view:

### colorScheme ``` "light" | "dark" | null ``` 

Color scheme.

### mode ``` "points" | "density" | null ``` 

View mode.

### minimumDensity ``` number | null ``` 

Minimum average density for density contours to show up. The density is measured as number of points per square points (aka., px in CSS units).

### pointSize ``` number | null ``` 

Override the automatically calculated point size. If not specified, point size is calculated based on density.

### autoLabelEnabled ``` boolean | null ``` 

Generate labels automatically. By default labels are generated automatically if the

```
labels
```

prop is not specified, and a

```
text
```

column is specified in the Mosaic view, or a

```
queryClusterLabels
```

callback is specified in the non-Mosaic view. Set this to

```
false
```

to disable automatic labels.

### autoLabelDensityThreshold ``` number | null ``` 

The density threshold to filter the clusters before generating automatic labels. The value is relative to the max density.

### autoLabelStopWords ``` string[] | null ``` 

The stop words for automatic label generation. By default use NLTK stop words.

### downsampleMaxPoints ``` number | null ``` 

Approximate maximum number of points to render when downsampling is active. Points are sampled with bias toward sparse regions (fewer points kept in dense areas). The sampling probability is given by this formula: P(i) = (downsampleMaxPoints / numPointsInViewport) \* (2 / (1 + density(p\_i) / maxDensity \* downsampleDensityWeight)) Default: 4,000,000. Set to null or Infinity to disable downsampling.

### downsampleDensityWeight ``` number | null ``` 

Density weight for downsampling (0-10). Higher values mean more aggressive culling in dense areas. Default: 5

## Theme 

You can pass in an object with the following properties to the

```
theme
```

property of the embedding view. You can also provide these options as

```
light
```

and/or

```
dark
```

properties, which will control the appearance of the view depending on its

```
colorScheme
```

. For example:

```
```
{
  light: {
    clusterLabelColor: "black";
  }
  dark: {
    clusterLabelColor: "white";
  }
}
```
```

### fontFamily ``` string ``` 

The font family for texts.

### clusterLabelColor ``` string ``` 

Color for cluster labels.

### clusterLabelOutlineColor ``` string ``` 

Color for cluster labels' outline.

### clusterLabelOpacity ``` number ``` 

Opacity for cluster labels.

### statusBar ``` boolean ``` 

Whether to show the status bar at the bottom.

### statusBarTextColor ``` string ``` 

Color for status bar text.

### statusBarBackgroundColor ``` string ``` 

Color for status bar background.

### brandingLink ``` { text: string; href: string; } | null ``` 

Branding link.

## Custom Tooltip 

You may use the

```
customTooltip
```

property to change how tooltips are displayed.

First create a class for the custom tooltip component:

```
```
class CustomTooltip {
  constructor(target, props) {
    // Create the tooltip component and mount it to the target element.
    // props will contain a `tooltip` field, plus any custom prop you specified.
  }
  update(props) {
    // Update the component with new props.
  }
  destroy() {
    // Destroy the component.
  }
}
```
```

Then specify the

```
customTooltip
```

property to the component:

```
```
<EmbeddingView
  ...
  customTooltip={{
    class: CustomTooltip,
    props: { customProp: 10 } // Pass additional props to the tooltip component.
  }}
/>
```
```

## Custom Overlay 

You may use the

```
customOverlay
```

property to add an overlay to the embedding view.

First create a class for the custom overlay:

```
```
class CustomOverlay {
  constructor(target, props) {
    // Create the tooltip component and mount it to the target element.
    // props will contain a `proxy` field, plus any custom prop you specified.
    // You can use proxy.location(x, y) to get the pixel location of a data point at (x, y).
  }
  update(props) {
    // Update the component with new props.
  }
  destroy() {
    // Destroy the component.
  }
}
```
```

Then specify the

```
customOverlay
```

property to the component:

```
```
<EmbeddingView
  ...
  customOverlay={{
    class: CustomOverlay,
    props: { customProp: 10 } // Pass additional props to the overlay component.
  }}
/>
```
```
