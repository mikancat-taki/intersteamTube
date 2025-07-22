import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Youtube, Settings, Shield, Globe } from 'lucide-react';

type PlaybackMode = 'normal' | 'nocookie' | 'proxy' | 'embed';

export default function YouTubePlayer() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('normal');

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

  const getVideoSrc = () => {
    if (!videoId) return '';
    
    switch (playbackMode) {
      case 'normal':
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      case 'nocookie':
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      case 'proxy':
        return `https://invidious.io/embed/${videoId}?autoplay=1`;
      case 'embed':
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
      default:
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  };

  const getModeIcon = (mode: PlaybackMode) => {
    switch (mode) {
      case 'normal': return <Youtube className="h-4 w-4" />;
      case 'nocookie': return <Shield className="h-4 w-4" />;
      case 'proxy': return <Globe className="h-4 w-4" />;
      case 'embed': return <Settings className="h-4 w-4" />;
    }
  };

  const getModeDescription = (mode: PlaybackMode) => {
    switch (mode) {
      case 'normal': return 'YouTube標準';
      case 'nocookie': return '匿名モード（Cookie無効）';
      case 'proxy': return 'プロキシ経由';
      case 'embed': return '埋め込み最適化';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Youtube className="text-red-500 mr-3" />
          YouTube動画視聴
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="YouTubeのURLまたは動画IDを入力してください..."
              className="bg-gray-800 border-gray-600 focus:border-purple-500 h-12 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && loadVideo()}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={playbackMode} onValueChange={(value: PlaybackMode) => setPlaybackMode(value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">
                  <div className="flex items-center">
                    <Youtube className="mr-2 h-4 w-4" />
                    標準
                  </div>
                </SelectItem>
                <SelectItem value="nocookie">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    匿名
                  </div>
                </SelectItem>
                <SelectItem value="proxy">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    プロキシ
                  </div>
                </SelectItem>
                <SelectItem value="embed">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    埋め込み
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={loadVideo} className="bg-red-600 hover:bg-red-700 px-8">
              <Play className="mr-2 h-4 w-4" />
              読み込み
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center text-sm text-gray-400">
          {getModeIcon(playbackMode)}
          <span className="ml-2">{getModeDescription(playbackMode)}</span>
        </div>
        
        <div className="youtube-container-large">
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={getVideoSrc()}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title="YouTube Video Player"
              className="rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900 rounded-lg">
              <div className="text-center">
                <Youtube className="text-8xl mb-6 opacity-50 mx-auto" />
                <p className="text-xl mb-2">YouTubeのURLを入力して動画を再生してください</p>
                <p className="text-sm opacity-75">複数の再生モードをサポートしています</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
