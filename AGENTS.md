# AGENTS.md - AI エージェント開発者向けガイド

このドキュメントは、AIエージェントがこのプロジェクトで開発・修正を行う際のデザイン面のガイドラインを提供します。

## 最重要原則：車輪の再開発をしない

### 原則の説明

**絶対に既存の機能を自分で再実装しないでください。**

このプロジェクトでは、以下の理由から「車輪の再開発」を厳密に禁止しています：

1. **時間の無駄**: 既存のshadcn/uiコンポーネントやTailwind CSSの機能を使えばすぐに実現できます
2. **バグのリスク**: テスト済みのコンポーネントを使う方が安全です
3. **一貫性の維持**: 既存のデザインシステムを崩さずに済みます
4. **メンテナンス性**: 将来の更新も容易です

### 具体的な禁止事項

#### 禁止: 以下のことをしてはいけません

```tsx
// ボタンを独自実装しない
<button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
  ボタン
</button>

// カードを独自実装しない
<div className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
  <h2 className="font-bold text-lg mb-2">タイトル</h2>
  <p>説明</p>
</div>

// モーダルを独自実装しない
<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
  <div className="bg-white rounded-lg p-6 max-w-md w-full">
    モーダル
  </div>
</div>

// フォーム入力を独自実装しない
<input className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

#### 推奨: 代わりにこうしてください

```tsx
// shadcn/uiのButtonを使う
import { Button } from '@/components/ui/button'

<Button>ボタン</Button>

// shadcn/uiのCardを使う
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
  </CardHeader>
  <CardContent>
    説明
  </CardContent>
</Card>

// shadcn/uiのDialogを使う
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>タイトル</DialogTitle>
    </DialogHeader>
    モーダル
  </DialogContent>
</Dialog>

// shadcn/uiのInputを使う
import { Input } from '@/components/ui/input'

<Input />
```

### 探索の手順

1. **まずshadcn/uiを確認**: [shadcn/ui公式サイト](https://ui.shadcn.com/docs/components) で必要なコンポーネントがないか確認
2. **Tailwind CSSを確認**: 必要なスタイルがユーティリティクラスで実現できないか確認
3. **既存コンポーネントを確認**: プロジェクト内に似たようなコンポーネントがないか確認
4. **最後に追加**: どれも存在しない場合のみ、`npx shadcn@latest add [component]` でコンポーネントを追加

### 既存コンポーネントの拡張方法

既存のコンポーネントを拡張したい場合、必ずshadcn/uiのコンポーネントをベースにしてください。

```tsx
// 良い例 - shadcn/uiのButtonをベースに拡張
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

export function IconButton({ icon, children, className, ...props }: IconButtonProps) {
  return (
    <Button className={cn("flex items-center gap-2", className)} {...props}>
      {icon}
      {children}
    </Button>
  )
}

// 悪い例 - ボタンを独自実装
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
}

export function IconButton({ icon, children, className, ...props }: IconButtonProps) {
  return (
    <button className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
      "hover:bg-accent hover:text-accent-foreground"
    )} {...props}>
      {icon}
      {children}
    </button>
  )
}
```

## 概要

このプロジェクトでは以下の技術スタックを使用しています：

- **Tailwind CSS v4** - CSSフレームワーク（CSS-first設定）
- **shadcn/ui** - リユーザブルUIコンポーネント
- **Astro** - Webフレームワーク
- **TypeScript** - 型安全な開発

## デザイン原則

### 1. shadcn/uiコンポーネントの優先使用

**ルール**: 可能な限りshadcn/uiのコンポーネントを使用してください。

> **重要**: これは「車輪の再開発をしない」原則の一部です。shadcn/uiに既存のコンポーネントがある場合、それを使用するか、それを拡張する形で実装してください。

```tsx
// 良い例 - shadcn/uiコンポーネントを使用
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>アクション</Button>
  </CardContent>
</Card>

// 悪い例 - 独自のスタイルを適用
<div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
  <h2 className="font-semibold text-lg">タイトル</h2>
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    アクション
  </button>
