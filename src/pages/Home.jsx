import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: 'Campo Obligatorio',
        text: 'Debe introducir un email de contacto.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        title: 'Email inválido',
        text: 'Por favor ingresa un email válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!password) {
      Swal.fire({
        title: 'Campo Obligatorio',
        text: 'Por favor ingresa tu contraseña.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    
    Swal.fire({
      title: 'Éxito',
      text: 'Login correcto',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="relative min-h-screen bg-white">      
      <img
        src={require('../assets/images/ellipseMobileBlue.png')}
        alt="Ellipse Blue"
        className="absolute top-0 left-0"
      />
      
      <img
        src={require('../assets/images/ellipseMobileGreen.png')}
        alt="Ellipse Green"
        className="absolute top-0 right-0"
      />
      
      <div className="absolute top-0 left-0 flex items-center m-8">
        <h2 className="text-2xl font-bold text-gray-900 mr-4">Acceso</h2>
        <img
          src={require('../assets/images/user.png')}
          alt="User"
          className="w-6 h-6"
        />
      </div>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto mt-14 h-60 w-auto"
            src={require('../assets/images/logoNextstep.png')}
            alt="Company logo"
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">          
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6"
                style={{ backgroundColor: '#B0EFFF', color: '#054D41' }}
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">O regístrate con:</p>
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
            <Link to="Home /" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;


