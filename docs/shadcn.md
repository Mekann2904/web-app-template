# shadcn/ui ドキュメント

このテンプレートでは、shadcn/uiを使用して美しいUIコンポーネントを構築しています。

## shadcn/uiとは

shadcn/uiは、再利用可能なコンポーネントのコレクションです。npmパッケージとしてインストールするのではなく、コンポーネントコードを直接プロジェクトにコピーして使用します。

## 特徴

- **オープンソース**: すべてのコンポーネントのソースコードが見える
- **カスタマイズ可能**: 自分のニーズに合わせて自由に変更可能
- **Tailwind CSSベース**: Tailwind CSSと完全に統合
- **アクセシブル**: WAI-ARIA準拠
- **TypeScript**: 完全な型安全性

## インストール

### 初期化

```bash
npx shadcn@latest init
```

### コンポーネントの追加

```bash
# 単一コンポーネント
npx shadcn@latest add button

# 複数コンポーネント
npx shadcn@latest add button card input dialog

# 全コンポーネント
npx shadcn@latest add --all
```

## 使用例

### Button

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <div className="space-x-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Input

```tsx
import { Input } from "@/components/ui/input"

export function InputExample() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email">Email</label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

## コンポーネント一覧

### フォーム

- `button` - ボタン
- `input` - テキスト入力
- `textarea` - テキストエリア
- `select` - セレクトボックス
- `checkbox` - チェックボックス
- `radio-group` - ラジオボタン
- `switch` - スイッチ
- `label` - ラベル
- `form` - フォーム

### レイアウト

- `card` - カード
- `aspect-ratio` - アスペクト比
- `separator` - セパレーター
- `skeleton` - スケルトン
- `scroll-area` - スクロールエリア

### オーバーレイ

- `dialog` - ダイアログ
- `alert-dialog` - アラートダイアログ
- `popover` - ポップオーバー
- `tooltip` - ツールチップ
- `sheet` - シート
- `drawer` - ドロワー
- `hover-card` - ホバーカード
- `menubar` - メニューバー
- `dropdown-menu` - ドロップダウンメニュー
- `context-menu` - コンテキストメニュー

### ナビゲーション

- `tabs` - タブ
- `navigation-menu` - ナビゲーションメニュー
- `command` - コマンドパレット
- `breadcrumb` - パンくずリスト
- `pagination` - ページネーション

### フィードバック

- `alert` - アラート
- `progress` - プログレスバー
- `sonner` - トースト通知
- `toast` - トースト（旧版）

### データ表示

- `table` - テーブル
- `data-table` - データテーブル
- `collapsible` - 折りたたみ
- `accordion` - アコーディオン
- `calendar` - カレンダー

## テーマのカスタマイズ

### カラーの変更

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}
```

### 新しいコンポーネントの作成

既存のコンポーネントをベースにして新しいコンポーネントを作成できます：

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

interface MyButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function MyButton({ 
  loading, 
  children, 
  className, 
  ...props 
}: MyButtonProps) {
  return (
    <Button className={cn("relative", className)} {...props}>
      {loading && <LoadingSpinner className="mr-2" />}
      {children}
    </Button>
  )
}
```

## 参考リンク

- [shadcn/ui公式サイト](https://ui.shadcn.com/)
- [コンポーネントドキュメント](https://ui.shadcn.com/docs/components/accordion)
- [テーマカスタマイズ](https://ui.shadcn.com/docs/theming)
- [GitHub](https://github.com/shadcn-ui/ui)
