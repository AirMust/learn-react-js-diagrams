import * as React from 'react'
import { ModelFFNodeModel } from './ModelFFNode.model'
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams'
import { memo, FC } from 'react'
import { Divider, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
export interface ModelFFNodeWidgetProps {
  node: ModelFFNodeModel
  engine: DiagramEngine
}

type MetaPortProps = {
  name: string
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
    '& > p': {
      textAlign: 'center',
      margin: theme.spacing(1),
      gridArea: 'head',
      '& > svg': {
        verticalAlign: 'bottom',
        position: 'absolute',
        left: theme.spacing(1),
        marginRight: theme.spacing(1)
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
      background: theme.palette.primary.main,
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
  left: {
    borderRadius: `0px ${theme.spacing(1)}px ${theme.spacing(1)}px 0px`
  },
  right: {
    borderRadius: `${theme.spacing(1)}px 0px 0px  ${theme.spacing(1)}px`
  }
}))

export const ModelFFNodeWidget: FC<ModelFFNodeWidgetProps> = memo(
  ({ node, engine }) => {
    const classes = useStyles()

    const { name } = node.meta
    const ports = node.getPorts()
    console.log(node)
    const getMetaProps = (flag: boolean) => {
      const dataPorts = Object.values(ports)
      const metaPorts: MetaPortProps[] = []
      dataPorts.forEach(port => {
        const option = port.getOptions() as any
        if (option.alignment === (flag ? 'left' : 'right')) {
          metaPorts.push({ indicator: port, name: (port.getOptions() as any).label })
        }
      })
      return metaPorts
    }

    const indicatorControls = (flag: boolean) => {
      const meta = getMetaProps(flag)
      const control = meta.map(({ indicator }) => (
        <PortWidget port={indicator} engine={engine} className={classes.port}>
          <div />
          <div className={clsx(flag ? classes.left : classes.right)}>
            {indicator.getOptions().format[0]}
          </div>
        </PortWidget>
      ))
      return control
    }

    const nameControls = (flag: boolean) => {
      const meta = getMetaProps(flag)
      const control = meta.map(({ name }) => (
        <div
          className={clsx(
            flag ? classes.left : classes.right,
            classes.textIndicator
          )}
          style={flag ? { marginRight: 4 } : { marginLeft: 4 }}
        >
          {name}
        </div>
      ))
      return control
    }

    return (
      <div className={classes.root}>
        <p>
          <AccessAlarmIcon fontSize='small' />
          {name}
          <Divider />
        </p>
        <div>{indicatorControls(true)}</div>
        <div>{nameControls(true)}</div>
        <div>{nameControls(false)}</div>
        <div>{indicatorControls(false)}</div>
      </div>
    )
  }
)
