import { SupportedHTMLElements } from '@/utils/dom-elements'
import { createElement } from 'react'

export enum HtmlTags {
  a = 'a',
  abbr = 'abbr',
  address = 'address',
  area = 'area',
  article = 'article',
  aside = 'aside',
  audio = 'audio',
  b = 'b',
  base = 'base',
  bdi = 'bdi',
  bdo = 'bdo',
  blockquote = 'blockquote',
  body = 'body',
  br = 'br',
  button = 'button',
  canvas = 'canvas',
  caption = 'caption',
  cite = 'cite',
  code = 'code',
  col = 'col',
  colgroup = 'colgroup',
  data = 'data',
  datalist = 'datalist',
  dd = 'dd',
  del = 'del',
  details = 'details',
  dfn = 'dfn',
  dialog = 'dialog',
  div = 'div',
  dl = 'dl',
  dt = 'dt',
  em = 'em',
  embed = 'embed',
  fieldset = 'fieldset',
  figcaption = 'figcaption',
  figure = 'figure',
  footer = 'footer',
  form = 'form',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  head = 'head',
  header = 'header',
  hgroup = 'hgroup',
  hr = 'hr',
  html = 'html',
  i = 'i',
  iframe = 'iframe',
  img = 'img',
  input = 'input',
  ins = 'ins',
  kbd = 'kbd',
  label = 'label',
  legend = 'legend',
  li = 'li',
  link = 'link',
  main = 'main',
  map = 'map',
  mark = 'mark',
  menu = 'menu',
  meta = 'meta',
  meter = 'meter',
  nav = 'nav',
  noscript = 'noscript',
  object = 'object',
  ol = 'ol',
  optgroup = 'optgroup',
  option = 'option',
  output = 'output',
  p = 'p',
  picture = 'picture',
  pre = 'pre',
  progress = 'progress',
  q = 'q',
  rp = 'rp',
  rt = 'rt',
  ruby = 'ruby',
  s = 's',
  samp = 'samp',
  script = 'script',
  section = 'section',
  select = 'select',
  slot = 'slot',
  small = 'small',
  source = 'source',
  span = 'span',
  strong = 'strong',
  style = 'style',
  sub = 'sub',
  summary = 'summary',
  sup = 'sup',
  table = 'table',
  tbody = 'tbody',
  td = 'td',
  template = 'template',
  textarea = 'textarea',
  tfoot = 'tfoot',
  th = 'th',
  thead = 'thead',
  time = 'time',
  title = 'title',
  tr = 'tr',
  track = 'track',
  u = 'u',
  ul = 'ul',
  var = 'var',
  video = 'video',
  wbr = 'wbr',
}

const HTML_TAGS: (keyof HTMLElementTagNameMap)[] = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'search',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
]

export interface ClassedElement<T extends keyof HTMLElementTagNameMap>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElementTagNameMap[T]>, HTMLElementTagNameMap[T]> {
  type: T
  props: React.PropsWithChildren<React.ComponentProps<T>>
  key: string | null
  children: React.ReactNode
}

export interface ClassedComponent<T extends keyof HTMLElementTagNameMap> {
  (props: React.PropsWithChildren<React.ComponentProps<T>>): ClassedElement<T>
}

export interface ClassedTemplate<T extends keyof HTMLElementTagNameMap> {
  (strings: TemplateStringsArray, ...values: any[]): ClassedComponent<T>
}

interface ExoticComponentWithDisplayName<P extends object = {}> extends React.ExoticComponent<P> {
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}

export type AnyComponent<P extends object = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>

export type KnownTarget = SupportedHTMLElements | AnyComponent

export type WebTarget = string | KnownTarget

const parseTemplateLiterals = <T extends keyof HTMLElementTagNameMap>(
  props: React.PropsWithChildren<React.ComponentProps<T>>,
  strings: TemplateStringsArray,
  values: any[]
): string =>
  strings
    .reduce((result, string, i) => {
      const value = (values[i] instanceof Function ? values[i](props) : values[i]) || ''
      return [...result, string, value]
    }, [] as string[])
    .join('')
    .replace(/\s+/g, ' ')
    .trim()

const createClassedComponent =
  (element: keyof HTMLElementTagNameMap, strings: TemplateStringsArray, ...values: any[]): ClassedComponent<typeof element> =>
  args => {
    const classes = parseTemplateLiterals<typeof element>(args, strings, values)
    const { children, className, ...rest } = args
    const props = { ...rest, className: [classes, className].join(' ').trim() }
    return createElement(element, props, children) as ClassedElement<typeof element>
  }

// const classed = <Target extends WebTarget>(tag: Target) => {
//   if (tag instanceof String) return (strings: TemplateStringsArray, ...values: any[]) => createClassedComponent(tag, strings, ...values)
// }

const classed = HTML_TAGS.reduce(
  (acc, element) => ({
    ...acc,
    [element]: (strings: TemplateStringsArray, ...values: any[]): ClassedComponent<typeof element> =>
      createClassedComponent(element, strings, ...values),
  }),
  {} as Record<keyof HTMLElementTagNameMap, ClassedTemplate<keyof HTMLElementTagNameMap>>
)

export default classed
