import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams'
import { MODEL_FF_NODE } from './ModelFFNode.factory'
import { ModelFFPortModel } from '../port'

export interface ModelFFNodeModelGenerics {
  PORT: ModelFFPortModel
}

export type ModelFFPortModelProps = {
  name: string
  formatData: string
  isInput: boolean
  required?: boolean
  id: string
}

type ModelFFNodeModelProps = {
  name: string
  ports?: { [key: string]: ModelFFPortModelProps }
  icon?: string
}

type ModelFFNodeModelInitProps = {
  initialConfig: ModelFFNodeModelProps
}

export class ModelFFNodeModel extends NodeModel<
  NodeModelGenerics & ModelFFNodeModelGenerics
> {
  meta: ModelFFNodeModelProps

  constructor ({ initialConfig }: ModelFFNodeModelInitProps) {
    super({
      type: MODEL_FF_NODE.NAME
    })
    const { name, ports, icon } = initialConfig
    this.meta = { name, icon }
    if (ports) {
      const lists = Object.entries(ports)
      lists.forEach(([key, data]) => {
        this.addPort(new ModelFFPortModel({ ...data, id: key }))
      })
    }
  }
}
