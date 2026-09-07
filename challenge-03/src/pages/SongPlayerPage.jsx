import { useState, useEffect } from "react";
import LinkedList from "../data-structures/LinkedList";

const SONGS = [
  { title: "One Last Kiss", artist: "Hikaru Utada", duration: "4:11" },
  { title: "言って。", artist: "ヨルシカ", duration: "4:01" },
  { title: "Amore", artist: "ReoNa", duration: "4:35" },
  { title: "Fig Smoke", artist: "ZUTOMAYO", duration: "3:55" },
  { title: "Groooovy", artist: "I Dont like mondays", duration: "2:50" },
  { title: "Peace Sign", artist: "Kenshi Yonezu", duration: "3:58" },
  { title: "Anoko Secret", artist: "Eve", duration: "3:53" },
  { title: "SPECIALZ", artist: "King Gnu", duration: "3:58" },
];

function SongPlayerPage() {
  const [playlist] = useState(() => {
    const list = new LinkedList();
    SONGS.forEach((song) => list.append(song));
    return list;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const node = playlist.getAt(currentIndex);
    if (node) {
      setCurrentSong(node.data);
    }
  }, [currentIndex, playlist]);

  const handleNext = () => {
    if (currentIndex < playlist.size - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const allSongs = playlist.toArray();

  return (
    <div className="page-container">
      <h1>Reproductor de Canciones</h1>
      <p className="subtitle">Usando <strong>Linked List</strong></p>

      {currentSong && (
        <div className="now-playing">
          <h2>Reproduciendo ahora</h2>
          <div className="song-card current">
            <span className="song-title">{currentSong.title}</span>
            <span className="song-artist">{currentSong.artist}</span>
            <span className="song-duration">{currentSong.duration}</span>
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Anterior
        </button>
        <span className="track-info">
          Canción {currentIndex + 1} de {playlist.size}
        </span>
        <button onClick={handleNext} disabled={currentIndex === playlist.size - 1}>
          Siguiente
        </button>
      </div>

      <h3>Playlist completa</h3>
      <div className="list-container">
        {allSongs.map((song, index) => (
          <div
            key={index}
            className={`song-card ${index === currentIndex ? "current" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="song-index">{index + 1}.</span>
            <span className="song-title">{song.title}</span>
            <span className="song-artist">{song.artist}</span>
            <span className="song-duration">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongPlayerPage;