'use client';
import Link from 'next/link';
import Image from 'next/image';
import Title from '../title';

export default function Footer() {
    return (
        <div className='bg-secondary'>
            <div className='px-4 sm:px-8 lg:px-16 xl:px-44 py-10'>
                <Title title='Animus' textColor='text-white' />

                <ul className='flex flex-col sm:flex-row gap-4 sm:gap-10 mt-8 text-lg sm:text-xl lg:text-2xl md:text-base'>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/">
                            <p className='text-white'>Home</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/biblioteca">
                            <p className='text-white'>Biblioteca</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/contato">
                            <p className='text-white'>Contato</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/musicas">
                            <p className='text-white'>Músicas</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/receitas">
                            <p className='text-white'>Receitas</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded p-2'>
                        <Link href="/profissionais">
                            <p className='text-white'>Profissionais</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='px-4 sm:px-8 lg:px-16 xl:px-48 py-10'>
                <h3 className='text-xl sm:text-2xl text-white'>Redes Sociais</h3>
                <div className='flex gap-4 sm:gap-8 mt-4 mb-10'>
                    <button className='hover:bg-primary rounded p-2'>
                        <Image
                            src="/icons/github.svg"
                            alt="rede social - github"
                            width={27}
                            height={27}
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                    <button className='hover:bg-primary rounded p-2'>
                        <Image
                            src="/icons/instagram.svg"
                            alt="rede social - instagram"
                            width={27}
                            height={27}
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                    <button className='hover:bg-primary rounded p-2'>
                        <Image
                            src="/icons/linkedin.svg"
                            alt="rede social - linkedin"
                            width={27}
                            height={27}
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}