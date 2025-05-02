"use client";

import Image from "next/image";

type ItemsProps = {
    title: string;
    channel: string;
    thumbnail: string;
    embed: string;
};

interface MusicListProps {
    items: ItemsProps[];
    onSelect: (embed: string) => void;
}

export default function MusicList({ items, onSelect }: MusicListProps) {
    return (
        <div className="rounded-lg shadow-md p-4 grid grid-cols-1 gap-4 w-[500px] overflow-y-auto h-[600px]">
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(item.embed)}
                    className="border p-4 rounded shadow-md flex gap-4 items-center text-left hover:bg-gray-100 bg-gray-50"
                >
                    <Image src={item.thumbnail} alt={item.title} width={100} height={100} className="rounded" />
                    <div>
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-gray-600">{item.channel}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}
