import { Action, InputType } from '@projectstorm/react-canvas-core'
import { v4 as uuid } from 'uuid'
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
    // TODO: !
    if (soursePort && targetPort) {
      console.log(soursePort, targetPort)
      // soursePort.parent.meta.key = uuid()
      // targetPort.parent.meta.key = uuid()
    }
    //   const sourceFormat = soursePort?.getFormat()
    //   const targetFormat = targetPort?.getFormat()
    //   if (sourceFormat !== targetFormat) {
    //     link.remove()
    //   }
    // } else if (!link.getOptions().selected) {
    //   console.log(link)
    //   //   setTimeout(link.remove(), 0)
    // }
  }
  checkLinks (event) {
    if (event.target?.localName !== 'circle') {
      const model = this.engine.getModel()
      const links = model.getLinks()
      links.forEach(obj => this.checkLink(obj))
    }
  }
}
