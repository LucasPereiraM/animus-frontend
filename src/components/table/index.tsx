"use client";
import React, { useState, useEffect } from "react";
import useFetchCvvData from "@/hooks/useFetchCvvData";

type Item = {
  email: string;
  endereco: string;
  mantenedora: string;
  cnpj: string;
  estado: string;
  cidade: string;
};

const API_URL = "https://maoamiga.up.railway.app/get_in_general_cvv";

interface TableProps {
  estadoSelecionado: string | null;
  cidadeSelecionada: string | null;
}

const Table: React.FC<TableProps> = ({ estadoSelecionado, cidadeSelecionada }) => {
  const { data, loading, error } = useFetchCvvData(API_URL);
  const [displayed, setDisplayed] = useState<Item[]>([]);

  useEffect(() => {
    if (!data) return;

    let filteredData = [...data];

    if (estadoSelecionado) {
      filteredData = filteredData.filter((item) => item.estado === estadoSelecionado);
    }

    if (cidadeSelecionada) {
      filteredData = filteredData.filter((item) => item.cidade === cidadeSelecionada);
    }

    setDisplayed(filteredData);
  }, [data, estadoSelecionado, cidadeSelecionada]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full w-[1000px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  ENDEREÇO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  MANTENEDORA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider">
                  CNPJ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Carregando...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-red-500">
                    Erro: {error}
                  </td>
                </tr>
              ) : displayed.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Nenhum dado encontrado
                  </td>
                </tr>
              ) : (
                displayed.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-wrap">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-wrap">{item.endereco}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-wrap">{item.mantenedora}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cnpj}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
