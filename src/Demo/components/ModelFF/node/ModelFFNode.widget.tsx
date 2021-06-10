import * as React from 'react'
import { ModelFFNodeModel, ModelFFPortModelProps } from './ModelFFNode.model'
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams'
import { memo, FC } from 'react'
import { Divider, IconButton, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import { useCallback } from 'react'
import { useState } from 'react'
import { Clear } from '@material-ui/icons'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { modelSelector } from '../../../../core/store/selectors'

export interface ModelFFNodeWidgetProps {
  node: ModelFFNodeModel
  engine: DiagramEngine
}

type MetaPortProps = {
  options: ModelFFPortModelProps & {
    isLink?: boolean
  }
  indicator: any
}

const HEIGHT = 24
const WIDTH = 30
const MIN_WIDTH = 150
const WIDTH_TEXT = Math.ceil(MIN_WIDTH - 2 * WIDTH) / 2

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    minWidth: MIN_WIDTH,
    zIndex: 0,
    gridTemplateAreas: '"head head head head" "ind1 input output ind2"',
    gridTemplateColumns: `${WIDTH}px auto auto ${WIDTH}px`,
    border: `1px solid rgba(0,0,0,0)`,
    '& > div:nth-child(1)': {
      textAlign: 'center',
      margin: theme.spacing(1),
      gridArea: 'head',
      '& > div:nth-child(1)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      '& > hr': {
        marginTop: theme.spacing(1)
      }
    },
    '& *': {
      textAlign: 'center'
    },
    '&:hover': {
      borderColor: theme.palette.primary.light
    }
  },
  selected: {
    borderColor: theme.palette.primary.light
  },
  portIsLink: {
    background: theme.palette.primary.main
  },
  isCompletedLeft: {
    borderLeft: '2px solid red'
  },
  port: {
    margin: `${theme.spacing(0.5)}px 0px`,
    position: 'relative',
    '& > div': {
      height: HEIGHT,
      width: WIDTH
    },
    '& > div:nth-child(1)': {
      position: 'absolute',
      zIndex: -1,
      background: theme.palette.background.default
    },
    '& > div:nth-child(2)': {
      zIndex: 1,
      background: theme.palette.grey[600],
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.primary.light
      }
    }
  },
  textIndicator: {
    height: HEIGHT,
    zIndex: 1,
    minWidth: WIDTH_TEXT,
    background: theme.palette.background.default,
    padding: `0px ${theme.spacing(0.5)}px`,
    margin: `${theme.spacing(0.5)}px 0px`,
    display: 'table'
  },
  leftBorder: {
    borderRadius: `0px ${theme.spacing(1)}px ${theme.spacing(1)}px 0px`
  },
  rightBorder: {
    borderRadius: `${theme.spacing(1)}px 0px 0px  ${theme.spacing(1)}px`
  },
  leftMargin: {
    marginLeft: theme.spacing(1)
  },
  rightMargin: {
    marginRight: theme.spacing(1)
  },
  leftRequiredOff: {
    borderLeft: `4px solid ${theme.palette.error.main}`
  },
  rightRequiredOff: {
    borderRight: `4px solid ${theme.palette.error.main}`
  },
  leftRequiredOn: {
    borderLeft: `4px solid ${theme.palette.success.main}`
  },
  rightRequiredOn: {
    borderRight: `4px solid ${theme.palette.success.main}`
  }
}))

export const ModelFFNodeWidget: FC<ModelFFNodeWidgetProps> = memo(
  ({ node, engine }) => {
    const classes = useStyles()

    const meta = useSelector(modelSelector)

    useEffect(() => {
      console.log(meta)
    }, [meta])

    const [update, setUpdate] = useState(node.meta.key || '100500')
    const { name } = node.meta
    const ports = node.getPorts()
    const getMetaProps = useCallback(
      (flag: boolean) => {
        const dataPorts = Object.values(ports)
        const metaPorts: MetaPortProps[] = []
        dataPorts.forEach(port => {
          const option = port.getOptions() as any
          if (option.in === flag) {
            const options: MetaPortProps['options'] = port.getOptions() as ModelFFPortModelProps

            options.isLink = Object.keys(port.getLinks()).length !== 0

            metaPorts.push({
              indicator: port,
              options
            })
          }
        })
        return metaPorts
      },
      [ports, node]
    )

    const indicatorControls = (flag: boolean) => {
      const meta = getMetaProps(flag)
      const control = meta.map(({ indicator, options }) => (
        <PortWidget port={indicator} engine={engine} className={classes.port}>
          <div />
          <div
            className={clsx(
              { [classes.rightBorder]: !flag },
              { [classes.leftBorder]: flag },
              { [classes.rightRequiredOff]: !flag && options.required },
              { [classes.leftRequiredOff]: flag && options.required },
              { [classes.rightRequiredOn]: !flag && options?.isLink },
              { [classes.leftRequiredOn]: flag && options?.isLink }
            )}
          >
            {options.formatData[0]}
          </div>
        </PortWidget>
      ))
      return control
    }

    const nameControls = (flag: boolean) => {
      const meta = getMetaProps(flag)
      const control = meta.map(({ options }) => (
        <div
          className={clsx(
            { [classes.rightBorder]: !flag },
            { [classes.leftBorder]: flag },
            { [classes.rightMargin]: flag },
            { [classes.leftMargin]: !flag },
            classes.textIndicator
          )}
        >
          {options.label}
        </div>
      ))
      return control
    }

    // const logerClick = () => {
    //   const x = node.meta as any
    //   x.name += '1'
    //   engine.repaintCanvas()
    //   console.log(engine.getModel().getNodes())
    //   // node.meta.key = uuid()
    //   setUpdate(uuid())
    // }

    return (
      <div
        className={clsx(classes.root, {
          // [classes.selected]: node.getOptions()?.selected
        })}
        key={update}
        // onClick={logerClick}
      >
        <div>
          <div>
            <AccessAlarmIcon fontSize='small' />
            {name}
            <IconButton
              aria-label='delete'
              size='small'
              onClick={() => {
                node.remove()
              }}
            >
              <Clear fontSize='small' style={{ color: 'red' }} />
            </IconButton>
          </div>
          <Divider />
        </div>
        <div>{indicatorControls(true)}</div>
        <div>{nameControls(true)}</div>
        <div>{nameControls(false)}</div>
        <div>{indicatorControls(false)}</div>
      </div>
    )
  }
)
