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
  const navigate = useNavigate(); // Hook para la navegación

  const validateForm = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validación del nombre completo
    if (!fullName) {
      validationErrors.fullName = true; // Solo se guarda la condición
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/.test(fullName)) { // Solo letras y espacios
      validationErrors.fullName = "El nombre solo debe contener letras y espacios.";
    }

    // Validación del número de teléfono
    if (!phoneNumber) {
      validationErrors.phoneNumber = true; // Solo se guarda la condición
    } else if (!/^\d{9}$/.test(phoneNumber)) { // Validación de que el teléfono tenga exactamente 9 dígitos
      if (!/^\d+$/.test(phoneNumber)) { // Verificar si contiene solo números
        Swal.fire({
          title: 'Error',
          text: 'Debes añadir un número de teléfono.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          background: '#f8d7da', // Color de fondo
          color: '#721c24', // Color del texto
          confirmButtonColor: '#dc3545' // Color del botón
        });
      }
      validationErrors.phoneNumber = "El número de teléfono debe tener exactamente 9 dígitos.";
    }

    // Validación de la fecha de la cita
    if (!appointmentDate) {
      validationErrors.appointmentDate = true; // Solo se guarda la condición
    }

    // Validación de la hora de la cita
    if (!appointmentTime) {
      validationErrors.appointmentTime = true; // Solo se guarda la condición
    }

    if (Object.keys(validationErrors).length === 0) {
      // Si no hay errores, mostrar mensaje de éxito y redirigir
      Swal.fire({
        title: 'Reserva con éxito!',
        text: 'Tu cita ha sido reservada. Redirigiendo a la página del chatbot...',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/chatbot'); // Redirigir a la página del chatbot
      }, 2000); // Esperar 2 segundos antes de redirigir
    } else {
      // Mostrar mensajes de error específicos usando SweetAlert2
      if (validationErrors.fullName) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Nombre y Apellidos.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          background: '#fff3cd', // Color de fondo
          color: '#856404', // Color del texto
          confirmButtonColor: '#ffc107' // Color del botón
        });
      }

      if (validationErrors.phoneNumber) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Número de teléfono.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          background: '#fff3cd', // Color de fondo
          color: '#856404', // Color del texto
          confirmButtonColor: '#ffc107' // Color del botón
        });
      }

      if (validationErrors.appointmentDate) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Fecha de la cita.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          background: '#fff3cd', // Color de fondo
          color: '#856404', // Color del texto
          confirmButtonColor: '#ffc107' // Color del botón
        });
      }

      if (validationErrors.appointmentTime) {
        Swal.fire({
          title: 'Campo obligatorio',
          text: 'Debes completar este campo: Hora de la cita.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          background: '#fff3cd', // Color de fondo
          color: '#856404', // Color del texto
          confirmButtonColor: '#ffc107' // Color del botón
        });
      }

      setErrors(validationErrors);
    }
  };

  // Fechas mínimas y máximas para el calendario
  const minDate = new Date(2024, 9, 1).toISOString().split('T')[0]; // 1 de octubre de 2024
  const maxDate = new Date(2026, 11, 31).toISOString().split('T')[0]; // 31 de diciembre de 2026

  // Generar opciones de horarios de 8:00 a 20:00
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-60 w-auto" src={require('../assets/images/logoNextstep.png')} alt="Company logo" />
        </div>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Reserva una cita con tu orientador</h2>

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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div>
              <input 
                id="appointment-date" 
                name="appointment-date" 
                type="date" 
                min={minDate} // Establecer la fecha mínima
                max={maxDate} // Establecer la fecha máxima
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        </div>
      </div>
    </>
  );
}

export default Booking;
