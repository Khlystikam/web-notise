import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [filePath, setFilePath] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch((error) => {
                console.error("Автовоспроизведение заблокировано: ", error);
            });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let data:any;

            try {
            const response = await fetch(`${"/php/web-notise/music-file.json"}?cacheBuster=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
                console.log(loading, error);
            }

            if (response) {
                data = await response.json();
            }

            setFilePath(data.fileName);

            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <audio ref={audioRef} src={`/assets/web-notise/music/${filePath}`} autoPlay loop />
    );
};

export default AudioPlayer;