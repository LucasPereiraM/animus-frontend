"use client";
import React from "react";
import useFetchData from "@/hooks/useFetchData"; // Importando o hook

const API_URL = "URL_DA_API"; // Substitua pela URL real

const Table = () => {
  const { data, loading, error } = useFetchData(API_URL);

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
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Nenhum dado encontrado
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.endereco}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.mantenedora}</td>
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