</div>
```

### 2. 新しいコンポーネントの追加

shadcn/uiコンポーネントを追加する場合：

```bash
npx shadcn@latest add [component-name]
```

### 3. カスタムコンポーネントの作成

shadcn/uiコンポーネントをベースにカスタムコンポーネントを作成します。

```tsx
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'

interface CustomButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function CustomButton({ 
  loading, 
  children, 
  className, 
  ...props 
}: CustomButtonProps) {
  return (
    <Button className={cn("relative", className)} {...props}>
      {loading && <LoadingSpinner className="mr-2" />}
      {children}
    </Button>
  )
}
```

## レスポンシブデザイン

### ブレークポイント

| ブレークポイント | 最小幅 | デバイス |
|----------------|--------|----------|
| `sm` | 640px | 小型スマホ横向き |
| `md` | 768px | タブレット |
| `lg` | 1024px | 小型デスクトップ |
| `xl` | 1280px | デスクトップ |
| `2xl` | 1536px | 大型デスクトップ |

### レスポンシブ対応の基本パターン

#### グリッドレイアウト

```tsx
// モバイル: 1列, タブレット: 2列, デスクトップ: 4列
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* アイテム */}
</div>

// モバイル: 2列, タブレット: 3列, デスクトップ: 6列
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {/* アイテム */}
</div>
```

#### フレックスレイアウト

```tsx
// モバイル: 縦方向, デスクトップ: 横方向
<div className="flex flex-col lg:flex-row gap-4">
  <div>左側</div>
  <div>右側</div>
</div>

// モバイル: 中央揃え, デスクトップ: 左寄せ
<div className="flex flex-col items-center lg:items-start">
  {/* コンテンツ */}
</div>
```

#### テキストサイズ

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  レスポンシブ見出し
</h1>

<p className="text-sm sm:text-base md:text-lg">
  レスポンシブ本文
</p>
```

#### パディング・マージン

```tsx
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  {/* コンテンツ */}
</div>

<div className="py-8 sm:py-12 md:py-16 lg:py-20">
  {/* コンテンツ */}
</div>
```

#### 表示・非表示

```tsx
// モバイルのみ表示
<div className="block lg:hidden">
  モバイル用コンテンツ
</div>

// デスクトップのみ表示
<div className="hidden lg:block">
  デスクトップ用コンテンツ
</div>
```

### モバイルファーストの考え方

```tsx
// 良い例 - モバイルファースト
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* コンテンツ */}
</div>

// 悪い例 - デスクトップファースト
<div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-1 gap-4">
  {/* コンテンツ */}
</div>
```

## 統一感のあるデザイン

### カラーパレット

プロジェクトで定義されているCSS変数を使用します。

```css
/* src/styles/global.css で定義 */
--background: oklch(1 0 0);
--foreground: oklch(0.141 0.005 285.823);
--primary: oklch(0.21 0.006 285.885);
--primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.967 0.001 286.375);
--secondary-foreground: oklch(0.21 0.006 285.885);
--muted: oklch(0.967 0.001 286.375);
--muted-foreground: oklch(0.552 0.016 285.938);
--accent: oklch(0.967 0.001 286.375);
--accent-foreground: oklch(0.21 0.006 285.885);
--destructive: oklch(0.577 0.245 27.325);
--border: oklch(0.92 0.004 286.32);
--input: oklch(0.92 0.004 286.32);
--ring: oklch(0.705 0.015 286.067);
```

#### 色の使用例

```tsx
// 良い例 - CSS変数を使用
<div className="bg-background text-foreground">
  <h1 className="text-primary">見出し</h1>
  <p className="text-muted-foreground">説明文</p>
</div>

// 悪い例 - ハードコードされた色
<div className="bg-white text-gray-900">
  <h1 className="text-gray-900">見出し</h1>
  <p className="text-gray-500">説明文</p>
</div>
```

### タイポグラフィ

