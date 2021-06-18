import React, { memo, FC } from 'react'
import {
  makeStyles,
  IconButton,
  Tooltip,
  Icon,
  createStyles
} from '@material-ui/core'
import { Clear } from '@material-ui/icons'

export interface HeaderNodeProps {
  node: any
  name: string
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: (props: ComponentProps) => ({
      textAlign: 'center',
      gridArea: 'head',
      display: 'grid',
      gridTemplateAreas: '"icon title clear"',
      gridTemplateColumns: '32px 1fr 32px',
      marginBottom: theme.spacing(1),
      height: 32,
      alignItems: 'stretch',
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      '& > div:nth-child(1)': {
        borderRadius: `${theme.shape.borderRadius * 1.5}px 0px 0px 0px`,
        backgroundColor: props.backgroundColor
      },
      '& > div:nth-child(2)': {
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(
          0.5
        )}px ${theme.spacing(2)}px`
      },
      '& > div:nth-child(n+1)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }),
    clear: {
      color: theme.palette.divider,
      transition: '0.1s',
      '&:hover': {
        color: theme.palette.error.main
      }
    }
  })
)

interface ComponentProps {
  backgroundColor: string
}

export const HeaderNode: FC<HeaderNodeProps> = memo(({ node, name }) => {
  const { tooltip, color, icon } = node.header

  const props: ComponentProps = { backgroundColor: color }
  const classes = useStyles(props)

  const removeNode = () => node.remove()

  return (
    <div className={classes.root}>
      <div>
        <Tooltip title={tooltip}>
          <Icon>{icon}</Icon>
        </Tooltip>
      </div>
      <div>{name}</div>
      <div>
        <IconButton size='small' onClick={removeNode} className={classes.clear}>
          <Clear fontSize='small' />
        </IconButton>
      </div>
    </div>
  )
})
