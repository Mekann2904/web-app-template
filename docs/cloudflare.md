# Cloudflare デプロイドキュメント

このテンプレートはCloudflare Pagesへのデプロイに最適化されています。

## Cloudflareアダプター

`@astrojs/cloudflare`アダプターを使用して、AstroアプリケーションをCloudflare Workers/Pagesにデプロイします。

## 設定ファイル

### wrangler.toml

```toml
#:schema node_modules/wrangler/config-schema.json
name = "astro-cloudflare-template"
main = "./dist/_worker.js"
compatibility_date = "2025-01-27"
compatibility_flags = ["nodejs_compat"]

# アカウント設定
account_id = "your-account-id"

# 環境変数
vars = { ENVIRONMENT = "dev", DEBUG = "true" }

# ステージング環境
[env.staging]
name = "astro-cloudflare-template-staging"
vars = { ENVIRONMENT = "staging", DEBUG = "true" }

# 本番環境
[env.production]
name = "astro-cloudflare-template-production"
vars = { ENVIRONMENT = "production", DEBUG = "false" }
```

## デプロイコマンド

### ステージング環境へのデプロイ

```bash
# ステージングブランチとしてデプロイ
npm run deploy:staging

# または
CLOUDFLARE_ENV=staging npx wrangler pages deploy dist --branch=staging
```

### 本番環境へのデプロイ

```bash
# メインブランチとしてデプロイ
npm run deploy:production

# または
CLOUDFLARE_ENV=production npx wrangler pages deploy dist --branch=main
```

## Cloudflareバインディング

### KVストア

KVストアはキーバリューストレージです：

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"
```

```typescript
// Astro.locals.runtime.env からアクセス
const kv = Astro.locals.runtime.env.CACHE;
await kv.put('key', 'value');
const value = await kv.get('key');
```

### D1データベース

SQLiteベースのエッジデータベース：

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"
```

```typescript
const db = Astro.locals.runtime.env.DB;
const results = await db.prepare('SELECT * FROM users').all();
```

### R2ストレージ

オブジェクトストレージ：

```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"
```

```typescript
const bucket = Astro.locals.runtime.env.STORAGE;
await bucket.put('file.txt', 'Hello World');
const object = await bucket.get('file.txt');
```

### Service Bindings

他のWorkerへのバインディング：

```toml
[[services]]
binding = "API"
service = "my-api-worker"
```

```typescript
const api = Astro.locals.runtime.env.API;
const response = await api.fetch('/endpoint');
```

## シークレットの管理

シークレット（APIキー、パスワードなど）は環境変数として設定します：

```bash
# シークレットの設定
npx wrangler secret put API_KEY
npx wrangler secret put DATABASE_URL --env=production

# シークレットの削除
npx wrangler secret delete API_KEY

# シークレットの一覧表示
npx wrangler secret list
```

## ローカル開発

Cloudflareのバインディングを使用したローカル開発：

```bash
# ローカルモードで開発サーバー起動
npm run dev

# Wranglerのローカルモードでプレビュー
npx wrangler pages dev dist

# リモートリソースを使用したプレビュー
npm run preview
```

## カスタムドメインの設定

### wrangler.tomlでの設定

```toml
[env.production]
routes = [
  { pattern = "example.com/*", custom_domain = true }
]
```

### ダッシュボードでの設定

1. Cloudflareダッシュボードにログイン
2. Workers & Pages → プロジェクトを選択
3. Settings → Domains & Routes
4. カスタムドメインを追加

## トラブルシューティング

### ビルドエラー

```bash
# クリーンビルド
rm -rf dist/ .astro/
npm run build
```

### デプロイエラー

```bash
# Wranglerログイン確認
npx wrangler whoami

# ログイン
npx wrangler login
```

### 環境変数が反映されない

```bash
# シークレットの確認
npx wrangler secret list --env=production
```

## 無料枠について

このテンプレートはCloudflareの無料枠で動作します。詳細な制限と使い方については [無料枠ガイド](free-tier.md) を参照してください。

**主な無料枠の制限:**
- Workers/Pages: 100,000リクエスト/日
- KV: 1GBストレージ、100,000読み取り/日
- D1: 5GBストレージ、250,000行読み取り/日
- R2: 10GBストレージ

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Astro Cloudflareアダプター](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)
