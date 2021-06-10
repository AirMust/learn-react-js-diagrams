import {
  State,
  Action,
  InputType,
  DragCanvasState,
  SelectingState
} from '@projectstorm/react-canvas-core'
import {
  PortModel,
  LinkModel,
  DragNewLinkState,
  DragDiagramItemsState
} from '@projectstorm/react-diagrams-core'

import SelectLinkState from './SelectLinkState'

/**
 * This class defines custom handlers (called states) to respond to
 * clicking events on certain elements.
 */
export default class StatesUp extends State {
  constructor () {
    super({
      name: 'diagram-states-up'
    })

    // You can grab the default state from `react-diagrams` for every one of these...
    this.childStates = [new SelectingState()]
    this.dragCanvas = new DragCanvasState()
    this.dragNewLink = new DragNewLinkState()
    this.dragItems = new DragDiagramItemsState()

    // But this is a custom one!
    this.selectLink = new SelectLinkState()

    // Determine what was clicked on

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: event => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event)
            console.log(event, element, 'UP')

        }
      })
    )
  }
}
