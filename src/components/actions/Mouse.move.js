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
  checkLink (link){
	const soursePort = link.getSourcePort()
    const targetPort = link.getTargetPort()
    if (soursePort && targetPort) {
      const sourceFormat = soursePort?.getFormat()
      const targetFormat = targetPort?.getFormat()
      if (sourceFormat !== targetFormat) {
        link.remove()
      }
    }
  }
  checkLinks (event) {
    const model = this.engine.getModel()
    const links = model.getLinks()
	console.log(model.getSelectionEntities())
    links.forEach(this.checkLink);
  }
}
