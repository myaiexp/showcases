<!-- source: https://maplibre.org/maplibre-style-spec/projection/ -->

# Projection¶

The projection configuration

```
"projection": {
    "type": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        "vertical-perspective",
        12,
        "mercator"
    ]
}
```

## type¶

*Optional projectionDefinition. Defaults to `"mercator"`. Supports interpolate expressions.*

The projection definition type. Can be specified as a string, a transition state, or an expression.
