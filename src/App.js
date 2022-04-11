import { Router } from '@reach/router';
import Shanghai from './components/shanghai';
import Example from './components/example';

function App() {
  return (
    <Router>
      <Shanghai path="/" />
      <Example path="/example" />
    </Router>
  );
}

export default App;
