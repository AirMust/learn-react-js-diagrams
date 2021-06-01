import { DefaultPortModel } from '@projectstorm/react-diagrams'

export class CustomPort extends DefaultPortModel {
  constructor ({ name, type, isIn }) {
    // here I don't have expected options after deserialize
    super({
      name: name,
      color: 'rgb(0,192,255)',
      format: type,
      in: isIn
    })
  }
  getFormat() {
	  const typeData = (this.getOptions()).format
	  return typeData
  }
}
