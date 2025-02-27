'use client';
import Link from 'next/link';
import Image from 'next/image';
import Title from '../title';


export default function Footer() {
    return (
        <div className='bg-secondary'>
            <div className='ml-44'>
                <Title title='Mão Amiga' textColor='text-white' />

                <ul className='flex flex-row gap-20 ml-4 mt-12 text-2xl'>
                    <li className='hover:bg-primary rounded'>
                        <Link href="/">
                            <p className='text-white'>Home</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded'>
                        <Link href="/biblioteca">
                            <p className='text-white'>Biblioteca</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded'>
                        <Link href="/contato">
                            <p className='text-white'>Contato</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded'>
                        <Link href="/musicas">
                            <p className='text-white'>Músicas</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary roundedrounded'>
                        <Link href="/receitas">
                            <p className='text-white'>Receitas</p>
                        </Link>
                    </li>
                    <li className='hover:bg-primary rounded'>
                        <Link href="/profissionais">
                            <p className='text-white'>Profissionais</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col gap-8 ml-48 mt-20'>
                <h3 className='text-2xl text-white'>Redes Sociais</h3>
                <div className='flex gap-8 mb-10'>
                    <button className='hover:bg-primary rounded'>
                        <Image
                            src="/icons/github.svg"
                            alt="rede social - github"
                            width={27}
                            height={27}
                        />
                    </button>
                    <button className='hover:bg-primary rounded'>
                        <Image
                            src="/icons/instagram.svg"
                            alt="rede social - instagram"
                            width={27}
                            height={27}
                        />
                    </button>
                    <button className='hover:bg-primary rounded'>
                        <Image
                            src="/icons/linkedin.svg"
                            alt="rede social - linkedin"
                            width={27}
                            height={27}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
