"use client"

import useFetchVideoData from "@/hooks/useFetchVideoData";
import { useState, useRef } from "react";
import InputField from "@/components/inputField";
import MusicList from "@/components/musicList";

export default function Musicas() {
    const { data, loading, error, fetchData } = useFetchVideoData();
    const [searchValue, setSearchValue] = useState("");
    const [selectedSentiment, setSelectedSentiment] = useState("");
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);
    const [showList, setShowList] = useState<boolean>(false);

    const iframeRef = useRef<HTMLDivElement>(null);

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

    const handleVideoSelect = (videoUrl: string) => {
        setCurrentVideo(videoUrl);
        setTimeout(() => {
            iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <InputField
                        emotions={true}
                        inputWidth=""
                        width="w-[400px] xl:w-[600px] lg:w-[500px] md:w-[500px]"
                        placeholder="Estou feliz!"
                        sendButton={true}
                        value={searchValue}
                        onChange={setSearchValue}
                        selectedSentiment={selectedSentiment}
                        onSelectSentiment={setSelectedSentiment}
                        emotionsMargin=""
                        marginTop="mt-10"
                        onSendClick={handleBuscar}
                        onEmotionSelect={handleBuscarSentimento}
                    />
                </div>
                <div className="flex flex-col gap-10 mt-10 mb-10 xl:flex-row lg:flex-col">
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
                            <div className="md:ml-20">
                                <MusicList
                                    items={data}
                                    onSelect={handleVideoSelect}
                                />
                            </div>
                        )
                    ) : (
                        <div className="shadow-md border-2 p-2 mb-72 text-3xl text-gray-600 w-[300px] xl:w-[500px] lg:w-[450px] md:w-[450px]">
                            Busque uma música de acordo com seus sentimentos...
                        </div>
                    )}

                    {currentVideo && (
                        <div ref={iframeRef} className="flex justify-center items-center">
                            <iframe
                                src={currentVideo}
                                width="660"
                                height="415"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="rounded-lg md:w-[660px] md:h-[415px] w-[400px] h-[200px] "
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
