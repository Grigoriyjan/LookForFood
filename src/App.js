import './App.css';
import Person from './components/Person/Person';

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      {/* <img src="images/avatar.png" alt="" /> */}
      <div className="wrapper">
        <Person name="Mike" age="20" />
        <Person name="John" age="40" />
      </div>
    </div>
  );
}

export default App;
