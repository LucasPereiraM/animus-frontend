import Image from "next/image";

interface ActionButtonProps {
    image: string;
    name: string;
    alt: string;
}

export default function ActionButton({ name, image, alt }: ActionButtonProps) {
    return (
        <button className="flex flex-col gap-5 justify-center items-center w-28 h-28 rounded shadow-md hover:bg-blue-100">
            <Image src={image} alt={alt} width={27} height={25} />
            <h4 className="text-base">{name}</h4>
        </button>
    );
}
