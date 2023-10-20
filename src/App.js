import './App.css';
import Dashboard from './components/Dashboard';


export const config = {
    endPoint: 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
}


function App() {
    return (
<Dashboard />
    );
}

export default App;
