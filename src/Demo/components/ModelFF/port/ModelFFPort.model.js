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
      alignment: isInput ? 'left' : 'right',
      in: isInput,
      formatData,
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
