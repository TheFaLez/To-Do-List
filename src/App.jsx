import React from 'react'
import List from "./components/List/List"
import "./style/style.css"
import "./style/responsive.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {

  AOS.init()

  return (
    <div className='App'>
        <List/>
    </div>
  )
}

export default App