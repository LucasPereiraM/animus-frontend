"use client"

import InputField from "@/components/inputField";
import Image from "next/image";
import { useState } from "react";
import useFetchCfmData from "@/hooks/useFetchCfmData";
import Modal from "@/components/modal";
import ResultsTable from "@/components/resultsTable";

type InfoFieldProps = {
    field: string;
    info: string;
    width: string;
};

type Medico = {
    nomeMedico: string;
    especialidade: string;
    crm: string;
    uf: string;
    endereco: string;
    telefone: string;
};


const InfoField = ({ field, info, width }: InfoFieldProps) => {
    return (
        <div className={`p-5 rounded-lg shadow-md h-full border-2 hover:bg-gray-50 ${width}`}>
            <div className="flex flex-row gap-5">
                <span className="text-2xl bg-gray-300 rounded-md p-2 flex items-center">{field}</span>
                <p className="text-2xl flex justify-center items-center">{info}</p>
            </div>
        </div>
    );
};

export default function Profissionais() {
    const [nome, setNome] = useState('');
    const [uf, setUf] = useState('');
    const [crm, setCrm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Medico | null>(null);

    const { data, loading, error, fetchData } = useFetchCfmData();

    const handleBuscar = () => {
        const medicoParams = {
            nome: nome,
            estado: uf,
            crm: crm,
        };
        fetchData("https://maoamiga.up.railway.app/get_In_Specific_CRM", medicoParams);
        setModalOpen(true);
    };

    const handleSelectItem = (item: Medico) => {
        setSelectedItem(item);
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-10 mb-20">
            <div className="flex 2xl:flex-row justify-center items-center xl:flex-col lg:flex-col md:flex-col flex-col">
                <div className="flex flex-col justify-center items-center lg:justify-center lg:items-center md:justify-center md:items-center">
                    <div className="flex flex-col mb-20 mt-10 gap-5 lg:justify-center lg:items-center lg:ml-0 lg:text-center md:text-center md:ml-0 text-center justify-center items-center">
                        <h2 className="xl:text-4xl xl:mt-10 text-gray-600 lg:text-2xl text-xl">Pesquise um Profissional</h2>
                        <p className="xl:text-lg lg:text-base">por Nome, número de Conselho Regional de Medicina (CRM) ou Unidade Federativa (UF)</p>
                    </div>
                    <div className="flex xl:flex-row xl:mb-10 gap-10 h-[150px] xl:-ml-16 lg:flex-col lg:mb-40 lg:ml-0 md:flex-col md:mb-80 md:ml-0 flex-col justify-center items-center mt-20">
                        <InputField emotions={false} inputWidth="" width="md:w-[500px] w-[400px]" placeholder="Nome do Médico" sendButton={false} value={nome} onChange={setNome} />
                        <InputField emotions={false} inputWidth="w-[150px]" width="w-[200px]" placeholder="UF" sendButton={false} value={uf} onChange={setUf} isUf />
                        <InputField emotions={false} inputWidth="w-[400px]" width="md:w-[450px] w-[400px]" placeholder="CRM" sendButton={false} value={crm} onChange={setCrm} />
                    </div>
                </div>
                <button className="ml-10 md:-mt-24 xl:mt-[300px] lg:-mt-2 mt-40 flex justify-center items-center" onClick={handleBuscar}>
                    <Image src="/icons/search.svg" alt="buscar profissional" className="hover:mb-1" width={60} height={60} />
                </button>
            </div>

            {selectedItem && (
                <div className="flex flex-row gap-10 justify-center">
                    <div className="flex flex-col gap-5 md:w-[950px] w-[400px]">
                        <InfoField field="Nome" info={selectedItem.nomeMedico} width="" />
                        <InfoField field="Especialidade" info={selectedItem.especialidade} width="" />
                        <InfoField field="CRM" info={`${selectedItem.crm} - ${selectedItem.uf}`} width="" />
                        <InfoField field="Endereço" info={selectedItem.endereco} width="" />
                        <InfoField field="Telefone" info={selectedItem.telefone} width="" />
                    </div>
                </div>
            )}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {loading && <p>Carregando...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <ResultsTable data={data} onSelect={handleSelectItem} />
                )}
            </Modal>
        </div>
    );
}
