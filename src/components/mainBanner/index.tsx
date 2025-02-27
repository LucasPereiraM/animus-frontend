"use client"
import Image from 'next/image';
import { useState } from 'react';

const Banner = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <div className={`font-raleway w-1/2 tracking-wide flex flex-col gap-5 ml-96 mt-32 mb-52`}>
            <div className='flex gap-10'>
                <h1 className='text-8xl text-bannerMain'>Conte os seus <span className='text-primary'>sentimentos</span>...</h1>
                <Image
                    src="/icons/bannerIcon.svg"
                    alt="menu de navegação"
                    width={203}
                    height={201}
                />
            </div>
            <div className='bg-[#EFEFEF] p-5 w-[1080px] shadow-md rounded-lg'>
                <div className='relative'>
                    <input type="text" className='w-[1041px] h-[74px] text-3xl p-3 border border-[#9E9E9E] shadow-md rounded-lg' value={inputValue} onChange={handleInputChange} placeholder='Me sinto alegre e animado!' />
                    <button className='absolute inset-y-0 right-0 px-4'>
                        <Image
                            src="/icons/arrow.svg"
                            alt="menu de navegação"
                            width={61}
                            height={61}
                        />
                    </button>
                </div>
            </div>
            <div className='flex justify-end -mr-32'>
                <button>
                    <Image
                        src="/icons/angry.svg"
                        alt="emoção - raiva"
                        width={53}
                        height={53}
                    />
                </button>
                <button>
                    <Image
                        src="/icons/sad.svg"
                        alt="emoção - tristeza"
                        width={53}
                        height={53}
                    />
                </button>
                <button>
                    <Image
                        src="/icons/happy.svg"
                        alt="emoção - felicidade"
                        width={53}
                        height={53}
                    />
                </button>
                <button>
                    <Image
                        src="/icons/euphoric.svg"
                        alt="emoção - euforia"
                        width={53}
                        height={53}
                    />
                </button>
                <button>
                    <Image
                        src="/icons/love.svg"
                        alt="emoção - apaixonado"
                        width={53}
                        height={53}
                    />
                </button>
            </div>
        </div>
    );
};

export default Banner;
