import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeButton } from "@/components/ui/homeButton";

// --- 型定義 ---
interface TypeData {
  code: string;
  name: string;
  description: string;
  imagePath: string;
}

interface TypeGroup {
  id: string;
  title: string;
  color: string; // Tailwindのbgクラスの一部 (例: 'green-500')
  description: string;
  types: TypeData[];
}

// --- 16タイプのデータ定義 (4つのグループに分類) ---
const TYPE_GROUPS: TypeGroup[] = [
  {
    id: "af_sensibility_life",
    title: "感性ライフ派 (AF)",
    color: "bg-green-600",
    description:
      "自己表現（A）と人との繋がり（F）を重視し、農業を生活を彩るアートや癒しの時間として捉えるグループ。",
    types: [
      {
        code: "AFHO",
        name: "週末ガーデナー",
        description: "畑は自分だけの癒し空間。美しさやユニークさを追求する。",
        imagePath: "/images/agli-types/AFHO-type.png",
      },
      {
        code: "AFHP",
        name: "のんびり家庭菜園",
        description: "季節を感じながら、マイペースに野菜を育てたい。",
        imagePath: "/images/agli-types/AFHP-type.png",
      },
      {
        code: "AFIO",
        name: "ロマンティックファーマー",
        description:
          "自然との対話を大切にする感性派。知的な側面にロマンを感じる。",
        imagePath: "/images/agli-types/AFIO-type.png",
      },
      {
        code: "AFIP",
        name: "週末研究家",
        description:
          "ロマンを追求しつつも、データや知識を駆使して理想の畑を追求する。",
        imagePath: "/images/agli-types/AFIP-type.png",
      },
    ],
  },
  {
    id: "sf_utility_stable",
    title: "実用・堅実派 (SF)",
    color: "bg-amber-600",
    description:
      "データ（S）と人との繋がり（F）を重視。家庭や地域の中で、無駄なく確実な成果と安定を追求するグループ。",
    types: [
      {
        code: "SFHP",
        name: "堅実な家庭菜園",
        description:
          "効率と安定性を重視。家族の食卓を支えるために確実に収穫できる栽培計画を立てる。",
        imagePath: "/images/agli-types/SFHP-type.png",
      },
      {
        code: "SFIP",
        name: "ロジカル農家",
        description: "計画とデータに基づき、生産効率やコスト管理を重視する。",
        imagePath: "/images/agli-types/SFIP-type.png",
      },
      {
        code: "SFHO",
        name: "ソーシャルアグリ",
        description:
          "農業を通じて地域課題や社会貢献に取り組む。コミュニティ形成を重視。",
        imagePath: "/images/agli-types/SFHO-type.png",
      },
      {
        code: "SFIO",
        name: "理系アグリ",
        description:
          "農業を科学的に追求する探究者。栽培法や土壌の成分をデータで管理し最適解を見つける。",
        imagePath: "/images/agli-types/SFIO-type.png",
      },
    ],
  },
  {
    id: "ac_creative_business",
    title: "創造ビジネス派 (AC)",
    color: "bg-blue-600",
    description:
      "自己表現（A）と事業挑戦（C）を重視。自身の美学やアイデアを武器に、新しいビジネスや価値を創出するグループ。",
    types: [
      {
        code: "ACHO",
        name: "アグリインフルエンサー",
        description:
          "農業の楽しさやライフスタイルをSNSで発信し、多くの人に魅力を伝えたい。",
        imagePath: "/images/agli-types/ACHO-type.png",
      },
      {
        code: "ACHP",
        name: "職人気質ガーデナー",
        description:
          "美しさと品質を両立させる匠。技術向上や細部の管理を楽しむ。",
        imagePath: "/images/agli-types/ACHP-type.png",
      },
      {
        code: "ACIO",
        name: "企業家アグリ",
        description:
          "農業をクリエイティブなビジネスと捉える起業家。生産から販売までを設計する。",
        imagePath: "/images/agli-types/ACIO-type.png",
      },
      {
        code: "ACIP",
        name: "アーバンファーマー",
        description:
          "都市の限られた空間を活かすスマート派。水耕栽培などを取り入れる。",
        imagePath: "/images/agli-types/ACIP-type.png",
      },
    ],
  },
  {
    id: "sc_strategy_pro",
    title: "戦略プロフェッショナル派 (SC)",
    color: "bg-purple-600",
    description:
      "戦略（S）と事業挑戦（C）を重視。論理的な戦略と技術を駆使し、最大の結果（収益・規模）を目指すグループ。",
    types: [
      {
        code: "SCHP",
        name: "プロフェッショナル農家",
        description:
          "将来的な専業化を視野に入れた本格派。持続的な事業運営を目指す。",
        imagePath: "/images/agli-types/SCHP-type.png",
      },
      {
        code: "SCIO",
        name: "テクノロジー農家",
        description: "スマート農業や自動化を積極導入し、生産性向上を追求する。",
        imagePath: "/images/agli-types/SCIO-type.png",
      },
      {
        code: "SCIP",
        name: "職人ファーマー",
        description: "ひとつの作物に特化して品質を追求するスペシャリスト。",
        imagePath: "/images/agli-types/SCIP-type.png",
      },
      {
        code: "SCHO",
        name: "週末チャレンジファーマー",
        description:
          "副業として農業を始め、短期間で成果を出すために販路開拓を目指す。",
        imagePath: "/images/agli-types/SCHO-type.png",
      },
    ],
  },
];

