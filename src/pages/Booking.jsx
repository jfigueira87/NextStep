import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Booking() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!fullName) {
      validationErrors.fullName = true; 
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/.test(fullName)) { 
      validationErrors.fullName = "El nombre solo debe contener letras y espacios.";
    }

 
    if (!phoneNumber) {
      validationErrors.phoneNumber = true; 
    } else if (!/^\d{9}$/.test(phoneNumber)) { 
      if (!/^\d+$/.test(phoneNumber)) { 
        Swal.fire({
          title: 'Error',
          text: 'Debes añadir un número de teléfono.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
      validationErrors.phoneNumber = "El número de teléfono debe tener exactamente 9 dígitos.";
    }

  
    if (!appointmentDate) {
      validationErrors.appointmentDate = true; 
    }

    if (!appointmentTime) {
      validationErrors.appointmentTime = true;
    }

    if (Object.keys(validationErrors).length === 0) {
      Swal.fire({
        title: 'Reserva con éxito!',
        text: 'Tu cita ha sido reservada. Redirigiendo a la página del chatbot...',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/chatbot'); 
      }, 2000);
    } else {
     
      if (validationErrors.fullName) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Nombre y Apellidos.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }

      if (validationErrors.phoneNumber) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Número de teléfono.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }

      if (validationErrors.appointmentDate) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Fecha de la cita.',
          icon: 'warning',
        });
      }

      if (validationErrors.appointmentTime) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Hora de la cita.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }

      setErrors(validationErrors);
    }
  };

 
  const minDate = new Date(2024, 9, 1).toISOString().split('T')[0];
  const maxDate = new Date(2026, 11, 31).toISOString().split('T')[0]; 

  
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 20; hour++) {
      const time = `${hour < 10 ? '0' : ''}${hour}:00`;
      options.push(
        <option key={time} value={time}>
          {time}
        </option>
      );
      const timeHalf = `${hour < 10 ? '0' : ''}${hour}:30`;
      options.push(
        <option key={timeHalf} value={timeHalf}>
          {timeHalf}
        </option>
      );
    }
    return options;
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-60 w-auto" src={require('../assets/images/logoNextstep.png')} alt="Company logo" />
        </div>
        <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
        Reserva una cita con tu orientador
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={validateForm}>
            <div>
              <input 
                id="full-name" 
                name="full-name" 
                type="text" 
                placeholder="Nombre y Apellidos" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <input 
                id="phone-number" 
                name="phone-number" 
                type="tel" 
                placeholder="Número de teléfono" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div>
              <input 
                id="appointment-date" 
                name="appointment-date" 
                type="date" 
                min={minDate}
                max={maxDate} 
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate}</p>}
            </div>

            <div>
              <select 
                id="appointment-time" 
                name="appointment-time" 
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required 
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>Selecciona una hora</option>
                {generateTimeOptions()}
              </select>
              {errors.appointmentTime && <p className="text-red-500 text-sm">{errors.appointmentTime}</p>}
            </div>

            <div>
              <textarea 
                id="note" 
                name="note" 
                placeholder="Nota (opcional)" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <button 
              type="submit" 
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6" 
              style={{ backgroundColor: '#B0EFFF', color: '#054D41' }}
            >
              Reservar Cita
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Booking;
