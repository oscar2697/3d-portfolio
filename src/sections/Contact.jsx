import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_USERID,
                import.meta.env.VITE_EMAILJS_TEMPLATEID,
                {
                    from_name: form.name,
                    to_name: 'Oscar',
                    from_email: form.email,
                    to_email: 'lindooscar635@gmail.com',
                    message: form.message
                },
                import.meta.env.VITE_EMAILJS_RECEIVERID
            )

            setLoading(false)

            alert('Your Nachricht has been sent! ')

            setForm({
                name: '',
                email: '',
                message: ''
            })
        } catch (error) {
            setLoading(false)

            console.log(error)

            alert('Something went falsch!')
        }

    }

    return (
        <section className='c-space my-20' id='contact'>
            <div className='relative min-h-screen flex items-center justify-center flex-col'>
                <img
                    src='/assets/terminal.png'
                    alt='terminal'
                    className='absolute inset-0 min-h-screen'
                />

                <div className='contact-container'>
                    <h3 className='head-text'>Get in Kontakt</h3>

                    <p className='text-lg text-white-600 mt-3'>
                        Whether you need to develop a new application,
                        optimize an existing system, or explore innovative tech solutions,
                        I’m ready to collaborate and bring your ideas to life.
                    </p>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className='mt-12 flex flex-col space-y-2'
                    >
                        <label className='space-y-3'>
                            <span className='field-label'>Full Name</span>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                required
                                className='field-input'
                                placeholder='Jon Doe'
                            />
                        </label>

                        <label className='space-y-3'>
                            <span className='field-label'>Email</span>
                            <input
                                type='email'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                required
                                className='field-input'
                                placeholder='youremail@email.com'
                            />
                        </label>

                        <label className='space-y-3'>
                            <span className='field-label'>Message</span>
                            <textarea
                                name='message'
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className='field-input'
                                placeholder="Hey! I'm interested in..."
                            />
                        </label>

                        <button
                            className='field-btn'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Schick a Message'}

                            <img
                                src='/assets/arrow-up.png'
                                alt='arrow-up'
                                className='field-btn_arrow'
                            />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
