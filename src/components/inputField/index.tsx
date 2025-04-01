"use client";
import Image from 'next/image';
import { useState } from 'react';

interface InputFieldProps {
    emotions: boolean;
    width: string;
    inputWidth: string;
    placeholder: string;
    sendButton: boolean;
    marginTop?: string;
    marginLeft?: string;
}

const SendButton = () => {
    return(
        <button className="absolute right-4 flex items-center">
            <Image src="/icons/arrow.svg" alt="menu de navegação" width={61} height={61} />
        </button>
    )
}

const Emotions = () => {
    return (
        <div className="flex gap-2 self-end mt-4 mr-72">
            <button>
                <Image src="/icons/angry.svg" alt="emoção - raiva" width={53} height={53} />
            </button>
            <button>
                <Image src="/icons/sad.svg" alt="emoção - tristeza" width={53} height={53} />
            </button>
            <button>
                <Image src="/icons/happy.svg" alt="emoção - felicidade" width={53} height={53} />
            </button>
            <button>
                <Image src="/icons/euphoric.svg" alt="emoção - euforia" width={53} height={53} />
            </button>
            <button>
                <Image src="/icons/love.svg" alt="emoção - apaixonado" width={53} height={53} />
            </button>
        </div>
    );
};

const InputField = ({ emotions, width, inputWidth, placeholder, sendButton, marginTop, marginLeft }: InputFieldProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={`font-raleway w-1/2 tracking-wide flex flex-col mb-52 ${marginTop} ${marginLeft}`}>
            <div className={`bg-[#EFEFEF] p-5 shadow-md rounded-lg ${width} flex flex-col`}>
                <div className="relative flex items-center justify-center">
                    <input
                        type="text"
                        className={`${inputWidth} h-[74px] text-3xl p-3 border border-[#9E9E9E] shadow-md rounded-lg pr-16`}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                    {sendButton && <SendButton />}
                </div>
            </div>
            {emotions && <Emotions />}
        </div>
    );
};

export default InputField;
