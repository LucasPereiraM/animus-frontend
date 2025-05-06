import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Livro } from '@/hooks/useFetchBookData';

type CarouselProps = {
  items: Livro[];
  onBookClick: (livro: Livro) => void;
  downloadIcon?: boolean;
};

export default function BooksCarousel({ items, onBookClick, downloadIcon }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const goLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getVisibleItems = () => {
    return Array.from({ length: visibleItemsCount }, (_, i) => items[(startIndex + i) % items.length]);
  };

  useEffect(() => {
    const updateVisibleItemsCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleItemsCount(3);
      } else if (width >= 768) {
        setVisibleItemsCount(2);
      } else {
        setVisibleItemsCount(1);
      }
    };

    window.addEventListener('resize', updateVisibleItemsCount);

    updateVisibleItemsCount();

    return () => {
      window.removeEventListener('resize', updateVisibleItemsCount);
    };
  }, [items.length]);

  if (!items || items.length === 0) {
    return <p className="text-center mt-10">Nenhum livro encontrado.</p>;
  }

  return (
    <div className="flex items-center justify-center py-10 relative z-10 bg-white">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={goLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Image
            src="/icons/arrow-left.svg"
            alt="navegar para esquerda"
            width={24}
            height={24}
          />
        </button>

        <div className="flex justify-center space-x-4 p-4 gap-10 md:gap-4">
          {getVisibleItems().map((livro, index) => {
            const isCenterItem = visibleItemsCount === 3 && index === 1;
            return (
              <div
                key={index}
                className={`flex-shrink-0 transition-transform relative ${isCenterItem ? 'scale-110' : 'scale-100'} ${visibleItemsCount === 3 ? 'w-1/3' : visibleItemsCount === 2 ? 'w-1/2' : 'w-full'}`}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col relative h-[400px] justify-between cursor-pointer"
                  onClick={() => onBookClick(livro)}
                >
                  {downloadIcon &&
                    <button className="absolute -ml-10 -mt-5 rounded-md z-30">
                      <a href={livro.link_download} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                          className="bi bi-file-earmark-arrow-down-fill text-primary" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0" />
                        </svg>
                      </a>
                    </button>}
                  <div className="w-full h-48 flex items-center justify-center">
                    <Image
                      src={livro.imagem_capa || "/icons/book-half.svg"}
                      alt={livro.titulo}
                      width={500}
                      height={750}
                      className="max-w-full max-h-full object-contain rounded-t-lg"
                    />
                  </div>
                  <div className="text-center w-full mt-6">
                    <h3 className="text-lg font-normal text-primary">{livro.titulo}</h3>
                    {livro.sentimentos && (
                      <p className="text-sm text-gray-600">{livro.sentimentos.join(", ")}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={goRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
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
