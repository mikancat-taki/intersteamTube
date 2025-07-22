import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Youtube } from 'lucide-react';

export default function YouTubePlayer() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);

  const extractVideoId = (url: string): string | null => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || null;
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || null;
    } else if (url.length === 11) {
      // Assume it's a video ID
      return url;
    }
    return null;
  };

  const loadVideo = () => {
    if (!url.trim()) {
      alert('YouTubeのURLを入力してください');
      return;
    }

    const id = extractVideoId(url.trim());
    if (id) {
      setVideoId(id);
    } else {
      alert('有効なYouTubeのURLまたは動画IDを入力してください');
    }
  };

  return (
    <div className="glass rounded-2xl p-6 mb-6 floating">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Youtube className="text-red-500 mr-2" />
        YouTube動画視聴
      </h2>
      
      <div className="mb-4 space-y-3">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTubeのURLまたは動画IDを入力してください..."
          className="bg-gray-800 border-gray-600 focus:border-purple-500"
          onKeyPress={(e) => e.key === 'Enter' && loadVideo()}
        />
        <Button onClick={loadVideo} className="bg-red-600 hover:bg-red-700">
          <Play className="mr-2 h-4 w-4" />
          動画を読み込み
        </Button>
      </div>
      
      <div className="youtube-container">
        {videoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube Video Player"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Youtube className="text-6xl mb-4 opacity-50 mx-auto" />
              <p>YouTubeのURLを入力して動画を再生してください</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
