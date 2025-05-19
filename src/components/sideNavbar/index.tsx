'use client';
import Link from 'next/link';
import Image from 'next/image';
import Title from '../title';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className='ml-5 mt-5'>
                <Title title='Animus' textColor='text-black' />
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 block sm:block"
            >
                <Image
                    src="/icons/close.svg"
                    alt="Fechar Menu"
                    width={27}
                    height={27}
                />
            </button>

            <ul className='mt-10'>
                {["Home", "Biblioteca", "Contato", "Musicas", "Receitas"].map((item) => (
                    <li key={item} className='border-b-2 p-4 hover:bg-gray-100'>
                        <Link href={`/${item.toLowerCase()}`} onClick={onClose} className="w-full h-full block">
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
