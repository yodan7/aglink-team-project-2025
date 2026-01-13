"use client";

import React, { useState } from "react";

import { updateProfile } from "./actions";
import { useMypageData } from "@/hooks/useMypageData"; // 作成したフックをインポート

import Image from "next/image";
import Link from "next/link";
import { BookmarkItem } from "@/components/domain/home";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { HomeButton } from "@/components/ui/homeButton";

// 診断タイプ定数
const TYPE_INFO: Record<string, { name: string; summary: string }> = {
  AFHO: {
    name: "週末ガーデナー",
    summary:
      "週末にリフレッシュとして土いじりを楽しむタイプ。手軽なハーブや葉物野菜がおすすめ。",
  },
  AFHP: {
    name: "のんびり家庭菜園",
    summary:
      "自宅の庭やベランダでマイペースに育てるタイプ。季節の野菜を少しずつ楽しめます。",
  },
  AFIO: {
    name: "ロマンティック",
    summary:
      "見た目の美しさや香りを重視するタイプ。花やハーブに囲まれた暮らしが向いています。",
  },
  AFIP: {
    name: "週末研究家",
    summary:
      "珍しい品種や栽培方法に興味があるタイプ。少し難易度の高い野菜にも挑戦してみましょう。",
  },
  ACHO: {
    name: "アグリインフルエンサー",
    summary:
      "育てた野菜をSNSで発信したり、収穫祭を開いたりするのが好きなタイプ。",
  },
  ACHP: {
    name: "職人気質",
    summary:
      "一つの作物をとことん極めたいタイプ。品質や味にこだわった栽培が向いています。",
  },
  ACIO: {
    name: "企業家",
    summary:
      "農業をビジネスとして捉え、効率や収益性を意識するタイプ。副業農業などがおすすめ。",
  },
  ACIP: {
    name: "アーバン",
    summary:
      "都会的なライフスタイルの中でスマートに農業を取り入れるタイプ。水耕栽培などがマッチします。",
  },
  SFHO: {
    name: "ソーシャル",
    summary:
      "地域の人と交流しながら農業を楽しみたいタイプ。市民農園やコミュニティファームがおすすめ。",
  },
  SFHP: {
    name: "堅実な家庭菜園",
    summary:
      "食費の節約や食の安全を重視するタイプ。失敗の少ない定番野菜から始めましょう。",
  },
  SFIO: {
    name: "理系",
    summary:
      "データを分析して最適な環境を作るのが好きなタイプ。IoT農業などに適性があります。",
  },
  SFIP: {
    name: "ロジカル",
    summary:
      "効率的な作業手順や計画を立てるのが得意なタイプ。計画的な作付けで収穫量アップ。",
  },
  SCHO: {
    name: "週末チャレンジ",
    summary:
      "週末を利用して少し本格的な農業体験をしたいタイプ。郊外の貸し農園などがおすすめ。",
  },
  SCHP: {
    name: "プロフェッショナル",
    summary: "本格的な就農も視野に入れているタイプ。技術習得に意欲的です。",
  },
  SCIO: {
    name: "テクノロジー",
    summary:
      "最新の農業技術や機械に興味があるタイプ。スマート農業の導入に向いています。",
  },
  SCIP: {
    name: "職人ファーマー",
    summary:
      "自分なりのこだわりを持って、高品質な作物を作ることに喜びを感じるタイプ。",
  },
};

