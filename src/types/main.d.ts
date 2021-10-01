type AllowedElement = 'a' | 'article' | 'aside' | 'details' | 'b' | 'br' | 'caption' | 'div' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'header' | 'img' | 'label' | 'li' | 'nav' | 'main' | 'ol' | 'p' | 'section' | 'span' | 'strong' | 'table' | 'tbody' | 'td' | 'tfoot' | 'th' | 'thead' | 'tr' | 'ul'

type ClassNames = string | string[]

type StringTuple = [string, string]
type DataAttributes = StringTuple | StringTuple[]

interface InitialValues {
  classNames?: ClassNames
  dataAttributes: DataAttributes
  element: HTMLElement | null
  id?: string
  innerText?: string
}

interface AnchorInitialValues extends InitialValues {
  href?: string
  anchorTarget?: Target
} 

interface ImgInitialValues extends InitialValues {
  alt?: string
  height?: number
  src?: string
  width?: number
}

interface LabelInitialValues extends InitialValues {
  for?: string
}

interface FormInitialValues extends InitialValues {
  action?: string
  method?: Method
  name?: string
  formTarget?: Target
}

interface iDomElements {
  a(): iEasyDomAnchor
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
  copy(initObj?: InitialValues): iEasyDom
  make(): iEasyDom
  prependTo(query: string): iEasyDom
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

type Target = '_self' | '_blank' | '_parent' | '_top'

interface iEasyDomAnchor extends iEasyDom {
  href?: string
  anchorTarget?: Target

  removeHref(): iEasyDomAnchor
  removeTarget(): iEasyDomAnchor
  withHref(href: string): iEasyDomAnchor
  withTarget(anchorTarget: Target): iEasyDomAnchor
}

interface Dimension {
  height?: number
  width?: number
}

interface iEasyDomImg extends iEasyDom {
  alt?: string
  height?: number
  src?: string
  width?: number

  removeAlt(): iEasyDomImg
  removeDimension(): iEasyDomImg
  removeHeight(): iEasyDomImg
  removeSrc(): iEasyDomImg
  removeWidth(): iEasyDomImg
  withAlt(alt: string): iEasyDomImg
  withDimension(dimension: Dimension): iEasyDomImg
  withHeight(height: number): iEasyDomImg
  withSrc(alt: string): iEasyDomImg
  withWidth(width: number): iEasyDomImg
}

interface UpdateElementProps {
  classNames: string[]
  dataAttributes: StringTuple[]
  element: HTMLElement | null

  action?: string
  method?: Method
  name?: string
  alt?: string
  for?: string
  height?: number | string
  href?: string
  id?: string
  innerText?: string
  formTarget?: Target
  anchorTarget?: Target
  src?: string
  width?: number | string
}

interface iEasyDomLabel extends iEasyDom {
  for?: string

  removeFor(): iEasyDomLabel
  withFor(f: string): iEasyDomLabel
}

type Method = 'dialog' | 'get' | 'post'

interface iEasyDomForm extends iEasyDom {
  action?: string
  method?: Method
  name?: string
  formTarget?: Target

  removeAction(): iEasyDom
  removeMethod(): iEasyDom
  removeName(): iEasyDom
  removeTarget(): iEasyDom
  withAction(action: string): iEasyDom
  withMethod(method: Method): iEasyDom
  withName(name: string): iEasyDom
  withTarget(formTarget: Target): iEasyDom
}
