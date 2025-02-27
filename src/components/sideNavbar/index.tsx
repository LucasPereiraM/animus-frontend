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
        <div className={`sidebar shadow-md ${isOpen ? 'open' : ''}`}>
            <div className='ml-5'>
                <Title title='Mão Amiga' textColor='text-black' />
            </div>
            <button onClick={onClose} className="close-button">
                <Image
                    src="/icons/close.svg"
                    alt="menu de navegação"
                    width={27}
                    height={27}
                />
            </button>

            <ul className=''>
                <li className='border-b-2'>
                    <Link href="/" onClick={onClose}>
                        Home
                    </Link>
                </li>
                <li className='border-b-2'>
                    <Link href="/biblioteca" onClick={onClose}>
                        Biblioteca
                    </Link>
                </li>
                <li className='border-b-2'>
                    <Link href="/contato" onClick={onClose}>
                        Contato
                    </Link>
                </li>
                <li className='border-b-2'>
                    <Link href="/musicas" onClick={onClose}>
                        Músicas
                    </Link>
                </li>
                <li className='border-b-2'>
                    <Link href="/receitas" onClick={onClose}>
                        Receitas
                    </Link>
                </li>
                <li className='border-b-2'>
                    <Link href="/profissionais" onClick={onClose}>
                        Profissionais
                    </Link>
                </li>
            </ul>
        </div>
    );
}
