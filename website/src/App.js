import logo from './logo.svg';
import './App.css';
import Product from './Components/Product';
import Header from './Components/Header';
import Banner from './Components/11.png';

function App() {
  return (
    <div className="App">
      <Header/>
      <img src={Banner} className="Banner"/>
     <Product/>
       
    </div>
  );
}

export default App;
