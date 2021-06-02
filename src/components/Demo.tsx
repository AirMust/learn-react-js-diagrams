import React, { FC, memo, useEffect, useRef } from 'react'
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DiagramEngine,
  DefaultLinkModel,
  LabelModel,
  LinkModel,
  PortModel,
  PortModelGenerics,
  DefaultPortModel,
  PortModelAlignment
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
import { panel } from './Data.mock'
import { AdvancedLinkFactory, AdvancedPortModel } from './node/CustomLink'
import { SimplePortFactory } from './custom/SimplePortFactory'
import { DiamondPortModel } from './custom/DiamondPortModel'
import { DiamondNodeFactory } from './custom/DiamondNodeFactory'
import { DiamondNodeModel } from './custom/DiamondNodeModel'

type WrapDiagramProps = {
  engine: DiagramEngine
  ref: React.LegacyRef<CanvasWidget>
}

const Diagrams: FC<WrapDiagramProps> = memo(({ engine, ref }) => {
  //   useEffect(() => {
  //     const model = engine.getModel()
  //     if (model) {
  //       const node1 = new CustomNode({
  //         name: 'Node 1'
  //       })
  //       const node3 = new DefaultNodeModel('Node 1', 'red')

  //       const port1 = new CustomPort({
  //         name: 'Out 1',
  //         type: 'stream',
  //         isIn: false
  //       })

  //       node1.addPort(port1)
  //       node1.setPosition(100, 100)

  //       const port3 = new CustomPort({
  //         name: 'Out 1(number)',
  //         type: 'number',
  //         isIn: false
  //       })
  //       node3.addPort(port3)
  //       //3-B) create another default node
  //       const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)')
  //       const port2 = new CustomPort({
  //         name: 'In 1(stream)',
  //         type: 'stream',
  //         isIn: true
  //       })

  //       const port4 = new CustomPort({
  //         name: 'In 2 (number)',
  //         type: 'number',
  //         isIn: true
  //       })

  //       node2.addPort(port2)
  //       node2.addPort(port4)

  //       node2.setPosition(400, 100)

  //       //3-C) link the 2 nodes together
  //       let link1 = port1.link(port2)

  //       //4) add the models to the root graph
  //       model.addAll(node1, node2, node3, link1)

  //       // model.registerListener({
  //       // 	eventDidFire: 'model eventDidFire'
  //       // });
  //       //5) load model into engine
  //       engine.repaintCanvas()
  //     }
  //   }, [engine])
  return (
    engine.getModel() && (
      <CanvasWidget engine={engine} className={'canvas-widget'} ref={ref} />
    )
  )
})

export const DemoComponent: FC = memo(() => {
  const engine = createEngine({ registerDefaultDeleteItemsAction: false })
  const model = new DiagramModel()

  panel.nodes.forEach(metaNode => {
    const node = new CustomNode({ name: metaNode.name })
    const lists = Object.entries(metaNode.ports)
    model.addNode(node)
    lists.forEach(([key, data]) => {
      const port = new CustomPort({
        id: key,
        ...data
      })
      node.addPort(port)
    })
  })
  panel.links.forEach(link => {
    const { input, output } = link
    let p1 = null
    let p2 = null
    model.getNodes().forEach(nodes => {
      Object.values(nodes.getPorts()).find(port => {
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

  engine.getLinkFactories().registerFactory(new AdvancedLinkFactory())
  engine.getPortFactories().registerFactory(
    new SimplePortFactory(
      'diamond',
      config => new DiamondPortModel(PortModelAlignment.LEFT),
    )
  )
  engine.getPortFactories().registerFactory(
    new SimplePortFactory(
      'diamond',
      config => new DiamondPortModel(PortModelAlignment.BOTTOM),
    )
  )
  engine.getNodeFactories().registerFactory(new DiamondNodeFactory())

  const node5 = new DiamondNodeModel()
  // create some nodes
  // var node1 = new DefaultNodeModel('Source', 'rgb(0,192,255)')
  // let port1 = node1.addPort(new AdvancedPortModel(false, 'out-1', 'Out thick'))
  // let port2 = node1.addPort(new DefaultPortModel(false, 'out-2', 'Out default'))
  // node1.setPosition(100, 100)

  // var node2 = new DefaultNodeModel('Target', 'rgb(192,255,0)')
  // var port3 = node2.addPort(new AdvancedPortModel(true, 'in-1', 'In thick'))
  // var port4 = node2.addPort(new DefaultPortModel(true, 'in-2', 'In default'))
  // node2.setPosition(300, 100)

  // var node3 = new DefaultNodeModel('Source', 'rgb(0,192,255)')
  // node3.addPort(new AdvancedPortModel(false, 'out-1', 'Out thick'))
  // node3.addPort(new DefaultPortModel(false, 'out-2', 'Out default'))
  // node3.setPosition(100, 200)

  // var node4 = new DefaultNodeModel('Target', 'rgb(192,255,0)')
  // node4.addPort(new AdvancedPortModel(true, 'in-1', 'In thick'))
  // node4.addPort(new DefaultPortModel(true, 'in-2', 'In default'))
  // node4.setPosition(300, 200)

  // model.addAll(port1.link(port3), port2.link(port4));

  // add everything else
  model.addAll(node5)

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
