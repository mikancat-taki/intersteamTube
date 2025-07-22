import { useState } from 'react';
import { Eye, Shield, Zap, Gamepad2, Languages, Rocket, Book, HelpCircle, FileText, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Modal';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalId: string) => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="text-center space-y-8">
        <div className="glass rounded-3xl p-8 max-w-4xl mx-auto floating">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Eye className="text-4xl text-purple-400" size={48} />
            <h1 className="text-4xl md:text-6xl font-bold">透明インターTube</h1>
          </div>
          <p className="text-xl text-gray-300 mb-8">高速・匿名・安全なYouTube視聴アプリケーション</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-xl p-6">
              <Shield className="text-3xl text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">完全匿名</h3>
              <p className="text-gray-300">プロキシ不要で安全にアクセス</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Zap className="text-3xl text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">高速再生</h3>
              <p className="text-gray-300">API不要の軽量設計</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Gamepad2 className="text-3xl text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">豊富なゲーム</h3>
              <p className="text-gray-300">プレイ可能なブラウザゲーム</p>
            </div>
            <div className="glass rounded-xl p-6">
              <Languages className="text-3xl text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">日本語完全対応</h3>
              <p className="text-gray-300">直感的な操作インターフェース</p>
            </div>
          </div>
          
          <Button 
            onClick={() => onNavigate('youtube')} 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Rocket className="mr-2" />
            アプリを開始
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="glass rounded-2xl p-4 floating">
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={() => openModal('docs')} variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
              <Book className="mr-2 h-4 w-4" />ドキュメント
            </Button>
            <Button onClick={() => openModal('faq')} variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white">
              <HelpCircle className="mr-2 h-4 w-4" />FAQ
            </Button>
            <Button onClick={() => openModal('terms')} variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
              <FileText className="mr-2 h-4 w-4" />利用規約
            </Button>
            <Button onClick={() => openModal('privacy')} variant="outline" className="border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white">
              <ShieldQuestion className="mr-2 h-4 w-4" />プライバシー
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'docs'}
        onClose={closeModal}
        title="ドキュメント・使い方"
        icon={<Book />}
      >
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">透明インターTubeについて</h3>
            <p className="text-gray-300 leading-relaxed">透明インターTubeは、高速で匿名性の高いYouTube視聴アプリケーションです。API不要で安全にYouTube動画を視聴することができ、さらに豊富なブラウザゲームも楽しめます。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">主な機能</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>匿名でYouTube動画の視聴</li>
              <li>プロキシ不要の高速アクセス</li>
              <li>6種類のプレイ可能なブラウザゲーム</li>
              <li>リアルタイム日本時間・日付表示</li>
              <li>美しいInterstellar風アニメーション背景</li>
              <li>完全日本語対応インターフェース</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-green-400">使用方法</h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-white">YouTube動画視聴：</h4>
                <p>1. YouTubeセクションに移動</p>
                <p>2. 動画URLまたは動画IDを入力</p>
                <p>3. 「動画を読み込み」ボタンをクリック</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">ゲーム：</h4>
                <p>1. ゲームセクションに移動</p>
                <p>2. お好みのゲームを選択</p>
                <p>3. 「開始」ボタンでゲームスタート</p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">技術仕様</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>HTML5 Canvas API使用のゲーム</li>
              <li>YouTube Embed API使用の安全な動画表示</li>
              <li>CSS3アニメーションによる背景効果</li>
              <li>レスポンシブデザイン対応</li>
              <li>軽量設計（外部依存最小限）</li>
            </ul>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'faq'}
        onClose={closeModal}
        title="よくある質問"
        icon={<HelpCircle />}
      >
        <div className="space-y-6">
          <div className="border-b border-gray-600 pb-4">
            <h3 className="font-semibold text-lg text-purple-400 mb-2">Q: アプリは完全に無料ですか？</h3>
            <p className="text-gray-300">A: はい、透明インターTubeは完全無料で使用できます。隠れた料金や課金要素はありません。</p>
          </div>
          
          <div className="border-b border-gray-600 pb-4">
            <h3 className="font-semibold text-lg text-blue-400 mb-2">Q: 本当に匿名でYouTubeを視聴できますか？</h3>
            <p className="text-gray-300">A: YouTube Embedを使用しているため、完全な匿名性は保証できませんが、直接YouTubeにアクセスするよりもプライバシーが保護されます。</p>
          </div>
          
          <div className="border-b border-gray-600 pb-4">
            <h3 className="font-semibold text-lg text-green-400 mb-2">Q: ゲームのデータは保存されますか？</h3>
            <p className="text-gray-300">A: 現在のバージョンでは、ゲームのスコアや進行状況はセッション中のみ保持され、ページを更新すると失われます。</p>
          </div>
          
          <div className="border-b border-gray-600 pb-4">
            <h3 className="font-semibold text-lg text-yellow-400 mb-2">Q: モバイルデバイスで使用できますか？</h3>
            <p className="text-gray-300">A: はい、レスポンシブデザインによりスマートフォンやタブレットでも快適に使用できます。</p>
          </div>
          
          <div className="border-b border-gray-600 pb-4">
            <h3 className="font-semibold text-lg text-red-400 mb-2">Q: 動画が読み込まれない場合はどうすればよいですか？</h3>
            <p className="text-gray-300">A: 1) URLが正しいか確認 2) 動画が埋め込み無効設定でないか確認 3) ブラウザのキャッシュをクリア をお試しください。</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-cyan-400 mb-2">Q: 新しい機能の要望はどこに送ればよいですか？</h3>
            <p className="text-gray-300">A: RGグループまでお気軽にお問い合わせください。皆様のご意見をもとに、より良いアプリを目指しています。</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="利用規約"
        icon={<FileText />}
      >
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">第1条（適用範囲）</h3>
            <p>本利用規約は、透明インターTube（以下「本アプリ」）の利用に関して、RGグループ（以下「当グループ」）と利用者との間に適用されます。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">第2条（利用許可）</h3>
            <p>本アプリは教育目的および個人利用に限り使用を許可します。商用利用については事前に当グループまでお問い合わせください。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-green-400">第3条（禁止事項）</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>本アプリを使用した違法行為</li>
              <li>他の利用者や第三者の権利を侵害する行為</li>
              <li>本アプリの機能を悪用した行為</li>
              <li>本アプリのリバースエンジニアリング</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">第4条（免責事項）</h3>
            <p>当グループは、本アプリの利用によって生じた損害について、一切の責任を負いません。また、本アプリの継続的な提供を保証するものではありません。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-red-400">第5条（規約の変更）</h3>
            <p>当グループは、必要に応じて本利用規約を変更することがあります。変更後の利用規約は、本アプリ上で公表した時点より効力を生じます。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">第6条（準拠法・管轄裁判所）</h3>
            <p>本利用規約の解釈・適用については日本法に準拠し、本アプリに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>
          
          <p className="text-right text-sm pt-4 border-t border-gray-600">制定日：2025年1月1日<br />RGグループ</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="プライバシーポリシー"
        icon={<ShieldQuestion />}
      >
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">個人情報の取り扱いについて</h3>
            <p>RGグループ（以下「当グループ」）は、透明インターTube（以下「本アプリ」）において、利用者のプライバシーを尊重し、個人情報の適切な保護に努めます。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">収集する情報</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>本アプリは基本的に個人情報を収集しません</li>
              <li>YouTube視聴時にYouTube側で収集される情報については、YouTubeのプライバシーポリシーに準拠します</li>
              <li>ゲームのスコアなどはブラウザのメモリ上でのみ保持され、外部に送信されません</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-green-400">Cookieの使用</h3>
            <p>本アプリでは、利用者の利便性向上のために最小限のCookieを使用する場合があります。これらのCookieは個人を特定する情報を含みません。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">第三者との情報共有</h3>
            <p>当グループは、法的な要求がある場合を除き、収集した情報を第三者と共有することはありません。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-red-400">セキュリティ</h3>
            <p>本アプリは、利用者の情報を保護するため、適切なセキュリティ対策を実施しています。ただし、インターネット上の通信の完全な安全性を保証することはできません。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-cyan-400">本ポリシーの変更</h3>
            <p>当グループは、必要に応じて本プライバシーポリシーを変更することがあります。変更内容は本アプリ上で通知いたします。</p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">お問い合わせ</h3>
            <p>本プライバシーポリシーに関するご質問やご意見がございましたら、RGグループまでお気軽にお問い合わせください。</p>
          </section>
          
          <p className="text-right text-sm pt-4 border-t border-gray-600">最終更新日：2025年1月1日<br />RGグループ</p>
        </div>
      </Modal>
    </>
  );
}
