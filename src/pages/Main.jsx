import { useState } from 'react'

import Inicio from './inicio/Inicio';

const Main = () => {

  // Hooks
  /*const [ contactos, setContactos ] = useState(
    localStorage.getItem('contactos') ? JSON.parse(localStorage.getItem('contactos')) : []
  );*/


  return (
          <Inicio />
  )
}

export default Main