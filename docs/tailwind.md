# Tailwind CSS ドキュメント

このテンプレートでは、Tailwind CSS v4を使用しています。

## Tailwind CSS v4とは

Tailwind CSS v4は、パフォーマンスと開発体験を大幅に向上させたメジャーアップデートです。

### 主な変更点

- **CSS-first設定**: JavaScriptの設定ファイル不要
- **Viteネイティブ**: Viteと統合された高速ビルド
- **自動コンテンツ検出**: 手動でのコンテンツ設定不要
- **ゼロランタイム**: ビルド時にすべて処理

## 設定

このテンプレートでは、Viteプラグインを使用してTailwind CSSを設定しています：

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### src/styles/global.css

```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  /* ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}
```

## 基本的な使い方

### ユーティリティクラス

```html
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>
```

### レスポンシブデザイン

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- モバイル: 1列, タブレット: 2列, デスクトップ: 4列 -->
</div>
```

### ダークモード

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  ダークモード対応
</div>
```

## カスタマイズ

### CSS変数の使用

```css
:root {
  --primary-color: oklch(0.5 0.2 250);
}

@theme inline {
  --color-primary: var(--primary-color);
}
```

### カスタムアニメーション

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

## コンポーネントパターン

### カード

```html
<div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
  <img class="w-full" src="/image.jpg" alt="Card image">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 dark:text-white">Card Title</div>
    <p class="text-gray-700 dark:text-gray-300 text-base">
      Card description goes here.
    </p>
  </div>
</div>
```

### フォーム

```html
<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Email
    </label>
    <input 
      type="email" 
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
             focus:border-blue-500 focus:ring-blue-500"
    >
  </div>
  <button class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
    Submit
  </button>
</form>
```

## パフォーマンスの最適化

### 未使用スタイルの削除

Tailwind CSS v4は自動で未使用のスタイルを削除します。

### 重要なCSSの優先

```html
<!-- 重要なスタイルを最初に読み込む -->
<link rel="preload" href="/styles/global.css" as="style">
```

## 参考リンク

- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Tailwind CSS v4アップグレードガイド](https://tailwindcss.com/docs/v4-beta)
- [Astro + Tailwindガイド](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
