import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Offers } from './pages/Offers'
import { House } from './pages/House'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { CreateCard } from './pages/CreateCard'


export function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-sell-house-offer' element={<CreateCard />} />
        <Route path='/all-offers?' element={<Offers />} />
        <Route path='/house/:id' element={<House />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}