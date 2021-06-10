import {
  DefaultLinkModel,
  DefaultPortModel
} from '@projectstorm/react-diagrams'
import { CONST_FF_NODE } from '../node'
import { upNodeThunk } from '../../../../core/store/actions/model.actions'
export class ConstFFPortModel extends DefaultPortModel {
  constructor ({ name, formatData, isInput, id, required = false, dispatch }) {
    super({
      type: CONST_FF_NODE.NAME,
      name: `${name}/${id}`,
      label: `${name}`,
      alignment: isInput ? 'left' : 'right',
      in: isInput,
      formatData,
      id,
      required
    })
    this.dispatch = dispatch
  }
  getFormat () {
    const typeData = this.getOptions().format
    return typeData
  }

  updateNode (e) {
    const { port } = e
    const { parent } = port
    const meta = { ...parent.getOptions(), ...parent.meta }
    this.dispatch(upNodeThunk(meta))
  }

  createLinkModel () {
    const link = new DefaultLinkModel()
    link.registerListener({
      targetPortChanged: e => {
        const { entity } = e
        const { sourcePort, targetPort } = entity
        if (
          targetPort.getOptions().formatData ===
          sourcePort.getOptions().formatData
        ) {
          this.updateNode(e)
        } else {
          entity.remove()
        }
      },
      sourcePortChanged: e => {
        this.updateNode(e)
      }
    })
    return link
  }
}