```tsx
// 見出し
<h1 className="text-4xl font-bold tracking-tight">h1 見出し</h1>
<h2 className="text-3xl font-semibold tracking-tight">h2 見出し</h2>
<h3 className="text-2xl font-semibold tracking-tight">h3 見出し</h3>
<h4 className="text-xl font-semibold tracking-tight">h4 見出し</h4>

// 本文
<p className="text-base">標準テキスト</p>
<p className="text-sm text-muted-foreground">補足テキスト</p>
<p className="text-xs text-muted-foreground">小さいテキスト</p>
```

### 間隔（Spacing）

```tsx
// 一貫した間隔の使用
<div className="space-y-4">  {/* 垂直方向の間隔 */}
  <div>アイテム1</div>
  <div>アイテム2</div>
  <div>アイテム3</div>
</div>

<div className="space-x-4">  {/* 水平方向の間隔 */}
  <span>アイテム1</span>
  <span>アイテム2</span>
  <span>アイテム3</span>
</div>

// パディング
<div className="p-4">      {/* 全方向 */}
<div className="px-4 py-2"> {/* 水平・垂直 */}
<div className="pt-4 pb-2"> {/* 上・下 */}

// マージン
<div className="m-4">      {/* 全方向 */}
<div className="mx-auto">  {/* 水平中央 */}
<div className="my-8">     {/* 垂直方向 */}
```

### 角丸（Border Radius）

```tsx
// 定義されているradiusを使用
<div className="rounded-sm">   {/* 小さい角丸 */}
<div className="rounded-md">   {/* 標準の角丸 */}
<div className="rounded-lg">   {/* 大きい角丸 */}
<div className="rounded-xl">   {/* さらに大きい角丸 */}
<div className="rounded-full"> {/* 完全な円 */}
```

### シャドウ

```tsx
<div className="shadow-sm">   {/* 小さい影 */}
<div className="shadow">      {/* 標準の影 */}
<div className="shadow-md">   {/* 中程度の影 */}
<div className="shadow-lg">   {/* 大きい影 */}
<div className="shadow-xl">   {/* さらに大きな影 */}
```

## よく使うコンポーネントパターン

### ヒーローセクション

```tsx
<div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
  <div class="text-center space-y-6 mb-16">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
      メインタイトル
      <span class="text-primary block mt-2">サブタイトル</span>
    </h1>
    <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
      説明文がここに入ります。最大幅を指定して中央寄せにします。
    </p>
    <div class="flex justify-center gap-4 flex-col sm:flex-row">
      <Button size="lg">主要アクション</Button>
      <Button variant="outline" size="lg">次要アクション</Button>
    </div>
  </div>
</div>
```

### フィーチャーグリッド

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  <Card>
    <CardHeader>
      <CardTitle>タイトル</CardTitle>
      <CardDescription>説明</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm text-muted-foreground">コンテンツ</p>
    </CardContent>
  </Card>
  {/* 繰り返し */}
</div>
```

### ナビゲーションバー

```tsx
<nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto px-4">
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="font-bold text-lg">ブランド名</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a href="/about" className="text-sm font-medium hover:text-primary">
          About
        </a>
        <a href="/features" className="text-sm font-medium hover:text-primary">
          Features
        </a>
        <Button>CTA</Button>
      </div>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <MenuIcon className="size-6" />
        </SheetTrigger>
        <SheetContent>
          {/* モバイルメニュー */}
        </SheetContent>
      </Sheet>
    </div>
  </div>
</nav>
```

### フッター

```tsx
<footer className="border-t bg-muted/50">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="col-span-2 md:col-span-1">
        <h3 className="font-bold mb-4">ブランド名</h3>
        <p class="text-sm text-muted-foreground">
          説明文
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">リンク</h4>
        <ul class="space-y-2">
          <li><a href="#" class="text-sm text-muted-foreground hover:text-primary">Link</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

### フォームセクション

