# 環境設定ドキュメント

このテンプレートは、Cloudflare Workers/Pagesの環境機能を使用して、複数のデプロイメント環境をサポートしています。

## 環境について

Cloudflare Workers/Pagesでは、環境を使用して同じアプリケーションに異なる設定を作成できます。

## 利用可能な環境

| 環境 | 用途 | ドメイン例 |
|------|------|-----------|
| **dev** | ローカル開発 | `localhost:4321` |
| **staging** | ステージング | `my-app-staging.example.workers.dev` |
| **production** | 本番 | `my-app.example.workers.dev` またはカスタムドメイン |

## 設定方法

### wrangler.toml

```toml
#:schema node_modules/wrangler/config-schema.json
name = "astro-cloudflare-template"
main = "./dist/_worker.js"
compatibility_date = "2025-01-27"
compatibility_flags = ["nodejs_compat"]

# トップレベル設定（開発環境として機能）
account_id = "your-account-id"
vars = { ENVIRONMENT = "dev", DEBUG = "true" }

# ステージング環境
[env.staging]
name = "astro-cloudflare-template-staging"
vars = { ENVIRONMENT = "staging", DEBUG = "true" }

# 本番環境
[env.production]
name = "astro-cloudflare-template-production"
vars = { ENVIRONMENT = "production", DEBUG = "false" }

# 非継承可能な設定（各環境で個別に設定）
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id-dev"

[[env.staging.kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id-staging"

[[env.production.kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id-production"
```

## 環境の使用方法

### コマンドライン引数

```bash
# ステージング環境で開発サーバー起動
CLOUDFLARE_ENV=staging npx wrangler dev

# ステージング環境にデプロイ
npx wrangler deploy --env=staging

# 本番環境にデプロイ
npx wrangler deploy --env=production
```

### 環境変数

```bash
# 環境変数を使用
CLOUDFLARE_ENV=staging npx wrangler deploy

# または
export CLOUDFLARE_ENV=production
npx wrangler deploy
```

**注意**: コマンドライン引数（`--env`）は環境変数（`CLOUDFLARE_ENV`）よりも優先されます。

## 環境変数の管理

### 通常の環境変数（vars）

`wrangler.toml`の`vars`セクションで定義：

```toml
[env.production.vars]
ENVIRONMENT = "production"
DEBUG = "false"
API_URL = "https://api.example.com"
```

コード内でのアクセス：

```typescript
const env = Astro.locals.runtime.env.ENVIRONMENT;
const debug = Astro.locals.runtime.env.DEBUG;
```

### シークレット（Secrets）

シークレットは`wrangler secret put`コマンドで設定します：

```bash
# デフォルト環境にシークレットを設定
npx wrangler secret put API_KEY

# ステージング環境にシークレットを設定
npx wrangler secret put API_KEY --env=staging

# 本番環境にシークレットを設定
npx wrangler secret put API_KEY --env=production

# すべての環境に同じシークレットを設定
npx wrangler secret put API_KEY
npx wrangler secret put API_KEY --env=staging
npx wrangler secret put API_KEY --env=production
```

## ローカル開発時の環境変数

### .dev.vars ファイル

ローカル開発時の環境変数は`.dev.vars`ファイルで管理します：

```bash
# 基本的なローカル開発用
API_KEY=dev-api-key
DEBUG=true
```

### 環境別の.dev.varsファイル

環境別の設定を行うには、以下の命名規則でファイルを作成します：

- `.dev.vars` - デフォルト（すべての環境で使用）
- `.dev.vars.staging` - ステージング環境
- `.dev.vars.production` - 本番環境

**重要**: `.dev.vars.<environment>`ファイルが存在する場合、`.dev.vars`は読み込まれません。

### .env ファイル

`.env`ファイルも使用できます：

```bash
# .env
SECRET_KEY=value

# .env.staging
SECRET_KEY=staging-value

# .env.production
SECRET_KEY=production-value
```

`.env`ファイルの場合、すべてのファイルがマージされ、最も具体的な値が使用されます：

1. `.env.<environment>.local`（最優先）
2. `.env.local`
3. `.env.<environment>`
4. `.env`（最低）

## バインディングの環境別設定

### KVストア

```toml
# 開発環境
[[kv_namespaces]]
binding = "CACHE"
id = "dev-kv-id"

# ステージング環境
[[env.staging.kv_namespaces]]
binding = "CACHE"
id = "staging-kv-id"

# 本番環境
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "production-kv-id"
```

### D1データベース

```toml
# 開発環境
[[d1_databases]]
binding = "DB"
database_name = "dev-db"
database_id = "dev-db-id"

# ステージング環境
[[env.staging.d1_databases]]
binding = "DB"
database_name = "staging-db"
database_id = "staging-db-id"

# 本番環境
[[env.production.d1_databases]]
binding = "DB"
database_name = "production-db"
database_id = "production-db-id"
```

### R2ストレージ

```toml
# 開発環境
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "dev-bucket"

# ステージング環境
[[env.staging.r2_buckets]]
binding = "STORAGE"
bucket_name = "staging-bucket"

# 本番環境
[[env.production.r2_buckets]]
binding = "STORAGE"
bucket_name = "production-bucket"
```

## 環境判定

コード内で環境を判定する方法：

```typescript
const env = import.meta.env.ENVIRONMENT || 'dev';

if (env === 'production') {
  // 本番環境特有の処理
} else if (env === 'staging') {
  // ステージング環境特有の処理
} else {
  // 開発環境の処理
}
```

## 推奨ワークフロー

### 開発フロー

1. **ローカル開発**
   ```bash
   npm run dev
   ```

2. **ステージングへのデプロイ**
   ```bash
   npm run build
   npm run deploy:staging
   ```

3. **本番へのデプロイ**
   ```bash
   npm run build
   npm run deploy:production
   ```

### 環境変数の同期

環境間でシークレットを同期するスクリプト例：

```bash
#!/bin/bash
# sync-secrets.sh

SECRET_NAME=$1

# すべての環境にシークレットを設定
for env in "" "--env=staging" "--env=production"; do
  echo "Setting secret for environment: ${env:-'default'}"
  echo "your-secret-value" | wrangler secret put $SECRET_NAME $env
done
```

## セキュリティに関する注意事項

- **シークレットはコミットしない**: `.dev.vars*`と`.env*`ファイルは`.gitignore`に追加してください
- **環境名に機密情報を含めない**: 環境名はSSL証明書に含まれるため、公開されます
- **適切な環境でテスト**: 必ずステージング環境でテストしてから本番にデプロイしてください

## トラブルシューティング

### 環境変数が反映されない

```bash
# Wranglerの認証を確認
npx wrangler whoami

# 環境変数の一覧を確認
npx wrangler vars list --env=staging

# シークレットの一覧を確認
npx wrangler secret list --env=staging
```

### ローカル開発時に環境変数が読み込まれない

```bash
# .dev.varsファイルの存在を確認
ls -la .dev.vars*

# Wranglerを使用してローカルサーバーを起動
npx wrangler pages dev dist --env=staging
```

## 参考リンク

- [Cloudflare Environments ドキュメント](https://developers.cloudflare.com/workers/wrangler/environments/)
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Secrets Management](https://developers.cloudflare.com/workers/configuration/secrets/)
