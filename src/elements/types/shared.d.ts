interface SharedElementInitialValues extends InitialValues { }

interface iEasyDomSharedElement extends iEasyDom {
  appendTo(query: string): iEasyDom
  prependTo(query: string): iEasyDom
}
