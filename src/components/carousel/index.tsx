import { useState } from 'react';
import Image from 'next/image';

interface Item {
    id: number;
    title: string;
    subtitle?: string; 
    img: string;
}

interface CarouselProps {
    items: Item[];
}

export default function Carousel({ items }: CarouselProps) {
    const [startIndex, setStartIndex] = useState(0);

    const goLeft = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goRight = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const getVisibleItems = () => {
        return [0, 1, 2].map((i) => items[(startIndex + i) % items.length]);
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-visible">
            <div className="relative w-full max-w-4xl">
                <button
                    onClick={goLeft}
                    className="absolute -left-44 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
                >
                    <Image
                        src="/icons/arrow-left.svg"
                        alt="navegar para esquerda"
                        width={24}
                        height={24}
                    />
                </button>
                <div className="flex justify-center space-x-4 p-4 mb-80 gap-10">
                    {getVisibleItems().map((item, index) => (
                        <div key={item.id} className={`flex-shrink-0 w-1/3 ${index === 1 ? 'scale-110' : 'scale-100'} transition-transform relative`}>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full relative">
                                <div className="w-full h-48 flex items-center justify-center">
                                    <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain rounded-t-lg" />
                                </div>
                            </div>
                            <div className="mt-56 text-center absolute bottom-[-6rem] w-full">
                                <h3 className="text-lg font-normal text-primary">{item.title}</h3>
                                {/* Renderiza o subtítulo apenas se ele existir */}
                                {item.subtitle && (
                                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={goRight}
                    className="absolute -right-44 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
                >
                    <Image
                        src="/icons/arrow-right.svg"
                        alt="navegar para direita"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </div>
    );
}