import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Cardという「基本ブロック」
import { Farm } from "@/types";
import Link from "next/link";

type Props = {
  farms: Farm[] | undefined;
};

export default function FarmList({ farms }: Props) {
  console.log(farms?.[0]);

  return (
    // gridを使ってカードを並べる
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farms ? (
        farms.map((farm) => (
          // Linkでカード全体をリンクにする
          <Link href={`/farms/${farm.id}`} key={farm.id}>
            {/* Cardコンポーネントを使って、個々の農地情報を表示 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* <Image src={farm.imageUrl} ... /> */}
                <CardTitle>{farm.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {farm.plans[0].description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <p>おすすめの農地はありません。</p>
      )}
    </div>
  );
}
