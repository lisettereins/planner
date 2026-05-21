'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      let result;

      if (isSignUp) {
        // SIGN UP USING SUPABASE
        result = await supabase.auth.signUp({ email, password });
      } else {
        // LOGIN USING SUPABASE
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) {
        setError(result.error.message);
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-black/10 p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-visible">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="border-2 border-[#45433F] rounded-sm p-4 inline-block">
              <BookOpen className="w-8 h-8 text-[#45433F]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-[#45433F]
    font-['Gravitas_One'] text-center mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {isSignUp
              ? 'Start organizing your life today'
              : 'Sign in to your planner'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full
    px-6 py-3
    rounded-2xl
    bg-white/60
    backdrop-blur-md
    border border-white/20
    shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
    text-[#45433F]
    font-['Gravitas_One']
    text-sm
    tracking-wide
    transition-all duration-300
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]"
                placeholder="E-mail"
              />
            </div>

            <div>
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full
    px-6 py-3
    rounded-2xl
    bg-white/30
    backdrop-blur-md
    border border-white/20
    shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
    text-[#45433F]
    font-['Gravitas_One']
    text-sm
    tracking-wide
    transition-all duration-300
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]"
                placeholder="Password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
                {error}
              </div>
            )}

           <div className='flex justify-center'>
             <button
              type="submit"
              disabled={isLoading}
              className="
                  w-full
                  px-6 py-3
    rounded-2xl
    
    backdrop-blur-md
    border border-white/20
    shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
    text-[#45433F]
    font-['Gravitas_One']
    text-sm
    tracking-wide
    transition-all duration-300
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]
                "
            >
              {isLoading
                ? 'Loading...'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
            </button>
           </div>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                className="text-black font-semibold hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
