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
import { ConstFFNodeFactory, CONST_FF_NODE } from './components/ConstFF'

type WrapDiagramProps = {
  engine: DiagramEngine
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
        color: 'gray',
        padding: 5,
        margin: 10,
        border: `1px solid ${color}`,
        borderRadius: 5,
        cursor: 'pointer'
      }}
    >
      {name}
    </div>
  )
})

const Diagrams: FC<WrapDiagramProps> = memo(({ engine }) => {
  const factories = engine.getNodeFactories().getFactories()
  const ModelFFFactory = factories.find(
    factory => factory.getType() === MODEL_FF_NODE.NAME
  )
  // const clickUo = () => {
  //   engine.getModel().getLayers()[0].allowRepaint();
  //   engine.getModel().getLayers()[1].allowRepaint();
  //   engine.repaintCanvas()
  //   // const model = engine.getModel();
  //   // var str = JSON.stringify(model.serialize())

  //   // //!------------- DESERIALIZING ----------------

  //   // var model2 = new DiagramModel()
  //   // console.log(model.serialize())
  //   // model2.deserializeModel(JSON.parse(str), engine)
  //   // engine.setModel(model2)
  //   // console.log(engine)

  //   // const model = engine.getModel();
  //   // const modelSerial = model.serialize();
  //   // console.log(modelSerial)
  //   // const model2 = new DiagramModel(modelSerial);
  //   // // model2(modelSerial)
  //   // // engine.mode
  //   // engine.setModel(model2);
  // }

  return engine.getModel() && ModelFFFactory ? (
    <Panel>
      <Workspace
        header={<h1>Header my app</h1>}
        tools={
          <div style={{ width: '100%' }}>
            <h3>Tools</h3>
            <button>Update</button>
            <Items model={{ name: '0 Port' }} name='0 Port' color='red' />
            <Items
              model={{ name: '1-in/3-out Port' }}
              name='4 Port'
              color='blue'
            />
          </div>
        }
      >
        <div
          onClick={event => engine.repaintCanvas()}
          style={{ height: '100%' }}
          onDrop={event => {
            const data = JSON.parse(
              event.dataTransfer.getData('storm-diagram-node')
            )
            const node = ModelFFFactory.generateModel({
              initialConfig: { name: data.name }
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
          <CanvasWidget engine={engine} className={'canvas-widget'} />
        </div>
      </Workspace>
    </Panel>
  ) : (
    <div>Load</div>
  )
})

export const DemoComponent: FC = memo(() => {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false })

  engine.getNodeFactories().registerFactory(new ConstFFNodeFactory())
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
  const ConstFF = factories.find(
    factory => factory.getType() === CONST_FF_NODE.NAME
  )
  if (ConstFF) {
    const node = ConstFF.generateModel({
      initialConfig: { name: 'fdsfsdfs' }
    })
    model.addNode(node)
  }
  if (ModelFFFactory) {
    panel.nodes.forEach(metaNode => {
      const node = ModelFFFactory.generateModel({
        initialConfig: { ...metaNode }
      })
      model.addNode(node)
    })
    // panel.links.forEach(link => {
    //   const { input, output } = link
    //   let p1 = null
    //   let p2 = null
    //   model.getNodes().forEach(nodes => {
    //     Object.values(nodes.getPorts()).forEach(port => {
    //       if (port.getID() === input) {
    //         p1 = port
    //       }
    //       if (port.getID() === output) {
    //         p2 = port
    //       }
    //     })
    //   })
    //   if (p1 && p2) {
    //     let link: LinkModel = (p1 as any).link(p2)
    //     model.addLink(link)
    //   }
    // })
  }

  model.setGridSize(10)
  engine.setModel(model)


  // engine.getModel().registerListener({
  //   linksUpdated: (l: any) => {},
  //   nodesUpdated: (n: any) => {
  //     console.log(n)
  //   }
  // })

  model.registerListener({
    linksUpdated: (e: any) => {
      if (e.isCreated) {
        const link = e.link
        const sourcePort = link.getSourcePort() as ModelFFPortModel

        if (Object.keys(sourcePort.getLinks()).length > 1) {
          link.remove()
        } else if (sourcePort.getOptions().in) {
          link.remove()
        }
      }
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
