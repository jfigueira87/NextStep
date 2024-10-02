
import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <>  
      <div className="relative flex justify-center items-center h-screen">
  <img
    src=""
    alt=""
    className="absolute w-1/2 transform -translate-y-1/4"
  />
  <img
    src=""
    alt=""
    className="absolute w-1/2 transform translate-y-1/4"
  />
</div>  
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Registro</h2>
          <img className="mx-auto h-10 w-auto" src={require('../assets/images/logoNextstep.png')} alt="Company logo" />
        </div>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Reserva una cita con tu orientador</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Ingresa tu nombre" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Ingresa tu email" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Ingresa una contraseña" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="confirm-password" 
                name="confirm-password" 
                type="password" 
                placeholder="Confirma tu contraseña" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarme</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            O registrate con:
          </p>
          <div className="div">
            <img src="src/assets/images/google.png" alt="Google" />
            <img src="src/assets/images/facebook.png" alt="Facebook" />
            <img src="src/assets/images/twitter.png" alt="Twitter" />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <Link to="Home /" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
