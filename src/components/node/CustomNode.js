import { DefaultNodeModel } from '@projectstorm/react-diagrams'

export class CustomNode extends DefaultNodeModel {
  constructor ({ name }) {
    // here I don't have expected options after deserialize
    super({
      name: name,
      color: 'rgb(0,192,255)',
      id: name,
    })
  }
}
