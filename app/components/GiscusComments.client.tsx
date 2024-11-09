// GiscusComments.client.tsx
"use client";

import { useEffect, useRef } from "react";

export default function GiscusComments() {
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusRef.current) return;
    if (giscusRef.current.firstChild)
      giscusRef.current.removeChild(giscusRef.current.firstChild);

    const scriptEl = document.createElement("script");
    scriptEl.src = "https://giscus.app/client.js";
    scriptEl.async = true;
    scriptEl.setAttribute("data-repo", "sooyoung-jungho/sooyoung-jungho.github.io");
    scriptEl.setAttribute("data-repo-id", "R_kgDOLkqiTA");
    scriptEl.setAttribute("data-category", "General");
    scriptEl.setAttribute("data-category-id", "DIC_kwDOLkqiTM4CeMKP");
    scriptEl.setAttribute("data-mapping", "pathname");
    scriptEl.setAttribute("data-strict", "0");
    scriptEl.setAttribute("data-reactions-enabled", "1");
    scriptEl.setAttribute("data-emit-metadata", "0");
    scriptEl.setAttribute("data-input-position", "bottom");
    scriptEl.setAttribute("data-theme", "light");
    scriptEl.setAttribute("data-lang", "en");
    scriptEl.crossOrigin = "anonymous";

    giscusRef.current.appendChild(scriptEl);
  }, []);

  return <div ref={giscusRef} />;
}
