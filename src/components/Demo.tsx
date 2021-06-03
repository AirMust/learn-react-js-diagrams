import React, { FC, memo, useRef } from 'react'
import createEngine, {
  DiagramModel,
  DiagramEngine,
  LinkModel
} from '@projectstorm/react-diagrams'
import './DemoComponent.css'
import {
  CanvasWidget,
  DeleteItemsAction
} from '@projectstorm/react-canvas-core'
import { CustomDeleteItemsAction } from './actions/Delete.actions'
import { CustomMouseMoveItemsAction } from './actions/Mouse.move'
import { panel } from './Data.mock'
import { AdvancedLinkFactory } from './node/CustomLink'
import { ModelFFNodeFactory, MODEL_FF_NODE } from './ModelFF'
import { SimplePortFactory } from './ModelFF/port/SimplePort.factory'
import { ModelFFPortModel } from './ModelFF/port'

type WrapDiagramProps = {
  engine: DiagramEngine
}

const Diagrams: FC<WrapDiagramProps> = memo(({ engine }) => {
  return (
    engine.getModel() && (
      <CanvasWidget engine={engine} className={'canvas-widget'} />
    )
  )
})

export const DemoComponent: FC = memo(() => {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false })

  engine.getNodeFactories().registerFactory(new ModelFFNodeFactory())
  engine.getLinkFactories().registerFactory(new AdvancedLinkFactory())
  engine.getActionEventBus().registerAction(new CustomDeleteItemsAction())

  engine
    .getActionEventBus()
    .registerAction(
      new DeleteItemsAction({ keyCodes: [48, 8], modifiers: { ctrlKey: true } })
    )
    engine
		.getPortFactories()
		.registerFactory(new SimplePortFactory(MODEL_FF_NODE.NAME, (config) => new ModelFFPortModel()));

  const model = new DiagramModel()

  const factories = engine.getNodeFactories().getFactories()

  const ModelFFFactory = factories.find(
    factory => factory.getType() === 'model-ff'
  )
  if (ModelFFFactory) {
    panel.nodes.forEach(metaNode => {
      const node = ModelFFFactory.generateModel({
        initialConfig: { ...metaNode }
      })
      model.addNode(node)
    })
    panel.links.forEach(link => {
      const { input, output } = link
      let p1 = null
      let p2 = null
      model.getNodes().forEach(nodes => {
        Object.values(nodes.getPorts()).forEach(port => {
          if (port.getID() === input) {
            p1 = port
          }
          if (port.getID() === output) {
            p2 = port
          }
        })
      })
      if (p1 && p2) {
        let link: LinkModel = (p1 as any).link(p2)
        model.addLink(link)
      }
    })
  }

  engine.setModel(model)

  engine.getModel().registerListener({
    linksUpdated: (l: any) => {},
    nodesUpdated: (n: any) => {}
  })
  engine.getActionEventBus().registerAction(new CustomMouseMoveItemsAction())

  const click = () => {
    let model = engine.getModel()
    const nodes = model.getNodes()
    const listKey = Object.keys(nodes)
    console.log(Object.keys(nodes), engine)
    if (listKey.length) {
      let node = nodes[0]
      node.setPosition(node.getX() + 30, node.getY() + 30)
      engine.repaintCanvas()
    }
  }

  return (
    <>
      <button onClick={click}>Update</button>
      {engine && <Diagrams engine={engine} />}
    </>
  )
})
