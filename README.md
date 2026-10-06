<div align="center">

# 🤖 Spring AI Studio

**A full-stack LLM comparison and benchmarking workspace built with Spring Boot, Spring AI, and React.**<br>
Broadcast a single prompt to multiple frontier and local AI models concurrently, evaluate side-by-side outputs, and measure real-time latency and first-response performance.

<br/>

[![Live Frontend](https://img.shields.io/badge/LIVE%20FRONTEND-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://spring-ai-studio-psi.vercel.app/)
&nbsp;&nbsp;
[![GitHub Repository](https://img.shields.io/badge/GITHUB-REPOSITORY-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mohammad-Asfin/Spring-AI-Studio)

<br/>

[![Java 21](https://img.shields.io/badge/Java-21-ED8B00?style=flat&logo=openjdk&logoColor=white)](https://dev.java/)
[![Spring Boot 3.4.3](https://img.shields.io/badge/Spring_Boot-3.4.3-6DB33F?style=flat&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring AI 1.0.0-M6](https://img.shields.io/badge/Spring_AI-1.0.0--M6-6DB33F?style=flat&logo=spring&logoColor=white)](https://docs.spring.io/spring-ai/reference/)
[![React 19.0.0](https://img.shields.io/badge/React-19.0.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite 6.2.0](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![OpenAI GPT-4o](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![Anthropic Claude](https://img.shields.io/badge/Anthropic-Claude-D97757?style=flat&logo=anthropic&logoColor=white)](https://www.anthropic.com/)
<br/>
[![Ollama DeepSeek](https://img.shields.io/badge/Ollama-DeepSeek-6366F1?style=flat&logo=ollama&logoColor=white)](https://ollama.com/)
[![License Open Source](https://img.shields.io/badge/License-Open%20Source-0284C7?style=flat)](https://github.com/Mohammad-Asfin/Spring-AI-Studio)

</div>

---

## 🚀 Live Demo & Source Code

- **🌐 Live Frontend Demo**: [https://spring-ai-studio-psi.vercel.app/](https://spring-ai-studio-psi.vercel.app/)
- **📦 GitHub Repository**: [https://github.com/Mohammad-Asfin/Spring-AI-Studio](https://github.com/Mohammad-Asfin/Spring-AI-Studio)

---

## 📑 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🧠 Why Spring AI?](#-why-spring-ai)
- [🏗️ System Architecture](#️-system-architecture)
- [🔄 Request / Response Flow](#-request--response-flow)
- [⚡ Parallel LLM Execution](#-parallel-llm-execution)
- [🏁 First Response Detection](#-first-response-detection)
- [📊 LLM Benchmarking & Latency Tracking](#-llm-benchmarking--latency-tracking)
- [📂 Project Structure](#-project-structure)
- [☕ Backend Architecture](#-backend-architecture)
- [🎨 Frontend Architecture](#-frontend-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🔌 API Documentation](#-api-documentation)
- [🔐 Environment Variables](#-environment-variables)
- [💻 Local Development Guide](#-local-development-guide)
- [🤖 AI Provider Setup](#-ai-provider-setup)
- [🚀 Backend Deployment Guide](#-backend-deployment-guide)
- [☁️ Vercel Frontend Deployment](#️-vercel-frontend-deployment)
- [🌐 End-to-End Production Wiring](#-end-to-end-production-wiring)
- [🔒 Security & Best Practices](#-security--best-practices)
- [🧪 Testing & Verification](#-testing--verification)
- [🐛 Troubleshooting Guide](#-troubleshooting-guide)
- [🧩 Common Use Cases & Prompts](#-common-use-cases--prompts)
- [📈 Performance Considerations](#-performance-considerations)
- [📸 Screenshots](#-screenshots)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🔗 Important Documentation Links](#-important-documentation-links)

---

## 🎯 Project Overview

### What is Spring AI Studio?
**Spring AI Studio** is a full-stack, developer-oriented LLM evaluation workspace and benchmarking suite. It allows users to enter **one single prompt** and simultaneously query multiple frontier cloud models and local self-hosted open-weight models:
1. **OpenAI** (`GPT-4o` cloud model)
2. **Anthropic** (`Claude` cloud model)
3. **Ollama / DeepSeek** (`deepseek-r1:14b` local inference engine)

### Why Does This Project Exist?
When selecting Large Language Models for applications, engineers face critical architectural and operational trade-offs:
- **Cloud vs. Local Models**: Commercial cloud APIs offer cutting-edge reasoning but introduce network latency and recurring token costs. In contrast, local models running via Ollama provide zero API fees and complete data privacy, but depend on local hardware compute.
- **Provider Fragmentation**: Each AI provider traditionally requires proprietary client SDKs, incompatible JSON formats, and disparate error schemes.
- **Subjective vs. Empirical Evaluation**: Testing prompts manually across multiple web tabs is tedious and subjective. Spring AI Studio provides an empirical side-by-side view with synchronized request dispatch and high-resolution latency measurement.

### Client-Server Flow:
```text
React 19 (Vite)
       │
       │ HTTP POST (JSON: { "prompt": "..." })
       ▼
Spring Boot 3.4 REST Controllers
       │
       ▼
Spring AI ChatClient Unified Abstraction
       │
   ┌───┴───────────────┬──────────────────────┐
   ▼                   ▼                      ▼
OpenAI API       Anthropic API          Local Ollama Daemon
(GPT-4o)            (Claude)            (deepseek-r1:14b)
   │                   │                      │
   └───────────────────┼──────────────────────┘
                       ▼
           Asynchronous Text Responses
                       │
                       ▼
   Real-Time Benchmark UI & Latency Telemetry
```

---

## ✨ Key Features

- **Side-by-Side Multi-LLM Comparison**: Broadcast a single prompt across OpenAI GPT-4o, Anthropic Claude, and local Ollama DeepSeek concurrently.
- **Unified Spring AI Backend**: Clean Spring Boot 3.4 architecture utilizing the official `spring-ai-bom` (`1.0.0-M6`) with zero provider-specific boilerplate in controllers.
- **Non-Blocking Parallel Client Dispatch**: React fires concurrent HTTP requests; slow, queuing, or failing models never block responses from faster providers.
- **Individual Model Lifecycle States**: Every model card independently transitions through `IDLE`, `LOADING` (with provider-themed pulsing animations), `SUCCESS`, and `ERROR` states.
- **Race-Condition-Safe First Response Winner**: Uses React `useRef` to reliably capture the first successful response (`⚡ First Response`) across concurrent execution streams.
- **High-Resolution Response Timing**: Browser `performance.now()` measures elapsed execution latency to two decimal places in seconds.
- **Live Aggregated Benchmark Statistics**: Instant header dashboard displaying:
  - *Models Tested* ($N=3$)
  - *Successful Responses*
  - *Failed Responses*
  - *First Response Provider*
  - *Average Response Time* (calculated across successful runs)
- **Actionable Diagnostic Error Handling**: Missing API keys or an offline Ollama daemon render helpful diagnostic badges (e.g. `Set SPRING_AI_OPENAI_API_KEY` or `Run on http://localhost:11434`) instead of crashing.
- **One-Click Markdown/Text Copying**: Quick clipboard export on all generated model cards with visual confirmation.
- **Curated Prompt Preset Library**: Pre-configured chips for instant testing of technical concepts (Dependency Injection, REST vs GraphQL, Java Streams, Spring AI).
- **Dual-Theme Engine**: Native Light and Dark modes built with CSS custom properties and persisted in `localStorage`.
- **Decoupled Deployment Architecture**: React single-page frontend ready for Vercel edge CDN and Spring Boot backend ready for JVM container platforms (Railway, Render, AWS).

---

## 🧠 Why Spring AI?

Prior to [Spring AI](https://docs.spring.io/spring-ai/reference/), integrating multiple LLM providers in Java applications required adding disparate third-party libraries, managing inconsistent API client specifications, and manually transforming request/response POJOs for each vendor.

### 1. Portable AI Abstraction Layer
Spring AI introduces a standardized abstraction over artificial intelligence models, similar to how Spring Data abstracts relational and NoSQL databases. The core abstraction is the **`ChatClient`** and **`ChatModel`** interface.

```java
// Common unified pattern across OpenAI, Anthropic, and Ollama
String response = chatClient.prompt(userPrompt)
                            .call()
                            .content();
```

### 2. Elimination of Provider Lock-In
Whether connecting to OpenAI, Anthropic, or an on-premise Ollama instance, the business logic remains uniform. Switching or adding new AI models (e.g. Mistral, Google Gemini, Amazon Bedrock) requires minimal configuration changes rather than refactoring the codebase.

### 3. Declarative Auto-Configuration
Spring AI starter dependencies (`spring-ai-openai-spring-boot-starter`, `spring-ai-anthropic-spring-boot-starter`, `spring-ai-ollama-spring-boot-starter`) automatically wire API credentials, base URLs, and HTTP client pooling via standard Spring Boot `application.properties`.

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 19 + Vite 6.2)"]
        UI["Prompt Workspace & Interactive UI"]
        Theme["Theme Engine (Light / Dark)"]
        Tracker["Latency & First-Response Telemetry Engine"]
    end

    subgraph Server["Spring Boot 3.4.3 REST Backend (Port 8080)"]
        OpenAICtrl["OpenAIController\nPOST /api/openai/ask"]
        AnthropicCtrl["AnthropicController\nPOST /api/anthropic/ask"]
        OllamaCtrl["OllamaController\nPOST /api/ollama/ask"]
        
        ChatClientLayer["Spring AI ChatClient Layer"]
    end

    subgraph External["AI Providers & Local Daemons"]
        OpenAISvc["OpenAI API\n(GPT-4o)"]
        AnthropicSvc["Anthropic API\n(Claude)"]
        OllamaDaemon["Local Ollama Daemon\n(deepseek-r1:14b on :11434)"]
    end

    UI -->|"Parallel HTTP POST { prompt }"| OpenAICtrl
    UI -->|"Parallel HTTP POST { prompt }"| AnthropicCtrl
    UI -->|"Parallel HTTP POST { prompt }"| OllamaCtrl

    OpenAICtrl --> ChatClientLayer
    AnthropicCtrl --> ChatClientLayer
    OllamaCtrl --> ChatClientLayer

    ChatClientLayer -->|"HTTPS API Call"| OpenAISvc
    ChatClientLayer -->|"HTTPS API Call"| AnthropicSvc
    ChatClientLayer -->|"HTTP localhost:11434"| OllamaDaemon

    OpenAISvc -.->|"Generated Text"| OpenAICtrl
    AnthropicSvc -.->|"Generated Text"| AnthropicCtrl
    OllamaDaemon -.->|"Generated Text"| OllamaCtrl

    OpenAICtrl -.->|"Text + Latency"| Tracker
    AnthropicCtrl -.->|"Text + Latency"| Tracker
    OllamaCtrl -.->|"Text + Latency"| Tracker
    Tracker --> UI
```

### Architectural Layers Explained:
1. **Presentation Layer (React 19 + Vite 6.2)**: Handles user interaction, theme switching, prompt validation, concurrent network orchestration, and real-time benchmark calculations.
2. **API & Routing Layer (Spring Boot Web)**: Exposes stateless REST endpoints mapped under `/api/*`, accepts JSON payloads, and handles HTTP status codes.
3. **AI Orchestration Layer (Spring AI 1.0.0-M6)**: Uses `ChatClient.create(chatModel)` to inject provider-specific drivers (`OpenAiChatModel`, `AnthropicChatModel`, `OllamaChatModel`) into unified execution pipelines.
4. **Inference Layer**:
   - **OpenAI / Anthropic**: External cloud infrastructure over secure HTTPS.
   - **Ollama**: Self-hosted local daemon running on `http://localhost:11434`.

---

## 🔄 Request / Response Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React as React 19 Frontend
    participant Boot as Spring Boot 3.4
    participant SpringAI as Spring AI ChatClient
    participant Providers as AI Providers (OpenAI, Claude, Ollama)

    User->>React: Enters prompt and clicks "Compare Models"
    Note over React: 1. Set all cards to LOADING<br/>2. Start performance.now() timers<br/>3. Reset firstModelRef = null
    
    par Parallel HTTP Requests
        React->>Boot: POST /api/openai/ask { "prompt": "..." }
        React->>Boot: POST /api/anthropic/ask { "prompt": "..." }
        React->>Boot: POST /api/ollama/ask { "prompt": "..." }
    end

    Boot->>SpringAI: chatClient.prompt(prompt).call()
    SpringAI->>Providers: Execute provider-specific HTTP call
    
    Providers-->>SpringAI: Return raw model text response
    SpringAI-->>Boot: Extract content string / ChatResponse
    
    par Independent Asynchronous Responses
        Boot-->>React: 200 OK (OpenAI Response Body)
        Note over React: 1. Calculate OpenAI elapsed time<br/>2. Check firstModelRef: Lock OpenAI as ⚡ First Response<br/>3. Transition OpenAI card to SUCCESS
    and
        Boot-->>React: 200 OK (Claude Response Body)
        Note over React: 1. Calculate Claude elapsed time<br/>2. firstModelRef already locked (skip)<br/>3. Transition Claude card to SUCCESS
    and
        Boot-->>React: 200 OK (Ollama Response Body)
        Note over React: 1. Calculate Ollama elapsed time<br/>2. Transition Ollama card to SUCCESS
    end

    Note over React: Compute aggregate benchmark metrics (Tested: 3, Success: 3, Failed: 0, Avg Time: ~1.45s)
    React->>User: Render side-by-side cards with latency metrics and gold winner badge
```

### Complete 12-Step Lifecycle:
1. **User Input**: User enters a prompt or clicks an example chip.
2. **Client Validation**: Frontend ensures prompt is non-empty.
3. **State Initialization**: Frontend sets all 3 model cards to `LOADING`, starts timers, and resets the first-responder tracker.
4. **Parallel Dispatch**: The browser fires three concurrent asynchronous `fetch()` requests to Spring Boot.
5. **Controller Processing**: Backend `@RestController` validates the JSON payload `{"prompt": "..."}`.
6. **ChatClient Call**: Spring AI `ChatClient` delegates the prompt to the respective `ChatModel`.
7. **Inference Execution**: Cloud APIs or local Ollama process token generation.
8. **Backend Return**: Spring Boot returns `200 OK` with the plain text response, or `500` on error.
9. **Latency Capture**: Frontend calculates elapsed time via `((performance.now() - startTime) / 1000).toFixed(2)`.
10. **Card Transition**: Individual model card transitions from `LOADING` to `SUCCESS` or `ERROR`.
11. **First-Response Lock**: The first model to resolve successfully locks `firstModelRef` and receives the winner badge.
12. **Benchmark Aggregation**: Header stats bar recalculates models tested, successful/failed counts, winner, and average latency.

---

## ⚡ Parallel LLM Execution

Spring AI Studio intentionally dispatches model requests **in parallel** rather than sequentially:

```text
Sequential Execution (Slow):
[ Prompt ] ──> [ OpenAI (1.8s) ] ──> [ Anthropic (2.4s) ] ──> [ Ollama (3.7s) ] ──> Total: 7.9s

Parallel Execution (Spring AI Studio):
             ┌──> [ OpenAI (1.8s) ]    ──> Resolves in 1.8s ──┐
[ Prompt ] ──┼──> [ Anthropic (2.4s) ] ──> Resolves in 2.4s ──┼──> Benchmark Completed in 3.7s
             └──> [ Ollama (3.7s) ]    ──> Resolves in 3.7s ──┘
```

### Latency Factors:
Application-level response timing depends on:
- **Network Round-Trip**: Physical distance to cloud datacenters (OpenAI, Anthropic).
- **Server Load & Queueing**: Cloud provider traffic variations.
- **Local Compute Power**: Local GPU VRAM bandwidth and quantization speed for Ollama.
- **Output Token Length**: More verbose explanations require proportionally more generation time.

---

## 🏁 First Response Detection

Determining which model responds first in a concurrent browser environment requires avoiding **React stale state closures** and **race conditions**.

### Implementation Mechanics in `App.jsx`:
```javascript
// 1. Ref provides synchronous reference across concurrent async callbacks
const firstModelRef = useRef(null);
const [firstModel, setFirstModel] = useState(null);

// 2. In parallel callback handler:
fetchModelResponse(model.id, prompt).then(result => {
  const finalStatus = result.error ? 'error' : 'success';

  // 3. Atomically lock the first SUCCESSFUL responder
  if (finalStatus === 'success' && firstModelRef.current === null) {
    firstModelRef.current = model.id;
    setFirstModel(model.id);
  }
  
  // Update individual card state
  setResponses(prev => ({ ...prev, [model.id]: { ... } }));
});
```

### Rules of First-Response Tracking:
- **Failed Requests Do Not Win**: Immediate errors (e.g. `401 Unauthorized` or connection refused) are ignored.
- **Single Winner**: Once `firstModelRef.current` is set, subsequent responses cannot overwrite it.
- **Visual Distinction**: The winning card receives the gold `.card-first` border and `⚡ First Response` badge.

---

## 📊 LLM Benchmarking & Latency Tracking

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 BENCHMARK TELEMETRY                                    │
│  Models Tested: 3  │  Successful: 3  │  Failed: 0  │  ⚡ First Response: OpenAI  │  Avg: 1.42s  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

The benchmark dashboard derives statistics dynamically from the state of all three model cards:

1. **Models Tested**: Total registered models ($N=3$).
2. **Successful Models**: Count of cards with `status === 'success'`.
3. **Failed Models**: Count of cards with `status === 'error'` (hidden if 0).
4. **First Response**: Provider name associated with `firstModel` state.
5. **Average Response Time**: Arithmetic mean of response times across **successful responses only**:
   $$\text{Avg Response Time} = \frac{\sum_{i=1}^{k} \text{Latency}_i}{k} \quad (\text{where } k = \text{Successful Models})$$
   *Note: Failed models are excluded from the average calculation so missing keys or offline daemons do not distort latency statistics.*

---

## 📂 Project Structure

```text
Spring-AI-Studio/
├── Backend/
│   ├── .mvn/wrapper/
│   │   ├── maven-wrapper.jar
│   │   └── maven-wrapper.properties     # Maven wrapper configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/springai/studio/
│   │   │   │   ├── AnthropicController.java      # REST Controller for Anthropic Claude
│   │   │   │   ├── OllamaController.java         # REST Controller for Ollama / DeepSeek
│   │   │   │   ├── OpenAIController.java         # REST Controller for OpenAI GPT-4o
│   │   │   │   └── SpringAiStudioApplication.java# Spring Boot Main Entry Point
│   │   │   └── resources/
│   │   │       └── application.properties       # Port, API key fallbacks, Ollama model config
│   │   └── test/
│   │       └── java/com/springai/studio/
│   │           └── SpringAiStudioApplicationTests.java # Context loading integration tests
│   ├── .env.example                             # Backend environment variable template
│   ├── .gitignore                               # Git ignore rules for Maven & IDE files
│   ├── mvnw                                     # Unix Maven wrapper script
│   ├── mvnw.cmd                                 # Windows Maven wrapper script
│   └── pom.xml                                  # Maven dependencies (Spring Boot 3.4.3, Spring AI)
│
├── Frontend/
│   ├── public/
│   │   ├── branding/
│   │   │   ├── favicon.png                     # Browser tab icon
│   │   │   ├── spring-ai-studio-logo.png       # High-resolution branding logo
│   │   │   └── spring-ai-studio-wordmark.png   # Full horizontal logo wordmark
│   ├── src/
│   │   ├── assets/                             # Frontend static assets
│   │   ├── App.css                             # Complete UI stylesheet, themes & responsive grid
│   │   ├── App.jsx                             # Main workspace, state orchestration & parallel fetch
│   │   ├── index.css                           # CSS reset & typography rules
│   │   └── main.jsx                            # React 19 DOM root bootstrap
│   ├── .env.example                             # Frontend environment variable template
│   ├── .gitignore                               # Git ignore rules for node_modules & dist
│   ├── eslint.config.js                         # ESLint configuration
│   ├── index.html                               # HTML5 entry page
│   ├── package.json                             # React 19, Vite 6.2 dependencies & scripts
│   ├── package-lock.json                        # Exact NPM lockfile
│   └── vite.config.js                           # Vite build configuration with React plugin
│
├── README.md                                    # Complete project documentation
└── ...
```

---

## ☕ Backend Architecture

The backend is built as a modular Spring Boot 3.4.3 application in package `com.springai.studio`.

```text
Spring Boot Application Context
│
├── OpenAIController.java
│   └── Injects: OpenAiChatModel ──> Creates: ChatClient
│       └── Endpoint: POST /api/openai/ask
│
├── AnthropicController.java
│   └── Injects: AnthropicChatModel ──> Creates: ChatClient
│       └── Endpoint: POST /api/anthropic/ask
│
└── OllamaController.java
    └── Injects: OllamaChatModel ──> Creates: ChatClient
        └── Endpoint: POST /api/ollama/ask
```

### Controller Responsibilities:
- **`OpenAIController.java`**: Maps `POST /api/openai/ask`, validates payload, calls `ChatClient`, and returns OpenAI GPT-4o output.
- **`AnthropicController.java`**: Maps `POST /api/anthropic/ask`, validates payload, calls `ChatClient`, and returns Anthropic Claude output.
- **`OllamaController.java`**: Maps `POST /api/ollama/ask`, logs model metadata, extracts text from `ChatResponse`, and returns DeepSeek output.

---

## 🎨 Frontend Architecture

The frontend is a modern SPA built with React 19 and Vite 6.2:

- **State Management**: Uses React standard hooks (`useState`, `useCallback`, `useEffect`, `useRef`) for deterministic, lightweight state transitions without heavy Redux/Zustand overhead.
- **Design Tokens & Theming**: CSS custom properties handle light and dark mode styling with smooth color transitions and persistence in `localStorage`.
- **Responsive Layout**: CSS Grid and Flexbox dynamically adapt the workspace from single-column mobile views to a 3-column side-by-side comparison matrix on desktop screens.

---

## 🛠️ Technology Stack

| Layer | Technology | Verified Version | Purpose / Documentation Link |
| :--- | :--- | :--- | :--- |
| **Language** | Java | `21` (LTS) | [Official Java Documentation](https://dev.java/) |
| **Backend Framework** | Spring Boot | `3.4.3` | [Spring Boot Documentation](https://spring.io/projects/spring-boot) |
| **AI Framework** | Spring AI | `1.0.0-M6` | [Spring AI Reference](https://docs.spring.io/spring-ai/reference/) |
| **Build Tool** | Apache Maven | `3.9+` | [Maven Documentation](https://maven.apache.org/) |
| **Frontend Framework** | React | `19.0.0` | [React Documentation](https://react.dev/) |
| **Frontend Bundler** | Vite | `6.2.0` | [Vite Documentation](https://vite.dev/) |
| **Styling** | Vanilla CSS | Modern CSS3 | Custom design system & CSS Grid |
| **Cloud AI Model** | OpenAI GPT-4o | Cloud API | [OpenAI Documentation](https://platform.openai.com/docs/) |
| **Cloud AI Model** | Anthropic Claude | Cloud API | [Anthropic Documentation](https://docs.anthropic.com/) |
| **Local AI Engine** | Ollama | `deepseek-r1:14b` | [Ollama Documentation](https://ollama.com/) |
| **Frontend Hosting** | Vercel | Cloud Edge | [Vercel Documentation](https://vercel.com/) |

---

## 🔌 API Documentation

All backend endpoints are stateless HTTP POST handlers accepting JSON payloads and returning plain text strings.

### Endpoints Overview

| HTTP Method | Endpoint | Controller | Request Body | Response Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/openai/ask` | `OpenAIController` | `{"prompt": "<string>"}` | Plain text string |
| `POST` | `/api/anthropic/ask` | `AnthropicController` | `{"prompt": "<string>"}` | Plain text string |
| `POST` | `/api/ollama/ask` | `OllamaController` | `{"prompt": "<string>"}` | Plain text string |

---

### Endpoint Details

#### 1. OpenAI Endpoint
- **URL**: `POST /api/openai/ask`
- **Request Headers**: `Content-Type: application/json`
- **Request Payload**:
  ```json
  {
    "prompt": "Explain dependency injection in Spring Boot"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  Dependency injection in Spring Boot is a pattern where the Spring IoC container provides required dependencies to classes at runtime, decoupling component creation from business logic.
  ```
- **Error Responses**:
  - `400 Bad Request`: `"Prompt cannot be empty"`
  - `500 Internal Server Error`: `"Error from OpenAI: 401 Unauthorized / Invalid API Key"`

#### 2. Anthropic Endpoint
- **URL**: `POST /api/anthropic/ask`
- **Request Payload**:
  ```json
  {
    "prompt": "Compare REST vs GraphQL"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  REST uses fixed endpoints and standard HTTP methods, whereas GraphQL allows clients to request exact fields from a single endpoint.
  ```

#### 3. Ollama Endpoint
- **URL**: `POST /api/ollama/ask`
- **Request Payload**:
  ```json
  {
    "prompt": "Write a Java Stream example"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  List<Integer> evens = numbers.stream().filter(n -> n % 2 == 0).toList();
  ```
- **Error Responses**:
  - `500 Internal Server Error`: `"Error from Ollama: Connection refused"`

---

## 🔐 Environment Variables

### Backend Environment Variables (`Backend/.env.example`)

| Variable Name | Default / Fallback | Description | Required? |
| :--- | :--- | :--- | :--- |
| `SPRING_AI_OPENAI_API_KEY` | `dummy-openai-key` | OpenAI API Secret Key (`sk-...`). | Optional (for OpenAI) |
| `SPRING_AI_ANTHROPIC_API_KEY` | `dummy-anthropic-key` | Anthropic API Secret Key (`sk-ant-...`). | Optional (for Anthropic) |
| `SPRING_AI_OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama daemon base URL. | Optional (for Local LLM) |
| `SPRING_AI_OLLAMA_MODEL` | `deepseek-r1:14b` | Tag name of the installed Ollama model. | Optional (for Local LLM) |
| `server.port` | `8080` | Spring Boot HTTP listening port. | Built-in |

### Frontend Environment Variables (`Frontend/.env.example`)

| Variable Name | Local Development Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | `https://api.yourdomain.com` | Base URL pointing to the Spring Boot REST API. |

> [!CAUTION]
> **Security Rules:**
> 1. Never commit `.env` files containing live API keys.
> 2. Never put OpenAI/Anthropic secret keys into the frontend `.env`.
> 3. In production, update `VITE_API_BASE_URL` to point to your deployed backend URL.

---

## 💻 Local Development Guide

Follow these exact steps to run the application locally on Windows or Unix:

### Step 1: Clone the Repository
```bash
git clone https://github.com/Mohammad-Asfin/Spring-AI-Studio.git
cd Spring-AI-Studio
```

### Step 2: Configure Environment Variables
```powershell
# Windows (PowerShell)
$env:SPRING_AI_OPENAI_API_KEY="sk-your-openai-api-key"
$env:SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"

# Linux / macOS (Bash)
export SPRING_AI_OPENAI_API_KEY="sk-your-openai-api-key"
export SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"
```

### Step 3: Run the Spring Boot Backend (Terminal 1)
```powershell
# Navigate to Backend
cd "d:\Java Full Stack\Spring AI\Backend"

# Build and start Spring Boot
mvn spring-boot:run
```
*Backend initializes on `http://localhost:8080`.*

### Step 4: Run the React Frontend (Terminal 2)
```powershell
# Navigate to Frontend
cd "d:\Java Full Stack\Spring AI\Frontend"

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend initializes on `http://localhost:5173`. Open `http://localhost:5173` in your browser.*

---

## 🤖 AI Provider Setup

### 1. OpenAI Setup
1. Obtain an API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2. Set the environment variable `SPRING_AI_OPENAI_API_KEY`.
3. If omitted, the backend falls back to `dummy-openai-key` to allow Spring context loading; the UI card will display diagnostic guidance.

### 2. Anthropic Claude Setup
1. Obtain an API key from [console.anthropic.com](https://console.anthropic.com/).
2. Set the environment variable `SPRING_AI_ANTHROPIC_API_KEY`.
3. Missing keys display an actionable card error.

### 3. Ollama / DeepSeek Local Setup
1. Download and install Ollama from [ollama.com](https://ollama.com/).
2. Pull the configured model in your terminal:
   ```bash
   ollama pull deepseek-r1:14b
   ```
3. Start the Ollama daemon:
   ```bash
   ollama serve
   ```
4. Verify accessibility at `http://localhost:11434`.

---

## 🚀 Backend Deployment Guide

> [!IMPORTANT]
> **Current Repository Status**:
> - **Frontend**: Deployed live on Vercel (`https://spring-ai-studio-psi.vercel.app/`).
> - **Backend**: Backend deployment is not currently configured in this repository.
>
> To run the backend in a production cloud environment, deploy Spring Boot to a Java 21 runtime platform (such as Railway, Render, AWS, or Docker).

### Recommended Option A: Deploying on Railway (GitHub-Based)
1. Create an account on [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select `Mohammad-Asfin/Spring-AI-Studio`.
4. In Project Settings:
   - **Root Directory**: Set to `Backend`.
   - **Build Command**: `mvn clean package -DskipTests`.
   - **Start Command**: `java -jar target/*.jar`.
5. Under **Variables**, add `SPRING_AI_OPENAI_API_KEY` and `SPRING_AI_ANTHROPIC_API_KEY`.
6. Click **Generate Public Domain** to obtain your backend URL (e.g. `https://spring-ai-backend.up.railway.app`).

---

### Recommended Option B: Container Deployment via Docker

*(Recommended Future Improvement: Add a `Dockerfile` to the `Backend/` directory)*

```dockerfile
# Stage 1: Build JAR using Maven and JDK 21
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal JRE Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## ☁️ Vercel Frontend Deployment

The React single-page application is deployed live at:
**`https://spring-ai-studio-psi.vercel.app/`**

### Steps to Deploy Frontend to Vercel:
1. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your `Spring-AI-Studio` GitHub repository.
3. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: The public URL of your deployed backend (e.g. `https://your-backend-domain.com`).
5. Click **Deploy**.

---

## 🌐 End-to-End Production Wiring

To connect the deployed frontend with the deployed backend:

1. **Deploy Backend**: Deploy Spring Boot on Railway or Render and obtain the public HTTPS URL.
2. **Update Frontend Environment Variable**: In Vercel Project Settings → Environment Variables, set:
   ```env
   VITE_API_BASE_URL=https://your-deployed-backend-url.com
   ```
3. **Trigger Vercel Redeploy**: Redeploy the frontend so Vite compiles the updated API base URL into the bundle.
4. **Configure CORS**: Ensure the backend allows requests from your Vercel domain.

---

## 🔒 Security & Best Practices

| Security Aspect | Current Codebase Implementation | Recommended Production Hardening |
| :--- | :--- | :--- |
| **API Key Isolation** | ✅ Keys stored in backend environment variables only. Zero keys in client bundles. | Use cloud secret managers (AWS Secrets Manager, Railway Secrets). |
| **CORS Policy** | ⚠️ `@CrossOrigin("*")` on all controllers for seamless local multi-port development. | Restrict origins: `@CrossOrigin(origins = "https://spring-ai-studio-psi.vercel.app")`. |
| **Error Masking** | Returns `e.getMessage()` for debugging. | Sanitize internal stack traces before returning HTTP 500 to clients. |
| **Transport Security** | HTTP on `localhost`. | Enforce HTTPS via TLS termination at the edge/load balancer. |

---

## 🧪 Testing & Verification

### 1. Build Verification

#### Frontend Build
```bash
cd Frontend
npm run build
```
*Expected: `✓ built in ~1.0s` producing `dist/` bundle.*

#### Backend Build & Unit Tests
```bash
cd Backend
mvn test
```
*Expected: `BUILD SUCCESS` with context loading verified.*

### 2. Live API Provider Verification

| Level | Scope | Status in CI / Clean Environment |
| :--- | :--- | :--- |
| **Build Tested** | Maven compile, test context load, Vite bundle compilation. | ✅ Verified (100% automated passing) |
| **Live Provider Tested** | Live OpenAI, Anthropic, or Ollama round-trips. | 🔑 Requires valid live API keys & local daemon |

---

## 🐛 Troubleshooting Guide

| Symptom | Probable Cause | Diagnostic & Solution |
| :--- | :--- | :--- |
| **Backend fails on startup (`Port 8080 already in use`)** | Another process is occupying port 8080. | Change `server.port=8081` in `application.properties` and update `VITE_API_BASE_URL=http://localhost:8081`. |
| **OpenAI card displays `Failed` / `401 Unauthorized`** | Missing or expired OpenAI API key. | Set `SPRING_AI_OPENAI_API_KEY="sk-..."` in environment before starting the backend. |
| **Anthropic card displays `Failed`** | Missing or invalid Anthropic API key. | Set `SPRING_AI_ANTHROPIC_API_KEY="sk-ant-..."` in environment. |
| **Ollama card displays `Requires Ollama`** | Ollama daemon is not running on port 11434. | Open terminal, run `ollama serve`, and verify `http://localhost:11434`. |
| **Ollama returns `model not found`** | The `deepseek-r1:14b` model has not been downloaded. | Run `ollama pull deepseek-r1:14b` in terminal. |
| **Frontend displays `Failed to fetch` / Network Error** | Backend is offline or blocked by CORS. | Ensure backend is active on `8080` and check browser DevTools Network tab. |
| **Windows Maven Wrapper error (`'C:\Users\MD' is not recognized`)** | Space in Windows user folder path. | Run `mvn spring-boot:run` directly instead of `./mvnw`. |

---

## 🧩 Common Use Cases & Prompts

Try these prompts to benchmark reasoning styles across models:

1. **System Architecture**:
   > *"Explain the difference between Dependency Injection and Inversion of Control in Spring Boot with a concrete code snippet."*
2. **API Design Trade-offs**:
   > *"Compare REST APIs with GraphQL across performance, over-fetching, caching, and client flexibility."*
3. **Modern Java Syntax**:
   > *"Write a Java 21 Stream pipeline to group a list of transactions by currency and calculate the total sum for each."*
4. **Spring AI Internals**:
   > *"How does the Spring AI ChatClient abstraction simplify switching between OpenAI and Anthropic compared to raw HTTP clients?"*

---

## 📈 Performance Considerations

Application-level response timing depends on:
1. **Model Architecture**: Frontier models (`GPT-4o`) balance reasoning depth and speed; dense reasoning models (`deepseek-r1`) perform step-by-step chain-of-thought token generation.
2. **Local Hardware Constraints**: Local Ollama token generation speed depends directly on available GPU VRAM bandwidth.
3. **Geographic Network Latency**: Cloud API response times include TLS handshakes and physical network hops.

---

## 📸 Screenshots

<div align="center">
  <img src="Frontend/public/branding/spring-ai-studio-wordmark.png" alt="Spring AI Studio Interface" width="600" />
</div>

> *Tip: To add additional screenshots of the model comparison matrix or dark mode, save images to `Frontend/public/branding/` and embed them here.*

---

## 🗺️ Future Roadmap

- [ ] **Streaming Token Generation**: Implement Server-Sent Events (SSE) / WebSockets using Spring AI reactive streaming.
- [ ] **Dynamic Model Selector**: UI dropdown to select alternate models (e.g. `gpt-4o-mini`, `claude-3-5-haiku`, `llama3.3`).
- [ ] **Token Count & Cost Tracking**: Live estimation of input/output token usage and approximate API cost per prompt.
- [ ] **Health & Actuator Endpoint**: Add `spring-boot-starter-actuator` with `/actuator/health` for cloud deployment monitoring.
- [ ] **Benchmark Export**: Export comparison sessions and timing metrics to JSON, CSV, or Markdown summaries.
- [ ] **Containerization**: Commit official multi-stage `Dockerfile` and `docker-compose.yml`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/streaming-support
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add token streaming via SSE"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/streaming-support
   ```
5. **Open a Pull Request** describing your additions.

---

## 📄 License

This project is open-source. Feel free to use, modify, and distribute for educational, research, and commercial purposes with attribution.

---

## 🔗 Important Documentation Links

- **Live Frontend Application**: [https://spring-ai-studio-psi.vercel.app/](https://spring-ai-studio-psi.vercel.app/)
- **GitHub Repository**: [https://github.com/Mohammad-Asfin/Spring-AI-Studio](https://github.com/Mohammad-Asfin/Spring-AI-Studio)
- **Spring AI Official Documentation**: [https://docs.spring.io/spring-ai/reference/](https://docs.spring.io/spring-ai/reference/)
- **Spring Boot 3.4 Documentation**: [https://docs.spring.io/spring-boot/index.html](https://docs.spring.io/spring-boot/index.html)
- **React 19 Documentation**: [https://react.dev/](https://react.dev/)
- **Vite Documentation**: [https://vite.dev/](https://vite.dev/)
- **Ollama Documentation**: [https://ollama.com/](https://ollama.com/)
- **OpenAI Platform Documentation**: [https://platform.openai.com/docs/](https://platform.openai.com/docs/)
- **Anthropic Documentation**: [https://docs.anthropic.com/](https://docs.anthropic.com/)
- **Railway Spring Boot Deployment Guide**: [https://docs.railway.com/guides/spring-boot](https://docs.railway.com/guides/spring-boot)
- **Render Docker Deployment Guide**: [https://render.com/docs/docker](https://render.com/docs/docker)

---

<p align="center">
  <strong>Spring AI Studio</strong> • Developed by <a href="https://github.com/Mohammad-Asfin">Mohammad Asfin</a>
</p>
