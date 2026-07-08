import { useState, useEffect } from "react";
import FORMS_DATA from "./formsData";

function getNow() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");
  return `${dd}-${mm}-${yyyy} ${hh}:${minutes} ${ampm} IST`;
}

function buildEmail(formNumber, name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) parts.push("User");
  return `${formNumber}_${parts.join("_")}_123@rediffmail.com`;
}

function buildEvcCode(city, datetime) {
  return `My EVC code is FS2025 and I have submitted my feedback on (${datetime}) at ${city || "N/A"}`;
}

function buildHashtag(hobbies, extraHobby) {
  const first = (hobbies || "").trim().split(",")[0].trim();
  const tag1 = first ? `#${first.replace(/\s+/g, "").toLowerCase()}` : "";
  const tag2 = extraHobby ? `#${extraHobby.replace(/\s+/g, "").toLowerCase()}` : "";
  return [tag1, tag2].filter(Boolean).join(" ");
}

function buildHobbies(dataHobby, extraHobby) {
  if (extraHobby && dataHobby) return `${dataHobby}, ${extraHobby}`;
  return dataHobby || extraHobby || "";
}

const MARITAL_STATUS_MAP = {
  unmarried: "Single",
  single: "Single",
  married: "Married",
  divorced: "Divorced",
  widowed: "Widowed",
  widow: "Widowed",
  widower: "Widowed",
  separated: "Divorced",
};

function mapMaritalStatus(raw) {
  if (!raw) return "";
  const key = raw.trim().toLowerCase();
  return MARITAL_STATUS_MAP[key] || raw;
}

const HOBBY_LIST = [
  "Photography", "Painting", "Drawing", "Sketching", "Cooking", "Baking",
  "Gardening", "Reading", "Writing", "Blogging", "Travelling", "Hiking",
  "Cycling", "Running", "Swimming", "Yoga", "Meditation", "Dancing",
  "Singing", "Playing Guitar", "Playing Piano", "Drumming", "Chess",
  "Badminton", "Cricket", "Football", "Basketball", "Tennis", "Volleyball",
  "Table Tennis", "Skating", "Skateboarding", "Rock Climbing", "Fishing",
  "Bird Watching", "Stargazing", "Astronomy", "Knitting", "Crocheting",
  "Sewing", "Pottery", "Woodworking", "Calligraphy", "Origami", "Scrapbooking",
  "Video Gaming", "Streaming", "Coding", "3D Printing", "Digital Art",
  "Film Making", "Acting", "Stand-up Comedy", "Podcasting", "Collecting Coins",
  "Collecting Stamps", "Archery", "Horse Riding", "Surfing", "Diving",
];

function randomHobby() {
  return HOBBY_LIST[Math.floor(Math.random() * HOBBY_LIST.length)];
}

function generateScript(data, email, evcCode, extraHobby, soundEnabled = true) {
  const combinedHobbies = buildHobbies(data.hobbies, extraHobby);
  const hashtag = buildHashtag(data.hobbies, extraHobby);
  const maritalStatus = mapMaritalStatus(data.maritalStatus);
  const esc = (v) => String(v ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");

  return `// ============================================================
// E-INSTA FEEDBACK - AUTO FILL SCRIPT (Form #${esc(data.formNumber)})
// ============================================================

const DATA = {
  // Step 1
  name: '${esc(data.name)}',
  centerCode: '${esc(data.centerCode)}',
  gender: '${esc(data.gender)}',
  einstagramBenifits: '${esc(data.einstagramBenifits)}',
  feedbackId: '${esc(data.feedbackId)}',

  // Step 2
  howImportantInstagram: '${esc(data.howImportantInstagram)}',
  city: '${esc(data.city)}',
  age: '${esc(data.age)}',
  hobbies: '${esc(combinedHobbies)}',
  primaryJob: '${esc(data.primaryJob)}',

  // Step 3
  maritalStatus: '${esc(maritalStatus)}',
  email: '${esc(email)}',
  instagramMarketingTasks: '${esc(data.instagramMarketingTasks)}',
  education: '${esc(data.education)}',
  state: '${esc(data.state)}',

  // Step 4
  howOftenUseInstagram: '${esc(data.howOftenUseInstagram)}',
  createHashtag: '${esc(hashtag)}',
  howDidYouHearAboutInstagram: '${esc(data.howDidYouHearAboutInstagram)}',
  evcCode: '${esc(evcCode)}',
};

async function fillReactInput(selector, value, delay = 50) {
  const el = document.querySelector(selector);
  if (!el) return console.error('❌ Not found:', selector);
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  el.focus();
  nativeSetter.call(el, '');
  el.dispatchEvent(new Event('input', { bubbles: true }));
  for (const char of String(value)) {
    const current = el.value;
    nativeSetter.call(el, current + char);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, delay));
  }
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.blur();
  console.log(\`✅ \${selector} →\`, value);
}

function fillReactSelect(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return console.error('❌ Not found:', selector);
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
  nativeSetter.call(el, value);
  el.dispatchEvent(new Event('change', { bubbles: true }));
  console.log(\`✅ \${selector} →\`, value);
}

function getLiveNow() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, '0');
  return \`\${dd}-\${mm}-\${yyyy} \${hh}:\${minutes} \${ampm} IST\`;
}

${soundEnabled ? `// Plays a short beep. Pass true for the final "all done" double-beep.
function playBeep(done = false) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const tones = done ? [880, 1100] : [660];
    let time = ctx.currentTime;
    tones.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
      osc.start(time);
      osc.stop(time + 0.18);
      time += 0.22;
    });
  } catch (e) { /* audio not available */ }
}` : `function playBeep() {} // sound disabled`}

