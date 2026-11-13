<!-- source: https://maplibre.org/maplibre-style-spec/state/ -->

# State¶

An object used to define default values when using the `global-state` expression.

```
"state": {
    "chargerType": {"default": ["CCS", "CHAdeMO", "Type2"]},
    "minPreferredChargingSpeed": {"default": 50}
}
```

---

| SDK Support | MapLibre GL JS | MapLibre Native Android | MapLibre Native iOS |
| --- | --- | --- | --- |
| basic functionality | 5.6.0 | 13.7.1 | 7.0.0 |
