import { Action, ActionEvent, InputType } from '@projectstorm/react-canvas-core'

// interface CustomDeleteItemsActionOptions {
//   keyCodes?: number[]
// }

/**
 * Deletes all selected items, but asks for confirmation first
 */

export class CustomMouseMoveItemsAction extends Action {
  constructor (options = {}) {
    options = {
      keyCodes: [32],
      ...options
    }
    super({
      type: InputType.MOUSE_UP,
      fire: (event, model2) => {
        this.checkLinks.call(this, event)
      }
    })
  }
  checkLink (link) {
    const soursePort = link.getSourcePort()
    const targetPort = link.getTargetPort()
    console.log(soursePort, targetPort)
    if (soursePort && targetPort) {
      const sourceFormat = soursePort?.getFormat()
      const targetFormat = targetPort?.getFormat()
      if (sourceFormat !== targetFormat) {
        link.remove()
      }
    } else if (!link.getOptions().selected) {
      console.log(link)
      //   setTimeout(link.remove(), 0)
    }
  }
  checkLinks (event) {
    if (event.target?.localName !== 'circle') {
      const model = this.engine.getModel()
      const links = model.getLinks()
      links.forEach(this.checkLink)
    }
  }
}
