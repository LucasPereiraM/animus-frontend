"use client";
import InputField from "@/components/inputField";
import RecipesCarousel from "@/components/recipesCarousel";
import RecipesGridLayout from "@/components/recipesGridLayout";
import { useState, useEffect, useRef } from "react";
import useFetchReceitaData, { Receita } from "@/hooks/useFetchRecipeData";
import Image from "next/image";

export default function Receitas() {
  const { data, loading, error, fetchData } = useFetchReceitaData();
  const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [searchValue, setSearchValue] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");

  const receitaDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData("https://maoamiga.up.railway.app/get_in_general_recipe");
  }, [fetchData]);

  const handleRecipeClick = (receita: Receita) => {
    setSelectedReceita(receita);

    if (receitaDetailsRef.current) {
      receitaDetailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredRecipes = data.filter((item) => {
    const titulo = normalize(item.receita.nome_receita ?? "");
    const sentimentos = normalize(item.receita.sentimento ?? "");

    const matchesText = titulo.includes(normalize(searchValue));
    const matchesSentiment = selectedSentiment
      ? (() => {
        const sentimentoNormalizado = normalize(sentimentos);
        const selecionado = normalize(selectedSentiment);

        if (selecionado === "felicidade") {
          return (
            sentimentoNormalizado.includes("felicidade") ||
            sentimentoNormalizado.includes("euforia")
          );
        }

        if (selecionado === "paixao") {
          return (
            sentimentoNormalizado.includes("paixao") ||
            sentimentoNormalizado.includes("apaixonado")
          );
        }

        return sentimentoNormalizado.includes(selecionado);
      })()
      : true;

    return matchesText && matchesSentiment;
  });


  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <InputField
            emotions={true}
            width="w-full"
            inputWidth="w-[1000px]"
            placeholder="Pesquise uma receita."
            sendButton={false}
            marginTop="mt-10"
            value={searchValue}
            onChange={setSearchValue}
            selectedSentiment={selectedSentiment}
            onSelectSentiment={setSelectedSentiment}
          />
          {selectedSentiment && (
            <div>
              <button
                onClick={() => setSelectedSentiment("")}
                className="mt-2 ml-4 text-sm text-primary underline hover:text-blue-600 transition"
              >
                <div className="flex flex-row items-center gap-2 mt-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 16 16">
                    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                  </svg>
                  Limpar Sentimento
                </div>

              </button>
            </div>
          )}
        </div>

      </div>
      <div className="flex flex-col mt-20 mb-10">
        <h2 className="text-4xl text-gray-600">Escolha uma receita</h2>
        <p className="text-lg text-wrap  w-[530px]">Clique na receita para abrir os ingredientes e modo de preparo ou busque um livro...</p>
      </div>


      {loading && <p className="mt-10 text-gray-500">Carregando receitas...</p>}
      {error && <p className="mt-10 text-red-500">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="flex justify-center my-6 mt-20">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "carousel" : "grid")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {viewMode === "grid" ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
                  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                </svg>
              }
            </button>
          </div>

          {viewMode === "grid" ? (
            <div className="h-[800px] overflow-y-auto mx-auto w-fit mb-20">
              <RecipesGridLayout items={filteredRecipes.map(item => item.receita)} onRecipeClick={handleRecipeClick} />
            </div>
          ) : (
            <div className="w-full flex justify-center mb-20">
              <RecipesCarousel items={filteredRecipes.map(item => item.receita)} onRecipeClick={handleRecipeClick} />
            </div>
          )}
        </>
      )}

      {selectedReceita && (
        <div
          ref={receitaDetailsRef}
          className="mt-20 mb-20 flex flex-col items-center"
        >
          <h3 className="text-3xl text-primary mb-4 w-[500px] text-center">
            {selectedReceita.nome_receita}
          </h3>
          <p className="text-gray-600 mb-4">
            Sentimento relacionado: {selectedReceita.sentimento}
          </p>
          <Image
            src={selectedReceita.foto_receita}
            alt={`Foto da receita ${selectedReceita.nome_receita}`}
            width={500}
            height={300}
            className="rounded-lg"
          />
          <div className="w-[500px] text-center mt-10">
            <h4 className="text-xl font-semibold mb-2">Ingredientes</h4>
            <ul className="mb-6 list-disc list-inside">
              {selectedReceita.ingredientes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h4 className="text-xl font-semibold mb-2">Modo de preparo</h4>
            <ol className="list-decimal list-inside text-left">
              {selectedReceita.preparo.map((step, index) => (
                <li key={index} className="text-center p-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
