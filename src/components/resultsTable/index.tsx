type Props = {
    data: any[];
    onSelect: (item: any) => void;
};

export default function ResultsTable({ data, onSelect }: Props) {
    return (
        <table className="min-w-full border text-left text-xl">
            <thead>
                <tr>
                    <th className="p-4 border">Nome</th>
                    <th className="p-4 border">Especialidade</th>
                    <th className="p-4 border">CRM</th>
                    <th className="p-4 border">Telefone</th>
                    <th className="p-4 border">Endereço</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 cursor-pointer" onClick={() => onSelect(item)}>
                        <td className="p-4 border">{item.nomeMedico}</td>
                        <td className="p-4 border">{item.especialidade}</td>
                        <td className="p-4 border">{item.crm} - {item.uf}</td>
                        <td className="p-4 border">{item.telefone}</td>
                        <td className="p-4 border">{item.endereco}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
