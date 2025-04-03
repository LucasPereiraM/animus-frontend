import InputField from "@/components/inputField";
import Image from "next/image";

type InfoFieldProps = {
    field: string;
    info: string;
    width: string;
}


const InfoField = ({ field, info, width }: InfoFieldProps) => {
    return (
        <div className={`bg-white p-5 rounded-lg shadow-md h-full border-2 ${width}`}>
            <div className="flex flex-rcw gap-5">
                <span className="font-semibold text-2xl bg-gray-300 rounded-md p-2 flex items-center">{field} </span>
                <p className="text-2xl flex justify-center items-center">{info}</p>
            </div>
        </div>
    )
}

const SwitchToMap = () => {
    return (
        <button className="flex flex-row rounded-md shadow-md p-5 gap-5 mb-10 mt-10 hover:bg-slate-100 w-fit ml-14">
            <Image
                src="/icons/pin-map-fill.svg"
                alt="logo do site"
                width={30}
                height={30}
            />
            <p className="text-xl text-center text-primary">Profissionais na área</p>
        </button>
    )
}

export default function Profissionais() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col">
                    <h2 className="text-4xl mt-10 mb-10 ml-2 text-gray-600">Pesquise um Profissional</h2>
                    <div className="flex flex-row gap-10 h-[150px]">
                        <InputField emotions={false} inputWidth="w-[600px]" width="w-[650px]" placeholder="Nome do Médico" sendButton={false} />
                        <InputField emotions={false} inputWidth="w-[150px]" width="w-[200px]" placeholder="UF" sendButton={false} />
                        <InputField emotions={false} inputWidth="w-[400px]" width="w-[450px]" placeholder="CRM" sendButton={false} />
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <InputField emotions={false} inputWidth="w-[600px]" width="w-[650px]" placeholder="Especialidade" sendButton={false} />
                                <InputField emotions={false} inputWidth="w-[670px]" width="w-[690px]" placeholder="Área de atuação" sendButton={false} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="ml-10 mt-32">
                    <Image src="/icons/search.svg" alt="buscar profissional" width={60} height={60} />
                </button>
            </div>
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-10">
                    <h2 className="text-4xl mb-10 mt-20 ml-14 text-gray-600">Dados</h2>
                    <div className="flex flex-col gap-5 ml-14">
                        <InfoField field="Nome" info="Dr. Mau Mau" width="w-full" />
                        <InfoField field="Especialidade" info="Psiquiatria" width="w-full" />
                        <div className="flex flex-row gap-5 w-full">
                            <InfoField field="CRM" info="123456 - MG" width="w-1/2" />
                            <InfoField field="Inscrição" info="Principal" width="w-1/2" />
                        </div>
                        <InfoField field="Endereço" info="Bloco 1b, Santa Mônica, Uberlândia - MG" width="w-full" />
                        <InfoField field="Telefone" info="34 99999-9999" width="w-full" />
                    </div>
                </div>
                <div className="flex justify-center w-1/2 h-1/2 mt-60">
                    <Image src="/maumau.png" alt="Descrição da imagem" width={350} height={350} className="rounded-lg shadow-lg" />
                </div>
            </div>
            <SwitchToMap />
        </div>
    );
}