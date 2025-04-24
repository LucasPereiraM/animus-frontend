"use client";
import Image from 'next/image';

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
}

const SendButton = () => {
    return (
        <button className="absolute right-4 flex items-center">
            <Image src="/icons/arrow.svg" alt="menu de navegação" className='mt-2' width={61} height={61} />
        </button>
    );
};

const Emotions = () => {
    return (
        <div className="flex gap-2 self-end mt-4">
            <button><Image src="/icons/angry.svg" alt="emoção - raiva" width={53} height={53} /></button>
            <button><Image src="/icons/sad.svg" alt="emoção - tristeza" width={53} height={53} /></button>
            <button><Image src="/icons/happy.svg" alt="emoção - felicidade" width={53} height={53} /></button>
            <button><Image src="/icons/euphoric.svg" alt="emoção - euforia" width={53} height={53} /></button>
            <button><Image src="/icons/love.svg" alt="emoção - apaixonado" width={53} height={53} /></button>
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
            {emotions && <Emotions />}
        </div>
    );
};

export default InputField;
