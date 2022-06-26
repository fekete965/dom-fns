interface ImgInitialValues extends InitialValues {
  alt?: string;
  height?: number;
  src?: string;
  width?: number;
}

interface iDomFnsImg extends iDomFns {
  alt?: string;
  height?: number;
  src?: string;
  width?: number;

  removeAlt(): iDomFnsImg;
  removeDimension(): iDomFnsImg;
  removeHeight(): iDomFnsImg;
  removeSrc(): iDomFnsImg;
  removeWidth(): iDomFnsImg;
  withAlt(alt: string): iDomFnsImg;
  withDimension(dimension: Dimension): iDomFnsImg;
  withHeight(height: number): iDomFnsImg;
  withSrc(alt: string): iDomFnsImg;
  withWidth(width: number): iDomFnsImg;
}
