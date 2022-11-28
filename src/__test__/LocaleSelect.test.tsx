import { Provider } from 'react-redux';
import { store } from '../app/store';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LocaleSelect from '../features/locales/localesSelect'
import { useTranslate } from '../app/hooks'
  
describe('LocaleSelect', () => {
  test('redners locale select', () => {
      
    render(
      <Provider store={store}>
        <LocaleSelect />
      </Provider>
    )
    
    const select = screen.getByTestId('localeSelect')
    expect(select).toBeInTheDocument()
    expect(screen.getAllByLabelText('English')).toBeTruthy()
    expect(screen.getAllByLabelText('Русский')).toBeTruthy()
  })
    
  test('locale select switchs languages', async () => {
    const user = userEvent.setup()
    const Div = () => {
    const { t } = useTranslate()
      return (<div>{t('test', 4)}</div>)
    }

    render(
      <Provider store={store}>
        <LocaleSelect />
        <Div />
      </Provider>
    )

    expect(screen.getByText('теста')).toBeInTheDocument()
    const selectEn = screen.getByDisplayValue('en')
    await user.click(selectEn)
    expect(screen.getByText('tests')).toBeInTheDocument()

    const selectRu = screen.getByDisplayValue('ru')
    await user.click(selectRu)
    expect(screen.getByText('теста')).toBeInTheDocument()
  }) 
})