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
export default class StatesDown extends State {
  constructor () {
    super({
      name: 'diagram-states-down'
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
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event)
          console.log(event, element, 'reg', this.engine.getModel())
          // The canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.checkLinks()
            this.transitionWithEvent(this.dragCanvas, event)
          }
          // Initiate dragging a new link
          else if (element instanceof PortModel) {
            this.transitionWithEvent(this.dragNewLink, event)
            // console.log('creat', element)
          }
          // Link selection <============================================
          else if (element instanceof LinkModel) {
            this.transitionWithEvent(this.selectLink, event)
          }
          // Move items
          else {
            // console.log(event, element)
            this.transitionWithEvent(this.dragItems, event)
          }
        }
      })
    )
  }

  checkLink (link) {
    const soursePort = link.getSourcePort()
    const targetPort = link.getTargetPort()
    // TODO: !
    console.log(soursePort, targetPort, 'ref')
    if (!soursePort || !targetPort) {
      link.remove()
    } else {
      const sourceOpt = soursePort?.getOptions()
      const targetOpt = targetPort?.getOptions()
      if (sourceOpt?.formatData !== targetOpt?.formatData) {
        link.remove()
      }
    }
  }
  checkLinks () {
    const model = this.engine.getModel()
    const links = model.getLinks()
    links.forEach(obj => this.checkLink(obj))
  }
}
