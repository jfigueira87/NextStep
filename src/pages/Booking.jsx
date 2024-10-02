import React from 'react';
import { Link } from 'react-router-dom';

function Booking() {
  return (
    <>  
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-60 w-auto" src={require('../assets/images/logoNextstep.png')} alt="Company logo" />
        </div>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Reserva una cita con tu orientador</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <input 
                id="full-name" 
                name="full-name" 
                type="text" 
                placeholder="Nombre y Apellidos" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="phone-number" 
                name="phone-number" 
                type="tel" 
                placeholder="Número de teléfono" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="appointment-date" 
                name="appointment-date" 
                type="date" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input 
                id="appointment-time" 
                name="appointment-time" 
                type="time" 
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <textarea 
                id="note" 
                name="note" 
                placeholder="Nota (opcional)" 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <button 
             type="submit" 
             className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6" 
             style={{ backgroundColor: '#B0EFFF', color: '#054D41' }} // Cambiamos el color del texto aquí
            >
  Reservar Cita
</button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            O registrate con:
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <img
              src={require('../assets/images/logoGoogle.png')}
              alt="Google"
              className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            />
            <img
              src={require('../assets/images/logoFacebook.png')}
              alt="Facebook"
              className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            />
            <img
              src={require('../assets/images/logoTwitter.png')}
              alt="Twitter"
              className="w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
            />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <Link to="Home/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Booking;
