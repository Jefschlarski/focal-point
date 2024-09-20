"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      router.push('/todo');
    } else {
      router.push('/login');
    }
  }, [router]);
};

export default Home;