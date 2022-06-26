interface LabelInitialValues extends InitialValues {
  for?: string;
}

interface iDomFnsLabel extends iDomFns {
  for?: string;

  removeFor(): iDomFnsLabel;
  withFor(f: string): iDomFnsLabel;
}
