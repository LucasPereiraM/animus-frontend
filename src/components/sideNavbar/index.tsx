'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">
                <Image
                    src="/icons/close.svg"
                    alt="menu de navegação"
                    width={27}
                    height={27}
                />
            </button>
            <ul>
                <li>
                    <Link href="/" onClick={onClose}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/biblioteca" onClick={onClose}>
                        Biblioteca
                    </Link>
                </li>
                <li>
                    <Link href="/contato" onClick={onClose}>
                        Contato
                    </Link>
                </li>
                <li>
                    <Link href="/musicas" onClick={onClose}>
                        Músicas
                    </Link>
                </li>
                <li>
                    <Link href="/receitas" onClick={onClose}>
                        Receitas
                    </Link>
                </li>
                <li>
                    <Link href="/receitas" onClick={onClose}>
                        Profissionais
                    </Link>
                </li>
            </ul>
        </div>
    );
}