function getStepHeading() {
  const all = document.querySelectorAll('h2');
  return all[all.length - 1]?.textContent?.trim() || '';
}

// Waits for the heading to change to the target step.
// No timeout — user can take as long as needed to review before clicking Next.
function waitForNextThenStep(stepNumber) {
  return new Promise((resolve) => {
    console.log(\`👀 Waiting for you to click Next → Step \${stepNumber}...\`);
    const interval = setInterval(() => {
      if (getStepHeading().includes(\`Step \${stepNumber}\`)) {
        clearInterval(interval);
        setTimeout(() => {
          console.log(\`📋 Step \${stepNumber} loaded!\`);
          resolve();
        }, 400);
      }
    }, 200);
  });
}

async function fillStep1() {
  console.log('\\n--- STEP 1 ---');
  await fillReactInput('#name', DATA.name);
  await fillReactInput('#centerCode', DATA.centerCode);
  fillReactSelect('#gender', DATA.gender);
  await fillReactInput('#einstagramBenifits', DATA.einstagramBenifits);
  await fillReactInput('#feedbackId', DATA.feedbackId);
  playBeep();
  console.log('\\n✅ Step 1 filled — review then click Next.');
}

async function fillStep2() {
  console.log('\\n--- STEP 2 ---');
  await fillReactInput('#howImportantInstagram', DATA.howImportantInstagram);
  await fillReactInput('#city', DATA.city);
  await fillReactInput('#age', DATA.age);
  await fillReactInput('#hobbies', DATA.hobbies);
  await fillReactInput('#primaryJob', DATA.primaryJob);
  playBeep();
  console.log('\\n✅ Step 2 filled — review then click Next.');
}

async function fillStep3() {
  console.log('\\n--- STEP 3 ---');
  fillReactSelect('#maritalStatus', DATA.maritalStatus);
  await fillReactInput('#email', DATA.email);
  await fillReactInput('#instagramMarketingTasks', DATA.instagramMarketingTasks);
  await fillReactInput('#education', DATA.education);
  await fillReactInput('#state', DATA.state);
  playBeep();
  console.log('\\n✅ Step 3 filled — review then click Next.');
}

async function fillStep4() {
  console.log('\\n--- STEP 4 ---');
  await fillReactInput('#howOftenUseInstagram', DATA.howOftenUseInstagram);
  await fillReactInput('#createHashtag', DATA.createHashtag);
  await fillReactInput('#howDidYouHearAboutInstagram', DATA.howDidYouHearAboutInstagram);
  const liveEvcCode = \`My EVC code is FS2025 and I have submitted my feedback on (\${getLiveNow()}) at \${DATA.city || 'N/A'}\`;
  await fillReactInput('#evcCode', liveEvcCode);
  const checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox && !checkbox.checked) {
    checkbox.click();
    console.log('✅ Checked time checkbox');
  }
  playBeep(true);
  console.log('\\n🔒 All done! Solve hCaptcha then click Submit.');
}

async function run() {
  const heading = getStepHeading();
  console.log('📋 Detected:', heading);
  if (heading.includes('Step 1')) {
    await fillStep1(); await waitForNextThenStep(2);
    await fillStep2(); await waitForNextThenStep(3);
    await fillStep3(); await waitForNextThenStep(4);
    await fillStep4();
  } else if (heading.includes('Step 2')) {
    await fillStep2(); await waitForNextThenStep(3);
    await fillStep3(); await waitForNextThenStep(4);
    await fillStep4();
  } else if (heading.includes('Step 3')) {
    await fillStep3(); await waitForNextThenStep(4);
    await fillStep4();
  } else if (heading.includes('Step 4')) {
    await fillStep4();
  } else {
    console.warn('❓ Unknown heading:', heading);
  }
}

run();`;
}

const PREVIEW_FIELDS = [
  { key: "name", label: "Name", step: 1 },
  { key: "centerCode", label: "Center Code", step: 1 },
  { key: "gender", label: "Gender", step: 1 },
  { key: "einstagramBenifits", label: "E-Instagram Benefits", step: 1 },
  { key: "feedbackId", label: "Feedback ID", step: 1 },
  { key: "howImportantInstagram", label: "How Important is E-Instagram", step: 2 },
  { key: "city", label: "City", step: 2 },
  { key: "age", label: "Age", step: 2 },
  { key: "hobbies", label: "Hobbies (auto + random)", step: 2 },
  { key: "primaryJob", label: "Primary Job", step: 2 },
  { key: "maritalStatus", label: "Marital Status (mapped)", step: 3 },
  { key: "__email__", label: "Email (auto)", step: 3 },
  { key: "instagramMarketingTasks", label: "Marketing Tasks", step: 3 },
  { key: "education", label: "Education", step: 3 },
  { key: "state", label: "State (auto)", step: 3 },
  { key: "howOftenUseInstagram", label: "How Often Use Instagram", step: 4 },
  { key: "createHashtag", label: "Create Hashtag (auto)", step: 4 },
  { key: "howDidYouHearAboutInstagram", label: "How Did You Hear", step: 4 },
  { key: "__evc__", label: "EVC Code (auto)", step: 4 },
];

const STEP_COLORS = {
  1: { bg: "#1a1f3a", border: "#3730a3", badge: "#6366f1", text: "Step 1" },
  2: { bg: "#1a2d2a", border: "#065f46", badge: "#10b981", text: "Step 2" },
  3: { bg: "#2d1f1a", border: "#92400e", badge: "#f59e0b", text: "Step 3" },
  4: { bg: "#1a1a2d", border: "#4c1d95", badge: "#8b5cf6", text: "Step 4" },
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#94a3b8",
  marginBottom: "8px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

export default function App() {
  const [formNumber, setFormNumber] = useState("");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(getNow());
  const [foundData, setFoundData] = useState(null);
  const [email, setEmail] = useState("");
  const [evc, setEvc] = useState("");
  const [error, setError] = useState("");
  const [extraHobby, setExtraHobby] = useState(randomHobby());
  const [showModal, setShowModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const key = formNumber.trim();
    if (!key || !FORMS_DATA[key]) {
      setFoundData(null);
      setEmail("");
      setEvc("");
      setError(key && !FORMS_DATA[key] ? `Form #${key} not found in dataset.` : "");
      return;
    }
    const data = FORMS_DATA[key];
    setFoundData(data);
    setEmail(buildEmail(key, data.name));
    setEvc(buildEvcCode(data.city, now));
    setError("");
  }, [formNumber, now]);

  function handleGenerate() {
    if (!foundData) {
      setError(formNumber.trim() ? `Form #${formNumber} not found.` : "Enter a Form Number first.");
      return;
    }
    const generatedEmail = buildEmail(formNumber.trim(), foundData.name);
    const generatedEvc = buildEvcCode(foundData.city, now);
    setScript(generateScript(foundData, generatedEmail, generatedEvc, extraHobby, soundEnabled));
    setCopied(false);
    setShowModal(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleNextForm() {
    const current = parseInt(formNumber.trim(), 10);
    const next = !isNaN(current) ? current + 1 : 1;
    setFormNumber(String(next));
    setScript("");
    setCopied(false);
    setExtraHobby(randomHobby());
  }

  const totalForms = Object.keys(FORMS_DATA).length;

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0f1117",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "#141824",
        borderBottom: "1px solid #1e2535",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#6366f1", fontWeight: 700, textTransform: "uppercase", marginBottom: "3px" }}>
            WHATEVER WHATEVER
          </div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>
            Idkidk Script Generator
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button onClick={handleNextForm} style={{
            background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px",
            padding: "7px 16px", fontSize: "11px", fontWeight: 600, color: "#a5b4fc", cursor: "pointer",
          }}>
            ↻ Next Form
          </button>
          <button
            onClick={() => setSoundEnabled(s => !s)}
            title={soundEnabled ? "Sound ON — click to mute" : "Sound OFF — click to enable"}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              opacity: soundEnabled ? 1 : 0.35,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={soundEnabled ? "#a5b4fc" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {soundEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              )}
            </svg>
          </button>
          <div style={{
            background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px",
            padding: "7px 14px", fontSize: "11px", color: "#6366f1", fontWeight: 700,
          }}>
            {totalForms} forms loaded
          </div>
          <div style={{
            background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px",
            padding: "7px 14px", fontSize: "11px", fontFamily: "monospace", color: "#64748b",
            display: "flex", alignItems: "center", gap: "7px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            {now}
          </div>
        </div>
      </div>

      {/* Main layout — viewport-locked, two independently scrolling columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: foundData ? "1fr 1fr" : "1fr",
        flex: 1,
        overflow: "hidden",
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
      }}>

        {/* LEFT — independently scrollable */}
        <div style={{
          overflowY: "auto",
          padding: "24px",
          borderRight: foundData ? "1px solid #1e2535" : "none",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          <div>
            <label style={labelStyle}>Form Number</label>
            <input
              type="text"
              value={formNumber}
              onChange={e => setFormNumber(e.target.value)}
              placeholder="e.g. 1, 10, 247, 3000..."
              autoFocus
              style={{
                background: "#141824",
                border: foundData ? "1px solid #22c55e" : "1px solid #2d3748",
                borderRadius: "8px",
                padding: "14px 16px",
                color: "#e2e8f0",
                fontSize: "18px",
                fontWeight: 700,
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: "11px", color: "#475569", marginTop: "8px" }}>
              Type a form number (1–{totalForms}) — data fetches automatically
            </div>
          </div>

          <div>
            <label style={labelStyle}>Auto-Picked Second Hobby</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{
                background: "#141824", border: "1px solid #2d3748", borderRadius: "7px",
                padding: "9px 14px", color: "#a5b4fc", fontSize: "13px",
                fontFamily: "monospace", flex: "1", minWidth: "200px",
              }}>
                {extraHobby}
              </div>
              <button onClick={() => setExtraHobby(randomHobby())} style={{
                background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "7px",
                padding: "9px 16px", fontSize: "12px", fontWeight: 600,
                color: "#a5b4fc", cursor: "pointer",
              }}>
                🎲 Re-roll
              </button>
            </div>
            {foundData?.hobbies && (
              <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace", marginTop: "8px" }}>
                final: <span style={{ color: "#a5b4fc" }}>{buildHobbies(foundData.hobbies, extraHobby) || "—"}</span>
                {"  "}hashtag: <span style={{ color: "#34d399" }}>{buildHashtag(foundData.hobbies, extraHobby) || "—"}</span>
              </div>
            )}
            <div style={{ fontSize: "10px", color: "#374151", marginTop: "6px" }}>
              Picked randomly from 60 hobbies. Re-rolls automatically on "↻ Next Form".
            </div>
          </div>

          {error && (
            <div style={{
              background: "#2d1515", border: "1px solid #7f1d1d",
              borderRadius: "8px", padding: "10px 16px",
              fontSize: "13px", color: "#fca5a5",
            }}>
              ⚠️ {error}
            </div>
          )}

          {foundData && (
            <div style={{
              background: "#0f1e16", border: "1px solid #166534",
              borderRadius: "8px", padding: "12px 16px",
              fontSize: "13px", color: "#86efac",
            }}>
              ✓ Form #{formNumber} found — {foundData.name}, {foundData.city}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!foundData}
            style={{
              background: foundData ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#1e2433",
              color: foundData ? "#fff" : "#475569",
              border: "none", borderRadius: "8px",
              padding: "14px 36px", fontSize: "14px", fontWeight: 700,
              cursor: foundData ? "pointer" : "not-allowed", width: "100%",
              letterSpacing: "0.03em",
            }}
          >
            ⚡ Generate Script
          </button>

          {script && (
            <button onClick={() => setShowModal(true)} style={{
              background: "#1a1f2e", color: "#6366f1",
              border: "1px solid #3730a3", borderRadius: "8px",
              padding: "11px 20px", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}>
              <span>📋</span> View Generated Script
            </button>
          )}
        </div>

        {/* RIGHT — independently scrollable */}
        {foundData && (
          <div style={{ overflowY: "auto", padding: "24px", background: "#0c0f18" }}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "#6366f1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "4px" }}>
                Live Preview — Form #{formNumber}
              </div>
              <div style={{ fontSize: "12px", color: "#475569" }}>Confirm all values before generating</div>
            </div>

            {[1, 2, 3, 4].map(step => {
              const sc = STEP_COLORS[step];
              const fields = PREVIEW_FIELDS.filter(f => f.step === step);
              return (
                <div key={step} style={{
                  background: sc.bg, border: `1px solid ${sc.border}`,
                  borderRadius: "10px", padding: "16px", marginBottom: "14px",
                }}>
                  <div style={{
                    display: "inline-block", background: sc.badge, color: "#fff",
                    fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", padding: "3px 10px", borderRadius: "4px", marginBottom: "12px",
                  }}>
                    {sc.text}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {fields.map(f => {
                      let value = "";
                      if (f.key === "__email__") value = email;
                      else if (f.key === "__evc__") value = evc;
                      else if (f.key === "hobbies") value = buildHobbies(foundData.hobbies, extraHobby);
                      else if (f.key === "createHashtag") value = buildHashtag(foundData.hobbies, extraHobby);
                      else if (f.key === "maritalStatus") value = mapMaritalStatus(foundData.maritalStatus);
                      else value = foundData[f.key] || "";

                      const isAuto = ["__email__", "__evc__", "state", "hobbies", "createHashtag", "maritalStatus"].includes(f.key);
                      const isEmpty = !value;

                      return (
                        <div key={f.key} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "8px", alignItems: "start" }}>
                          <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500, paddingTop: "1px" }}>
                            {f.label}
                            {isAuto && <span style={{ color: sc.badge, marginLeft: "4px" }}>✦</span>}
                          </div>
                          <div style={{
                            fontSize: "12px", fontFamily: "monospace",
                            color: isEmpty ? "#374151" : isAuto ? "#34d399" : "#e2e8f0",
                            wordBreak: "break-word", lineHeight: "1.5",
                          }}>
                            {isEmpty ? "—" : value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div style={{
              background: "#141824", border: "1px solid #1e2535",
              borderRadius: "8px", padding: "12px 16px",
              fontSize: "11px", color: "#475569", marginTop: "4px",
            }}>
              <span style={{ color: "#6366f1" }}>✦</span> Auto-generated from form data + live clock
            </div>
          </div>
        )}
      </div>

      {/* Script Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "24px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#141824", border: "1px solid #2d3748",
              borderRadius: "16px", width: "100%", maxWidth: "860px",
              maxHeight: "85vh", display: "flex", flexDirection: "column",
              overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 24px", borderBottom: "1px solid #1e2535",
              background: "#1a1f2e", flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                <span style={{ fontSize: "13px", color: "#f1f5f9", fontWeight: 700 }}>Generated Script</span>
                <span style={{
                  fontSize: "10px", color: "#6366f1", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  background: "#1e1b4b", padding: "2px 8px", borderRadius: "4px",
                }}>
                  Ready to paste in console
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? "#16a34a" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff", border: "none", borderRadius: "7px",
                    padding: "8px 22px", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", transition: "background 0.2s",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                >
                  {copied ? "✓ Copied!" : "⎘ Copy Script"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "transparent", color: "#64748b",
                    border: "1px solid #2d3748", borderRadius: "7px",
                    width: "34px", height: "34px", fontSize: "16px",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            <pre style={{
              margin: 0, padding: "24px", fontSize: "12px", lineHeight: "1.75",
              color: "#94a3b8", overflowY: "auto", overflowX: "auto",
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              flex: 1, minHeight: 0,
            }}>
              {script}
            </pre>

            <div style={{
              padding: "12px 24px", borderTop: "1px solid #1e2535",
              background: "#0f1117", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: "11px", color: "#374151" }}>Click outside or ✕ to close</span>
              <span style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>{script.split("\n").length} lines</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #141824; }
        ::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 3px; }
        input:focus { border-color: #6366f1 !important; }
      `}</style>
    </div>
  );
}
