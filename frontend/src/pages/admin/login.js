import { API_BASE_URL } from '@/config/route';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(API_BASE_URL + '/api/auth/authenticate', {
            method: 'POST',
            body: JSON.stringify({ "email": email, "password": password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            // If login is successful, store JWT token and redirect to authenticated page
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);
            // Redirect to authenticated page
            window.location.href = '/admin/flight';
        } else {
            // Handle login failure
            console.error('Login failed');
            throw new Error("Login Failed!")
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="usernloginame"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" name="email" id="email" value={email}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={password}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit"
                                className="w-full text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Login Now
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}