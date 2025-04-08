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

const SwitchToMap = () => {
    return (
        <button className="flex flex-row rounded-md shadow-md p-5 gap-5 mb-10 mt-10 hover:bg-slate-100 w-fit ml-14">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt-fill text-primary" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <p className="text-xl text-center">Profissionais na área</p>
        </button>
    );
};

export default function Profissionais() {
    const [nome, setNome] = useState('');
    const [uf, setUf] = useState('');
    const [crm, setCrm] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

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

    const handleSelectItem = (item: any) => {
        setSelectedItem(item);
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col">
                    <h2 className="text-4xl mt-10 mb-16 ml-2 text-gray-600">Pesquise um Profissional</h2>
                    <div className="flex flex-row gap-10 h-[150px]">
                        <InputField emotions={false} inputWidth="w-[600px]" width="w-[650px]" placeholder="Nome do Médico" sendButton={false} value={nome} onChange={setNome} />
                        <InputField emotions={false} inputWidth="w-[150px]" width="w-[200px]" placeholder="UF" sendButton={false} value={uf} onChange={setUf} />
                        <InputField emotions={false} inputWidth="w-[400px]" width="w-[450px]" placeholder="CRM" sendButton={false} value={crm} onChange={setCrm} />
                    </div>
                </div>
                <button className="ml-10 mt-32" onClick={handleBuscar}>
                    <Image src="/icons/search.svg" alt="buscar profissional" className="hover:mb-1" width={60} height={60} />
                </button>
            </div>

            {selectedItem && (
                <div className="flex flex-row gap-10 justify-center">
                    <div className="flex flex-col gap-5 w-[950px]">
                        <InfoField field="Nome" info={selectedItem.nomeMedico} width="w-full" />
                        <InfoField field="Especialidade" info={selectedItem.especialidade} width="w-full" />
                        <InfoField field="CRM" info={`${selectedItem.crm} - ${selectedItem.uf}`} width="w-full" />
                        <InfoField field="Endereço" info={selectedItem.endereco} width="w-full" />
                        <InfoField field="Telefone" info={selectedItem.telefone} width="w-full" />
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

            <div className="flex justify-center">
                <SwitchToMap />
            </div>
        </div>
    );
}
