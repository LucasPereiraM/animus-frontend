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
    selectedSentiment?: string;
    onSelectSentiment?: (s: string) => void;
    emotionsMargin?: string;
    onSendClick?: () => void;
    onEmotionSelect?: (sentiment: string) => void;
}

interface EmotionProps {
    selectedSentiment: string;
    onSelectSentiment: (s: string) => void;
    emotionsMargin?: string;
    onEmotionSelect?: (sentiment: string) => void;
}

interface SendButtonProps {
    onClick?: () => void;
}

const SendButton = ({ onClick }: SendButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (onClick) onClick();
    };

    return (
        <button className="absolute right-4 flex items-center" onClick={handleClick}>
            <Image src="/icons/arrow.svg" alt="menu de navegação" className='mt-2' width={61} height={61} />
        </button>
    );
};

const emotionsList = [
    { name: "Raiva", icon: "/icons/raiva.svg" },
    { name: "Tristeza", icon: "/icons/triste.svg" },
    { name: "Felicidade", icon: "/icons/feliz.svg" },
    { name: "Paixão", icon: "/icons/apaixonado.svg" }
];

const Emotions = ({ selectedSentiment, onSelectSentiment, emotionsMargin, onEmotionSelect }: EmotionProps) => {
    return (
        <div className={`flex gap-2 self-end mt-4 ${emotionsMargin}`}>
            {emotionsList.map((emotion) => (
                <button
                    key={emotion.name}
                    onClick={() => {
                        onSelectSentiment(emotion.name);
                        onEmotionSelect?.(emotion.name);
                    }}
                    className={`relative group w-16 flex flex-col items-center justify-center rounded ${selectedSentiment === emotion.name ? "ring-2 ring-blue-500" : ""
                        }`}
                >
                    <Image
                        src={emotion.icon}
                        alt={`emoção - ${emotion.name}`}
                        width={53}
                        height={53}
                    />
                    <p className="absolute top-full mt-2 text-sm text-gray-600 transform -translate-x-1/2 left-1/2 hidden group-hover:block">
                        {emotion.name}
                    </p>
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
    selectedSentiment = "",
    onSelectSentiment,
    onChange,
    emotionsMargin,
    isUf = false,
    onSendClick,
    onEmotionSelect,
}: InputFieldProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;

        if (isUf) {
            input = input.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
        }

        onChange(input);
    };

    return (
        <div className={`font-raleway ${marginTop} ${marginLeft} w-full max-w-lg`}>
            <div className={`bg-[#EFEFEF] p-5 shadow-md rounded-lg ${width} flex flex-col`}>
                <div className="relative flex flex-wrap w-full">
                    <input
                        type="text"
                        className="h-[74px] text-3xl p-3 border border-[#9E9E9E] shadow-md rounded-lg flex-grow w-full sm:w-[calc(100%-80px)]" // A largura é 100% no mobile, e ajustada no sm
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                    {sendButton && <SendButton onClick={onSendClick} />}
                </div>
            </div>

            {emotions && typeof onSelectSentiment === 'function' && (
                <Emotions
                    onSelectSentiment={onSelectSentiment}
                    selectedSentiment={selectedSentiment}
                    emotionsMargin={emotionsMargin}
                    onEmotionSelect={onEmotionSelect}
                />
            )}
        </div>
    );
};

export default InputField;
