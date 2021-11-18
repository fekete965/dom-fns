interface ImgInitialValues extends InitialValues {
  alt?: string
  height?: number
  src?: string
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
