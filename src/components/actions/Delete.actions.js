import { Action, ActionEvent, InputType } from '@projectstorm/react-canvas-core'

// interface CustomDeleteItemsActionOptions {
//   keyCodes?: number[]
// }

/**
 * Deletes all selected items, but asks for confirmation first
 */
export class CustomDeleteItemsAction extends Action {
  constructor (options = {}) {
    options = {
      keyCodes: [32],
      ...options
    }
    super({
      type: InputType.KEY_DOWN,
      fire: (event) => {
        if (options.keyCodes.indexOf(event.event.keyCode) !== -1) {
          const model = this.engine.getModel();
          console.log(model.getSelectedEntities(), model.getSelectionEntities())
          model.clearSelection();
          // const selectedEntities = this.engine.getModel().getSelectionEntities()
          // if (selectedEntities.length > 0) {
          //   const confirm = 0
          //   console.log('Are you sure you want to delete?')
          //   if (confirm) {
          //     //   _.forEach(selectedEntities, model => {
          //     //     // only delete items which are not locked
          //     //     if (!model.isLocked()) {
          //     //       model.remove()
          //     //     }
          //     //   })
          //     //   this.engine.repaintCanvas()
          //   }
          // }
        }
      }
    })
  }
}
