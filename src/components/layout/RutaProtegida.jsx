import  { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../rutasProtegidas/Header'
import Footer from '../rutasProtegidas/Footer'



const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const { usuario } = auth;
  if(cargando) return 'cargando...'

  return (
    <>
      
      <Header/>     

      {usuario?._id ? (
          <main className='container mx-auto mt-10'>
              <Outlet /> 
          </main>
      ): <Navigate to="/" /> }

      <Footer/>
      
    </>
  )
}

export default RutaProtegida