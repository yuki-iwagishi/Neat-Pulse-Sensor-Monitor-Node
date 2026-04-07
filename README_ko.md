# Neat Pulse 센서 모니터 — 설치 가이드

각 방의 재실 인원, 온도, 습도를 실시간으로 표시하는 대시보드입니다.

**언어 선택：** [English](README.md) | [日本語](README_ja.md) | [繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

---

## 필요한 파일

| 파일 | 설명 |
|---|---|
| `server.js` | 로컬 프록시 서버（Neat Pulse API 중계） |
| `neat-pulse-dashboard.html` | Chrome에서 여는 대시보드 |

---

## Step 0 — Neat Pulse API 키 생성

> ⚠️ API를 사용하려면 **유료 Pulse 플랜**이 필요합니다.

### API 키 생성 방법

1. [Neat Pulse](https://pulse.neat.no/)에 로그인
2. **Settings（설정）** → **API keys** 로 이동
3. **「Create API key」** 클릭
4. 이름을 입력하고 범위로 **「Read」** 를 선택한 후 **「Create」** 클릭
5. 복사 아이콘을 클릭하여 API 키를 복사하고 안전한 곳에 저장

> ⚠️ **API 키는 이 화면을 닫으면 다시 볼 수 없습니다.** 반드시 즉시 복사하여 안전한 곳에 보관하세요.

### 조직 ID（Org ID）확인

- Neat Pulse의 **Settings** 페이지에서 확인 가능
- 로그인 후 URL에서도 확인 가능（예：`https://pulse.neat.no/orgs/`**`abc123`**`/...`）

공식 문서：https://support.neat.no/article/managing-api-accounts-on-neat-pulse-management-platform/

---

## Step 1 — Node.js 설치

브라우저에서 API를 직접 호출할 수 없기 때문에 로컬에서 프록시 서버를 실행해야 합니다. 이를 위해 **Node.js**를 설치합니다.

### Windows

1. [https://nodejs.org/](https://nodejs.org/) 열기
2. 초록색 **「LTS」** 버튼을 클릭하여 설치 프로그램（`.msi`）다운로드
3. 다운로드한 파일을 더블클릭하여 실행하고 안내에 따라 설치 완료
4. 설치 확인：**시작 메뉴** → 「명령 프롬프트」를 열고 입력：

```
node --version
```

`v22.x.x` 와 같은 버전 번호가 표시되면 설치 성공입니다.

### Mac

**방법 A：공식 설치 프로그램（권장）**

1. [https://nodejs.org/](https://nodejs.org/) 열기
2. 초록색 **「LTS」** 버튼을 클릭하여 설치 프로그램（`.pkg`）다운로드
3. 다운로드한 파일을 더블클릭하여 실행하고 안내에 따라 설치 완료
4. 설치 확인：**터미널**（Launchpad → 터미널）을 열고 입력：

```
node --version
```

**방법 B：Homebrew 사용**

```
brew install node
```

---

## Step 2 — 파일 배치

`server.js`와 `neat-pulse-dashboard.html`을 **같은 폴더**에 넣습니다.

```
바탕화면/
  neat-pulse/
    server.js
    neat-pulse-dashboard.html
    README_ko.md
```

---

## Step 3 — 프록시 서버 시작

### Windows

1. 파일이 있는 폴더를 파일 탐색기에서 열기
2. 주소창을 클릭하고 `cmd`를 입력한 후 Enter
3. 명령 프롬프트에서 실행：

```
node server.js
```

다음과 같은 화면이 나타나면 서버 시작 성공입니다：

```
╔══════════════════════════════════════════════╗
║   Neat Pulse 프록시 서버 실행 중             ║
║   http://localhost:3000                      ║
╚══════════════════════════════════════════════╝
```

### Mac

1. **터미널**（Launchpad → 터미널）열기
2. 파일이 있는 폴더로 이동（예）：

```
cd ~/Desktop/neat-pulse
```

3. 서버 시작：

```
node server.js
```

> **주의：** 대시보드를 사용하는 동안 터미널 창을 열어 두세요.  
> 종료하려면 `Ctrl + C`를 누르세요.

---

## Step 4 — 대시보드 열기

`neat-pulse-dashboard.html`을 **Chrome**으로 열기：

- **Windows：** 파일 우클릭 → 다른 앱으로 열기 → Google Chrome
- **Mac：** 파일 우클릭 → 다음으로 열기 → Google Chrome

화면 상단에 **「✅ 프록시 서버 연결 완료」** 가 표시되면 준비 완료입니다.

---

## Step 5 — 대시보드 사용 방법

### 1. API 연결 설정

| 항목 | 내용 |
|---|---|
| **API 키** | Neat Pulse에서 발급한 Bearer Token |
| **조직 ID** | Neat Pulse의 Org ID |
| **업데이트 간격** | 3분 / 5분 / 10분 선택 |

입력 후 「연결」 클릭（또는 Enter 키）.

### 2. 위치 선택

목록에서 위치를 하나 선택하고 「다음: 방 선택 →」을 클릭.

### 3. 방 선택

모니터링할 방을 클릭하여 선택하고（여러 개 선택 가능）, 「▶ 모니터링 시작」을 클릭.

### 4. 모니터링 화면

각 방마다 개별 차트 카드가 표시되며 실시간 업데이트：
- 👥 **재실 인원**
- 🌡️ **온도**（°C）
- 💧 **습도**（%）

---

## 문제 해결

| 증상 | 해결 방법 |
|---|---|
| 「❌ 프록시 미실행」이 표시됨 | `node server.js` 실행 후 페이지 새로고침 |
| 「연결 실패」가 표시됨 | API 키와 조직 ID 확인 |
| 모든 값이 `--` 표시됨 | 「로그」 버튼을 클릭하여 상세 정보 확인 |
| 서버가 갑자기 멈춤 | 터미널에서 `node server.js`를 다시 실행 |

---

## 매번 시작 절차（요약）

```bash
# ① 폴더로 이동
cd neat-pulse폴더경로

# ② 서버 시작
node server.js

# ③ Chrome에서 neat-pulse-dashboard.html 열기
```

---

*Neat Pulse API v0.1.1 호환*
