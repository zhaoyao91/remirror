<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [prosemirror-suggest](./prosemirror-suggest.md) &gt; [SuggestKeyBindingMap](./prosemirror-suggest.suggestkeybindingmap.md)

## SuggestKeyBindingMap type

The keybindings shape for the [Suggester.keyBindings](./prosemirror-suggest.suggester.keybindings.md) property.

<b>Signature:</b>

```typescript
export declare type SuggestKeyBindingMap<GCommand extends AnyFunction<void> = AnyFunction<void>> = Partial<Record<'Enter' | 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'Esc' | 'Delete' | 'Backspace', SuggestKeyBinding<GCommand>>> & Record<string, SuggestKeyBinding<GCommand>>;
```
