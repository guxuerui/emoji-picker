/// By default, the type includes common attributes from @unocss/preset-uno. If you need custom attributes, refer to the type source to implement your own type.

declare namespace svelteHTML {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'

  type HTMLAttributes = AttributifyAttributes
}
