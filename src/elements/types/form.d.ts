interface FormInitialValues extends InitialValues {
  action?: string;
  method?: Method;
  name?: string;
  formTarget?: Target;
}

interface iDomFnsForm extends iDomFns {
  action?: string;
  method?: Method;
  name?: string;
  formTarget?: Target;

  removeAction(): iDomFns;
  removeMethod(): iDomFns;
  removeName(): iDomFns;
  removeTarget(): iDomFns;
  withAction(action: string): iDomFns;
  withMethod(method: Method): iDomFns;
  withName(name: string): iDomFns;
  withTarget(formTarget: Target): iDomFns;
}
