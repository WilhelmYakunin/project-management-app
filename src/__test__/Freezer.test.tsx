import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WindowFreezer from '../features/freezer/freezer'
  
describe('Freezer', () => {
    test('redners window freezer', async () => {
        const user = userEvent.setup()
        const text = 'clicked success'
        const onCLick = () => render(<div>{text}</div>)
        const TestButton = () => <button data-testid='inside' onClick={onCLick} />
    
        render(
            <WindowFreezer>
                <TestButton />
            </WindowFreezer>
            )
    
        const btn = screen.getByTestId('inside')
        expect(btn).toBeInTheDocument()

        expect(screen.queryByText(text)).not.toBeInTheDocument()

        await user.click(btn)
        expect(screen.getByText(text)).toBeInTheDocument()
      }) 
})
