import {
  DefaultPortModelOptions,
  NodeModel,
  NodeModelGenerics
} from '@projectstorm/react-diagrams'
import { CONST_FF_NODE } from './ConstFFNode.factory'
import { ConstFFPortModel } from '../port'
import { v4 as uuid } from 'uuid'

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
  dispatch?: any
}

type ConstFFNodeModelInitProps = {
  initialConfig: ConstFFNodeModelProps
}

export class ConstFFNodeModel extends NodeModel<
  NodeModelGenerics & ConstFFNodeModelGenerics
> {
  meta: ConstFFNodeModelProps
  header: any
  constructor ({ initialConfig }: ConstFFNodeModelInitProps) {
    super({
      type: CONST_FF_NODE.NAME
    })
    const { name, icon, dispatch } = initialConfig
    this.meta = { name, icon }
    this.header = {
      tooltip: 'Тип узла: Константа',
      color: 'cornflowerblue',
      icon: 'border_all'
    }
    this.addPort(
      new ConstFFPortModel({
        name: 'Выходной порт',
        id: uuid(),
        formatData: 'number',
        isInput: false,
        required: true,
        dispatch
      })
    )
  }
}
