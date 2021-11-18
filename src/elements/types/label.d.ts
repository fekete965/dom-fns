interface LabelInitialValues extends InitialValues {
  for?: string
}

interface iEasyDomLabel extends iEasyDom {
  for?: string

  removeFor(): iEasyDomLabel
  withFor(f: string): iEasyDomLabel
}
