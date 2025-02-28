import Image from "next/image";

interface ActionButtonProps {
    image: string;
    name: string;
}

export default function ActionButton({ name, image }: ActionButtonProps) {
    return (
        <button className="flex flex-col gap-5 justify-center items-center w-28 h-28 rounded shadow-md hover:bg-blue-100">
            <Image src={image} alt="emoção - raiva" width={27} height={25} />
            <h4 className="text-base">{name}</h4>
        </button>
    );
}
