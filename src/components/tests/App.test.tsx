import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Main from '../Main'

// Mainコンポーネントが正しくレンダリングされるかを確認
test('renders the Main component', async () => {
  await render(<Main />);
  const mainElement = screen.getByTestId('main');
  expect(mainElement).toBeInTheDocument();
})