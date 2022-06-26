import { makeElement, updateElement } from "../utils";
import { DomFns } from "./base";

export class DomFnsTableFooter extends DomFns implements iDomFnsSharedElement {
  element: HTMLElement;

  constructor(initialValues?: SharedElementInitialValues) {
    super(initialValues);
    this.element = makeElement("tfoot");

    updateElement(this);
  }
}
