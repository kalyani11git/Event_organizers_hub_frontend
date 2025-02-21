import './App.css'
import { createBrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import RouterPage from './Components/RouterPage/RouterPage'
import { Provider } from 'react-redux'
import { store } from './store/Store'

function App() {
  

  return (
    <>
      <Provider store={store}>
        <RouterPage/>      
        </Provider>
    </>
  )
}

export default App
