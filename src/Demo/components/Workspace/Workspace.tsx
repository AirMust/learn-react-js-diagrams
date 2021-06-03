import { makeStyles } from '@material-ui/core'
import React, { FC, memo } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    '& > div:nth-child(1)': {
      background: 'black',
      padding: theme.spacing(1),
      display: 'flex',
      flexShrink: 0
    },
    '& > div:nth-child(2)': {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
	  '& > div:nth-child(1)': {
		background: 'black',
		padding: theme.spacing(1),
		display: 'flex',
		flexShrink: 0,
		minWidth: 200,
	  },
	  '& > div:nth-child(2)': {
		flexGrow: 1,
		height: '100%',
		position: "relative",
	  }
    }
  }
}))

type WorkspaceProps = {
  tools?: any
  header?: any
}

export const Workspace: FC<WorkspaceProps> = memo(
  ({ children, tools, header }) => {
    const classes = useStyles()
    return (
      <div className={classes.root}>
        <div>{header}</div>
        <div>
          <div>{tools}</div>
          <div>{children}</div>
        </div>
      </div>
    )
  }
)
