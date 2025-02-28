"use client"
import InputField from "@/components/inputField";
import Carousel from "@/components/carousel";

export default function Contato() {
    return (
        <div className="flex flex-row gap-24 justify-center">
            <div>
                <InputField emotions={false} width="w-[1200px]" inputWidth="w-[1150px]" placeholder="Minas Gerais" />
                <Carousel />
            </div>

        </div>
    );
}
