// src/app/farm/[id]/FarmApplicationClient.tsx (Client Component)

"use client";

import React, { useState } from "react";
// ⚠️ Card, Button コンポーネントのインポートパスを修正してください
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFarms } from "@/hooks/useFarms";
import { AgriTypePair, Farm } from "@/types";

// --- データの再定義 ---
const FARM_DETAIL_DATA = {
  title: "【栗拾いとサツマイモ掘りプラン】ファミリー・グループにお勧め♪",
  harvest: {
    item: "栗拾い",
    period: "9月7日～10月13日 (予定)",
    sale: "収穫した栗は1kg500円で販売いたします。",
    service: "ゆで栗試食サービス付きです。",
  },
  sweetPotato: {
    item: "サツマイモ掘り",
    period: "10月11日～11月30日 (予定)",
    type: "紅はるか",
    sale: "収穫したサツマイモは1kg500円で販売いたします。（3本～4本程度）",
    service: "焼き芋サービス付き",
  },
  others: [
    {
      title: "その他の野菜",
      content:
        "キューイフルーツ、かぼちゃ、空心菜などが収穫できます。延滞のため、極端に野菜の数が減っています。ご承ください。",
    },
    {
      title: "動物とのふれあい",
      content:
        "烏骨鶏、岡崎黄斑、アローカナなどの卵採取ができます。卵1個200円で販売しています。仔ヤギにえさやり体験ができます。",
    },
    {
      title: "【薪割、焚火体験】",
      content: "希望者には薪割、火気を使わない着火、焚火体験などができます。",
    },
    {
      title: "【虫取り歓迎】",
      content:
        "有機無農薬農園のためバッタ、トンボなどの虫がたくさんいます。網と虫かごを持参して、広い農園で虫取りを楽しんでください。",
    },
  ],
  summary: {
    period: "2025年09月02日～2026年01月31日",
    duration: "1時間30分",
    included: "入園料込み",
    capacity: "1人～30人",
  },
  price: 3500, // 1人あたりの料金（円）
};

// フォームデータの型を定義
interface FormData {
  name: string;
  participants: number;
  date: string;
}

interface FarmApplicationClientProps {
  farmId: string; // page.tsx から props として受け取る
}

// Client Component: asyncではない同期関数として定義
// export default function FarmApplicationClient({ farmId }: Farm["id"]) {}
