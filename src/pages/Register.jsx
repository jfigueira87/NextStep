import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false); 
  const navigate = useNavigate(); 

  const validateForm = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    if (!name) {
      validationErrors.name = "El nombre es obligatorio";
    }

    if (!email) {
      validationErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "El email no es válido";
    }

    if (!password) {
      validationErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      validationErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(validationErrors).length === 0) {
    
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/chatbot'); 
      }, 2000); 
    } else {
      setErrors(validationErrors);
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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mr-4">Acceso</h2>
        <img
          src={require('../assets/images/User.png')}
          alt="User"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Regístrate si aún no tienes una cuenta.</h2>
        
        {successMessage && (
          <div className="mt-4 text-center text-green-500">
            Te has registrado con éxito.
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={validateForm}>
            <div>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Ingresa tu nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Ingresa tu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Ingresa una contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <input 
                id="confirm-password" 
                name="confirm-password" 
                type="password" 
                placeholder="Confirma tu contraseña" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
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

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?
            <Link to="Home /" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Entrar</Link>
          </p>
        </div>
      </div>
    </>
  )
}
export default Register;
