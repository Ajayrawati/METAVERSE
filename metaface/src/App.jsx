import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './signin'
import Signup from './Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Signup/>
        <Signin/>
        
      </div>
    </>
  )
}

export default App
