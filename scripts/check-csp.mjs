import { readFileSync } from "node:fs";
const cfg = JSON.parse(readFileSync("vercel.json", "utf8"));
const csp = cfg.headers
  .find(h => h.source === "/:path*")
  .headers.find(h => h.key === "Content-Security-Policy").value;
const d = Object.fromEntries(
  csp
    .split(";")
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const [k, ...v] = s.split(/\s+/);
      return [k, v.join(" ")];
    })
);
const SELF = "'self'";
const NONE = "'none'";
const INLINE = "'unsafe-inline'";
const checks = [
  ["default-src locked to self", d["default-src"] === SELF],
  [
    "script-src allows the inline theme script",
    d["script-src"].includes(INLINE),
  ],
  ["script-src has no wildcard", !d["script-src"].includes("*")],
  [
    "style-src allows Google Fonts CSS",
    d["style-src"].includes("fonts.googleapis.com"),
  ],
  [
    "font-src allows Google Fonts files",
    d["font-src"].includes("fonts.gstatic.com"),
  ],
  ["connect-src allows the tRPC api", d["connect-src"].includes(SELF)],
  [
    "img-src allows data/blob fallbacks",
    d["img-src"].includes("data:") && d["img-src"].includes("blob:"),
  ],
  ["frame-ancestors none (clickjacking)", d["frame-ancestors"] === NONE],
  ["object-src none (plugin XSS)", d["object-src"] === NONE],
  ["base-uri self (base-tag injection)", d["base-uri"] === SELF],
  ["form-action self (form hijacking)", d["form-action"] === SELF],
  ["upgrade-insecure-requests present", "upgrade-insecure-requests" in d],
];
let ok = true;
for (const [name, pass] of checks) {
  if (!pass) ok = false;
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
}
console.log(ok ? "\n✅ CSP سليمة" : "\n❌ CSP فيها مشكلة");
process.exit(ok ? 0 : 1);
