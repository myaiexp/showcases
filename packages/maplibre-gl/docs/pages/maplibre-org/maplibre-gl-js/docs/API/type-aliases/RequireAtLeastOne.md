<!-- source: https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/RequireAtLeastOne/ -->

# RequireAtLeastOne<T>

> **RequireAtLeastOne**<`T`> = `{ [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>> }`[keyof `T`]

Defined in: util/util.ts:1107

A helper to allow require of at least one property

## Type Parameters

| Type Parameter |
| --- |
| `T` |
