import { makeStyles } from '@material-ui/core'
import React, { FC, memo } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    backgroundSize: `50px 50px`,
    display: 'flex',
    height: '100%',
    backgroundImage: `linear-gradient(
		0deg,
		transparent 24%,
		${theme.palette.divider} 25%,
		${theme.palette.divider} 26%,
		transparent 27%,
		transparent 74%,
		${theme.palette.divider} 75%,
		${theme.palette.divider} 76%,
		transparent 77%,
		transparent
	),linear-gradient(
		90deg,
		transparent 24%,
		${theme.palette.divider} 25%,
		${theme.palette.divider} 26%,
		transparent 27%,
		transparent 74%,
		${theme.palette.divider} 75%,
		${theme.palette.divider} 76%,
		transparent 77%,
		transparent
	)`,
    '& > *': {
      height: '100%',
      minHeight: '100%',
      width: '100%'
    }
  }
}))
export const Panel: FC = memo(({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
})
