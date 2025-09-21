
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, Mail, Star } from "lucide-react";

export default function SampleUIPage() {
  return (
    <main className="bg-background text-foreground p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            UI & CSS 資材置き場
          </h1>
          <p className="text-muted-foreground text-lg">
            このページは、Aglinkプロジェクトで使用するTailwindCSSクラスとUIコンポーネントの教科書です。
          </p>
        </header>

        {/* 1. カラーパレット */}
        <Card>
          <CardHeader>
            <CardTitle>1. カラーパレット</CardTitle>
            <CardDescription>
              `globals.css`で定義されたプロジェクトのテーマカラーです。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-primary"></div>
              <p className="font-semibold">Primary</p>
              <p className="text-sm text-muted-foreground">bg-primary</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-secondary"></div>
              <p className="font-semibold">Secondary</p>
              <p className="text-sm text-muted-foreground">bg-secondary</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-destructive"></div>
              <p className="font-semibold">Destructive</p>
              <p className="text-sm text-muted-foreground">bg-destructive</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-accent"></div>
              <p className="font-semibold">Accent</p>
              <p className="text-sm text-muted-foreground">bg-accent</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-background border"></div>
              <p className="font-semibold">Background</p>
              <p className="text-sm text-muted-foreground">bg-background</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-card border flex items-center justify-center">
                <p className="text-card-foreground font-semibold">Card</p>
              </div>
              <p className="font-semibold">Card</p>
              <p className="text-sm text-muted-foreground">bg-card</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full h-20 rounded-lg bg-primary/50"></div>
              <p className="font-semibold">Primary (50% Opacity)</p>
              <p className="text-sm text-muted-foreground">bg-primary/50</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. タイポグラフィ */}
        <Card>
          <CardHeader>
            <CardTitle>2. タイポグラフィ (テキストスタイル)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">見出し H1 (font-extrabold)</h1>
            <h2 className="text-3xl font-semibold">見出し H2 (font-semibold)</h2>
            <h3 className="text-2xl font-bold">見出し H3 (font-bold)</h3>
            <p className="text-base">
              基本の本文テキスト (`text-base`)。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。
            </p>
            <p className="text-sm text-muted-foreground">
              少し小さめの補助テキスト (`text-sm text-muted-foreground`)。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
            </p>
            <p className="leading-relaxed">
              行間を広げたテキスト (`leading-relaxed`)。<br />
              吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。
            </p>
          </CardContent>
        </Card>

        {/* 3. Button コンポーネント */}
        <Card>
          <CardHeader>
            <CardTitle>3. Button コンポーネント</CardTitle>
            <CardDescription>
              `variant`と`size`の組み合わせです。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Variants (見た目)</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sizes (大きさ)</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon"><Mail className="h-4 w-4" /></Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">組み合わせ・状態</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" size="sm">
                  <Star className="mr-2 h-4 w-4" />
                  <span>アイコン付き</span>
                </Button>
                <Button disabled>無効 (Disabled)</Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" /> ログイン
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Card コンポーネント */}
        <Card>
          <CardHeader>
            <CardTitle>4. Card コンポーネント</CardTitle>
            <CardDescription>
              情報を整理して表示するためのコンポーネントです。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>おすすめ農園</CardTitle>
                <CardDescription>新鮮な野菜が自慢です</CardDescription>
              </CardHeader>
              <CardContent>
                <p>都心から1時間でアクセス可能な、週末農業にぴったりの農園です。専門のスタッフが丁寧にサポートします。</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">詳細を見る</Button>
                <Button>申し込む</Button>
              </CardFooter>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>通知設定</CardTitle>
                  <Button size="icon" variant="ghost"><Check className="h-4 w-4" /></Button>
                </CardHeader>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">シンプルなカード</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 5. フォーム要素 */}
        <Card>
          <CardHeader>
            <CardTitle>5. フォーム要素</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">メールアドレス</Label>
              <Input type="email" id="email" placeholder="your@email.com" />
              <p className="text-sm text-muted-foreground">
                `Label`と`Input`の組み合わせです。
              </p>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">パスワード (エラー時)</Label>
              <Input type="password" id="password" defaultValue="12345" className="border-destructive" />
            </div>
          </CardContent>
        </Card>

        {/* 6. レイアウト (Flexbox & Grid) */}
        <Card>
          <CardHeader>
            <CardTitle>6. レイアウト (Flexbox & Grid)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Flexbox (横並び)</h3>
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
                <div className="p-4 rounded-md bg-card shadow-sm">Item 1</div>
                <div className="p-4 rounded-md bg-card shadow-sm">Item 2</div>
                <div className="p-4 rounded-md bg-card shadow-sm">Item 3</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                モバイルでは縦積み(`flex-col`)、`sm`以上で横並び(`sm:flex-row`)になります。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Grid (格子状)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                <div className="p-4 rounded-md bg-card shadow-sm">Item 1</div>
                <div className="p-4 rounded-md bg-card shadow-sm">Item 2</div>
                <div className="p-4 rounded-md bg-card shadow-sm">Item 3</div>
                <div className="p-4 rounded-md bg-card shadow-sm">Item 4</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                モバイルでは2列(`grid-cols-2`)、`md`以上で4列(`md:grid-cols-4`)になります。
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
