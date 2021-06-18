import {
  DefaultLinkModel,
  DefaultPortModel
} from '@projectstorm/react-diagrams'
import { upNodeThunk } from '../../../../core/store/actions/model.actions'

export class ModelFFPortModel extends DefaultPortModel {
  constructor ({ name, formatData, isInput, id, required = false, dispatch }) {
    super({
      type: 'custom-node',
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

  updateNode (e) {
    const { port } = e
    const { parent } = port
    const meta = { ...parent.getOptions(), ...parent.meta }
    this.dispatch(upNodeThunk(meta))
  }

  getFormatData (port) {
    if (!port) return undefined
    const optionPort = port.getOptions()
    if (!optionPort) return undefined
    return optionPort.formatData
  }

  createLinkModel () {
    const link = new DefaultLinkModel()
    link.registerListener({
      targetPortChanged: e => {
        const { entity } = e
        const { sourcePort, targetPort } = entity
        const sourseFormat = this.getFormatData(sourcePort)
        const targetFormat = this.getFormatData(targetPort)
        if (sourcePort && sourseFormat === targetFormat) {
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
