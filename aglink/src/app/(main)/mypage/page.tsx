"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookmarkItem } from "@/components/domain/home";
import { useAuth } from "@/hooks/useAuth";
import mockFarms from "@/data/mock-farms.json";

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

const MypagePage: React.FC = () => {
  // まだ認証ロジックが未実装の場合に備えてフォールバックを用意
  type AuthUser = { name?: string; avatar?: string; email?: string };
  const auth = useAuth() as {
    user?: AuthUser;
    recentDiagnosis?: { type?: string; date?: string; summary?: string };
  };

  const defaultUser: Required<AuthUser> = {
    name: "山田 太郎",
    avatar: "https://placehold.co/96x96/8CB389/ffffff?text=YT",
    email: "",
  };

  const user: Required<AuthUser> = {
    name: auth.user?.name ?? defaultUser.name,
    avatar: auth.user?.avatar ?? defaultUser.avatar,
    email: auth.user?.email ?? defaultUser.email,
  };

  const avatarSrc = user.avatar;

  // ローカル表示用プロファイル（モーダルで編集して反映）
  type ProfileState = {
    name: string;
    avatar: string;
    email: string;
    password: string;
    gender: "male" | "female" | "other" | "";
    age: number | "";
    address: string;
  };

  const [profile, setProfile] = useState<ProfileState>({
    name: user.name ?? "",
    avatar: avatarSrc,
    email: user.email ?? "",
    password: "",
    gender: "",
    age: "",
    address: "",
  });

  const recent = auth.recentDiagnosis ?? {
    type: "家庭菜園タイプ",
    date: "2025-09-20",
    summary: "ミニトマト栽培が向いています。初心者向けの育て方ガイドがおすすめです。",
  };

  // recent.type から診断コードを推定してキャラクター画像を決定する
  const typeToCodeMap: Array<[string, string]> = [
    ["週末ガーデナー", "AFHO"],
    ["のんびり家庭菜園", "AFHP"],
    ["家庭菜園", "AFHP"],
    ["ロマンティック", "AFIO"],
    ["週末研究家", "AFIP"],
    ["アグリインフルエンサー", "ACHO"],
    ["職人気質", "ACHP"],
    ["企業家", "ACIO"],
    ["アーバン", "ACIP"],
    ["ソーシャル", "SFHO"],
    ["堅実な家庭菜園", "SFHP"],
    ["理系", "SFIO"],
    ["ロジカル", "SFIP"],
    ["週末チャレンジ", "SCHO"],
    ["プロフェッショナル", "SCHP"],
    ["テクノロジー", "SCIO"],
    ["職人ファーマー", "SCIP"],
  ];

  const detectCode = (typeLabel?: string) => {
    if (!typeLabel) return "AFHP";
    for (const [key, code] of typeToCodeMap) {
      if (typeLabel.includes(key)) return code;
    }
    // デフォルト
    return "AFHP";
  };

  const detectedCode = detectCode(recent.type);
  const characterImageSrc = `/images/agli-types/${detectedCode}-type.png`;

  // mock-farms.json を簡易に BookmarkItem の props に変換
  type FarmMock = {
    id: string;
    name: string;
    imageUrl?: string;
    planDetails?: { planName?: string };
    type?: string;
  };

  const bookmarks = (mockFarms as FarmMock[])
    .slice(0, 6)
    .map((f) => ({
      id: f.id,
      image: f.imageUrl ?? "/images/mock-farms/farm-00.jpg",
      title: f.name,
      description: f.planDetails?.planName ?? f.type ?? "",
    }));

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
              <CardTitle className="text-2xl md:text-3xl">{profile.name}</CardTitle>
              <CardDescription className="text-base md:text-lg">プロフィールを編集して、より良いおすすめを受け取りましょう。</CardDescription>
            </div>
            <div className="flex-shrink-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="px-4 py-2 text-lg md:text-xl">
                    設定
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>プロフィール設定</DialogTitle>
                    <DialogDescription>ユーザー情報を編集して保存できます（ローカルのみ）。</DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);

                      const name = (formData.get("name") as string) ?? profile.name;
                      const avatar = (formData.get("avatar") as string) ?? profile.avatar;
                      const email = (formData.get("email") as string) ?? profile.email;
                      const genderRaw = (formData.get("gender") as string) ?? profile.gender;
                      const gender = genderRaw === "male" || genderRaw === "female" || genderRaw === "other" ? genderRaw : profile.gender;
                      const ageRaw = formData.get("age");
                      let age: number | "" = ageRaw ? Number(ageRaw as string) : "";
                      if (typeof age === "number") {
                        if (Number.isNaN(age) || age < 0) age = 0;
                      }
                      const address = (formData.get("address") as string) ?? profile.address;

                      setProfile((prev) => ({
                        ...prev,
                        name,
                        avatar,
                        email,
                        password: "",
                        gender,
                        age,
                        address,
                      }));
                    }}
                  >
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">ユーザー名</Label>
                        <Input id="name" name="name" defaultValue={profile.name} />
                      </div>

                      <div>
                        <Label htmlFor="avatar">アイコン画像URL</Label>
                        <Input id="avatar" name="avatar" defaultValue={profile.avatar} />
                      </div>

                      <div>
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" name="email" type="email" defaultValue={profile.email} />
                      </div>

                      <div>
                        <Label htmlFor="password">パスワード</Label>
                        <Input id="password" name="password" type="password" />
                      </div>

                      <div>
                        <Label htmlFor="gender">性別</Label>
                        <select
                          id="gender"
                          name="gender"
                          defaultValue={profile.gender}
                          className="w-full rounded-md border px-3 py-1"
                          aria-label="性別"
                        >
                          <option value="">選択してください</option>
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
                          step={1}
                          min={0}
                          defaultValue={profile.age === "" ? "0" : String(profile.age)}
                          onChange={(e) => {
                            const input = e.target as HTMLInputElement;
                            const val = input.valueAsNumber;
                            if (!Number.isNaN(val) && val < 0) {
                              input.value = "0";
                            }
                          }}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">住所</Label>
                        <Input id="address" name="address" defaultValue={profile.address} />
                      </div>
                      </div>

                    <DialogFooter>
                      <Button type="submit" className="bg-primary text-white">保存</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* 直近の診断結果 */}
        <section className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">直近の診断結果</h2>
          <Card>
              <CardContent>
              <div className="flex flex-col md:flex-row items-start md:justify-between">
                <div className="flex items-start gap-4 w-full md:w-auto">
                  {/* 左端にキャラクター画像 */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
                    <Image
                      src={characterImageSrc}
                      alt={`${recent.type} のキャラクター`}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-semibold">{recent.type}</h3>
                      <Badge variant="secondary">{recent.date}</Badge>
                    </div>
                    <p className="text-gray-700 mt-3 text-base md:text-lg">{recent.summary}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col mt-4 md:mt-0 gap-3 w-full md:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-1/2 md:w-full px-6 py-3 text-lg">
                    <Link href={`/diagnosis/result/${detectedCode}`}>詳細を見る</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="w-full sm:w-1/2 md:w-full px-6 py-3 text-lg">
                    <Link href="/diagnosis">再診断する</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ブックマーク */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">ブックマーク</h2>
          <Card>
            <CardContent>
              <div className="max-h-80 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookmarks.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {}}
                      aria-label={`ブックマーク: ${b.title}`}
                      className="w-full text-left"
                    >
                      <div className="py-2 md:py-3">
                        <BookmarkItem image={b.image} title={b.title} description={b.description} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <div className="mt-8 text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MypagePage;
