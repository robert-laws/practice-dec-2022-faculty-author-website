import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/book.svg';

export const Navigation = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Publications', href: '/publications' },
    { name: 'New Entry', href: '/new' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className='bg-blue-900'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='flex w-full items-center justify-between border-b border-blue-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <Link to='/'>
              <span className='sr-only'>Your Company</span>
              <img className='h-10 w-auto' src={Logo} alt='' />
            </Link>
            <div className='ml-10 hidden space-x-8 lg:block'>
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className='text-base font-medium text-white hover:text-blue-50'
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            <Link
              to='/'
              className='inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-blue-600 hover:bg-blue-50'
            >
              Login
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-6 py-4 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-blue-50'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
