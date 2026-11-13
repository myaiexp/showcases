<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/StyleGlyph/ -->

Skip to content
Navigation
MapLibre GL JS
StyleGlyph
Search
Search
GitHub
Introduction
Plugins
Style Specifications
API
Examples
Guides
MapLibre GL JS
GitHub
Introduction
Plugins
Style Specifications
API
API
Intro
Classes
Classes
AJAXError
AttributionControl
BoxZoomHandler
CanvasSource
CooperativeGesturesHandler
DoubleClickZoomHandler
DragPanHandler
DragRotateHandler
EdgeInsets
ErrorEvent
Event<TType extends string = string>
Evented<EventType extends EventTypeMap = EventTypeMap>
FullscreenControl
FullscreenEvent
GPUInitializationError
GeoJSONSource
GeolocateControl
GeolocateErrorEvent
GeolocateEvent
GeolocatePositionEvent
GlobeControl
Hash
ImageSource
KeyboardHandler
LngLat
LngLatBounds
LogoControl
Map
MapBoxZoomEvent
MapContextEvent
MapLibreEvent<TOrig = unknown>
MapMouseEvent
MapMovementEvent
MapProjectionEvent
MapSourceDataEvent
MapStyleDataEvent
MapStyleImageMissingEvent
MapStyleLoadEvent
MapTerrainEvent
MapTouchEvent
MapWheelEvent
Marker
MarkerClickEvent
MarkerDragEvent
MercatorCoordinate
NavigationControl
Popup
PopupEvent
RasterDEMTileSource
RasterTileSource
ScaleControl
ScrollZoomHandler
Style
TerrainControl
TwoFingersTouchPitchHandler
TwoFingersTouchRotateHandler
TwoFingersTouchZoomHandler
TwoFingersTouchZoomRotateHandler
VectorTileSource
VideoSource
Enumerations
Enumerations
MessageType
ResourceType
TextFit
Functions
Functions
addProjection()
addProtocol()
addSourceType()
clearPrewarmedResources()
createTileMesh()
getGlobalDispatcher()
getMaxParallelImageRequests()
~~getRTLTextPluginStatus()~~
getVersion()
getWorkerCount()
getWorkerUrl()
importScriptInWorkers()
isTimeFrozen()
now()
prewarm()
removeProjection()
removeProtocol()
restoreNow()
setMaxParallelImageRequests()
setNow()
~~setRTLTextPlugin()~~
setWorkerCount()
setWorkerUrl()
Interfaces
Interfaces
Actor
AlphaImage
CustomLayerInterface
Dispatcher
FeatureIndex
GeoJSONFeature
GlobalDispatcher
Handler
IActor
IControl
OverscaledTileID
Source
StyleImageInterface
StyleLayer
Subscription
Tile
Type aliases
Type aliases
ActorMessage<T extends MessageType>
AddLayerObject
AddProtocolAction
AddProtocolResponseData
Alignment
AnchoredCameraOptions
AnimationOptions
AroundCenterOptions
AttributionControlOptions
BoxZoomEndHandler
BoxZoomHandlerOptions
CRS
CalculateTileZoomFunction
CameraForBoundsOptions
CameraOptions
CameraUpdateTransformFunction
CanvasSourceSpecification
CenterZoomBearing
Complete<T>
ControlPosition
Coordinates
CreateTileMeshOptions
CustomLayerProjectionData
CustomLayerProjectionDataParams
CustomMessageHandler<TData, TResult>
CustomRenderMethod
CustomRenderMethodInput
CustomTerrainRenderInput
DashEntry
DistributiveKeys<T>
DistributiveOmit<T, K extends DistributiveKeys<T>>
DragPanOptions
DragRotateOptions
EaseToOptions
ErrorEventType
EventTypeMap
EventedParentData
ExpiryData
FeatureIdentifier
FitBoundsOptions
FlyToOptions
FullscreenControlEventType
FullscreenControlOptions
GeoJSONFeatureDiff
GeoJSONFeatureId
GeoJSONSourceDiff
GeolocateControlEventType
GeolocateControlOptions
GestureOptions
GetClusterOptions
GetResourceResponse<T>
GlyphMap
GlyphPosition
GlyphPositions
HandlerResult
ImageSourceImage
ImageSourceWarp
IndicesType
JumpToOptions
Listener<E extends Event = Event>
LngLatBoundsLike
LngLatLike
LogoControlOptions
MapEventType
MapGeoJSONFeature
MapLayerEventType
MapLayerMouseEvent
MapLayerTouchEvent
MapOptions
MapSourceDataType
MarkerEventType
MarkerOptions
Mat4f32
Mat4f64
MissingStyleImageResolver
NavigationControlOptions
Offset
PaddingOptions
PointLike
PopupEventType
PopupOptions
PositionAnchor
ProjectionData<MainMatrix extends mat4 = mat4, FallbackMatrix extends mat4 = MainMatrix>
ProjectionDataParams
QueryRenderedFeaturesOptions
QuerySourceFeatureOptions
RendererProjectionData
RequestParameters
RequestResponseMessageMap
RequestTransformFunction
RequireAtLeastOne<T>
ScaleControlOptions
SetClusterOptions
SourceClass
SourceEventType
StyleGlyph
StyleImage
StyleImageData
StyleImageMetadata
StyleImageSource
StyleImageWebGLData
StyleImageWebGLTarget
StyleOptions
StyleSetterOptions
StyleSwapOptions
TerrainHeightMapTarget
TileMatrixSet
TileMesh
TransformConstrainFunction
TransformStyleFunction
Unit
UnwrappedTileIDLiteral
UpdateImageOptions
Variables
Variables
EXTENT
Examples
Examples
Overview
3D Terrain
Add 3D terrain from quantized-mesh tiles
Add 3D Tiles, 3D objects and models using Three.js
Add a 3D model with babylon.js
Add a canvas source
Add a COG raster source
Add a color relief layer
Add a custom layer with tiles to a globe
Add a custom style layer
Add a default marker
Add a generated icon to the map
Add a GeoJSON line
Add a GeoJSON polygon
Add a hillshade layer
Add a multidirectional hillshade layer
Add a new layer below labels
Add a pattern to a polygon
Add a raster tile source
Add a simple custom layer on a globe
Add a stretchable image to the map
Add a vector tile source
Add a video
Add a WMS source
Add an animated icon to the map
Add an icon to the map
Add Contour Lines
Add custom icons with Markers
Add custom layers that follow the terrain
Add live realtime data
Add multiple geometries from one GeoJSON source
Animate a line
Animate a marker
Animate a point along a route
Animate a point
Animate a series of images
Animate an icon on the GPU
Animate map camera around a point
Animate symbol to follow the mouse
Attach a popup to a marker instance
Center the map on a clicked symbol
Change a layer's color with buttons
Change a map's language
Change building color based on zoom level
Change the case of labels
Change the default position for attribution
Check if WebGL is supported
Cooperative gestures
Create a draggable Marker
Create a draggable point
Create a gradient dashed line using an expression
Create a gradient line using an expression
Create a Heatmap layer on a globe with terrain elevation
Create a heatmap layer
Create a hover effect
Create a time slider
Create and style clusters
Create deck.gl layer using REST API
Customize camera animations
Customize the map transform constrain
Disable map rotation
Disable scroll zoom
Display a globe with a fill extrusion layer
Display a globe with a vector map
Display a globe with an atmosphere
Display a hybrid satellite map with terrain elevation
Display a map in a polar stereographic projection
Display a map in UTM zone 32N
Display a map with MLT
Display a map
Display a non-interactive map
Display a popup on click
Display a popup on hover
Display a popup
Display a remote SVG symbol
Display a satellite map
Display an image in the identity projection
Display and style rich text labels
Display buildings in 3D
Display GeoJSON in a polar stereographic projection
Display HTML clusters with custom properties
Display line that crosses 180th meridian
Display map navigation controls
Display Performance Metrics
Draw a Circle
Draw GeoJSON points
Draw geometries with terra-draw
Draw polygon with mapbox-gl-draw
Elevate symbols above the terrain
Enter a 360° photosphere
Extrude polygons for 3D indoor mapping
Fill extrusion rounded corners
Filter layer symbols using global state
Filter symbols by text input
Filter symbols by toggling a list
Filter within a Layer
Fit a map to a bounding box
Fit to the bounds of a LineString
Fly to a location based on scroll position
Fly to a location
Generate and add a missing icon to the map
Geocode with Nominatim
Get coordinates of the mouse pointer
Get features under the mouse pointer
Hash routing
Interactive layer blending
Jump to a series of locations
Level of Detail Control
Locale switching
Locate the user
Measure distances
Navigate the map with game-like controls
Offset the vanishing point using padding
PMTiles source and protocol
Raycast 3D Tiles using Three.js
Render world copies
Restrict map panning to an area
Select features with boxZoomEnd callback
Set center point above ground
Set pitch and bearing
Show polygon information on click
Sky, Fog, Terrain
Slowly fly to a location
Style labels with font faces
Style labels with local fonts
Style labels with Web fonts
Style lines with a data-driven property
Sync movement of multiple maps
Toggle deck.gl layer
Toggle interactions
Update a feature in realtime
Update GeoJSON polygons
Use a fallback image
Use addProtocol to Transform Feature Properties
Use locally generated ideographs
Variable label placement with offset
Variable label placement
View a fullscreen map
View local GeoJSON (experimental)
View local GeoJSON
Visualize population density
Walk around a map in first person
Zoom and planet size relation on globe
Guides
Guides
Guides
Custom Planar Coordinate Reference Systems
Optimising MapLibre Performance: Tips for Large GeoJSON Datasets
Leaflet migration guide
Mapbox migration guide
OpenLayers migration guide
v5 to v6 migration guide
StyleGlyph
StyleGlyph
=
object
Defined in:
style/style\_glyph.ts:21
A style glyph type
Back to top
