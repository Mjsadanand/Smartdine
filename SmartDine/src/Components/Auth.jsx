import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useLocation } from 'react-router-dom';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const isSignUp = location.pathname === "/signup"; 

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isSignUp]);

    const handleAuth = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) alert(error.message);
            else alert('Sign-up successful! Check your email.');
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert(error.message);
            window.location.href = '/menu';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'center' }}>
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                <form onSubmit={handleAuth}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <p style={{ marginTop: '10px' }}>
                    {isSignUp ? (
                        <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Already have an account? Login</a>
                    ) : (
                        <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>New user? Sign Up</a>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;
