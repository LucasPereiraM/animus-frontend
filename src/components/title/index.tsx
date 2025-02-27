'use client';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

interface TitleProps {
    title: string;
    textColor?: string;
    onToggleSidebar?: () => void;
}

const Title: React.FC<TitleProps> = ({ title, textColor = "text-black", onToggleSidebar }) => {
    const currentPath = usePathname();

    return (
        <div className={`font-raleway font-normal ${textColor}`}>
            <div className='flex flex-row'>
                {onToggleSidebar && (
                    <div className='mt-20'>
                        <button onClick={onToggleSidebar}>
                            <Image
                                src="/icons/list.svg"
                                alt="menu de navegação"
                                width={27}
                                height={27}
                            />
                        </button>
                    </div>
                )}
                <div className='ml-4 mt-4'>
                    <Image
                        src="/icons/logo.svg"
                        alt="logo do site"
                        width={58}
                        height={68}
                    />
                    <h1 className='text-[24px]'>{title}</h1>
                    <p className='text-[16px]'>{currentPath}</p>
                </div>
            </div>
        </div>
    );
};

export default Title;
