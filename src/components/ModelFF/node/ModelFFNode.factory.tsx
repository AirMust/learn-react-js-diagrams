import { ModelFFNodeWidget } from './ModelFFNode.widget'
import { ModelFFNodeModel } from './ModelFFNode.model'
import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'

export enum MODEL_FF_NODE {
  NAME = 'model-ff'
}

export class ModelFFNodeFactory extends AbstractReactFactory<
  ModelFFNodeModel,
  DiagramEngine
> {
  constructor () {
    super(MODEL_FF_NODE.NAME)
  }

  generateReactWidget (event: any): JSX.Element {
    return <ModelFFNodeWidget engine={this.engine} node={event.model} />
  }

  generateModel (props: any) {
    return new ModelFFNodeModel(props)
  }
}
