# Astro ドキュメント

このテンプレートでは、Astroフレームワークを使用しています。

## Astroとは

Astroは、コンテンツにフォーカスした高速なWebサイトを構築するためのWebフレームワークです。

## 基本概念

### ファイルベースルーティング

Astroはファイルベースのルーティングを使用します：

```
src/pages/
├── index.astro          # ルートパス (/)
├── about.astro          # /about
├── blog/
│   ├── index.astro      # /blog
│   └── [slug].astro     # /blog/:slug (動的ルート)
└── [...path].astro      # キャッチオールルート
```

### アイランドアーキテクチャ

Astroの「アイランドアーキテクチャ」により、ページの大部分を高速な静的HTMLとしてレンダリングし、必要な部分だけをJavaScriptで強化できます。

```astro
---
// サーバーサイドで実行（JavaScriptはクライアントに送信されない）
const data = await fetch('https://api.example.com/data').then(r => r.json());
---

<!-- 静的HTML -->
<h1>{data.title}</h1>

<!-- インタラクティブなコンポーネント（client:directiveで制御） -->
<InteractiveChart data={data} client:load />
```

### クライアントディレクティブ

| ディレクティブ | 説明 |
|---------------|------|
| `client:load` | ページ読み込み時に即座にハイドレート |
| `client:idle` | ブラウザがidleになったらハイドレート |
| `client:visible` | コンポーネントが画面に表示されたらハイドレート |
| `client:media` | 特定のメディアクエリが一致したらハイドレート |
| `client:only` | サーバーレンダリングをスキップしてクライアントのみでレンダー |

## コンポーネントの作成

### Astroコンポーネント (.astro)

```astro
---
// フロントマター（サーバーサイドで実行）
interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;
const doubled = count * 2;
---

<!-- テンプレート -->
<div class="card">
  <h2>{title}</h2>
  <p>Count: {count}</p>
  <p>Doubled: {doubled}</p>
</div>

<style>
  .card {
    padding: 1rem;
    border: 1px solid #ccc;
  }
</style>
```

### Reactコンポーネント (.tsx)

このテンプレートでは、shadcn/uiコンポーネントとしてReactコンポーネントを使用しています。

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## データフェッチング

### ビルド時フェッチ（getStaticPaths付き）

```astro
---
export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<article>
  <h1>{post.title}</h1>
  <div>{post.content}</div>
</article>
```

### サーバーサイドレンダリング（API Routes）

```ts
// src/pages/api/users.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const users = await fetchUsers();
  
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
```

## Markdown/MDXサポート

AstroはネイティブでMarkdownとMDXをサポートしています：

```md
---
title: 'Hello World'
pubDate: 2024-01-01
---

# Hello World

これはMarkdownのコンテンツです。
```

## 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build/)
- [Astroレシピ](https://docs.astro.build/en/recipes/)
- [Astroコミュニティ](https://astro.build/chat)
