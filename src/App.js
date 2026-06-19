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

// Maps whatever marital status string comes from the form data into one of
// the 4 options actually available in the target form's <select>.
const MARITAL_STATUS_MAP = {
  "unmarried": "Single",
  "single": "Single",
  "married": "Married",
  "divorced": "Divorced",
  "widowed": "Widowed",
  "widow": "Widowed",
  "widower": "Widowed",
  "separated": "Divorced",
};

function mapMaritalStatus(raw) {
  if (!raw) return "";
  const key = raw.trim().toLowerCase();
  return MARITAL_STATUS_MAP[key] || raw; // fallback to original text if no mapping found
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

function generateScript(data, email, evcCode, extraHobby) {
  const combinedHobbies = buildHobbies(data.hobbies, extraHobby);
  const hashtag = buildHashtag(data.hobbies, extraHobby);
  const maritalStatus = mapMaritalStatus(data.maritalStatus);
  return `// ============================================================
// E-INSTA FEEDBACK - AUTO FILL SCRIPT (Form #${data.formNumber})
// ============================================================

const DATA = {
  // Step 1
  name: '${data.name || ""}',
  centerCode: '${data.centerCode || ""}',
  gender: '${data.gender || ""}',
  einstagramBenifits: '${(data.einstagramBenifits || "").replace(/'/g, "\\\\'")}',
  feedbackId: '${data.feedbackId || ""}',

  // Step 2
  howImportantInstagram: '${(data.howImportantInstagram || "").replace(/'/g, "\\\\'")}',
  city: '${data.city || ""}',
  age: '${data.age || ""}',
  hobbies: '${combinedHobbies.replace(/'/g, "\\\\'")}',
  primaryJob: '${(data.primaryJob || "").replace(/'/g, "\\\\'")}',

  // Step 3
  maritalStatus: '${maritalStatus}',
  email: '${email}',
  instagramMarketingTasks: '${(data.instagramMarketingTasks || "").replace(/'/g, "\\\\'")}',
  education: '${data.education || ""}',
  state: '${data.state || ""}',

  // Step 4
  howOftenUseInstagram: '${(data.howOftenUseInstagram || "").replace(/'/g, "\\\\'")}',
  createHashtag: '${hashtag.replace(/'/g, "\\\\'")}',
  howDidYouHearAboutInstagram: '${data.howDidYouHearAboutInstagram || ""}',
  evcCode: '${evcCode.replace(/'/g, "\\\\'")}',
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

function getStepHeading() {
  const all = document.querySelectorAll('h2');
  return all[all.length - 1]?.textContent?.trim() || '';
}

function waitForStep(stepNumber, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (getStepHeading().includes(\`Step \${stepNumber}\`)) {
        clearInterval(interval);
        console.log(\`📋 Step \${stepNumber} loaded!\`);
        resolve();
      }
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(\`⏱️ Timed out waiting for Step \${stepNumber}\`);
      }
    }, 300);
  });
}

async function fillStep1() {
  console.log('\\n--- STEP 1 ---');
  await fillReactInput('#name', DATA.name);
  await fillReactInput('#centerCode', DATA.centerCode);
  fillReactSelect('#gender', DATA.gender);
  await fillReactInput('#einstagramBenifits', DATA.einstagramBenifits);
  await fillReactInput('#feedbackId', DATA.feedbackId);
  console.log('\\n👆 Step 1 done! Click Next when ready...');
}

async function fillStep2() {
  console.log('\\n--- STEP 2 ---');
  await fillReactInput('#howImportantInstagram', DATA.howImportantInstagram);
  await fillReactInput('#city', DATA.city);
  await fillReactInput('#age', DATA.age);
  await fillReactInput('#hobbies', DATA.hobbies);
  await fillReactInput('#primaryJob', DATA.primaryJob);
  console.log('\\n👆 Step 2 done! Click Next when ready...');
}

async function fillStep3() {
  console.log('\\n--- STEP 3 ---');
  fillReactSelect('#maritalStatus', DATA.maritalStatus);
  await fillReactInput('#email', DATA.email);
  await fillReactInput('#instagramMarketingTasks', DATA.instagramMarketingTasks);
  await fillReactInput('#education', DATA.education);
  await fillReactInput('#state', DATA.state);
  console.log('\\n👆 Step 3 done! Click Next when ready...');
}

async function fillStep4() {
  console.log('\\n--- STEP 4 ---');
  await fillReactInput('#howOftenUseInstagram', DATA.howOftenUseInstagram);
  await fillReactInput('#createHashtag', DATA.createHashtag);
  await fillReactInput('#howDidYouHearAboutInstagram', DATA.howDidYouHearAboutInstagram);
  await fillReactInput('#evcCode', DATA.evcCode);
  const checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox && !checkbox.checked) {
    checkbox.click();
    console.log('✅ Checked time checkbox');
  }
  console.log('\\n🔒 Solve hCaptcha manually then click Submit!');
}

async function run() {
  const heading = getStepHeading();
  console.log('📋 Detected:', heading);
  if (heading.includes('Step 1')) {
    await fillStep1(); await waitForStep(2);
    await fillStep2(); await waitForStep(3);
    await fillStep3(); await waitForStep(4);
    await fillStep4();
  } else if (heading.includes('Step 2')) {
    await fillStep2(); await waitForStep(3);
    await fillStep3(); await waitForStep(4);
    await fillStep4();
  } else if (heading.includes('Step 3')) {
    await fillStep3(); await waitForStep(4);
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

export default function App() {
  const [formNumber, setFormNumber] = useState("");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [now, setNow] = useState(getNow());
  const [foundData, setFoundData] = useState(null);
  const [email, setEmail] = useState("");
  const [evc, setEvc] = useState("");
  const [error, setError] = useState("");
  const [extraHobby, setExtraHobby] = useState(randomHobby());

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live lookup as user types form number
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
    setScript(generateScript(foundData, generatedEmail, generatedEvc, extraHobby));
    setCopied(false);
    setModalOpen(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  // Jump to next form number: clears current result, rolls a new random
  // hobby, and bumps the form number field by 1 as a convenience.
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
      minHeight: "100vh",
      background: "#0f1117",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#e2e8f0",
      overflow: "hidden",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "#141824",
        borderBottom: "1px solid #1e2535",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#6366f1", fontWeight: 700, textTransform: "uppercase", marginBottom: "3px" }}>
            WHATEVER WHATEVER
          </div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>
            idkidk Script Generator
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={handleNextForm}
            style={{
              background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px",
              padding: "7px 16px", fontSize: "11px", fontWeight: 600,
              color: "#a5b4fc", cursor: "pointer",
            }}
          >
            ↻ Next Form
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

      {/* Main layout */}
      <div style={{
        display: "flex",
        gap: "0",
        maxWidth: "1600px",
        margin: "0 auto",
        flex: 1,
        overflow: "hidden",
        width: "100%",
      }}>

        {/* LEFT — Input */}
        <div style={{
          padding: "28px 24px",
          borderRight: foundData ? "1px solid #1e2535" : "none",
          width: foundData ? "480px" : "100%",
          minWidth: foundData ? "420px" : "auto",
          flexShrink: 0,
          overflowY: "auto",
          height: "100%",
          boxSizing: "border-box",
        }}>

          <div style={{ marginBottom: "20px" }}>
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

          {/* Random second hobby */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Auto-Picked Second Hobby</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{
                background: "#141824",
                border: "1px solid #2d3748",
                borderRadius: "7px",
                padding: "9px 14px",
                color: "#a5b4fc",
                fontSize: "13px",
                fontFamily: "monospace",
                flex: "1",
                minWidth: "200px",
              }}>
                {extraHobby}
              </div>
              <button
                onClick={() => setExtraHobby(randomHobby())}
                style={{
                  background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "7px",
                  padding: "9px 16px", fontSize: "12px", fontWeight: 600,
                  color: "#a5b4fc", cursor: "pointer",
                }}
              >
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
              Picked randomly from 60 hobbies. Re-rolls automatically when you click "↻ Next Form".
            </div>
          </div>

          {error && (
            <div style={{
              background: "#2d1515", border: "1px solid #7f1d1d",
              borderRadius: "8px", padding: "10px 16px",
              marginBottom: "16px", fontSize: "13px", color: "#fca5a5",
            }}>
              ⚠️ {error}
            </div>
          )}

          {foundData && (
            <div style={{
              background: "#0f1e16", border: "1px solid #166534",
              borderRadius: "8px", padding: "12px 16px",
              marginBottom: "20px", fontSize: "13px", color: "#86efac",
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
              cursor: foundData ? "pointer" : "not-allowed", width: "100%", marginBottom: "24px",
              letterSpacing: "0.03em",
            }}
          >
            Generate Script
          </button>

        </div>

        {/* RIGHT — Live Preview */}
        {foundData && (
          <div style={{
            padding: "28px 24px",
            background: "#0c0f18",
            flex: 1,
            overflowY: "auto",
            height: "100%",
            boxSizing: "border-box",
            minWidth: 0,
          }}>
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
                  background: sc.bg,
                  border: `1px solid ${sc.border}`,
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "14px",
                }}>
                  <div style={{
                    display: "inline-block",
                    background: sc.badge,
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    marginBottom: "12px",
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

                      const isAuto = f.key === "__email__" || f.key === "__evc__" || f.key === "state" || f.key === "hobbies" || f.key === "createHashtag" || f.key === "maritalStatus";
                      const isEmpty = !value;

                      return (
                        <div key={f.key} style={{
                          display: "grid",
                          gridTemplateColumns: "140px 1fr",
                          gap: "8px",
                          alignItems: "start",
                        }}>
                          <div style={{
                            fontSize: "11px",
                            color: "#64748b",
                            fontWeight: 500,
                            paddingTop: "1px",
                          }}>
                            {f.label}
                            {isAuto && <span style={{ color: sc.badge, marginLeft: "4px" }}>✦</span>}
                          </div>
                          <div style={{
                            fontSize: "12px",
                            fontFamily: "monospace",
                            color: isEmpty ? "#374151" : isAuto ? "#34d399" : "#e2e8f0",
                            wordBreak: "break-word",
                            lineHeight: "1.5",
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
              background: "#141824",
              border: "1px solid #1e2535",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "11px",
              color: "#475569",
              marginTop: "4px",
            }}>
              <span style={{ color: "#6366f1" }}>✦</span> Auto-generated from form data + live clock
            </div>
          </div>
        )}
      </div>

      {/* Script Modal */}
      {modalOpen && script && (
        <div
          onClick={() => setModalOpen(false)}
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
              background: "#141824",
              border: "1px solid #2d3748",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "860px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "1px solid #1e2535",
              background: "#1a1f2e",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9" }}>Generated Script</span>
                <span style={{
                  fontSize: "10px", fontWeight: 700, color: "#6366f1",
                  textTransform: "uppercase", letterSpacing: "0.12em",
                }}>
                  Ready to paste in console
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? "#22c55e" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff", border: "none", borderRadius: "8px",
                    padding: "9px 22px", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", transition: "background 0.2s",
                    display: "flex", alignItems: "center", gap: "7px",
                  }}
                >
                  {copied ? "✓ Copied!" : "⎘ Copy Script"}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: "#0f1117", border: "1px solid #2d3748", borderRadius: "8px",
                    width: "36px", height: "36px", display: "flex", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", color: "#94a3b8",
                    fontSize: "16px", flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Script content */}
            <pre style={{
              margin: 0, padding: "24px", fontSize: "12px", lineHeight: "1.8",
              color: "#94a3b8", overflowY: "auto", overflowX: "auto",
              fontFamily: "'Fira Code', 'Consolas', monospace",
              whiteSpace: "pre", flex: 1,
            }}>
              {script}
            </pre>

            {/* Modal footer */}
            <div style={{
              padding: "10px 20px",
              borderTop: "1px solid #1e2535",
              background: "#1a1f2e",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: "11px", color: "#475569" }}>Click outside or × to close</span>
              <span style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>
                {script.split("\n").length} lines
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #141824; }
        ::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 3px; }
        textarea:focus, input:focus { border-color: #6366f1 !important; }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#94a3b8",
  marginBottom: "8px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};