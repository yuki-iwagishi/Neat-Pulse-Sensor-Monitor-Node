# Neat Pulse 传感器监控 — 安装指南

实时显示每个房间在室人数、温度与湿度的仪表板。

**语言选择：** [English](README.md) | [日本語](README_ja.md) | [繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

---

## 所需文件

| 文件 | 说明 |
|---|---|
| `server.js` | 本地代理服务器（中转 Neat Pulse API） |
| `neat-pulse-dashboard.html` | 在 Chrome 中打开的仪表板 |

---

## Step 0 — 创建 Neat Pulse API 密钥

> ⚠️ 使用 API 需要 **付费的 Pulse 方案**。

### 创建 API 密钥步骤

1. 登录 [Neat Pulse](https://pulse.neat.no/)
2. 前往 **Settings（设置）** → **API keys**
3. 点击 **「Create API key」**
4. 输入名称，选择范围为 **「Read」**，然后点击 **「Create」**
5. 使用复制图标复制 API 密钥并妥善保存

> ⚠️ **API 密钥只显示一次，关闭窗口后将无法再查看。** 请立即复制并保存到安全位置。

### 确认组织 ID（Org ID）

- 在 Neat Pulse 的 **Settings** 页面可以看到
- 也可以在登录后的网址中找到（例：`https://pulse.neat.no/orgs/`**`abc123`**`/...`）

官方文档：https://support.neat.no/article/managing-api-accounts-on-neat-pulse-management-platform/

---

## Step 1 — 安装 Node.js

由于浏览器无法直接调用 API，需要在本地运行代理服务器，因此需要安装 **Node.js**。

### Windows

1. 打开 [https://nodejs.org/](https://nodejs.org/)
2. 点击绿色的 **「LTS」** 按钮下载安装程序（`.msi`）
3. 双击下载的文件并按照提示完成安装
4. 验证安装：打开**命令提示符**（开始菜单 → 搜索「cmd」）并输入：

```
node --version
```

显示 `v22.x.x` 之类的版本号即表示安装成功。

### Mac

**方法 A：官方安装程序（推荐）**

1. 打开 [https://nodejs.org/](https://nodejs.org/)
2. 点击绿色的 **「LTS」** 按钮下载安装程序（`.pkg`）
3. 双击下载的文件并按照提示完成安装
4. 验证安装：打开**终端**（Launchpad → 终端）并输入：

```
node --version
```

**方法 B：使用 Homebrew**

```
brew install node
```

---

## Step 2 — 放置文件

将 `server.js` 和 `neat-pulse-dashboard.html` 放在**同一个文件夹**中。

```
桌面/
  neat-pulse/
    server.js
    neat-pulse-dashboard.html
    README_zh-CN.md
```

---

## Step 3 — 启动代理服务器

### Windows

1. 在文件资源管理器中打开存放文件的文件夹
2. 点击地址栏，输入 `cmd` 并按 Enter
3. 在命令提示符中运行：

```
node server.js
```

出现以下画面即表示服务器启动成功：

```
╔══════════════════════════════════════════════╗
║   Neat Pulse 代理服务器运行中                ║
║   http://localhost:3000                      ║
╚══════════════════════════════════════════════╝
```

### Mac

1. 打开**终端**（Launchpad → 终端）
2. 切换到存放文件的文件夹（示例）：

```
cd ~/Desktop/neat-pulse
```

3. 启动服务器：

```
node server.js
```

> **注意：** 使用仪表板期间请保持终端窗口开启。  
> 若要停止，请按 `Ctrl + C`。

---

## Step 4 — 打开仪表板

用 **Chrome** 打开 `neat-pulse-dashboard.html`：

- **Windows：** 右键点击文件 → 打开方式 → Google Chrome
- **Mac：** 右键点击 → 打开方式 → Google Chrome

页面顶部显示 **「✅ 代理服务器连接正常」** 即表示准备就绪。

---

## Step 5 — 使用仪表板

### 1. API 连接设置

| 项目 | 说明 |
|---|---|
| **API 密钥** | 从 Neat Pulse 获取的 Bearer Token |
| **组织 ID** | Neat Pulse 的 Org ID |
| **更新间隔** | 每 3 / 5 / 10 分钟 |

输入后点击「连接」（或按 Enter）。

### 2. 选择地点

从列表中选择一个地点，然后点击「下一步：选择房间 →」。

### 3. 选择房间

点击要监控的房间（可多选），然后点击「▶ 开始监控」。

### 4. 监控画面

每个房间将显示独立的图表卡片，实时更新：
- 👥 **在室人数**
- 🌡️ **温度**（°C）
- 💧 **湿度**（%）

---

## 故障排除

| 问题 | 解决方法 |
|---|---|
| 显示「❌ 代理未启动」 | 运行 `node server.js` 后刷新页面 |
| 显示「连接失败」 | 确认 API 密钥与组织 ID |
| 所有数值显示 `--` | 点击「日志」按钮查看详细信息 |
| 服务器意外停止 | 在终端重新运行 `node server.js` |

---

## 每次启动步骤（摘要）

```bash
# ① 切换到文件夹
cd neat-pulse文件夹路径

# ② 启动服务器
node server.js

# ③ 用 Chrome 打开 neat-pulse-dashboard.html
```

---

*支持 Neat Pulse API v0.1.1*
