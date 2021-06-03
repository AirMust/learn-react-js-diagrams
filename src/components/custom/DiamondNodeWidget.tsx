import * as React from 'react'
import { DiamondNodeModel } from './DiamondNodeModel'
import {
  DiagramEngine,
  PortModelAlignment,
  PortModelGenerics,
  PortWidget
} from '@projectstorm/react-diagrams'
import styled from '@emotion/styled'
import './Custom.css'
import { DiamondPortModel } from './DiamondPortModel'
import { memo, useCallback, FC, useMemo } from 'react'
import { PortModel } from 'storm-react-diagrams'

export interface DiamondNodeWidgetProps {
  node: DiamondNodeModel
  engine: DiagramEngine
}

type MetaPortProps = {
  name: string
  indicator: any
}

export const DiamondNodeWidget: FC<DiamondNodeWidgetProps> = memo(
  ({ node, engine }) => {
    const { name } = node.meta
    const ports = node.getPorts()

    const getMetaProps = (flag: boolean) => {
      const dataPorts = Object.values(ports)
      const metaPorts: MetaPortProps[] = []
      dataPorts.forEach(port => {
        const option = port.getOptions() as any
        if (option.in === flag) {
          metaPorts.push({ indicator: port, name: port.getOptions().name })
        }
      })
      return metaPorts
    }

    const inputIndicator = useCallback(
      (flag: boolean) => {
        const meta = getMetaProps(flag)
        // console.log(meta[0].indicator.getOptions().format[0])
        const control = meta.map(({ indicator }) => (
          <PortWidget
            port={indicator}
            engine={engine}
            style={{
              marginTop: 3,
              marginBottom: 3,
              position: 'relative',
              left: flag ? -1 : 0
            }}
          >
            <div className='port_diamon_bg'></div>
            <div
              className='port_diamon'
              style={{
                borderRadius: !flag ? '8px 0px 0px 8px' : '0px 8px 8px 0px'
              }}
            >
              {indicator.getOptions().format[0]}
            </div>
          </PortWidget>
        ))
        return control
      },
      [node]
    )

    const inputName = useCallback(
      (flag: boolean) => {
        const meta = getMetaProps(flag)
        const control = meta.map(({ name }) => (
          <div
            style={{
              borderRadius: !flag ? '8px 0px 0px 8px' : '0px 8px 8px 0px'
            }}
            className={'port_diamon_text'}
          >
            {' '}
            {name}
          </div>
        ))
        return control
      },
      [node]
    )

    return (
      <div className='diamond-node' style={{ position: 'relative' }}>
        <p className='diamond-node_title'>{name}</p>
        <div className='diamond-node_input_indicator'>
          {inputIndicator(true)}
        </div>
        <div className='diamond-node_input'>{inputName(true)}</div>
        <div className='diamond-node_output_indicator'>
          {inputIndicator(false)}
        </div>
        <div className='diamond-node_output'>{inputName(false)}</div>

        <div>
          <div></div>
        </div>
      </div>
    )
  }
)
