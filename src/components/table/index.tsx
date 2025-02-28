import React from 'react';

const Table = () => {
    const data = [
        {
            email: "sac@amigosdavida.org",
            endereco: "Avenida Paulista, 1000. BELA VISTA, 01310-000. SÃO PAULO - SP",
            nome: "AMIGOS DA VIDA",
            cnpj: "69765432000198",
        },
        {
            email: "atendimento@vidasolidaria.com.br",
            endereco: "Rua da Esperança, 456. VILA MARIANA, 04015-000. SÃO PAULO - SP",
            nome: "VIDA SOLIDÁRIA",
            cnpj: "45678912000145",
        },
        {
            email: "suporte@caminhodobem.org",
            endereco: "Avenida Brasil, 789. JARDIM AMÉRICA, 01431-000. SÃO PAULO - SP",
            nome: "CAMINHO DO BEM",
            cnpj: "32165496000132",
        },
        {
            email: "exemplo1@lesle.com",
            endereco: "Rua Exemplo, 111. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 1",
            cnpj: "1111111000111",
        },
        {
            email: "exemplo2@lesle.com",
            endereco: "Rua Exemplo, 222. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 2",
            cnpj: "22222222000122",
        },
        {
            email: "exemplo3@lesle.com",
            endereco: "Rua Exemplo, 333. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 3",
            cnpj: "33333333000133",
        },
        {
            email: "exemplo4@lesle.com",
            endereco: "Rua Exemplo, 444. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 4",
            cnpj: "44444444000144",
        },
        {
            email: "exemplo5@lesle.com",
            endereco: "Rua Exemplo, 555. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 5",
            cnpj: "55555555000155",
        },
        {
            email: "exemplo6@lesle.com",
            endereco: "Rua Exemplo, 666. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 6",
            cnpj: "66666666000166",
        },
        {
            email: "exemplo7@lesle.com",
            endereco: "Rua Exemplo, 777. CENTRO, 01001-000. SÃO PAULO - SP",
            nome: "EXEMPLO 7",
            cnpj: "77777777000177",
        },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                    EMAIL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                    ENDERECO
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                    MANTEDORA
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                                    CNPJ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.endereco}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.nome}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.cnpj}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
