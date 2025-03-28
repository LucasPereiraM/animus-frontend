"use client"
import { useState } from "react";
import SelectStateCity from "@/components/selectStateCity";
import ActionButton from "@/components/button";
import Table from "@/components/table";
import Link from 'next/link';

type SwitchButtonProps = {
    name: string,
    navLink: string
}

export default function Contato() {
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

    return (
        <div className="flex flex-row gap-24 justify-center">
            <div className="flex flex-col mt-32 mb-10 gap-5">
                <ActionButton image="/icons/chat.svg" name="Chat" alt=""/>
                <ActionButton image="/icons/phone.svg" name="Ligar 188" alt="" />
            </div>
            <div className="mt-32">
                <div className="flex flex-row gap-2 ml-4">
                </div>
                <SelectStateCity
                    estadoSelecionado={estadoSelecionado}
                    setEstadoSelecionado={setEstadoSelecionado}
                    cidadeSelecionada={cidadeSelecionada}
                    setCidadeSelecionada={setCidadeSelecionada}
                />
                <div className="mb-20">
                    <Table estadoSelecionado={estadoSelecionado} cidadeSelecionada={cidadeSelecionada} />
                </div>
            </div>
        </div>
    );
}
