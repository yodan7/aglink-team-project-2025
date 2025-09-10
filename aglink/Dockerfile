# 1. ベースとなる環境を選択
FROM node:22-alpine

# 2. OSのパッケージを最新版に更新して、脆弱性を解消する
#    ★★ Gitをインストールするコマンドを追加しました ★★
RUN apk update && apk upgrade && apk add --no-cache git

# 3. コンテナ内での作業場所を指定
WORKDIR /app

# 4. 依存関係のファイルを先にコピー
COPY package*.json ./

# 5. 依存関係をインストール
RUN npm install

# 6. プロジェクトの全ファイルをコピー
COPY . .

# 7. 外部に公開するポートを指定
EXPOSE 3000

# 8. コンテナ起動時に実行するコマンド
CMD ["npm", "run", "dev"]