const MypagePage: React.FC = () => {
  // カスタムフックを利用してデータとローディング状態を取得
  // これによりページコンポーネントからデータ取得ロジックが分離されました
  const {
    profile,
    latestDiagnosis,
    loading,
    setProfile,
    uploadAvatar,
    getAvatarUrl,
    uploading,
    bookmarks,
  } = useMypageData();
  const [dialogOpen, setDialogOpen] = useState(false);

  // 診断結果表示用のデータ準備
  let displayDiagnosis = null;
  if (latestDiagnosis) {
    const info = TYPE_INFO[latestDiagnosis.code] || {
      name: "不明なタイプ",
      summary: "診断結果の詳細を表示できません。",
    };
    displayDiagnosis = {
      ...latestDiagnosis,
      name: info.name,
      summary: info.summary,
      imageSrc: `/images/agli-types/${latestDiagnosis.code}-type.png`,
    };
  }

  // // まだ認証ロジックが未実装の場合に備えてフォールバックを用意
  // type AuthUser = { name?: string; avatar?: string; email?: string };
  // const auth = useAuth() as {
  //   user?: AuthUser;
  //   recentDiagnosis?: { type?: string; date?: string; summary?: string };
  // };

  // const defaultUser: Required<AuthUser> = {
  //   name: "山田 太郎",
  //   avatar: "https://placehold.co/96x96/8CB389/ffffff?text=YT",
  //   email: "",
  // };

  // const user: Required<AuthUser> = {
  //   name: auth.user?.name ?? defaultUser.name,
  //   avatar: auth.user?.avatar ?? defaultUser.avatar,
  //   email: auth.user?.email ?? defaultUser.email,
  // };

  // const avatarSrc = user.avatar;

  // // ローカル表示用プロファイル（モーダルで編集して反映）
  // type ProfileState = {
  //   name: string;
  //   avatar: string;
  //   email: string;
  //   password: string;
  //   gender: "male" | "female" | "other" | "";
  //   age: number | "";
  //   address: string;
  // };

  // const [profile, setProfile] = useState<ProfileState>({
  //   name: user.name ?? "",
  //   avatar: avatarSrc,
  //   email: user.email ?? "",
  //   password: "",
  //   gender: "",
  //   age: "",
  //   address: "",
  // });

  // const recent = auth.recentDiagnosis ?? {
  //   type: "家庭菜園タイプ",
  //   date: "2025-09-20",
  //   summary: "ミニトマト栽培が向いています。初心者向けの育て方ガイドがおすすめです。",
  // };

  // // recent.type から診断コードを推定してキャラクター画像を決定する
  // const typeToCodeMap: Array<[string, string]> = [
  //   ["週末ガーデナー", "AFHO"],
  //   ["のんびり家庭菜園", "AFHP"],
  //   ["家庭菜園", "AFHP"],
  //   ["ロマンティック", "AFIO"],
  //   ["週末研究家", "AFIP"],
  //   ["アグリインフルエンサー", "ACHO"],
  //   ["職人気質", "ACHP"],
  //   ["企業家", "ACIO"],
  //   ["アーバン", "ACIP"],
  //   ["ソーシャル", "SFHO"],
  //   ["堅実な家庭菜園", "SFHP"],
  //   ["理系", "SFIO"],
  //   ["ロジカル", "SFIP"],
  //   ["週末チャレンジ", "SCHO"],
  //   ["プロフェッショナル", "SCHP"],
  //   ["テクノロジー", "SCIO"],
  //   ["職人ファーマー", "SCIP"],
  // ];

  // const detectCode = (typeLabel?: string) => {
  //   if (!typeLabel) return "AFHP";
  //   for (const [key, code] of typeToCodeMap) {
  //     if (typeLabel.includes(key)) return code;
  //   }
  //   // デフォルト
  //   return "AFHP";
  // };

  // const detectedCode = detectCode(recent.type);
  // const characterImageSrc = `/images/agli-types/${detectedCode}-type.png`;

  // mock-farms.json を簡易に BookmarkItem の props に変換
  // ブックマークデータをBookmarkItem用に変換
  const bookmarkItems = bookmarks.map((b) => {
    const farm = b.farms; // Supabaseは単一オブジェクトで返す
    return {
      id: farm?.id || b.farm_id,
      image: farm?.image_url || "/images/mock-farms/farm-00.jpg",
      title: farm?.name || "不明な農地",
      description: farm?.location || "",
    };
  });

  // 更新処理ハンドラ
  const handleUpdate = async (formData: FormData) => {
    // 楽観的UI更新
    // ★ ログ出力して確認！
    // もしここで null や undefined が出たら、ログイン処理の問題です。
    const newProfile = {
      ...profile,
      name: formData.get("name") as string,
      gender: formData.get("gender") as string,
      age: formData.get("age") as unknown as number,
      address: formData.get("address") as string,
    };
    setProfile(newProfile);
    setDialogOpen(false);

    if (formData.get("avatar")) {
      const userId = profile.id; // Assuming email is used as userId, adjust as needed
      const file = formData.get("avatar") as File;
      const uploadResult = await uploadAvatar(userId, file);
      if (uploadResult.success) {
        newProfile.avatar = getAvatarUrl(uploadResult.path);
        setProfile(newProfile);
      } else {
        alert("アバターのアップロードに失敗しました。");
      }
    }

    // Server Action実行
    const result = await updateProfile(formData);
    if (result?.error) {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">マイページ</h1>
        </header>

        {/* ユーザー情報：UIコンポーネント利用 */}
        <Card className="mb-6">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src={profile.avatar}
                alt={`${profile.name} のアイコン`}
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <CardTitle className="text-2xl md:text-3xl">
                {profile.name}
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                {profile.email}
                {profile.address && (
                  <span className="block mt-1 text-sm">
                    📍 {profile.address}
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex-shrink-0">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-4 py-2 text-lg md:text-xl"
                  >
                    編集
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>プロフィール設定</DialogTitle>
                    <DialogDescription>
                      ユーザー情報を編集して保存できます。
                    </DialogDescription>
                  </DialogHeader>

                  <form action={handleUpdate} className="space-y-4 py-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">ユーザー名</Label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={profile.name}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="avatar">アイコン画像</Label>
                        <Input
                          id="avatar"
                          name="avatar"
                          type="file"
                          disabled={uploading}
                          accept="image/*"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={profile.email}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">性別</Label>
                        <select
                          id="gender"
                          name="gender"
                          defaultValue={profile.gender}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">未設定</option>
                          <option value="male">男性</option>
                          <option value="female">女性</option>
                          <option value="other">その他</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="age">年齢</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="0"
                          defaultValue={profile.age}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">住所 (都道府県など)</Label>
                        <Input
                          id="address"
                          name="address"
                          defaultValue={profile.address}
                          placeholder="例: 東京都"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                      >
                        保存して更新
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* 直近の診断結果 */}
        <section className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            直近の診断結果
          </h2>
          <Card>
            <CardContent>
              {displayDiagnosis ? (
                <div className="flex flex-col md:flex-row items-start md:justify-between">
                  <div className="flex items-start gap-4 w-full md:w-auto">
                    {/* 左端にキャラクター画像 */}
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
                      <Image
                        src={displayDiagnosis?.imageSrc}
                        alt={`${displayDiagnosis?.name} のキャラクター`}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-semibold">
                          {displayDiagnosis?.name}
                        </h3>
                        <Badge variant="secondary">
                          {displayDiagnosis?.created_at}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mt-3 text-base md:text-lg leading-relaxed">
                        {displayDiagnosis.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row md:flex-col mt-4 md:mt-0 gap-3 w-full md:w-auto min-w-[200px]">
                    {/* 詳細ページへのリンク */}
                    <Button
                      asChild
                      size="lg"
                      className="w-full text-lg bg-green-600 hover:bg-green-700"
                    >
                      <Link href={`/diagnosis/result/${displayDiagnosis.code}`}>
                        詳細を見る
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      size="lg"
                      className="w-full text-lg"
                    >
                      <Link href="/diagnosis">再診断する</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    まだ診断結果がありません。
                  </p>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Link href="/diagnosis">診断を始める</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ブックマーク */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">ブックマーク</h2>
          <Card>
            <CardContent>
              <div className="max-h-80 overflow-y-auto pr-2">
                {bookmarkItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bookmarkItems.map((b) => (
                      <Link
                        key={b.id}
                        href={`/farms/${b.id}`}
                        className="block py-2 md:py-3 hover:opacity-80 transition-opacity"
                        aria-label={`ブックマーク: ${b.title} の詳細を見る`}
                      >
                        <BookmarkItem
                          image={b.image}
                          title={b.title}
                          description={b.description}
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    まだブックマークはありません
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
        <HomeButton />
      </div>
    </div>
  );
};

export default MypagePage;
