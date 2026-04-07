# Neat Pulse 感測器監控 — 安裝指南

即時顯示每個房間在室人數、溫度與濕度的儀表板。

**語言選擇：** [English](README.md) | [日本語](README_ja.md) | [繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

---

## 所需檔案

| 檔案 | 說明 |
|---|---|
| `server.js` | 本地代理伺服器（中轉 Neat Pulse API） |
| `neat-pulse-dashboard.html` | 在 Chrome 中開啟的儀表板 |

---

## Step 0 — 建立 Neat Pulse API 金鑰

> ⚠️ 使用 API 需要 **付費的 Pulse 方案**。

### 建立 API 金鑰步驟

1. 登入 [Neat Pulse](https://pulse.neat.no/)
2. 前往 **Settings（設定）** → **API keys**
3. 點擊 **「Create API key」**
4. 輸入名稱，選擇範圍為 **「Read」**，然後點擊 **「Create」**
5. 使用複製圖示複製 API 金鑰並妥善保存

> ⚠️ **API 金鑰只顯示一次，關閉視窗後將無法再查看。** 請立即複製並儲存於安全位置。

### 確認組織 ID（Org ID）

- 在 Neat Pulse 的 **Settings** 頁面可以看到
- 也可以在登入後的網址中找到（例：`https://pulse.neat.no/orgs/`**`abc123`**`/...`）

官方文件：https://support.neat.no/article/managing-api-accounts-on-neat-pulse-management-platform/

---

## Step 1 — 安裝 Node.js

由於瀏覽器無法直接呼叫 API，需要在本地執行代理伺服器，因此需要安裝 **Node.js**。

### Windows

1. 開啟 [https://nodejs.org/](https://nodejs.org/)
2. 點擊綠色的 **「LTS」** 按鈕下載安裝程式（`.msi`）
3. 雙擊下載的檔案並依照提示完成安裝
4. 確認安裝：開啟**命令提示字元**（開始功能表 → 搜尋「cmd」）並輸入：

```
node --version
```

顯示 `v22.x.x` 之類的版本號即表示安裝成功。

### Mac

**方法 A：官方安裝程式（推薦）**

1. 開啟 [https://nodejs.org/](https://nodejs.org/)
2. 點擊綠色的 **「LTS」** 按鈕下載安裝程式（`.pkg`）
3. 雙擊下載的檔案並依照提示完成安裝
4. 確認安裝：開啟**終端機**（Launchpad → 終端機）並輸入：

```
node --version
```

**方法 B：使用 Homebrew**

```
brew install node
```

---

## Step 2 — 放置檔案

將 `server.js` 和 `neat-pulse-dashboard.html` 放在**同一個資料夾**中。

```
桌面/
  neat-pulse/
    server.js
    neat-pulse-dashboard.html
    README_zh-TW.md
```

---

## Step 3 — 啟動代理伺服器

### Windows

1. 在檔案總管中開啟存放檔案的資料夾
2. 點擊網址列，輸入 `cmd` 並按 Enter
3. 在命令提示字元中執行：

```
node server.js
```

出現以下畫面即表示伺服器啟動成功：

```
╔══════════════════════════════════════════════╗
║   Neat Pulse 代理伺服器執行中                ║
║   http://localhost:3000                      ║
╚══════════════════════════════════════════════╝
```

### Mac

1. 開啟**終端機**（Launchpad → 終端機）
2. 切換到存放檔案的資料夾（例）：

```
cd ~/Desktop/neat-pulse
```

3. 啟動伺服器：

```
node server.js
```

> **注意：** 使用儀表板期間請保持終端機視窗開啟。  
> 若要停止，請按 `Ctrl + C`。

---

## Step 4 — 開啟儀表板

用 **Chrome** 開啟 `neat-pulse-dashboard.html`：

- **Windows：** 右鍵點擊檔案 → 開啟方式 → Google Chrome
- **Mac：** 右鍵點擊 → 以此應用程式開啟 → Google Chrome

畫面頂部顯示 **「✅ 代理伺服器連接正常」** 即表示準備就緒。

---

## Step 5 — 使用儀表板

### 1. API 連接設定

| 項目 | 說明 |
|---|---|
| **API 金鑰** | 從 Neat Pulse 取得的 Bearer Token |
| **組織 ID** | Neat Pulse 的 Org ID |
| **更新間隔** | 每 3 / 5 / 10 分鐘 |

輸入後點擊「連接」（或按 Enter）。

### 2. 選擇地點

從清單中選擇一個地點，然後點擊「下一步：選擇房間 →」。

### 3. 選擇房間

點擊要監控的房間（可多選），然後點擊「▶ 開始監控」。

### 4. 監控畫面

每個房間將顯示獨立的圖表卡片，即時更新：
- 👥 **在室人數**
- 🌡️ **溫度**（°C）
- 💧 **濕度**（%）

---

## 疑難排解

| 問題 | 解決方法 |
|---|---|
| 顯示「❌ 代理未啟動」 | 執行 `node server.js` 後重新整理頁面 |
| 顯示「連接失敗」 | 確認 API 金鑰與組織 ID |
| 所有數值顯示 `--` | 點擊「日誌」按鈕查看詳細資訊 |
| 伺服器意外停止 | 在終端機重新執行 `node server.js` |

---

## 每次啟動步驟（摘要）

```bash
# ① 切換到資料夾
cd neat-pulse資料夾路徑

# ② 啟動伺服器
node server.js

# ③ 用 Chrome 開啟 neat-pulse-dashboard.html
```

---

*支援 Neat Pulse API v0.1.1*
