interface AnchorInitialValues extends InitialValues {
  href?: string;
  anchorTarget?: Target;
}

interface iDomFnsAnchor extends iDomFns {
  href?: string;
  anchorTarget?: Target;

  removeHref(): iDomFnsAnchor;
  removeTarget(): iDomFnsAnchor;
  withHref(href: string): iDomFnsAnchor;
  withTarget(anchorTarget: Target): iDomFnsAnchor;
}
