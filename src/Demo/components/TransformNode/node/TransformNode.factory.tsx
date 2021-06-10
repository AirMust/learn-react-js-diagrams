import { ConstFFNodeWidget } from './TransformNode.widget'
import { ConstFFNodeModel } from './TransformNode.model'
import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'

export enum CONST_FF_NODE {
  NAME = 'const-ff'
}

export class TransformNodeFactory extends AbstractReactFactory<
TransformNodeModel,
  DiagramEngine
> {
  constructor () {
    super(CONST_FF_NODE.NAME)
  }

  generateReactWidget (event: any): JSX.Element {
    return <TransformNodeWidget engine={this.engine} node={event.model} />
  }

  generateModel (props: any) {
    return new TransformNodeModel(props)
  }
}
