# Neat Pulse Sensor Monitor — Setup Guide

A real-time dashboard that displays occupancy, temperature, and humidity for each room.

**Available languages:** [English](README.md) | [日本語](README_ja.md) | [繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

---

## Required Files

| File | Description |
|---|---|
| `server.js` | Local proxy server (relay to Neat Pulse API) |
| `neat-pulse-dashboard.html` | Dashboard to open in Chrome |

---

## Step 0 — Create a Neat Pulse API Key

> ⚠️ A **paid Neat Pulse plan** is required to use the API.

### How to Create an API Key

1. Log in to [Neat Pulse](https://pulse.neat.no/)
2. Go to **Settings** → **API keys**
3. Click **"Create API key"**
4. Enter a name, select **"Read"** as the scope, and click **"Create"**
5. Copy the API key using the copy icon

> ⚠️ **The API key is only shown once.** Save it in a secure place immediately.

### Find Your Organization ID (Org ID)

- Visible on the **Settings** page in Neat Pulse
- Also found in your browser URL after login (e.g., `https://pulse.neat.no/orgs/`**`abc123`**`/...`)

Reference: https://support.neat.no/article/managing-api-accounts-on-neat-pulse-management-platform/

---

## Step 1 — Install Node.js

A local proxy server is needed because browsers cannot call the API directly. **Node.js** powers that proxy.

### Windows

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Click the green **"LTS"** button to download the installer (`.msi`)
3. Double-click the downloaded file and follow the prompts
4. Verify installation — open **Command Prompt** (Start menu → "cmd") and type:

```
node --version
```

You should see something like `v22.x.x`.

### Mac

**Option A: Official installer (recommended)**

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Click the green **"LTS"** button to download the installer (`.pkg`)
3. Double-click the file and follow the prompts
4. Verify — open **Terminal** (Launchpad → Terminal) and type:

```
node --version
```

**Option B: Homebrew**

```
brew install node
```

---

## Step 2 — Place the Files

Put `server.js` and `neat-pulse-dashboard.html` in the **same folder**.

```
Desktop/
  neat-pulse/
    server.js
    neat-pulse-dashboard.html
    README.md
```

---

## Step 3 — Start the Proxy Server

### Windows

1. Open the folder in Explorer
2. Click the address bar, type `cmd`, and press Enter
3. In the Command Prompt, run:

```
node server.js
```

You should see:

```
╔══════════════════════════════════════════════╗
║   Neat Pulse Proxy Server Running            ║
║   http://localhost:3000                      ║
╚══════════════════════════════════════════════╝
```

### Mac

1. Open **Terminal** (Launchpad → Terminal)
2. Navigate to the folder:

```
cd ~/Desktop/neat-pulse
```

3. Start the server:

```
node server.js
```

> **Note:** Keep the terminal window open while using the dashboard. Press `Ctrl + C` to stop.

---

## Step 4 — Open the Dashboard

Open `neat-pulse-dashboard.html` in **Chrome**:

- **Windows:** Right-click the file → Open with → Google Chrome
- **Mac:** Right-click → Open With → Google Chrome

When you see **"✅ Proxy server connected"** at the top, you're ready.

---

## Step 5 — Using the Dashboard

### 1. API Connection

| Field | Description |
|---|---|
| **API Key** | Bearer token from Neat Pulse |
| **Org ID** | Your Neat Pulse Organization ID |
| **Update interval** | Every 3 / 5 / 10 minutes |

Click **Connect** (or press Enter).

### 2. Select Location

Choose one location from the list and click **"Next: Select Rooms →"**.

### 3. Select Rooms

Click the rooms you want to monitor (multiple selections allowed), then click **"▶ Start Monitoring"**.

### 4. Dashboard

Each room gets its own chart card showing:
- 👥 **Occupancy** (People Count)
- 🌡️ **Temperature** (°C)
- 💧 **Humidity** (%)

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "❌ Proxy not running" | Run `node server.js` and reload the page |
| "Connection failed" | Check your API key and Org ID |
| All values show `--` | Click "Log" to see debug details |
| Server stopped | Run `node server.js` again in the terminal |

---

## Quick Start (Summary)

```bash
# 1. Navigate to your folder
cd path/to/neat-pulse

# 2. Start the proxy server
node server.js

# 3. Open neat-pulse-dashboard.html in Chrome
```

---

*Compatible with Neat Pulse API v0.1.1*
