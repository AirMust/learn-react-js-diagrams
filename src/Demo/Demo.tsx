import React, { FC, memo, useEffect, useRef } from 'react'
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
import { ConstFFNodeModel } from './components/ConstFF/node/ConstFFNode.model'
import { useDispatch } from 'react-redux'
import { cpNodeThunk, setModelThunk } from '../core/store/actions/model.actions'
import { DefaultState } from './state/DefState'
import StatesDown from './state/DefStateDown'
import commandHandlers from './handler/commandHandlers'
import CommandManager from './handler/CommandManager'
import StatesUp from './state/DefStateUp'
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

            node.registerListener({
              nodeLinkAdded: (e: any) => {
                console.log(e)
              }
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

  // engine.maxNumberPointsPerLink = 0

  const dispatch = useDispatch()

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
      initialConfig: { name: 'fdsfsdfs', dispatch: dispatch }
    })
    model.addNode(node)
  }

  if (ModelFFFactory) {
    panel.nodes.forEach(metaNode => {
      const node = ModelFFFactory.generateModel({
        initialConfig: { ...metaNode, dispatch: dispatch }
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

  useEffect(() => {
    const nodes = engine.getModel().getNodes()
    const meta = nodes.reduce((result: any, obj) => {
      const node: any = obj
      const id = node.getOptions().id;
      result[id] = { ...node.meta, ...node.getOptions() }
      return result
    }, {})
    // const node: any = nodes[3];
    // console.log({...node.meta, ...node.getOptions()})
    dispatch(setModelThunk(meta))
  }, [model])

  // setTimeout(() =>{
  //   const nodes = engine.getModel().getNodes();
  //   const meta = nodes.map(obj => {
  //     const node: any = obj;
  //     node.meta.name = `${node.meta.name}_${node.meta.name}`;

  //     return {...node.meta, ...node.getOptions()}
  //   })
  //   // const node: any = nodes[3];
  //   // console.log({...node.meta, ...node.getOptions()})
  //   dispatch(setModelThunk(meta))
  // }, 4000)

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
      else{
        dispatch(cpNodeThunk())
      }
    }
  })
  // engine.getActionEventBus().registerAction()
  engine.getStateMachine().pushState(new StatesUp())
  engine.getStateMachine().pushState(new StatesDown())

  engine.getActionEventBus().registerAction(new CustomMouseMoveItemsAction())
  // engine.getStateMachine().pushState(new DefaultState());

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
