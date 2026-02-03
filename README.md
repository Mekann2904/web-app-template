# Astro + Cloudflare + Tailwind + shadcn/ui Template

## 技術スタック

- **Astro** v5 - 高性能なWebフレームワーク
- **Cloudflare Pages** - エッジでホスティング
- **Tailwind CSS** v4 - CSSフレームワーク
- **shadcn/ui** - リユーザブルコンポーネント
- **TypeScript** - ストリクト型付き言語
- **React** - コンポーネントシステム

## プロジェクト構造

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/uiコンポーネント
│   │   └── *.tsx        # カスタムコンポーネント
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── docs/
├── .gitignore
├── astro.config.mjs
├── components.json    # shadcn/ui設定
├── package.json
├── README.md
├── tsconfig.json
└── wrangler.toml
```

## 環境構成

このテンプレートは以下の環境をサポートしています：

- **dev** - ローカル開発環境
- **staging** - ステージング環境
- **production** - 本番環境

### 環境変数の使用

```bash
# ローカル開発
CLOUDFLARE_ENV=dev npx wrangler dev

# ステージングデプロイ
CLOUDFLARE_ENV=staging npx wrangler deploy --env=staging

# 本番デプロイ
CLOUDFLARE_ENV=production npx wrangler deploy --env=production
```

## コマンド

### ローカル開発

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー（ローカル）

```bash
npm run preview:local
```

### プレビュー（リモート）

```bash
npm run preview
```

### デプロイ

```bash
# ステージング
npm run deploy:staging

# 本番
npm run deploy:production
```

## 初期設定

### 1. インストール

```bash
npm install
```

### 2. 環境変数の設定

`.dev.vars` ファイルを作成して、ローカル開発用の環境変数を設定します：

```bash
# 基本的なローカル開発用
API_KEY=your-api-key
DEBUG=true
```

環境別のファイルも作成できます：
- `.dev.vars.staging` - ステージング環境
- `.dev.vars.production` - 本番環境

### 3. Cloudflare認証情報の設定

`wrangler.toml`でアカウントIDを更新します：

```toml
account_id = "your-account-id"
```

## shadcn/uiコンポーネントの追加

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# ... 他のコンポーネント
```

## ドキュメント

- [Astroドキュメント](docs/astro.md)
- [Cloudflareデプロイドキュメント](docs/cloudflare.md)
- [Tailwind CSSドキュメント](docs/tailwind.md)
- [shadcn/uiドキュメント](docs/shadcn.md)
- [環境設定ドキュメント](docs/environments.md)
- [無料枠ガイド](docs/free-tier.md) - Cloudflare無料枠の制限と使い方

## ライセンス

MIT
