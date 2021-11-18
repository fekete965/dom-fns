interface FormInitialValues extends InitialValues {
  action?: string
  method?: Method
  name?: string
  formTarget?: Target
}

interface iEasyDomForm extends iEasyDom {
  action?: string
  method?: Method
  name?: string
  formTarget?: Target

  removeAction(): iEasyDom
  removeMethod(): iEasyDom
  removeName(): iEasyDom
  removeTarget(): iEasyDom
  withAction(action: string): iEasyDom
  withMethod(method: Method): iEasyDom
  withName(name: string): iEasyDom
  withTarget(formTarget: Target): iEasyDom
}
