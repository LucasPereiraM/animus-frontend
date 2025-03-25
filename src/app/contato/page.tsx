"use client"
import SelectStateCity from "@/components/stateAndCitySelector";
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
            <div className="mt-32">
                <SelectStateCity/>
                <div>
                    <Table />
                </div>

            </div>

        </div>
    );
}
