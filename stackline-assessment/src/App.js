import Header from './components/Header';
import LeftSideComponent from './components/LeftSideComponent';
import TableComponent from './components/TableComponent';
import './styles/App.css';

function App() {
  return (
    <div className="App">
        <div className="main-container">
      <Header />
      <div className="panels-container">
        <LeftSideComponent />
        <div className="right-side">

          <TableComponent />
        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
