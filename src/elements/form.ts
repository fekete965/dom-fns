import { DomFns } from "./base";
import {
  isNotDefined,
  isString,
  makeElement,
  updateElement,
  copyInitialValues,
  isValidTarget,
  isValidMethod,
} from "../utils";

export class DomFnsForm extends DomFns implements iDomFnsForm {
  element: HTMLElement;

  action?: string;
  formTarget?: Target;
  method?: Method;
  name?: string;

  constructor(initialValues?: FormInitialValues) {
    super(initialValues);

    this.action = initialValues?.action;
    this.element = makeElement("form");
    this.formTarget = initialValues?.formTarget;
    this.method = initialValues?.method;
    this.name = initialValues?.name;

    updateElement(this);
  }

  removeAction = (): iDomFns => {
    if (isNotDefined(this.action)) {
      console.warn(
        "action property is already empty. The same object has been returned."
      );
      return this;
    }
    return new DomFnsForm({ ...copyInitialValues(this), action: undefined });
  };

  removeMethod = (): iDomFns => {
    if (isNotDefined(this.method)) {
      console.warn(
        "method property is already empty. The same object has been returned."
      );
      return this;
    }
    return new DomFnsForm({ ...copyInitialValues(this), method: undefined });
  };

  removeName = (): iDomFns => {
    if (isNotDefined(this.name)) {
      console.warn(
        "name property is already empty. The same object has been returned."
      );
      return this;
    }
    return new DomFnsForm({ ...copyInitialValues(this), name: undefined });
  };

  removeTarget = (): iDomFns => {
    if (isNotDefined(this.formTarget)) {
      console.warn(
        "formTarget property is already empty. The same object has been returned."
      );
      return this;
    }
    return new DomFnsForm({
      ...copyInitialValues(this),
      formTarget: undefined,
    });
  };

  withAction = (action: string): iDomFns => {
    if (isNotDefined(action)) {
      throw new Error();
    }

    if (!isString(action)) {
      throw new Error(
        `withAction received the following argument: ${action}. Please provide a string.`
      );
    }

    return new DomFnsForm({ ...copyInitialValues(this), action });
  };

  withMethod = (method: Method): iDomFns => {
    if (isNotDefined(method)) {
      throw new Error();
    }

    if (!isString(method)) {
      throw new Error(
        `withMethod received the following argument: ${method}. Please provide a string.`
      );
    }

    if (isValidMethod(method)) {
      throw new Error(
        `withMethod only accepts the following arguments: 'dialog', 'get', 'post'`
      );
    }

    return new DomFnsForm({ ...copyInitialValues(this), method });
  };

  withName = (name: string): iDomFns => {
    if (isNotDefined(name)) {
      throw new Error();
    }

    if (!isString(name)) {
      throw new Error(
        `withName received the following argument: ${name}. Please provide a string.`
      );
    }

    return new DomFnsForm({ ...copyInitialValues(this), name });
  };

  withTarget = (formTarget: Target): iDomFns => {
    if (isNotDefined(formTarget)) {
      throw new Error();
    }

    if (!isString(formTarget)) {
      throw new Error(
        `withTarget received the following argument: ${formTarget}. Please provide a string.`
      );
    }

    if (isValidTarget(formTarget)) {
      throw new Error(
        `withTarget only accepts the following arguments: '_self', '_blank', '_parent', '_top'`
      );
    }

    return new DomFnsForm({ ...copyInitialValues(this), formTarget });
  };
}
