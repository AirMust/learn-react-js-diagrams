import {
  DefaultPortModelOptions,
  NodeModel,
  NodeModelGenerics
} from '@projectstorm/react-diagrams'
import { CONST_FF_NODE } from './ConstFFNode.factory'
import { ConstFFPortModel } from '../port'

export interface ConstFFNodeModelGenerics {
  PORT: ConstFFPortModel
}

export type ConstFFPortModelProps = DefaultPortModelOptions & {
  name: string
  formatData: string
  isInput: boolean
  required?: boolean
  id: string
}

type ConstFFNodeModelProps = {
  name: string
  ports?: { [key: string]: ConstFFPortModelProps }
  icon?: string
  value?: string
}

type ConstFFNodeModelInitProps = {
  initialConfig: ConstFFNodeModelProps
}

export class ConstFFNodeModel extends NodeModel<
  NodeModelGenerics & ConstFFNodeModelGenerics
> {
  meta: ConstFFNodeModelProps

  constructor ({ initialConfig }: ConstFFNodeModelInitProps) {
    super({
      type: CONST_FF_NODE.NAME
    })
    const { name, ports, icon } = initialConfig
    this.meta = { name, icon }
    this.addPort(
      new ConstFFPortModel({
        name: 'x',
        id: '1043',
        formatData: 'number',
        isInput: false,
        required: true
      })
    )
    Object.values(this.ports).forEach(element => {
      console.log(element)
    })
  }
}
