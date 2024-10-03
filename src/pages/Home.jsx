import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { getAllusers } from '../services/services.js';
import '../index.css';

function Home() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    reset(); // Resetear el formulario al montar el componente
  }, [reset]);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const users = await getAllusers();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        Swal.fire({
          title: 'Éxito',
          text: 'Login correcto',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          navigate('/chatbot');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar iniciar sesión.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="relative bg-white">
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <input
                {...register('email', {
                  required: 'Campo Obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email inválido',
                  },
                })}
                placeholder="Ingresa tu email"
                className={`block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''}`}
              />
              {/* Mensaje de error para el email */}
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('password', { required: 'Campo Obligatorio' })}
                type="password"
                placeholder="Ingresa tu contraseña"
                className={`block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
              />
              {/* Mensaje de error para la contraseña */}
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
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

          <p className="m-6 text-center text-sm text-gray-500">
            Crea tu cuenta con NextStep {' '}
            <span
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Aquí
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
