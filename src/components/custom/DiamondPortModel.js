import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  DefaultPortModel
} from '@projectstorm/react-diagrams'

// export type DiamondPortModelProps = {
//   name: string,
//   formatData: string,
//   isInput: boolean,
//   id: string
// }

export class DiamondPortModel extends DefaultPortModel {
  constructor ({ name, formatData, isInput, id }) {
    super({
      type: 'diamond',
      name: `${name}`,
      format: formatData,
      in: isInput,
      id: id,
      alignment: isInput ? 'left' : 'right'
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
