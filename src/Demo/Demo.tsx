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
import {
  ModelFFPortModel,
  SimplePortFactory,
  ModelFFNodeFactory,
  MODEL_FF_NODE,
  Panel,
  Workspace
} from './components'
import { useState } from 'react'

type WrapDiagramProps = {
  engine: DiagramEngine
  key: any
}

export type TrayItemWidgetProps = {
  model: any
  color?: string
  name: string
}

const Items: FC<TrayItemWidgetProps> = memo(({ name, color, model }) => {
  return (
    <div
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData('storm-diagram-node', JSON.stringify(model))
      }}
      style={{
        color: 'white',
        padding: 5,
        margin: '0px 10px',
        border: `1px solid ${color}`,
        borderRadius: 5,
        marginBottom: 2,
        cursor: 'pointer'
      }}
    >
      {name}
    </div>
  )
})

const Diagrams: FC<WrapDiagramProps> = memo(({ engine, key }) => {
  const factories = engine.getNodeFactories().getFactories()
  const ModelFFFactory = factories.find(
    factory => factory.getType() === MODEL_FF_NODE.NAME
  )

  return (
    engine.getModel() &&
    ModelFFFactory && (
      <Panel>
        <Workspace
          header={<h1>Storm React Diagrams - DnD demo</h1>}
          tools={
            <div>
              <h3>Tools</h3>
              <Items model={{ type: 'in' }} name='in mode' color='red' />
            </div>
          }
        >
          <div
            onDrop={event => {
              const node = ModelFFFactory.generateModel({
                initialConfig: { name: '123' }
              })
              const point = engine.getRelativeMousePoint(event)
              node.setPosition(point)

              engine.getModel().addNode(node)
              engine.repaintCanvas()
            }}
            onDragOver={event => {
              event.preventDefault()
            }}
          >
            <CanvasWidget
              engine={engine}
              className={'canvas-widget'}
              key={key}
            />
          </div>
        </Workspace>
      </Panel>
    )
  )
})

export const DemoComponent: FC = memo(() => {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false })

  engine.getNodeFactories().registerFactory(new ModelFFNodeFactory())
  engine.getActionEventBus().registerAction(new CustomDeleteItemsAction())

  engine
    .getActionEventBus()
    .registerAction(
      new DeleteItemsAction({ keyCodes: [48, 8], modifiers: { ctrlKey: true } })
    )
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        MODEL_FF_NODE.NAME,
        config => new ModelFFPortModel()
      )
    )

  const model = new DiagramModel()
  const [up, setUp] = useState('43')
  const factories = engine.getNodeFactories().getFactories()

  const ModelFFFactory = factories.find(
    factory => factory.getType() === MODEL_FF_NODE.NAME
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
  model.setGridSize(10)
  engine.setModel(model)

  engine.getModel().registerListener({
    linksUpdated: (l: any) => {},
    nodesUpdated: (n: any) => {
      console.log(n)
    }
  })
  engine.getActionEventBus().registerAction(new CustomMouseMoveItemsAction())

  const click = () => {
    let model = engine.getModel()
    const nodes = model.getNodes()
    const listKey = Object.keys(nodes)
    if (listKey.length) {
      let node = nodes[2]
      node.setSelected(true)
      node.setPosition(node.getX() + 30, node.getY() + 30)
      engine.repaintCanvas()
    }
  }

  return <>{engine && <Diagrams engine={engine} key={up} />}</>
})
