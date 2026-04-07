# Neat Pulse センサーモニター — セットアップガイド

部屋ごとの在室人数・温度・湿度をリアルタイムで表示するダッシュボードです。

**言語選択：** [English](README.md) | [日本語](README_ja.md) | [繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

---

## 必要なファイル

| ファイル | 役割 |
|---|---|
| `server.js` | ローカルプロキシサーバー（Neat Pulse API への中継） |
| `neat-pulse-dashboard.html` | Chrome で開くダッシュボード |

---

## Step 0 — Neat Pulse APIキーの作成

> ⚠️ APIキーの発行には **有料の Pulse プラン** が必要です。

### APIキーの作成手順

1. [Neat Pulse](https://pulse.neat.no/) にログインする
2. **Settings（設定）** → **API keys** を開く
3. **「Create API key」** をクリック
4. 名前を入力し、スコープで **「Read」** を選択して **「Create」** をクリック
5. 表示されたAPIキーをコピーアイコンでコピーして保存する

> ⚠️ **APIキーはこの画面を閉じると二度と表示されません。** 必ずコピーして安全な場所に保管してください。

### 組織ID（Org ID）の確認

- Neat Pulse の **Settings** 画面に表示されています
- ログイン後のURLにも含まれています（例：`https://pulse.neat.no/orgs/`**`abc123`**`/...`）

公式ドキュメント：https://support.neat.no/article/managing-api-accounts-on-neat-pulse-management-platform/

---

## Step 1 — Node.js のインストール

ブラウザからAPIを直接呼ぶことができないため、ローカルでプロキシサーバーを動かす必要があります。そのために **Node.js** をインストールします。

### Windows

1. [https://nodejs.org/](https://nodejs.org/) を開く
2. **「LTS」** と書かれた緑のボタンをクリックしてインストーラー（`.msi`）をダウンロード
3. ダウンロードしたファイルをダブルクリックして実行し、指示に従いインストール
4. インストール確認：**スタートメニュー** → 「コマンドプロンプト」を開いて入力

```
node --version
```

`v22.x.x` のようなバージョン番号が表示されればOKです。

### Mac

**方法A：公式サイトから（推奨）**

1. [https://nodejs.org/](https://nodejs.org/) を開く
2. **「LTS」** と書かれた緑のボタンをクリックしてインストーラー（`.pkg`）をダウンロード
3. ダウンロードしたファイルをダブルクリックして実行し、指示に従いインストール
4. インストール確認：**ターミナル**（Launchpad → ターミナル）を開いて入力

```
node --version
```

**方法B：Homebrew を使う場合**

```
brew install node
```

---

## Step 2 — ファイルの配置

`server.js` と `neat-pulse-dashboard.html` を**同じフォルダ**に置きます。

```
デスクトップ/
  neat-pulse/
    server.js
    neat-pulse-dashboard.html
    README_ja.md
```

---

## Step 3 — プロキシサーバーの起動

### Windows

1. エクスプローラーでファイルを置いたフォルダを開く
2. アドレスバーをクリックして `cmd` と入力し Enter
3. コマンドプロンプトで実行：

```
node server.js
```

以下のような表示が出ればサーバー起動成功です：

```
╔══════════════════════════════════════════════╗
║   Neat Pulse プロキシサーバー 起動中          ║
║   http://localhost:3000                      ║
╚══════════════════════════════════════════════╝
```

### Mac

1. **ターミナル**（Launchpad → ターミナル）を開く
2. ファイルを置いたフォルダに移動（例）：

```
cd ~/Desktop/neat-pulse
```

3. サーバーを起動：

```
node server.js
```

> **注意：** ダッシュボードを使っている間はターミナルを開いたままにしてください。  
> 停止するときは `Ctrl + C` を押します。

---

## Step 4 — ダッシュボードを開く

`neat-pulse-dashboard.html` を **Chrome** で開きます：

- **Windows：** ファイルを右クリック → プログラムから開く → Google Chrome
- **Mac：** ファイルを右クリック → このアプリケーションで開く → Google Chrome

画面上部に **「✅ プロキシサーバー接続OK」** と表示されれば準備完了です。

---

## Step 5 — ダッシュボードの使い方

### 1. API接続設定

| 項目 | 内容 |
|---|---|
| **APIキー** | Neat Pulse で発行した Bearer トークン |
| **組織ID** | Neat Pulse の組織ID |
| **更新間隔** | 3分 / 5分 / 10分 から選択 |

入力後「接続」をクリック（または Enter キー）。

### 2. ロケーション選択

一覧からロケーションを1つ選択して「次へ：部屋を選択 →」をクリック。

### 3. 部屋選択

監視したい部屋をクリックして選択し（複数可）、「▶ モニタリング開始」をクリック。

### 4. モニタリング

部屋ごとにグラフカードが表示され、以下をリアルタイムで更新：
- 👥 **在室人数**
- 🌡️ **温度**（°C）
- 💧 **湿度**（%）

---

## トラブルシューティング

| 症状 | 対処法 |
|---|---|
| 「❌ プロキシ未起動」と表示される | `node server.js` を実行してから再読み込み |
| 「接続に失敗しました」と表示される | APIキーと組織IDを確認 |
| グラフの値がすべて `--` になる | 「ログ」ボタンをクリックして詳細を確認 |
| サーバーを止めてしまった | ターミナルで `node server.js` を再実行 |

---

## 毎回の起動手順（まとめ）

```bash
# ① フォルダに移動
cd neat-pulseフォルダのパス

# ② サーバー起動
node server.js

# ③ Chrome で neat-pulse-dashboard.html を開く
```

---

*Neat Pulse API v0.1.1 対応*
