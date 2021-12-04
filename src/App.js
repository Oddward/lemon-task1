import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import UserBoard from './UserBoard';

function App() {
  return (
    // <div className="App">
    <div class="wrapper">
      <Header />
      <Sidebar />
      <UserBoard />
      <Footer />
    </div>
  );
}

export default App;
