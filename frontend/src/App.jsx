import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

const EXAMPLES = [
  "Explain Spring Boot dependency injection",
  "Compare REST vs GraphQL",
  "Write a Java Stream API example",
  "Explain Spring AI ChatClient"
];

const INITIAL_RESPONSES = {
  openai:    { status: 'idle', data: null, error: null, reqMsg: null, time: 0 },
  anthropic: { status: 'idle', data: null, error: null, reqMsg: null, time: 0 },
  ollama:    { status: 'idle', data: null, error: null, reqMsg: null, time: 0 }
};

function App() {
  const [prompt, setPrompt]   = useState('');
  const [theme, setTheme]     = useState(() => localStorage.getItem('theme') || 'light');
  const [responses, setResponses] = useState(INITIAL_RESPONSES);
  const [firstModel, setFirstModel] = useState(null); // id of first successful model

  // Ref so async callbacks never have a stale reference —
  // guarantees first-response is set exactly once even with concurrent state updates
  const firstModelRef = useRef(null);

  const models = [
    {
      id: 'openai',
      provider: 'OpenAI',
      name: 'GPT-4o',
      desc: 'Advanced reasoning and creativity',
      type: 'Cloud',
      color: '#10a37f',
      bgLight: '#ecfdf5',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
          <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
        </svg>
      )
    },
    {
      id: 'anthropic',
      provider: 'Anthropic',
      name: 'Claude',
      desc: 'Thoughtful, safe and helpful',
      type: 'Cloud',
      color: '#d97757',
      bgLight: '#fff7ed',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M4 4h16v16H4z"></path>
          <path d="M9 9h6v6H9z"></path>
        </svg>
      )
    },
    {
      id: 'ollama',
      provider: 'Ollama',
      name: 'DeepSeek',
      desc: 'Run locally with Ollama',
      type: 'Local',
      color: '#6366f1',
      bgLight: '#eef2ff',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c2.76 0 5 2.24 5 5v2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3V7c0-2.76 2.24-5 5-5z"></path>
          <circle cx="9" cy="14" r="1"></circle>
          <circle cx="15" cy="14" r="1"></circle>
          <path d="M10 18h4"></path>
        </svg>
      )
    }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // ─── Fetch one model's response ──────────────────────────────────────────────
  const fetchModelResponse = async (modelId, promptText) => {
    const startTime = performance.now();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${baseUrl}/api/${modelId}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });

      const data = await res.text();
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      if (!res.ok) throw new Error(data || `Error ${res.status}`);

      return { data, time: elapsed, error: null, reqMsg: null };
    } catch (error) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      let errMsg = 'Provider unavailable.';
      let reqMsg = 'API credentials are not configured.';

      if (error.message.includes('401') || error.message.includes('Incorrect API key')) {
        reqMsg = `Set SPRING_AI_${modelId.toUpperCase()}_API_KEY`;
      } else if (modelId === 'ollama') {
        errMsg = 'Requires Ollama';
        reqMsg = 'Run on http://localhost:11434';
      }

      return { data: null, time: elapsed, error: errMsg, reqMsg };
    }
  };

  // ─── Submit — fire all three requests in parallel ─────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) return;

    // Reset first-model tracker
    firstModelRef.current = null;
    setFirstModel(null);

    // Immediately set all cards to LOADING
    setResponses({
      openai:    { status: 'loading', data: null, error: null, reqMsg: null, time: 0 },
      anthropic: { status: 'loading', data: null, error: null, reqMsg: null, time: 0 },
      ollama:    { status: 'loading', data: null, error: null, reqMsg: null, time: 0 }
    });

    // Fire all three — no await before any of them, so they start truly in parallel
    models.forEach(model => {
      fetchModelResponse(model.id, prompt).then(result => {
        const finalStatus = result.error ? 'error' : 'success';

        // Record first SUCCESSFUL response — ref ensures no race condition
        if (finalStatus === 'success' && firstModelRef.current === null) {
          firstModelRef.current = model.id;
          setFirstModel(model.id);
        }

        // Update this card independently (other cards still loading)
        setResponses(prev => ({
          ...prev,
          [model.id]: {
            status: finalStatus,
            data: result.data,
            error: result.error,
            reqMsg: result.reqMsg,
            time: result.time
          }
        }));
      });
    });
  }, [prompt]);

  // ─── Clear / Reset ────────────────────────────────────────────────────────────
  const handleClear = () => {
    setPrompt('');
    setResponses(INITIAL_RESPONSES);
    setFirstModel(null);
    firstModelRef.current = null;
  };

  // ─── Benchmark Statistics (derived, never stale) ──────────────────────────────
  const allResults   = Object.values(responses);
  const hasAnyResult = allResults.some(r => r.status !== 'idle' && r.status !== 'loading');
  const successList  = allResults.filter(r => r.status === 'success');
  const errorList    = allResults.filter(r => r.status === 'error');
  const successCount = successList.length;
  const avgTime = successCount > 0
    ? (successList.reduce((acc, r) => acc + parseFloat(r.time), 0) / successCount).toFixed(2)
    : null;
  const firstModelLabel = firstModel
    ? models.find(m => m.id === firstModel)?.provider
    : null;

  const isRunning = allResults.some(r => r.status === 'loading');

  return (
    <div className="app-container">

      {/* ── NAVBAR ── */}
      <header className="navbar">
        <div className="nav-container">
          <div className="brand">
            <img src="/branding/spring-ai-studio-logo.png" className="brand-logo" alt="Spring AI Studio Logo" />
            <div className="brand-wordmark">
              <span className="brand-text-dark">Spring AI</span> <span className="brand-text-accent">Studio</span>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#" className="active">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              Home
            </a>
            <a href="#compare">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Compare
            </a>
            <a href="https://spring.io/projects/spring-ai" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Docs
            </a>
            <a href="https://github.com/Mohammad-Asfin/Spring-AI-Studio" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              About
            </a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">

        {/* ── HERO ── */}
        <section className="hero">
          <img src="/branding/spring-ai-studio-logo.png" className="hero-logo" alt="Spring AI Studio Logo" />
          <h1 className="hero-title">
            <span className="text-dark">Spring AI</span> <span className="text-accent">Studio</span>
          </h1>
          <p className="hero-subtitle">Compare and evaluate multiple LLM models side-by-side</p>
        </section>

        {/* ── PROMPT WORKSPACE ── */}
        <section className="prompt-section" id="compare">
          <div className="prompt-box">
            <textarea
              className="prompt-textarea"
              placeholder="Type your prompt here to challenge the AI models..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={isRunning}
            />

            <div className="prompt-footer">
              <div className="prompt-examples">
                <span className="examples-title">Try an example:</span>
                <div className="examples-list">
                  {EXAMPLES.map((ex, i) => (
                    <button key={i} className="example-chip" onClick={() => setPrompt(ex)} disabled={isRunning}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div className="prompt-actions">
                {hasAnyResult && (
                  <button className="clear-btn" onClick={handleClear} disabled={isRunning} title="Clear and reset">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.38"></path></svg>
                    Clear
                  </button>
                )}
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isRunning}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  {isRunning ? 'Running...' : 'Compare Models'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BENCHMARK STATS BAR ── */}
        {hasAnyResult && (
          <section className="benchmark-bar">
            <div className="benchmark-stat">
              <span className="bm-label">Models Tested</span>
              <span className="bm-value">{models.length}</span>
            </div>
            <div className="benchmark-divider" />
            <div className="benchmark-stat">
              <span className="bm-label">Successful</span>
              <span className="bm-value bm-success">{successCount}</span>
            </div>
            {errorList.length > 0 && (
              <>
                <div className="benchmark-divider" />
                <div className="benchmark-stat">
                  <span className="bm-label">Failed</span>
                  <span className="bm-value bm-error">{errorList.length}</span>
                </div>
              </>
            )}
            {firstModelLabel && (
              <>
                <div className="benchmark-divider" />
                <div className="benchmark-stat">
                  <span className="bm-label">⚡ First Response</span>
                  <span className="bm-value bm-first">{firstModelLabel}</span>
                </div>
              </>
            )}
            {avgTime && (
              <>
                <div className="benchmark-divider" />
                <div className="benchmark-stat">
                  <span className="bm-label">Avg Response</span>
                  <span className="bm-value">{avgTime}s</span>
                </div>
              </>
            )}
          </section>
        )}

        {/* ── MODEL CARDS ── */}
        <section className="cards-section">
          {models.map(model => {
            const res = responses[model.id];
            const isIdle = res.status === 'idle';
            const isFirst = firstModel === model.id;

            return (
              <div
                key={model.id}
                className={`model-card${isFirst ? ' card-first' : ''}`}
                style={{ '--card-color': model.color }}
              >
                {/* Card Header */}
                <div className="card-header">
                  <div className="card-icon" style={{ backgroundColor: theme === 'light' ? model.bgLight : '#1e293b', color: model.color }}>
                    {model.icon}
                  </div>
                  <div className="card-tag" style={{ color: model.color, backgroundColor: theme === 'light' ? model.bgLight : '#1e293b' }}>
                    {model.type}
                  </div>
                </div>

                {/* Card Title */}
                <div className="card-title-area">
                  <h3>{model.provider} ({model.name})</h3>
                  <p>{model.desc}</p>
                </div>

                {/* ⚡ First Response Badge */}
                {isFirst && (
                  <div className="first-badge">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    First Response
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body">

                  {/* IDLE — show prerequisite hint */}
                  {isIdle && (
                    <div className="error-box" style={{ backgroundColor: theme === 'light' ? model.bgLight : '#1e293b' }}>
                      <div className="error-title">
                        <span className="dot" style={{ backgroundColor: model.color }}></span>
                        {model.type === 'Local' ? 'Requires Ollama' : 'Requires API key'}
                      </div>
                      <div className="error-desc">
                        {model.type === 'Local' ? 'Run on http://localhost:11434' : `Set SPRING_AI_${model.provider.toUpperCase()}_API_KEY`}
                      </div>
                    </div>
                  )}

                  {/* LOADING */}
                  {res.status === 'loading' && (
                    <div className="loading-state">
                      <div className="spinner-dots">
                        <span style={{ backgroundColor: model.color }}></span>
                        <span style={{ backgroundColor: model.color }}></span>
                        <span style={{ backgroundColor: model.color }}></span>
                      </div>
                      <span>Generating...</span>
                    </div>
                  )}

                  {/* SUCCESS */}
                  {res.status === 'success' && (
                    <>
                      <div className="status-line status-success">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Completed
                      </div>
                      <div className="response-content">{res.data}</div>
                    </>
                  )}

                  {/* ERROR */}
                  {res.status === 'error' && (
                    <>
                      <div className="status-line status-error">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        Failed
                      </div>
                      <div className="error-box error-box-active">
                        <div className="error-title">
                          <span className="dot" style={{ backgroundColor: '#ef4444' }}></span>
                          {res.error}
                        </div>
                        <div className="error-desc">{res.reqMsg}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Footer — timing + copy */}
                {(res.status === 'success' || res.status === 'error') && (
                  <div className="card-footer">
                    <span className="timing">{res.time}s</span>
                    {res.status === 'success' && (
                      <button className="copy-btn" onClick={() => navigator.clipboard.writeText(res.data)}>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>Spring AI Studio</span>
            <span className="dot-sep">•</span>
            <span>Built with Spring Boot &amp; React</span>
          </div>
          <div className="footer-right">
            <a href="https://github.com/Mohammad-Asfin/Spring-AI-Studio" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Open Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
