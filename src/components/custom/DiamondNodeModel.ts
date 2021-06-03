import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment
} from '@projectstorm/react-diagrams'
import { DiamondPortModel } from './DiamondPortModel'

export interface DiamondNodeModelGenerics {
  PORT: DiamondPortModel
}

export type DiamondPortModelProps = {
  name: string
  formatData: string
  isInput: boolean
  id: string
}

type DiamondNodeModelProps = {
  name: string
  ports?: { [key: string]: DiamondPortModelProps }
}

type DiamondNodeModelInitProps = {
  initialConfig: DiamondNodeModelProps
}

export class DiamondNodeModel extends NodeModel<
  NodeModelGenerics & DiamondNodeModelGenerics
> {
  meta: DiamondNodeModelProps

  constructor ({ initialConfig }: DiamondNodeModelInitProps) {
    super({
      type: 'diamond'
    })
    const { name, ports } = initialConfig
    this.meta = { name }
    if (ports) {
      const lists = Object.entries(ports)
      lists.forEach(([key, data]) => {
        this.addPort(new DiamondPortModel({ ...data, id: key }))
      })
    }
    // this.addPort(new DiamondPortModel(PortModelAlignment.TOP))
    // this.addPort(new DiamondPortModel(PortModelAlignment.LEFT))
    // this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM))
    // this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))
  }
}
