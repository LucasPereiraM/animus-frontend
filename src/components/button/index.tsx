import Image from "next/image";

interface ActionButtonProps {
    image: string;
    name: string;
    alt: string;
    imgWidth: number;
    imgHeight: number;
    onClick?: () => void;
}

export default function ActionButton({ name, image, alt, imgWidth, imgHeight, onClick }: ActionButtonProps) {
    return (
        <button 
            onClick={onClick}
            className="flex flex-col gap-5 justify-center items-center w-28 h-28 rounded shadow-md hover:bg-blue-100"
        >
            <Image src={image} alt={alt} width={imgWidth} height={imgHeight} />
            <h4 className="text-base">{name}</h4>
        </button>
    );
}
