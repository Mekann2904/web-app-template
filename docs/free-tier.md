# Cloudflare無料枠ガイド

このテンプレートで使用できるCloudflare無料枠の機能と制限について説明します。

## 無料枠で利用できる機能

### 1. Cloudflare Workers / Pages

**無料枠の制限:**
- **リクエスト数**: 1日あたり100,000リクエスト
- **実行時間**: リクエストあたり最大50ms CPU時間
- **メモリ**: 128MB
- **同時実行**: 無制限

**使用例:**
```bash
# デプロイ（無料枠内で利用可能）
npm run deploy:staging
npm run deploy:production
```

### 2. KVストレージ

**無料枠の制限:**
- **ストレージ**: 1GB
- **読み取り**: 1日あたり100,000リクエスト
- **書き込み/削除/リスト**: 1日あたり合計1,000操作

**wrangler.toml設定例:**
```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"
```

**コード例:**
```typescript
const kv = Astro.locals.runtime.env.CACHE;
await kv.put('key', 'value');
const value = await kv.get('key');
```

### 3. D1データベース

**無料枠の制限:**
- **ストレージ**: 5GB
- **読み取り行数**: 1日あたり250,000行
- **書き込み行数**: 1日あたり50,000行
- **データベース数**: アカウントあたり最大10個

**wrangler.toml設定例:**
```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"
```

**コード例:**
```typescript
const db = Astro.locals.runtime.env.DB;
const results = await db.prepare('SELECT * FROM users').all();
```

### 4. R2ストレージ

**無料枠の制限:**
- **ストレージ**: 10GB
- **クラスA操作**（書き込み）: 月あたり100万リクエスト
- **クラスB操作**（読み取り）: 月あたり1000万リクエスト
- **データ転送**: 無料（エグレス料金なし！）

**wrangler.toml設定例:**
```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"
```

**コード例:**
```typescript
const bucket = Astro.locals.runtime.env.STORAGE;
await bucket.put('file.txt', 'Hello World');
const object = await bucket.get('file.txt');
```

### 5. Pagesビルド

**無料枠の制限:**
- **ビルド回数**: 月あたり500回
- **ビルド時間**: 1ビルドあたり最大20分
- **同時ビルド**: アカウントあたり1つ

## 無料枠の制限まとめ

| 機能 | 無料枠の制限 |
|------|-------------|
| Workersリクエスト | 100,000/日 |
| KVストレージ | 1GB |
| D1ストレージ | 5GB |
| D1読み取り行数 | 250,000行/日 |
| R2ストレージ | 10GB |
| R2クラスA操作 | 1,000,000/月 |
| R2クラスB操作 | 10,000,000/月 |
| Pagesビルド | 500/月 |
| Pagesファイル数 | 20,000ファイル |
| ファイルサイズ | 最大25MiB |

## 注意事項

### 制限の確認方法

```bash
# Workersの使用状況を確認
npx wrangler usage

# KVの使用状況はCloudflareダッシュボードで確認
# D1、R2も同様
```

### 無料枠を超えた場合

無料枠を超えると：
1. **KV**: 制限超過時は429エラーが返される
2. **Workers**: リクエストが拒否される
3. **D1**: クエリが失敗する
4. **R2**: 操作が失敗する

### 制限緩和の申請

制限を緩和する必要がある場合：
- [Cloudflare Limit Increase Request Form](https://forms.gle/xxx)から申請
- Proプラン（$5/月）にアップグレード
- Workers Paidプランにアップグレード

## 無料枠での運用ベストプラクティス

### 1. キャッシュを活用

```typescript
// KVを使ったキャッシュ
const cacheKey = `cache:${request.url}`;
let response = await CACHE.get(cacheKey);

if (!response) {
  response = await fetchData();
  await CACHE.put(cacheKey, response, { expirationTtl: 3600 });
}
```

### 2. 効率的なデータベース設計

```sql
-- D1でインデックスを活用
CREATE INDEX idx_users_email ON users(email);

-- 不要なデータの定期削除
DELETE FROM logs WHERE created_at < date('now', '-30 days');
```

### 3. 画像・静的ファイルの最適化

```typescript
// R2に大きなファイルを保存し、小さなメタデータをKVに
const imageMetadata = {
  url: '/images/photo.jpg',
  size: 2048,
  r2Key: 'images/photo.jpg'
};
await CACHE.put('image:photo', JSON.stringify(imageMetadata));
```

### 4. 監視とアラート

```bash
# 定期的な使用状況の確認をスクリプト化
#!/bin/bash
# check-usage.sh

wrangler usage --json | jq '.workers.requests.daily'
```

## 参考リンク

- [Cloudflare Workers Free Tier](https://developers.cloudflare.com/workers/platform/pricing/#free-tier)
- [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [KV Pricing](https://developers.cloudflare.com/kv/platform/pricing/)
- [D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [R2 Pricing](https://developers.cloudflare.com/r2/platform/pricing/)
