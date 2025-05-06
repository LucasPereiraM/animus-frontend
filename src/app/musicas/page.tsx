"use client"

import useFetchVideoData from "@/hooks/useFetchVideoData";
import { useState } from "react";
import InputField from "@/components/inputField";
import MusicList from "@/components/musicList";

export default function Musicas() {
    const { data, loading, error, fetchData } = useFetchVideoData();
    const [searchValue, setSearchValue] = useState("");
    const [selectedSentiment, setSelectedSentiment] = useState("");
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);
    const [showList, setShowList] = useState<boolean>(false);

    const handleBuscar = () => {
        setShowList(true);
        const musicParams = {
            feeling: searchValue
        };
        fetchData("https://maoamiga.up.railway.app/video", musicParams);
    };

    const handleBuscarSentimento = (sentiment: string) => {
        setShowList(true);
        setSelectedSentiment(sentiment);
        const musicParams = {
            feeling: sentiment
        };
        fetchData("https://maoamiga.up.railway.app/video", musicParams);
    };

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center">
                <div className="mr-40">
                    <InputField
                        emotions={true}
                        inputWidth="w-[600px]"
                        width="w-[650px]"
                        placeholder="Estou me sentindo estressado..."
                        sendButton={true}
                        value={searchValue}
                        onChange={setSearchValue}
                        selectedSentiment={selectedSentiment}
                        onSelectSentiment={setSelectedSentiment}
                        emotionsMargin="mr-40"
                        marginTop="mt-10"
                        onSendClick={handleBuscar}
                        onEmotionSelect={handleBuscarSentimento}
                    />
                </div>
                <div className="flex flex-row gap-10 mt-10 mb-10">
                    {showList ? (
                        loading ? (
                            <div className="text-xl text-gray-600 border-2 rounded-md px-8 py-6 shadow animate-pulse">
                                Carregando músicas...
                            </div>
                        ) : error ? (
                            <div className="text-red-500 text-lg border-2 border-red-300 px-8 py-6 rounded shadow">
                                Ocorreu um erro ao buscar as músicas. Tente novamente.
                            </div>
                        ) : (
                            <MusicList
                                items={data}
                                onSelect={setCurrentVideo}
                            />
                        )
                    ) : (
                        <div className="shadow-md border-2 p-2 mb-72 text-3xl text-gray-600">
                            Busque uma música de acordo com seus sentimentos...
                        </div>
                    )}

                    {currentVideo && (
                        <div className="flex justify-center items-center">
                            <iframe
                                src={currentVideo}
                                width="660"
                                height="415"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
