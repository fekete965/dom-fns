interface AnchorInitialValues extends InitialValues {
  href?: string
  anchorTarget?: Target
} 

interface iEasyDomAnchor extends iEasyDom {
  href?: string
  anchorTarget?: Target

  removeHref(): iEasyDomAnchor
  removeTarget(): iEasyDomAnchor
  withHref(href: string): iEasyDomAnchor
  withTarget(anchorTarget: Target): iEasyDomAnchor
}
