import {
  DefaultLinkModel,
  DefaultPortModel
} from '@projectstorm/react-diagrams'
import { MODEL_FF_NODE } from '../node'

export class ModelFFPortModel extends DefaultPortModel {
  constructor ({ name, formatData, isInput, id, required = false }) {
    super({
      type: MODEL_FF_NODE.NAME,
      name: `${name}/${id}`,
      label: `${name}`,
      format: formatData,
      alignment: isInput ? 'left' : 'right',
      id,
      required,
    })
  }

  getFormat () {
    const typeData = this.getOptions().format
    return typeData
  }

  createLinkModel () {
    return new DefaultLinkModel()
  }
}
