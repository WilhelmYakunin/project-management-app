import {render, screen} from '@testing-library/react'
import Spinner from '../features/spinner/spinner'
  
test('redners spinner', () => {    
    render(<Spinner />)

    expect(screen.getByTestId('Spinner')).toBeInTheDocument()
}) 
