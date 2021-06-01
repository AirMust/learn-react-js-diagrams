import React, { FC, memo, useEffect, useRef } from 'react'
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DiagramEngine,
  DefaultLinkModel,
  LabelModel,
  LinkModel
} from '@projectstorm/react-diagrams'
import './DemoComponent.css'
import {
  BaseEntityEvent,
  CanvasWidget,
  DeleteItemsAction
} from '@projectstorm/react-canvas-core'
import { useDiagrams } from './useDiagrams'
import { RefObject } from 'react'
import { CustomDeleteItemsAction } from './actions/Delete.actions'
import { CustomMouseMoveItemsAction } from './actions/Mouse.move'
import { CustomNode } from './node'
import { CustomPort } from './node/CustomPort'

type WrapDiagramProps = {
  engine: DiagramEngine
  ref: React.LegacyRef<CanvasWidget>
}

const Diagrams: FC<WrapDiagramProps> = memo(({ engine, ref }) => {
  useEffect(() => {
    const model = engine.getModel()
    if (model) {
      const node1 = new CustomNode({
        name: 'Node 1',
        type: 'stream'
      })
      const node3 = new DefaultNodeModel('Node 1', 'red')

      const port1 = new CustomPort({
        name: 'Out 1',
        type: 'stream',
        isIn: false
      })

      node1.addPort(port1)
      node1.setPosition(100, 100)

	  const port3 = new CustomPort({
        name: 'Out 1(number)',
        type: 'number',
        isIn: false
      })
	  node3.addPort(port3)
      //3-B) create another default node
      const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)')
      const port2 = new CustomPort({
        name: 'In 1(stream)',
        type: 'stream',
        isIn: true
      })

      const port4 = new CustomPort({
        name: 'In 2 (number)',
        type: 'number',
        isIn: true
      })

      node2.addPort(port2)
      node2.addPort(port4)

      node2.setPosition(400, 100)

      //3-C) link the 2 nodes together
      let link1 = port1.link(port2)

      //4) add the models to the root graph
      model.addAll(node1, node2, node3, link1)

      // model.registerListener({
      // 	eventDidFire: 'model eventDidFire'
      // });
      //5) load model into engine
      engine.repaintCanvas()
    }
  }, [engine])
  return (
    engine.getModel() && (
      <CanvasWidget engine={engine} className={'canvas-widget'} ref={ref} />
    )
  )
})

export const DemoComponent: FC = memo(() => {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false })
  const model = new DiagramModel()
  engine.setModel(model)
  engine.getActionEventBus().registerAction(new CustomDeleteItemsAction())
  engine.getActionEventBus().registerAction(new CustomMouseMoveItemsAction())
  engine
    .getActionEventBus()
    .registerAction(
      new DeleteItemsAction({ keyCodes: [48, 8], modifiers: { ctrlKey: true } })
    )

  engine.getModel().registerListener({
    linksUpdated: (l: any) => {},
    nodesUpdated: (n: any) => {}
  })
  const ref = useRef(null)
  //   const { isUp } = useDiagrams(0)

  //   useEffect(() => {
  //     console.log('!', isUp)
  //   }, [isUp])

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

  //3-A) create a default node
  return (
    <>
      <button onClick={click}>Update</button>
      {engine && <Diagrams engine={engine} ref={ref} />}
    </>
  )
})
