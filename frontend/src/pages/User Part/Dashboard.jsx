import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'


function Dashboard() {
  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <Home />
    </div>
  )
}

export default Dashboard
