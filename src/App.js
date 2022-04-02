import { Router } from '@reach/router';
import Shanghai from './components/shanghai';

function App() {
  return (
    <Router>
      <Shanghai path="/" />
    </Router>
  );
}

export default App;
