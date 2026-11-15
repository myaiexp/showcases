<!-- source: https://apple.github.io/embedding-atlas/embedding-atlas.html -->

# EmbeddingAtlas 

The

```
embedding-atlas
```

package contains a component for the entire frontend user interface of Embedding Atlas.

```
```
npm install embedding-atlas
```
```

To use the React wrapper:

```
```
import { EmbeddingAtlas } from "embedding-atlas/react";

let coordinator: Coordinator; // The Mosaic coordinator.

<EmbeddingAtlas
  coordinator={coordinator}
  data={{
    table: "data_table",
    id: "id_column",
    projection: { x: "x_column", y: "y_column" },
    text: "text_column"
  }}
  ...
/>
```
```

To use the Svelte wrapper:

```
```
import { EmbeddingAtlas } from "embedding-atlas/svelte";

let coordinator: Coordinator; // The Mosaic coordinator.

<EmbeddingAtlas
  coordinator={coordinator}
  data={{
    table: "data_table",
    id: "id_column",
    projection: { x: "x_column", y: "y_column" },
    text: "text_column"
  }}
  ...
/>
```
```

If your application does not use React or Svelte, you may directly construct the component:

```
```
import { EmbeddingAtlas } from "embedding-atlas";

let coordinator: Coordinator; // The Mosaic coordinator.

let target = document.getElementById("container");
let props = {
  coordinator: coordinator,
  data: {
    table: "data_table",
    id: "id_column",
    projection: { x: "x_column", y: "y_column" },
    text: "text_column"
  },
  // ...
};

// Create and mount the component
let component = new EmbeddingAtlas(target, props);

// Update with new props
component.update(newProps);

// Destroy the component
component.destroy();
```
```

## Properties 

The view can be configured with the following properties (props):

### coordinator ``` Coordinator ``` 

Required. The Mosaic coordinator.

### data ``` { table: string; id: string; projection?: { x: string; y: string; } | null; neighbors?: string | null; text?: string | null; image?: string | null; importance?: string | null; features?: string | null; } ``` 

Required. The data source.

#### table ``` string ``` 

Required. The name of the data table.

#### id ``` string ``` 

Required. The column for unique row identifiers.

#### projection ``` { x: string; y: string; } | null ``` 

The X and Y columns for the embedding projection view.

#### neighbors ``` string | null ``` 

The column for pre-computed nearest neighbors. Each value in the column should be a dictionary with the format:

```
{ "ids": [id1, id2, ...], "distances": [distance1, distance2, ...] }
```

.

```
"ids"
```

should be an array of row ids (as given by the

```
idColumn
```

) of the neighbors, sorted by distance.

```
"distances"
```

should contain the corresponding distances to each neighbor.

#### text ``` string | null ``` 

The column for text. The text will be used as content for the tooltip and search features.

#### image ``` string | null ``` 

The column for image data. Used with

```
importance
```

to select representative images for cluster labels.

#### importance ``` string | null ``` 

The column for importance scores (e.g., PageRank, centrality). Used with

```
image
```

to select representative images for cluster labels.

#### features ``` string | null ``` 

The column for features. If available, a features list view will be created by default.

### additionalTables ``` Record<string, AdditionalTable> ``` 

Additional data tables.

### colorScheme ``` "light" | "dark" | null ``` 

The color scheme.

### initialState ``` EmbeddingAtlasState | null ``` 

The initial viewer state.

### defaultChartsConfig ``` DefaultChartsConfig | null ``` 

Configure the default charts. By default, we show a distribution chart for each column based on the data type in addition to the embedding and table. You may configure these charts with this option.

### embeddingViewConfig ``` EmbeddingViewConfig | null ``` 

Configuration for the embedding view. See docs for the EmbeddingView.

### embeddingViewLabels ``` Label[] | null ``` 

Labels for the embedding view.

### chartTheme ``` ChartThemeConfig | null ``` 

Theme config for charts.

### stylesheet ``` string | null ``` 

Custom CSS stylesheet to apply at the root of the component.

### searcher ``` Searcher | null ``` 

An object that provides search functionalities, including full text search, vector search, and nearest neighbor queries. If not specified (undefined), a default full-text search with the text column will be used. If set to null, search will be disabled.

### onExportSelection ``` ((predicate: string | null, format: "json" | "jsonl" | "csv" | "parquet") => Promise<void>) | null ``` 

A callback to export the currently selected points.

### onExportApplication ``` (() => Promise<void>) | null ``` 

A callback to download the application as archive.

### onStateChange ``` ((state: EmbeddingAtlasState) => void) | null ``` 

A callback when the state of the viewer changes. You may serialize the state to JSON and load it back.

### onPredicateChange ``` ((predicate: string | null) => void) | null ``` 

A callback when the current filter predicate changes (e.g., due to brush or click interactions).

### modelContext ``` ModelContextAPI | null ``` 

Model context API where the component will register its tools to.

### cache ``` Cache | null ``` 

A cache to speed up initialization of the viewer.

### highlight ``` RowID[] | null ``` 

An array of row IDs to highlight on the embedding view. The highlight is synchronized with the internal highlight store, so highlighted points are also reflected in other coordinated views (e.g., the instances view). Pass null or an empty array to clear the highlight.

## State 

The

```
EmbeddingAtlasState
```

interface describes the state of the Embedding Atlas UI.

You may set

```
initialState
```

to a previously-saved state value to reload the UI to its previous state.

Properties of the state:

### version ``` string ``` 

The version of Embedding Atlas that created this state. If omitted, assume the current version.

### charts ``` Record<string, any> ``` 

The list of charts.

### chartStates ``` Record<string, any> ``` 

The state of all charts, stored as a map of id to chart state.

### currentLayout ``` string ``` 

The current layout, if undefined, use the default layout.

### layouts ``` Record<string, any> ``` 

The layouts, stored as a map of layout id to layout spec.

### layoutOrder ``` string[] ``` 

The order of the layouts.

### columnStyles ``` Record<string, ColumnStyle> ``` 

Column display and rendering styles.

## Chart Theme 

You can pass in an object with the following properties to the

```
chartTheme
```

property of the component to style the charts. You can also provide these options as

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
    markColor: "black";
  }
  dark: {
    markColor: "white";
  }
}
```
```

### scheme ``` "light" | "dark" ``` 

### interpolate ``` string | string[] | ((v: number) => string) ``` 

Default interpolate for continuous color scales

### categoryColors ``` string[] | ((count: number) => string[]) ``` 

Category color scheme

### ordinalColors ``` string[] | ((count: number) => string[]) ``` 

Ordinal color scheme

### otherColor ``` string ``` 

Color for the '(other)' category

### nullColor ``` string ``` 

Color for the '(null)' category

### markColor ``` string ``` 

Mark color

### markColorFade ``` string ``` 

### markColorGray ``` string ``` 

### markColorGrayFade ``` string ``` 

### ruleColor ``` string ``` 

### embeddingColor ``` string ``` 

Embedding view point / contour color when there is no color encoding

### gridColor ``` string ``` 

Grid color

### labelColor ``` string ``` 

Label color

### labelFontFamily ``` string ``` 

### labelFontSize ``` number ``` 

### labelMaxWidth ``` number ``` 

### brushBorder ``` string ``` 

Border of the brush selection

### brushBorderBack ``` string ``` 

Back border of the brush selection

### brushFill ``` string ``` 

Fill color of the brush selection
