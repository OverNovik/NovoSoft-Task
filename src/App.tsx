import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { Provider } from './provider/Provider';

const App: React.FC = () => {
  return (
    <Provider>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
