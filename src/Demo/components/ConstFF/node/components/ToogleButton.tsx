import React, { FC, memo } from 'react'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export type ToggleButtonsMultipleProps = {
  formats: string | null
  setFormats: Function
}

export const ToggleButtonsMultiple: FC<ToggleButtonsMultipleProps> = memo(
  ({ formats, setFormats }) => {
    const handleFormat = (
      event: React.MouseEvent<HTMLElement>,
      newFormats: string
    ) => {
      setFormats(newFormats || 'n')
    }

    return (
      <ToggleButtonGroup
        style={{ height: 32, display: 'flex' }}
        value={formats}
        exclusive
        onChange={handleFormat}
        aria-label='text formatting'
        size='small'
      >
        <ToggleButton value='n' aria-label='bold'>
          <span style={{ padding: 4 }}>{'n'}</span>
        </ToggleButton>
        <ToggleButton value='s' aria-label='italic'>
          <span style={{ padding: 4 }}>{'s'}</span>
        </ToggleButton>
        <ToggleButton value='b' aria-label='underlined'>
          <span style={{ padding: 4 }}>{'b'}</span>
        </ToggleButton>
        <ToggleButton value='x' aria-label='color'>
          <span style={{ padding: 4 }}>{'x'}</span>
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }
)
