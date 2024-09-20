"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi'; 
const Header = () => {
  const [date, setDate] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("pt-BR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);

    const storedName = localStorage.getItem('username');
    setUsername(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login'); 
  };

  return (
    <header className='header'>
      <div className="header-container">
        <div className='header-logo-container'>
          <Image className='logo' src='/logo.svg' alt='Logo' priority={false} width={33} height={33} />
          <h2 className='header-title'>FocalPoint</h2>
        </div>
        <div className='header-subtitle-container'>
          <h2 
            className="header-subtitle"
          >
            {username && (
              <>
                Bem-vindo de volta, {username}
                <FiLogOut className="logout-icon" onClick={handleLogout} title='Sair'/>
              </>
            )}
          </h2>
        </div>
        <div className='header-date-container'>
          <p className='header-date capitalize'>{date}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
