import './App.css';
import { Column } from '~/components';

function App() {
  return (
    <div className='container'>
      <Column colName='Backlog' />
      <Column colName='In Progress' />
      <Column colName='Done' />
    </div>
  );
}

export default App;
