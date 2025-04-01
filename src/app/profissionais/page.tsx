import InputField from "@/components/inputField";
import Image from "next/image";

type InfoFieldProps = {
    field: string;
    info: string;
    width: string;
}


const InfoField = ({ field, info, width }: InfoFieldProps) => {
    return (
        <div className={`bg-white p-5 rounded-lg shadow-lg h-full ${width}`}>
            <p className="text-2xl"><span className="font-semibold text-2xl">{field} </span>{info}</p>
        </div>
    )
}

const SwitchToMap = () => {
    return (
        <button className="flex flex-row rounded-md shadow-md p-5 gap-5 mb-10 mt-10 hover:bg-slate-100">
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
        <div>
            <div className="mt-24">
                <div className="flex justify-end">
                </div>
                <h2 className="text-4xl ml-28">Pesquise um Profissional:</h2>
            </div>
            <div className="flex flex-row">
                <div className="ml-28 flex flex-col">
                    <div className="flex flex-row h-[200px] ml-">
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Nome do Médico" sendButton={false} marginTop="mt-10" marginLeft="" />
                        <InputField emotions={false} inputWidth="w-[150px]" width="w-[200px]" placeholder="UF" sendButton={false} marginTop="mt-10" marginLeft="ml-10" />
                        <InputField emotions={false} inputWidth="w-[460px]" width="w-[510px]" placeholder="CRM" sendButton={false} marginTop="mt-10" marginLeft="-ml-[380px]" />
                    </div>
                    <div className="flex flex-row h-[200px]">
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Especialidade" sendButton={false} marginTop="" marginLeft="" />
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Área de atuação" sendButton={false} marginTop="" marginLeft="ml-10" />
                        <button className="flex h-9 ml-10 mt-12 hover:mt-[46px]">
                            <Image src="/icons/search.svg" alt="buscar profissional" width={70} height={70} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="ml-28 -mt-5 mb-40 flex flex-row gap-10">
                <div className="flex flex-col gap-10 w-1/2">
                    <h2 className="text-4xl mb-10">Dados:</h2>
                    <InfoField field="Nome:" info="Dr. Mau Mau" width="w-full" />
                    <InfoField field="Especialidade:" info="Psiquiatria" width="w-full" />
                    <div className="flex flex-row gap-5 w-full">
                        <InfoField field="CRM:" info="123456 - MG" width="w-1/2" />
                        <InfoField field="Inscrição:" info="Principal" width="w-1/2" />
                    </div>
                    <InfoField field="Endereço:" info="Bloco 1b, Santa Mônica, Uberlândia - MG" width="w-full" />
                    <InfoField field="Telefone:" info="34 99999-9999" width="w-1/2" />
                </div>
                <div className="flex w-1/2 h-1/2 ml-20 mt-28">
                    <Image src="/maumau.png" alt="Descrição da imagem" width={350} height={350} className="rounded-lg shadow-lg" />
                </div>
            </div>
            <SwitchToMap/>
        </div>
    );
}