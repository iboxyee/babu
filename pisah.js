(function() {
    // Tambahkan CSS ke head jika ada
    let style = document.createElement("style");
    style.textContent = `:root {
            --bg-color: #1e1e1e;
            --text-color: #fff;
            --box-bg: #2b2b2b;
            --border-color: #444;
            --button-bg: #4CAF50;
            --button-hover: #45a049;
            --highlight-bg: #333;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        body {
            background: var(--bg-color);
            color: var(--text-color);
            padding: 20px;
            text-align: center;
        }
        h2, h3 {
            margin-bottom: 15px;
        }
        .container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            background: var(--box-bg);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
        }
        textarea {
            width: 100%;
            height: 100px;
            background: var(--highlight-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
            font-family: monospace;
            resize: vertical;
        }
        button {
            width: 100%;
            padding: 12px;
            background: var(--button-bg);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: 0.3s;
        }
        button:hover {
            background: var(--button-hover);
        }
        pre {
            background: var(--highlight-bg);
            padding: 10px;
            border-radius: 5px;
            border: 1px solid var(--border-color);
            text-align: left;
            white-space: pre-wrap;
            word-wrap: break-word;
        }`;
    document.head.appendChild(style);

    // Tambahkan HTML ke body jika ada
    let container = document.createElement("div");
    container.innerHTML = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Script Generator (Auto Pisah)</title>
    
</head>
<body>

    <h2>Script Generator (Pisah Otomatis)</h2>
    
    <div class="container">
        <label>HTML Lengkap:</label>
        <textarea id="fullHtmlInput" placeholder="Masukkan HTML lengkap (termasuk CSS dan script)"></textarea>
        <button onclick="splitHtml()">Pisahkan HTML, CSS, dan JS</button>

        <h3>Atau Masukkan Terpisah:</h3>
        
        <label>HTML:</label>
        <textarea id="htmlInput" placeholder="Masukkan kode HTML"></textarea>

        <label>CSS:</label>
        <textarea id="cssInput" placeholder="Masukkan kode CSS"></textarea>

        <label>JavaScript:</label>
        <textarea id="jsInput" placeholder="Masukkan kode JavaScript"></textarea>

        <button onclick="generateScript()">Buat Script</button>

        <h3>Hasil Script:</h3>
        <pre id="output"></pre>
        <button onclick="copyScript()">Copy Script</button>
    </div>

    

</body>
</html>`;
    document.body.appendChild(container);

    // Tambahkan dan jalankan JavaScript jika ada
    let script = document.createElement("script");
    script.textContent = `function escapeString(str) {
            return str
                .replace(/\\\\/g, "\\\\\\\\") // Escape backslash
                .replace(/\`/g, "\\\\\`")   // Escape backtick \`
                .replace(/\\\$/g, "\\\\\$")  // Escape dollar \$
                .replace(/<\\/script>/gi, "<\\\\/script>"); // Hindari pemutusan script
        }

        function splitHtml() {
            let fullHtml = document.getElementById("fullHtmlInput").value.trim();
            if (!fullHtml) {
                alert("Masukkan HTML terlebih dahulu!");
                return;
            }

            let html = fullHtml.replace(/<style[\\s\\S]*?>[\\s\\S]*?<\\/style>/gi, "").replace(/[\\s\\S]*?<\\/script>/gi, "").trim();
            let cssMatches = fullHtml.match(/<style[\\s\\S]*?>([\\s\\S]*?)<\\/style>/gi) || [];
            let jsMatches = fullHtml.match(/([\\s\\S]*?)<\\/script>/gi) || [];

            let css = cssMatches.map(m => m.replace(/<\\/?style.*?>/gi, "").trim()).join("\\n");
            let js = jsMatches.map(m => m.replace(/<\\/?script.*?>/gi, "").trim()).join("\\n");

            document.getElementById("htmlInput").value = html;
            document.getElementById("cssInput").value = css;
            document.getElementById("jsInput").value = js;
        }

        function generateScript() {
            let html = escapeString(document.getElementById("htmlInput").value.trim());
            let css = escapeString(document.getElementById("cssInput").value.trim());
            let js = escapeString(document.getElementById("jsInput").value.trim());

            if (!html && !css && !js) {
                alert("Masukkan setidaknya satu bagian HTML, CSS, atau JavaScript!");
                return;
            }

            let script = \`
(function() {
    // Tambahkan CSS ke head jika ada
    \${css ? \`let style = document.createElement("style");
    style.textContent = \\\`\${css}\\\`;
    document.head.appendChild(style);\` : ""}

    // Tambahkan HTML ke body jika ada
    \${html ? \`let container = document.createElement("div");
    container.innerHTML = \\\`\${html}\\\`;
    document.body.appendChild(container);\` : ""}

    // Tambahkan dan jalankan JavaScript jika ada
    \${js ? \`let script = document.createElement("script");
    script.textContent = \\\`\${js}\\\`;
    document.body.appendChild(script);\` : ""}
})();
            \`.trim();

            document.getElementById("output").textContent = script;
        }

        function copyScript() {
            let output = document.getElementById("output").textContent;
            if (!output) {
                alert("Tidak ada script untuk disalin!");
                return;
            }
            navigator.clipboard.writeText(output).then(() => {
                alert("Script berhasil disalin!");
            });
        }`;
    document.body.appendChild(script);
})();
