import * as React from 'react'
import { ConstFFNodeModel, ConstFFPortModelProps } from './ConstFFNode.model'
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams'
import { memo, FC } from 'react'
import { Divider, makeStyles, TextField, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import { useCallback } from 'react'
import { useState } from 'react'
import { ToggleButtonsMultiple } from './components'
import { useSelector } from 'react-redux'
import { modelSelector } from '../../../../core/store'
import { useEffect } from 'react'
import { BorderAll, Clear } from '@material-ui/icons'
export interface ConstFFNodeWidgetProps {
  node: ConstFFNodeModel
  engine: DiagramEngine
}

type MetaPortProps = {
  options: ConstFFPortModelProps & {
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
    gridTemplateAreas:
      '"head head head head" "type type type ind2" "value value value ind2"',
    gridTemplateColumns: `${WIDTH}px auto auto ${WIDTH}px`,
    border: `1px solid rgba(0,0,0,0)`,
    '& > div:nth-child(1)': {
      textAlign: 'center',
      margin: theme.spacing(1),
      gridArea: 'head',
      '& > div:nth-child(1)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      zIndex: -1
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

export const ConstFFNodeWidget: FC<ConstFFNodeWidgetProps> = memo(
  ({ node, engine }) => {
    const meta = useSelector(modelSelector)

    useEffect(() => {
      console.log(meta)
    }, [meta])

    const classes = useStyles()
    const [formats, setFormats] = React.useState(() => 'n')
    const [update, setUpdate] = useState(0)

    const ports = React.useMemo(() => {
      const dataPorts = Object.values(node.getPorts())
      const tempPorts = dataPorts.map(obj => {
        const opt = obj.getOptions() as ConstFFPortModelProps
        opt.formatData = formats
        const links = Object.values(obj.links)
        links.forEach(element => {
          const sourse = element.getSourcePort()
          const target = element.getTargetPort()
          if (!sourse || !target) {
            element.remove()
            engine.repaintCanvas()
          } else {
            const optSourse = sourse.getOptions() as ConstFFPortModelProps
            const optTarget = target.getOptions() as ConstFFPortModelProps
            if (optSourse.formatData !== optTarget.formatData) {
              element.remove()
              engine.repaintCanvas()
            }
          }
        })
        // console.log(obj)
        return obj
      })
      return tempPorts
    }, [formats])

    const { name } = node.meta
    const getMetaProps = useCallback(
      (flag: boolean) => {
        const dataPorts = Object.values(ports)
        const metaPorts: MetaPortProps[] = []
        dataPorts.forEach(port => {
          const option = port.getOptions() as any
          if (option.in === flag) {
            const options: MetaPortProps['options'] = port.getOptions() as ConstFFPortModelProps

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

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event
      const { value } = target
      node.meta.value = value
    }

    return (
      <div
        className={clsx(classes.root, {
          // [classes.selected]: node.getOptions()?.selected
        })}
        key={update}
      >
        <div>
          <div>
            <BorderAll fontSize='small' />
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
        <div style={{ gridArea: 'type', margin: 4, marginTop: 0 }}>
          <ToggleButtonsMultiple formats={formats} setFormats={setFormats} />
        </div>
        <TextField
          style={{ gridArea: 'value', margin: 4 }}
          placeholder='Value'
          variant='outlined'
          onChange={onChange}
          size='small'
        />
        <div style={{ gridArea: 'ind2' }}>{indicatorControls(false)}</div>
      </div>
    )
  }
)
