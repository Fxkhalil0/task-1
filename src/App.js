import './App.css';
import BodyContent from './Components/BodyContent/BodyContent';
import SideMenu from './Components/SideMenu/SideMenu';

function App() {
  return (
    <div className='main__preview'>
      <SideMenu />
      <BodyContent />
    </div>
  );
}

export default App;