export default function TypesListPage() {
  return (
    <main className="w-full min-h-screen bg-background pb-20">
      {/* ページヘッダー：CSSのみで背景を作成 */}
      <div className="relative py-24 md:py-36 text-center px-4 overflow-hidden">
        {/* CSSグラデーション背景 */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundColor: "#F0FDF4", // ベース: 非常に淡いミントグリーン
            backgroundImage: `
                            radial-gradient(at 0% 0%, hsla(142, 69%, 85%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, hsla(142, 69%, 90%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 100% 100%, hsla(142, 69%, 85%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, hsla(142, 69%, 90%, 0.4) 0px, transparent 50%)
                        `,
          }}
        >
          {/* 微細なドットパターンを重ねて質感を追加 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#22c55e 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        {/* コンテンツ（前面） */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4A3931] mb-6 tracking-tight">
            農業スタイル一覧
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-10">
            Aglinkが分類する全16種類の農業スタイル
            <br className="hidden md:block" />
          </p>

          {/* 追加：診断を始めるボタン */}
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            診断を始める
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* グループごとのリスト表示 */}
      <div className="container mx-auto px-4 md:px-8 -mt-12 relative z-20">
        {TYPE_GROUPS.map((group) => (
          <section key={group.id} className="mb-16">
            {/* グループヘッダー (区切り線とタイトル) */}
            <div
              className={`flex items-center mb-8 pb-4 border-b-4 ${group.color.replace(
                "bg-",
                "border-"
              )}`}
            >
              <div
                className={`w-12 h-12 ${group.color} rounded-full flex items-center justify-center text-white mr-4 shadow-md`}
              >
                {/* 簡易アイコン (グループの頭文字) */}
                <span className="text-xl font-bold">
                  {group.title.substring(
                    group.title.indexOf("(") + 1,
                    group.title.indexOf(")")
                  )}
                </span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {group.title}
                </h2>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  {group.description}
                </p>
              </div>
            </div>

            {/* タイプカードのグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.types.map((type) => (
                <Link
                  // ★修正: 診断結果ページへのリンクに変更
                  href={`/diagnosis/result/${type.code}`}
                  key={type.code}
                  className="group block"
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    {/* 画像エリア (背景色を薄く入れる) */}
                    <div
                      className={`relative h-48 w-full ${group.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}
                    >
                      <Image
                        src={type.imagePath}
                        alt={`${type.name} キャラクター`}
                        fill
                        className="object-contain p-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* テキストエリア */}
                    <div className="p-5 flex flex-col flex-grow text-center">
                      <p
                        className={`text-sm font-bold ${group.color.replace(
                          "bg-",
                          "text-"
                        )} mb-1 opacity-80`}
                      >
                        {type.code}
                      </p>
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {type.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-center items-center text-sm font-semibold text-gray-500 group-hover:text-primary">
                        詳細を見る <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <HomeButton />
    </main>
  );
}
