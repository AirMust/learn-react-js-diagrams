import {
  DefaultPortModelOptions,
  NodeModel,
  NodeModelGenerics
} from '@projectstorm/react-diagrams'
import { MODEL_FF_NODE } from './ModelFFNode.factory'
import { ModelFFPortModel } from '../port'
import { v4 as uuid } from 'uuid';

export interface ModelFFNodeModelGenerics {
  PORT: ModelFFPortModel
}

export type ModelFFPortModelProps = DefaultPortModelOptions & {
  name: string
  formatData: string
  isInput: boolean
  required?: boolean
  id: string
}

type ModelFFNodeModelProps = {
  name: string
  ports?: { [key: string]: ModelFFPortModelProps }
  icon?: string,
  key?: string,
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
    const key = uuid();
    this.meta = { name, icon, key }
    if (ports) {
      const lists = Object.entries(ports)
      lists.forEach(([key, data]) => {
        this.addPort(new ModelFFPortModel({ ...data, id: key }))
      })
    }
  }
}
