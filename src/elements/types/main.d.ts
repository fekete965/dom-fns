type AllowedElement = 'a' | 'article' | 'aside' | 'details' | 'b' | 'br' | 'caption' | 'div' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'header' | 'img' | 'label' | 'li' | 'nav' | 'main' | 'ol' | 'p' | 'section' | 'span' | 'strong' | 'table' | 'tbody' | 'td' | 'tfoot' | 'th' | 'thead' | 'tr' | 'ul'

type Target = '_self' | '_blank' | '_parent' | '_top'

type Method = 'dialog' | 'get' | 'post'

type ClassNames = string | string[]

type StringTuple = [string, string]

type DataAttributes = StringTuple | StringTuple[]

interface Dimension {
  height?: number
  width?: number
}

interface InitialValues {
  classNames: string[]
  dataAttributes: StringTuple[]

  action?: string
  method?: Method
  name?: string
  alt?: string
  for?: string
  height?: number
  href?: string
  id?: string
  innerText?: string
  formTarget?: Target
  anchorTarget?: Target
  src?: string
  width?: number
}

interface iDomElements {
  a(): iEasyDom
  article(): iEasyDom
  aside(): iEasyDom
  details(): iEasyDom
  b(): iEasyDom
  br(): iEasyDom
  caption(): iEasyDom
  div(): iEasyDom
  footer(): iEasyDom
  form(): iEasyDom
  h1(): iEasyDom
  h2(): iEasyDom
  h3(): iEasyDom
  h4(): iEasyDom
  h5(): iEasyDom
  h6(): iEasyDom
  header(): iEasyDom
  img(): iEasyDom
  label(): iEasyDom
  li(): iEasyDom
  nav(): iEasyDom
  main(): iEasyDom
  ol(): iEasyDom
  p(): iEasyDom
  section(): iEasyDom
  span(): iEasyDom
  strong(): iEasyDom
  table(): iEasyDom
  tbody(): iEasyDom
  td(): iEasyDom
  tfoot(): iEasyDom
  th(): iEasyDom
  thead(): iEasyDom
  tr(): iEasyDom
  ul(): iEasyDom
}

interface iEasyDom extends iDomElements {
  classNames: string[]
  dataAttributes: StringTuple[]
  element: HTMLElement | null

  id?: string
  innerText?: string

  appendTo(query: string): iEasyDom
  prependTo(query: string): iEasyDom
  copy(initObj?: InitialValues): iEasyDom
  make(): iEasyDom
  removeAllClasses(): iEasyDom
  removeAllDataAttributes(): iEasyDom
  removeClass(classNames: ClassNames): iEasyDom
  removeDataAttribute(key: string): iEasyDom
  removeId(): iEasyDom
  removeInnerText(): iEasyDom
  withClass(classNames: ClassNames): iEasyDom
  withDataAttribute(data: DataAttributes): iEasyDom
  withId(id: String): iEasyDom
  withInnerText(innerText: string, concat: boolean = false): iEasyDom
}