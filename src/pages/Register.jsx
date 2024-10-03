import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { postRegisterData } from '../services/services.js';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
        });
        return;
      }
  
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmedPassword: data.confirmPassword,
      };
  
      const response = await postRegisterData(userData);
  
      Swal.fire({
        icon: 'success',
        title: 'Te has registrado con éxito',
        showConfirmButton: false,
        timer: 2000, 
      });
  
      setTimeout(() => {
        navigate('/chatbot');
      }, 2000);
    } catch (error) {
      console.error('Error al registrarse', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo completar el registro.',
      });
    }
  };
  
  return (
    <> 
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mr-4">Registro</h2>
          <img
            src={require('../assets/images/user.png')}
            alt="User"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        
        <h2 className="mt-28 mb-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Regístrate si aún no tienes una cuenta.</h2>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input 
                id="name" 
                {...register("name", { required: "El nombre es obligatorio" })}
                type="text" 
                placeholder="Ingresa tu nombre" 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <input 
                id="email" 
                {...register("email", { 
                  required: "El email es obligatorio", 
                  pattern: { value: /\S+@\S+\.\S+/, message: "El email no es válido" } 
                })}
                type="email" 
                placeholder="Ingresa tu email" 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input 
                id="password" 
                {...register("password", { 
                  required: "La contraseña es obligatoria", 
                  minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } 
                })}
                type="password" 
                placeholder="Ingresa una contraseña" 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <input 
                id="confirm-password" 
                {...register("confirmPassword", { 
                  required: "Confirma tu contraseña", 
                })}
                type="password" 
                placeholder="Confirma tu contraseña" 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button 
              type="submit" 
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6" 
              style={{ backgroundColor: '#B0EFFF', color: '#054D41' }}
            >
              Registrarse
            </button>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            O regístrate con:
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

          <p className="mt-7 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
