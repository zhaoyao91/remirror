<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@remirror/core-types](./core-types.md) &gt; [MarkExtensionSpec](./core-types.markextensionspec.md)

## MarkExtensionSpec interface

The schema spec definition for a mark extension

<b>Signature:</b>

```typescript
export interface MarkExtensionSpec extends Pick<MarkSpec, 'attrs' | 'inclusive' | 'excludes' | 'group' | 'spanning' | 'parseDOM'> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [toDOM](./core-types.markextensionspec.todom.md) | <code>(mark: Mark, inline: boolean) =&gt; DOMOutputSpec</code> | Defines the default way marks of this type should be serialized to DOM/HTML. |

