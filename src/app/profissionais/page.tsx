import InputField from "@/components/inputField";
import Image from "next/image";

export default function Profissionais() {
    return (
        <div className="">
            <div className="mt-24">
                <h2 className="text-4xl ml-28">Pesquise um Profissional</h2>
            </div>
            <div className="flex flex-row">
                <div className="ml-28 flex flex-col">
                    <div className="flex flex-row">
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Nome do Médico" sendButton={false} marginTop="mt-10" marginLeft=""/>
                        <InputField emotions={false} inputWidth="w-[150px]" width="w-[200px]" placeholder="UF" sendButton={false} marginTop="mt-10" marginLeft="ml-10"/>
                        <InputField emotions={false} inputWidth="w-[400px]" width="w-[450px]" placeholder="CRM" sendButton={false} marginTop="mt-10" marginLeft="mr-16"/>
                    </div>
                    <div className="flex flex-row">
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Especialidade" sendButton={false} marginTop="-mt-40" marginLeft=""/>
                        <InputField emotions={false} inputWidth="w-[700px]" width="w-[750px]" placeholder="Área de atuação" sendButton={false} marginTop="-mt-40" marginLeft="ml-10"/>
                    </div>
                </div>
                <div className="rounded shadow-md">
                    <Image src="/icons/search.svg" alt="buscar profissional" width={32} height={32} />
                </div>
                
            </div>
            
        </div>
    );
}
