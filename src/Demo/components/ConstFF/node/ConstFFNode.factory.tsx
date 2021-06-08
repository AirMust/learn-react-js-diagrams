import { ConstFFNodeWidget } from './ConstFFNode.widget'
import { ConstFFNodeModel } from './ConstFFNode.model'
import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'

export enum CONST_FF_NODE {
  NAME = 'const-ff'
}

export class ConstFFNodeFactory extends AbstractReactFactory<
  ConstFFNodeModel,
  DiagramEngine
> {
  constructor () {
    super(CONST_FF_NODE.NAME)
  }

  generateReactWidget (event: any): JSX.Element {
    return <ConstFFNodeWidget engine={this.engine} node={event.model} />
  }

  generateModel (props: any) {
    return new ConstFFNodeModel(props)
  }
}
