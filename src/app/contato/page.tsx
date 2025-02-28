"use client"
import InputField from "@/components/inputField";
import ActionButton from "@/components/button";
import Table from "@/components/table";

export default function Contato() {
    return (
        <div className="flex flex-row gap-24 justify-center">
            <div className="flex flex-col mt-32 mb-10 gap-5">
                <ActionButton image="/icons/chat.svg" name="Chat" />
                <ActionButton image="/icons/phone.svg" name="Ligar 188" />
                <ActionButton image="/icons/email.svg" name="Email" />
                <ActionButton image="/icons/point.svg" name="Endereço" />
                <ActionButton image="/icons/map.svg" name="Exibir Mapa" />
            </div>
            <div>
                <InputField emotions={false} width="w-[1200px]" inputWidth="w-[1150px]" placeholder="Minas Gerais" />
                <div className="-mt-40">
                    <Table />
                </div>

            </div>

        </div>
    );
}
