import { useState, useEffect } from "react";

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

function parseDataObject(raw) {
  const cleaned = raw.replace(/\/\/.*$/gm, "");
  const result = {};
  const regex = /(\w+)\s*:\s*'([^']*)'/g;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

function buildEmail(formNumber, name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) parts.push("User");
  return `${formNumber}_${parts.join("_")}_123@rediffmail.com`;
}

function buildEvcCode(city, datetime) {
  return `My EVC code is FS2025 and I have submitted my feedback on (${datetime}) at ${city || "N/A"}`;
}

function buildHashtag(hobbies) {
  const first = (hobbies || "").trim().split(",")[0].trim();
  if (!first) return "";
  return `#${first.replace(/\s+/g, "").toLowerCase()}`;
}

function buildHobbies(dataHobby, extraHobby) {
  if (extraHobby && dataHobby) return `${dataHobby}, ${extraHobby}`;
  return dataHobby || extraHobby || "";
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

function generateScript(data, email, evcCode, extraHobby) {
  const combinedHobbies = buildHobbies(data.hobbies, extraHobby);
  const hashtag = buildHashtag(data.hobbies);
  return `// ============================================================
// E-INSTA FEEDBACK - AUTO FILL SCRIPT
// ============================================================

const DATA = {
  // Step 1
  name: '${data.name || ""}',
  centerCode: '${data.centerCode || ""}',
  gender: '${data.gender || ""}',
  einstagramBenifits: '${data.einstagramBenifits || ""}',
  feedbackId: '${data.feedbackId || ""}',

  // Step 2
  howImportantInstagram: '${data.howImportantInstagram || ""}',
  city: '${data.city || ""}',
  age: '${data.age || ""}',
  hobbies: '${combinedHobbies}',
  primaryJob: '${data.primaryJob || ""}',

  // Step 3
  maritalStatus: '${data.maritalStatus || ""}',
  email: '${email}',
  instagramMarketingTasks: '${data.instagramMarketingTasks || ""}',
  education: '${data.education || ""}',
  state: '${data.state || ""}',

  // Step 4
  howOftenUseInstagram: '${data.howOftenUseInstagram || ""}',
  createHashtag: '${hashtag}',
  howDidYouHearAboutInstagram: '${data.howDidYouHearAboutInstagram || ""}',
  evcCode: '${evcCode}',
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
  { key: "hobbies", label: "Hobbies", step: 2 },
  { key: "primaryJob", label: "Primary Job", step: 2 },
  { key: "maritalStatus", label: "Marital Status", step: 3 },
  { key: "__email__", label: "Email (auto)", step: 3 },
  { key: "instagramMarketingTasks", label: "Marketing Tasks", step: 3 },
  { key: "education", label: "Education", step: 3 },
  { key: "state", label: "State", step: 3 },
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
  const [raw, setRaw] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [script, setScript] = useState("");
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(getNow());
  const [parsedData, setParsedData] = useState({});
  const [email, setEmail] = useState("");
  const [evc, setEvc] = useState("");
  const [error, setError] = useState("");
  const [extraHobby, setExtraHobby] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live parse as user types
  useEffect(() => {
    try {
      if (!raw.trim()) { setParsedData({}); setEmail(""); setEvc(""); return; }
      const data = parseDataObject(raw);
      setParsedData(data);
      setEmail(formNumber && data.name ? buildEmail(formNumber, data.name) : "");
      setEvc(data.city ? buildEvcCode(data.city, now) : "");
    } catch (_) {}
  }, [raw, formNumber, now]);

  function handleGenerate() {
    setError("");
    if (!raw.trim()) { setError("Paste your data object first."); return; }
    if (!formNumber.trim()) { setError("Enter a Form Number."); return; }
    try {
      const data = parseDataObject(raw);
      if (!data.name) { setError("Could not parse 'name'. Check your format."); return; }
      const generatedEmail = buildEmail(formNumber, data.name);
      const generatedEvc = buildEvcCode(data.city, now);
      setScript(generateScript(data, generatedEmail, generatedEvc, extraHobby));
      setCopied(false);
      setShowModal(true);
    } catch (e) {
      setError("Failed to parse data object. Check the format.");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const hasPreview = Object.keys(parsedData).length > 0;

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
            Whatever Whatever
          </div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#f1f5f9" }}>
            Idkidk Script Generator
          </h1>
        </div>
        <div style={{
          background: "#1a1f2e",
          border: "1px solid #2d3748",
          borderRadius: "8px",
          padding: "7px 14px",
          fontSize: "11px",
          fontFamily: "monospace",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          gap: "7px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          {now}
        </div>
      </div>

      {/* Main layout — fills remaining viewport height */}
      <div style={{
        display: "grid",
        gridTemplateColumns: hasPreview ? "1fr 1fr" : "1fr",
        flex: 1,
        overflow: "hidden",
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
      }}>

        {/* LEFT — Input, independently scrollable */}
        <div style={{
          overflowY: "auto",
          padding: "24px",
          borderRight: hasPreview ? "1px solid #1e2535" : "none",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Form Number</label>
              <input
                type="text"
                value={formNumber}
                onChange={e => setFormNumber(e.target.value)}
                placeholder="e.g. 1042"
                style={{
                  background: "#141824",
                  border: "1px solid #2d3748",
                  borderRadius: "7px",
                  padding: "9px 14px",
                  color: "#e2e8f0",
                  fontSize: "13px",
                  outline: "none",
                  width: "160px",
                }}
              />
            </div>
            <div style={{ fontSize: "11px", color: "#475569", paddingBottom: "10px" }}>
              → email will be <span style={{ color: "#6366f1", fontFamily: "monospace" }}>
                {formNumber && parsedData.name ? buildEmail(formNumber, parsedData.name) : `${formNumber || "N"}_Name_123@rediffmail.com`}
              </span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Paste Your Data Object</label>
            <textarea
              value={raw}
              onChange={e => setRaw(e.target.value)}
              placeholder={`{
  // Step 1
  name: 'John Doe',
  centerCode: 'CENTER123',
  gender: 'Male',
  einstagramBenifits: 'Increases brand visibility',
  feedbackId: 'FB-2024-001',

  // Step 2
  howImportantInstagram: 'Very important',
  city: 'Mumbai',
  age: '25',
  hobbies: 'Reading, Photography',
  primaryJob: 'Digital Marketing Manager',

  // Step 3
  maritalStatus: 'Single',
  instagramMarketingTasks: 'Content creation',
  education: 'BBA',
  state: 'Maharashtra',

  // Step 4
  howOftenUseInstagram: 'Daily',
  createHashtag: '#BrandGrowth',
  howDidYouHearAboutInstagram: 'Colleague',
  evcCode: 'placeholder',
}`}
              style={{
                width: "100%",
                height: "280px",
                background: "#141824",
                border: "1px solid #2d3748",
                borderRadius: "10px",
                padding: "16px",
                color: "#a5b4fc",
                fontSize: "13px",
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                lineHeight: "1.75",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Extra Hobby */}
          <div>
            <label style={labelStyle}>Add Extra Hobby</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <select
                value={extraHobby}
                onChange={e => setExtraHobby(e.target.value)}
                style={{
                  background: "#141824",
                  border: "1px solid #2d3748",
                  borderRadius: "7px",
                  padding: "9px 14px",
                  color: extraHobby ? "#e2e8f0" : "#475569",
                  fontSize: "13px",
                  outline: "none",
                  flex: "1",
                  minWidth: "200px",
                  cursor: "pointer",
                }}
              >
                <option value="">— Select a hobby (optional) —</option>
                {HOBBY_LIST.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              {parsedData.hobbies && (
                <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>
                  final: <span style={{ color: "#a5b4fc" }}>{buildHobbies(parsedData.hobbies, extraHobby) || "—"}</span>
                  {"  "}hashtag: <span style={{ color: "#34d399" }}>{buildHashtag(parsedData.hobbies) || "—"}</span>
                </div>
              )}
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

          <button
            onClick={handleGenerate}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none", borderRadius: "8px",
              padding: "13px 36px", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", width: "100%",
              letterSpacing: "0.03em",
            }}
          >
            ⚡ Generate Script
          </button>

          {script && (
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: "#1a1f2e",
                color: "#6366f1",
                border: "1px solid #3730a3",
                borderRadius: "8px",
                padding: "11px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>📋</span> View Generated Script
            </button>
          )}
        </div>

        {/* RIGHT — Live Preview, independently scrollable */}
        {hasPreview && (
          <div style={{ overflowY: "auto", padding: "24px", background: "#0c0f18" }}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", color: "#6366f1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "4px" }}>
                Live Preview
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
                      else if (f.key === "hobbies") value = buildHobbies(parsedData.hobbies, extraHobby);
                      else if (f.key === "createHashtag") value = buildHashtag(parsedData.hobbies);
                      else value = parsedData[f.key] || "";

                      const isAuto = f.key === "__email__" || f.key === "__evc__" || f.key === "createHashtag";
                      const isEmpty = !value;

                      return (
                        <div key={f.key} style={{
                          display: "grid",
                          gridTemplateColumns: "140px 1fr",
                          gap: "8px",
                          alignItems: "start",
                        }}>
                          <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500, paddingTop: "1px" }}>
                            {f.label}
                            {isAuto && <span style={{ color: sc.badge, marginLeft: "4px" }}>✦</span>}
                          </div>
                          <div style={{
                            fontSize: "12px",
                            fontFamily: "monospace",
                            color: isEmpty ? "#374151" : isAuto ? "#34d399" : "#e2e8f0",
                            wordBreak: "break-all",
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
              background: "#141824", border: "1px solid #1e2535",
              borderRadius: "8px", padding: "12px 16px",
              fontSize: "11px", color: "#475569", marginTop: "4px",
            }}>
              <span style={{ color: "#6366f1" }}>✦</span> Auto-generated from your input + live clock
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
              background: "#141824",
              border: "1px solid #2d3748",
              borderRadius: "16px",
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
              padding: "16px 24px", borderBottom: "1px solid #1e2535",
              background: "#1a1f2e", flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                }} />
                <span style={{ fontSize: "13px", color: "#f1f5f9", fontWeight: 700 }}>
                  Generated Script
                </span>
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
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", lineHeight: 1,
                  }}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Script body */}
            <pre style={{
              margin: 0,
              padding: "24px",
              fontSize: "12px",
              lineHeight: "1.75",
              color: "#94a3b8",
              overflowY: "auto",
              overflowX: "auto",
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              flex: 1,
              minHeight: 0,
            }}>
              {script}
            </pre>

            {/* Modal footer */}
            <div style={{
              padding: "12px 24px", borderTop: "1px solid #1e2535",
              background: "#0f1117", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: "11px", color: "#374151" }}>
                Click outside or ✕ to close
              </span>
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
        select:focus { border-color: #6366f1 !important; }
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