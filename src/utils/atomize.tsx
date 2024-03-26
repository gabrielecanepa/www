// import { createElement } from 'react'
// import { SupportedHTMLElements } from './dom-elements'

// interface ExoticComponentWithDisplayName<P extends object = {}> extends React.ExoticComponent<P> {
//   defaultProps?: Partial<P> | undefined
//   displayName?: string | undefined
// }

// export type AnyComponent<P extends object = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>

// export type KnownTarget = SupportedHTMLElements | AnyComponent

// export type WebTarget = string | KnownTarget

// const parseTemplateLiterals = <T extends keyof HTMLElementTagNameMap>(
//   props: React.PropsWithChildren<React.ComponentProps<T>>,
//   strings: TemplateStringsArray,
//   values: any[]
// ): string =>
//   strings
//     .reduce((result, string, i) => {
//       const value = (values[i] instanceof Function ? values[i](props) : values[i]) || ''
//       return [...result, string, value]
//     }, [] as string[])
//     .join('')
//     .replace(/\s+/g, ' ')
//     .trim()

// const createClassedComponent =
//   (element: keyof HTMLElementTagNameMap, strings: TemplateStringsArray, ...values: any[]): ClassedComponent<typeof element> =>
//   args => {
//     const classes = parseTemplateLiterals<typeof element>(args, strings, values)
//     const { children, className, ...rest } = args
//     const props = { ...rest, className: [classes, className].join(' ').trim() }
//     return createElement(element, props, children) as ClassedElement<typeof element>
//   }

// const classed = <Target extends WebTarget>(tag: Target) => {
//   if (tag instanceof String) {
//   }
// }
