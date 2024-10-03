import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Nav from '../components/Nav'
import emailjs from 'emailjs-com'

function Booking() {
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateForm = (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!fullName) {
            validationErrors.fullName =
                'Debes completar este campo: Nombre y Apellidos.'
        } else if (!/^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/.test(fullName)) {
            validationErrors.fullName =
                'El nombre solo debe contener letras y espacios.'
        }

        if (!phoneNumber) {
            validationErrors.phoneNumber =
                'Debes completar este campo: Número de teléfono.'
        } else if (!/^\d{9}$/.test(phoneNumber)) {
            validationErrors.phoneNumber =
                'El número de teléfono debe tener exactamente 9 dígitos.'
        }

        if (!email) {
            validationErrors.email =
                'Debes completar este campo: Correo electrónico.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email =
                'Debes introducir un correo electrónico válido.'
        }

        if (!appointmentDate) {
            validationErrors.appointmentDate =
                'Debes completar este campo: Fecha de la cita.'
        }

        if (!appointmentTime) {
            validationErrors.appointmentTime =
                'Debes completar este campo: Hora de la cita.'
        }

        if (Object.keys(validationErrors).length === 0) {
            sendEmails()

            Swal.fire({
                title: 'Reserva con éxito!',
                text: 'Tu cita ha sido reservada. Redirigiendo a la página del chatbot...',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })

            setTimeout(() => {
                navigate('/chatbot')
            }, 2000)
        } else {
            setErrors(validationErrors)
        }
    }

    const sendEmails = () => {
        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
        const userId = process.env.REACT_APP_EMAILJS_USER_ID

        const templateParams = {
            fullName,
            phoneNumber,
            email,
            appointmentDate,
            appointmentTime,
            note,
            recipient_email: 'jorsqn@gmail.com',
        }

        emailjs
            .send(serviceId, templateId, templateParams, userId)
            .then((response) => {
                console.log(
                    'Email enviado con éxito',
                    response.status,
                    response.text
                )
            })
            .catch((err) => {
                console.error('Error al enviar el correo:', err)
            })

        emailjs
            .send(
                serviceId,
                templateId,
                {
                    ...templateParams,
                    recipient_email: email,
                },
                userId
            )
            .then((response) => {
                console.log(
                    'Correo de confirmación enviado con éxito',
                    response.status,
                    response.text
                )
            })
            .catch((err) => {
                console.error('Error al enviar el correo de confirmación:', err)
            })
    }

    const minDate = new Date(2024, 9, 1).toISOString().split('T')[0]
    const maxDate = new Date(2026, 11, 31).toISOString().split('T')[0]

    const generateTimeOptions = () => {
        const options = []
        for (let hour = 8; hour <= 20; hour++) {
            const time = `${hour < 10 ? '0' : ''}${hour}:00`
            options.push(
                <option key={time} value={time}>
                    {time}
                </option>
            )
            const timeHalf = `${hour < 10 ? '0' : ''}${hour}:30`
            options.push(
                <option key={timeHalf} value={timeHalf}>
                    {timeHalf}
                </option>
            )
        }
        return options
    }

    return (
        <>
            <Nav />
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
                
                <h2 className="mt-28 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
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
                            {errors.fullName && (
                                <p className="text-red-500 text-sm">
                                    {errors.fullName}
                                </p>
                            )}
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
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                id="appointment-date"
                                name="appointment-date"
                                type="date"
                                min={minDate}
                                max={maxDate}
                                value={appointmentDate}
                                onChange={(e) =>
                                    setAppointmentDate(e.target.value)
                                }
                                required
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.appointmentDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.appointmentDate}
                                </p>
                            )}
                        </div>

                        <div>
                            <select
                                id="appointment-time"
                                name="appointment-time"
                                value={appointmentTime}
                                onChange={(e) =>
                                    setAppointmentTime(e.target.value)
                                }
                                required
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Selecciona una hora</option>
                                {generateTimeOptions()}
                            </select>
                            {errors.appointmentTime && (
                                <p className="text-red-500 text-sm">
                                    {errors.appointmentTime}
                                </p>
                            )}
                        </div>

                        <div>
                            <textarea
                                id="note"
                                name="note"
                                placeholder="Notas adicionales"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="block w-full h-28 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reservar cita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Booking
