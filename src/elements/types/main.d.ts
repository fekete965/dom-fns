type AllowedElement =
  | "a"
  | "article"
  | "aside"
  | "details"
  | "b"
  | "br"
  | "caption"
  | "div"
  | "footer"
  | "form"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "header"
  | "img"
  | "label"
  | "li"
  | "nav"
  | "main"
  | "ol"
  | "p"
  | "section"
  | "span"
  | "strong"
  | "table"
  | "tbody"
  | "td"
  | "tfoot"
  | "th"
  | "thead"
  | "tr"
  | "ul";

type Target = "_self" | "_blank" | "_parent" | "_top";

type Method = "dialog" | "get" | "post";

type ClassNames = string | string[];

type StringTuple = [string, string];

type DataAttributes = StringTuple | StringTuple[];

interface Dimension {
  height?: number;
  width?: number;
}

interface InitialValues {
  classNames: string[];
  dataAttributes: StringTuple[];

  action?: string;
  method?: Method;
  name?: string;
  alt?: string;
  for?: string;
  height?: number;
  href?: string;
  id?: string;
  innerText?: string;
  formTarget?: Target;
  anchorTarget?: Target;
  src?: string;
  width?: number;
}

interface iDomElements {
  a(): iDomFns;
  article(): iDomFns;
  aside(): iDomFns;
  details(): iDomFns;
  b(): iDomFns;
  br(): iDomFns;
  caption(): iDomFns;
  div(): iDomFns;
  footer(): iDomFns;
  form(): iDomFns;
  h1(): iDomFns;
  h2(): iDomFns;
  h3(): iDomFns;
  h4(): iDomFns;
  h5(): iDomFns;
  h6(): iDomFns;
  header(): iDomFns;
  img(): iDomFns;
  label(): iDomFns;
  li(): iDomFns;
  nav(): iDomFns;
  main(): iDomFns;
  ol(): iDomFns;
  p(): iDomFns;
  section(): iDomFns;
  span(): iDomFns;
  strong(): iDomFns;
  table(): iDomFns;
  tbody(): iDomFns;
  td(): iDomFns;
  tfoot(): iDomFns;
  th(): iDomFns;
  thead(): iDomFns;
  tr(): iDomFns;
  ul(): iDomFns;
}

interface iDomFns extends iDomElements {
  classNames: string[];
  dataAttributes: StringTuple[];
  element: HTMLElement | null;

  id?: string;
  innerText?: string;

  appendTo(query: string): iDomFns;
  prependTo(query: string): iDomFns;
  copy(initObj?: InitialValues): iDomFns;
  make(): iDomFns;
  removeAllClasses(): iDomFns;
  removeAllDataAttributes(): iDomFns;
  removeClass(classNames: ClassNames): iDomFns;
  removeDataAttribute(key: string): iDomFns;
  removeId(): iDomFns;
  removeInnerText(): iDomFns;
  withClass(classNames: ClassNames): iDomFns;
  withDataAttribute(data: DataAttributes): iDomFns;
  withId(id: String): iDomFns;
  withInnerText(innerText: string, concat: boolean = false): iDomFns;
}
