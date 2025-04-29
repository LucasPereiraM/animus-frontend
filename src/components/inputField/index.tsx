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
    value: string;
    onChange: (value: string) => void;
    isUf?: boolean;
    selectedSentiment: string;
    onSelectSentiment: (s: string) => void;
}

interface EmotionProps {
    selectedSentiment: string;
    onSelectSentiment: (s: string) => void;

}

const SendButton = () => {
    return (
        <button className="absolute right-4 flex items-center">
            <Image src="/icons/arrow.svg" alt="menu de navegação" className='mt-2' width={61} height={61} />
        </button>
    );
};

const emotions = [
    { name: "Raiva", icon: "/icons/angry.svg" },
    { name: "Tristeza", icon: "/icons/sad.svg" },
    { name: "Felicidade", icon: "/icons/happy.svg" },
    { name: "Paixão", icon: "/icons/love.svg" }
  ];

const Emotions = ({selectedSentiment,onSelectSentiment}:EmotionProps) => {

    return (
        <div className="flex gap-2 self-end mt-4">
            {emotions.map((emotion) => (
                <button
                key={emotion.name}
                onClick={() => onSelectSentiment(emotion.name)}
                className={`rounded ${
                    selectedSentiment === emotion.name ? "ring-2 ring-blue-500" : ""
                }`}
                >
                <Image
                    src={emotion.icon}
                    alt={`emoção - ${emotion.name}`}
                    width={53}
                    height={53}
                />
                </button>
            ))}
        </div>
    );
};

const InputField = ({
    emotions,
    width,
    inputWidth,
    placeholder,
    sendButton,
    marginTop,
    marginLeft,
    value,
    selectedSentiment,
    onSelectSentiment,
    onChange,
    isUf = false,
}: InputFieldProps) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;

        if (isUf) {
            input = input.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
        }

        onChange(input);
    };

    return (
        <div className={`font-raleway w-1/2 tracking-wide flex flex-col ${marginTop} ${marginLeft}`}>
            <div className={`bg-[#EFEFEF] p-5 shadow-md rounded-lg ${width} flex flex-col`}>
                <div className="relative flex">
                    <input
                        type="text"
                        className={`${inputWidth} h-[74px] text-3xl p-3 border border-[#9E9E9E] shadow-md rounded-lg`}
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                    {sendButton && <SendButton />}
                </div>
            </div>
            {emotions && <Emotions onSelectSentiment={onSelectSentiment} selectedSentiment={selectedSentiment}  />}
        </div>
    );
};

export default InputField;