```tsx
<div className="max-w-md mx-auto space-y-6">
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium">
      メールアドレス
    </label>
    <Input 
      id="email" 
      type="email" 
      placeholder="example@example.com"
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="password" className="text-sm font-medium">
      パスワード
    </label>
    <Input 
      id="password" 
      type="password"
    />
  </div>
  <Button className="w-full">送信</Button>
</div>
```

## ダークモード対応

### ダークモードの実装

```tsx
// shadcn/uiのコンポーネントは自動的にダークモードに対応しています
<Card className="bg-card text-card-foreground">
  {/* コンテンツ */}
</Card>

// カスタム要素の場合
<div className="bg-background text-foreground dark:bg-background dark:text-foreground">
  {/* コンテンツ */}
</div>
```

### ダークモード切り替え

```tsx
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
```

## レイアウトパターン

### コンテナ

```tsx
// 標準コンテナ
<div className="container mx-auto px-4">
  {/* コンテンツ */}
</div>

// 最大幅付きコンテナ
<div className="container mx-auto px-4 max-w-6xl">
  {/* コンテンツ */}
</div>

// 全幅コンテナ
<div className="w-full">
  {/* コンテンツ */}
</div>
```

### セクション区切り

```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    {/* コンテンツ */}
  </div>
</section>

// ボーダー付き
<section className="border-t py-16 md:py-24">
  <div className="container mx-auto px-4">
    {/* コンテンツ */}
  </div>
</section>
```

## パフォーマンス考慮

### 画像の最適化

```tsx
import { Image } from 'astro:assets'

<Image 
  src="/image.jpg" 
  alt="説明"
  width={800}
  height={600}
  loading="lazy"
  class="rounded-lg"
/>
```

### レイジーローディング

```tsx
// 下部のコンテンツは遅延読み込み
<div className="space-y-4" style="content-visibility: auto">
  {/* 多くのコンテンツ */}
</div>
```

## アクセシビリティ

### 色のコントラスト

- テキストと背景のコントラスト比は4.5:1以上
- 大きなテキスト（18pt以上）は3:1以上

### フォーカス状態

```tsx
// shadcn/uiのButtonは自動的にフォーカス状態に対応しています
<Button>クリック</Button>

// カスタム要素の場合
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  クリック
</button>
```

### セマンティックHTML

```tsx
// 良い例
<article>
  <header>
    <h2>記事タイトル</h2>
  </header>
  <p>記事内容</p>
  <footer>
    <time>2024-01-01</time>
  </footer>
</article>

// 悪い例
<div>
  <div class="font-bold">記事タイトル</div>
  <div>記事内容</div>
  <div>2024-01-01</div>
</div>
```

## ユーティリティ関数

### cn() - クラス名の結合

```tsx
import { cn } from '@/lib/utils'

// クラス名の結合と条件付き適用
<div className={cn(
  "base-class",
  isActive && "active-class",
  "another-class"
)}>
  {/* コンテンツ */}
</div>
```

## チェックリスト

新しいコンポーネントやページを作成する際、以下のチェックリストを確認してください：

### 最優先チェック
- [ ] **車輪の再開発をしていないか？** → shadcn/uiやTailwindの既存機能で実現できないか再確認
- [ ] shadcn/uiコンポーネントを使用しているか？
- [ ] shadcn/uiにコンポーネントが存在しないか確認したか？

### デザインチェック
- [ ] レスポンシブ対応されているか？（モバイル〜デスクトップ）
- [ ] CSS変数（色など）を使用しているか？
- [ ] タイポグラフィに一貫性があるか？
- [ ] 間隔（padding/margin）に一貫性があるか？
- [ ] ダークモードに対応しているか？
- [ ] アクセシビリティを考慮しているか？
- [ ] モバイルファーストで記述しているか？

## 関連ドキュメント

- [shadcn/uiドキュメント](docs/shadcn.md)
- [Tailwind CSSドキュメント](docs/tailwind.md)
- [Astroドキュメント](docs/astro.md)

## 外部リファレンス

- [shadcn/ui公式サイト](https://ui.shadcn.com/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Astro公式ドキュメント](https://docs.astro.build/)
