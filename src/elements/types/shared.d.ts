interface SharedElementInitialValues extends InitialValues {}

interface iDomFnsSharedElement extends iDomFns {
  appendTo(query: string): iDomFns;
  prependTo(query: string): iDomFns;
}
