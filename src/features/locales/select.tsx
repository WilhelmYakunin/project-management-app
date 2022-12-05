import React, {BaseSyntheticEvent, useCallback} from 'react'

import tick from './tick.svg'
import { cn as bem } from '@bem-react/classname'
import './default.css'

const Select = ({ testid, onChange, value, options } 
    : { testid: string, onChange: Function, value: string, options: {value: string, title: string}[] }) => {

  const onSelect = useCallback((e: BaseSyntheticEvent) => {
    onChange(e.target.value)
  }, [onChange])

  const cn = bem('Select')

  return (
      <div data-testid={testid} className={cn()}>
        <div className={cn('current')} tabIndex={1}>
          {options.map((option) => (
              <div key={option.value} className={cn('value')}>
                <input
                  className={cn('input')} 
                  type="radio" 
                  id={option.value} 
                  value={option.value} 
                  name={value}
                  onChange={onSelect} 
                  checked={value === option.value} />
                <p className={cn('input-text')}>{option.title}</p>
              </div>
          ))}

        </div>
        <ul className={cn('list')}>
          {options.map((option) => (
              <li key={option.value}>
                <label className={cn('option')} htmlFor={option.value} aria-hidden>{option.title}</label>
              </li>
          ))}
        </ul>
      </div>
  )
}

export default React.memo(Select)
