// import React, { useState } from "react";

// // Updated decryption function
// const decryptSSH = (ld) => {
//   try {
//     const userlv = ld.split(".").filter((_, index) => index % 2 === 0);
//     const userld = ld.split(".").filter((_, index) => index % 2 === 1);
//     let newld = "";

//     for (let x = 0; x < userld.length; x++) {
//       const v = parseInt(userlv[x]) - userlv.length;
//       const w = parseInt(userld[x]) - userlv.length;
//       const m = (v >> w) & 0xff; // safe bitwise operation

//       // Only allow printable ASCII characters
//       if (m >= 32 && m <= 126) {
//         newld += String.fromCharCode(m);
//       }
//     }

//     return newld;
//   } catch {
//     return null;
//   }
// };

// const App = () => {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [copied, setCopied] = useState(false);

//   const handleDecrypt = () => {
//     setError("");
//     setResult(null);
//     setCopied(false);

//     let cleanedInput = input.trim();
//     if (!cleanedInput.startsWith("/ssh")) {
//       cleanedInput = `/ssh ${cleanedInput}`;
//     }

//     try {
//       const encryptedData = cleanedInput.split(" ", 2)[1];
//       const [serverPort, creds] = encryptedData.split("@");
//       const [server, port] = serverPort.split(":");
//       const [userEnc, passEnc] = creds.split(":");

//       const user = decryptSSH(userEnc);
//       const pass = decryptSSH(passEnc);

//       if (!user || !pass) throw new Error();

//       setResult({ server, port, user, pass });
//     } catch {
//       setError("Invalid SSH format or encrypted values.");
//     }
//   };

//   const copyOutput = () => {
//     if (!result) return;
//     const text = `Server: ${result.server}\nPort: ${result.port}\nUsername: ${result.user}\nPassword: ${result.pass}`;
//     navigator.clipboard.writeText(text).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6">
//       <div className="max-w-2xl mx-auto bg-white text-gray-800 rounded-xl p-6 shadow-lg">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
//           🔐 SSH Decryptor
//         </h1>
//         <p className="text-center text-sm text-gray-600">
//           Paste your SSH data below (with or without <code>/ssh</code>).
//         </p>

//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="w-full mt-4 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none h-28"
//           placeholder="Paste SSH input here..."
//         />

//         <button
//           onClick={handleDecrypt}
//           className="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Decrypt SSH
//         </button>

//         {error && (
//           <div className="mt-4 text-red-600 font-semibold">{error}</div>
//         )}

//         {result && (
//           <div className="mt-6 bg-gray-100 text-sm rounded-md p-4 font-mono space-y-2">
//             <p>
//               <strong>Server:</strong> {result.server}
//             </p>
//             <p>
//               <strong>Port:</strong> {result.port}
//             </p>
//             <p>
//               <strong>Username:</strong> {result.user}
//             </p>
//             <p>
//               <strong>Password:</strong> {result.pass}
//             </p>

//             <button
//               onClick={copyOutput}
//               className="mt-3 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//             >
//               {copied ? "Copied!" : "Copy Output"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { Sun, Moon, Copy } from "lucide-react";

const decryptSSH = (ld) => {
  try {
    const userlv = ld.split(".").filter((_, i) => i % 2 === 0);
    const userld = ld.split(".").filter((_, i) => i % 2 === 1);
    let newld = "";
    for (let x = 0; x < userld.length; x++) {
      const v = parseInt(userlv[x]) - userlv.length;
      const w = parseInt(userld[x]) - userlv.length;
      const m = (v >> w) & 0xff;
      if (m >= 32 && m <= 126) newld += String.fromCharCode(m);
    }
    return newld;
  } catch {
    return null;
  }
};

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleDecrypt = () => {
    setError("");
    setResult(null);
    setCopied(false);

    let cleanedInput = input.trim();
    if (!cleanedInput.startsWith("/ssh")) {
      cleanedInput = `/ssh ${cleanedInput}`;
    }

    try {
      const encryptedData = cleanedInput.split(" ", 2)[1];
      const [serverPort, creds] = encryptedData.split("@");
      const [server, port] = serverPort.split(":");
      const [userEnc, passEnc] = creds.split(":");

      const user = decryptSSH(userEnc);
      const pass = decryptSSH(passEnc);

      if (!user || !pass) throw new Error();

      setResult({ server, port, user, pass });
    } catch {
      setError("Invalid SSH format or encrypted values.");
    }
  };

  const copyOutput = () => {
    if (!result) return;
    const text = `Server: ${result.server}\nPort: ${result.port}\nUsername: ${result.user}\nPassword: ${result.pass}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`min-h-screen transition duration-300 p-6 font-sans ${
        darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">SSH Decryptor</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div
        className={`max-w-3xl mx-auto rounded-2xl p-6 shadow-xl ${
          darkMode
            ? "bg-white/10 backdrop-blur-md text-white"
            : "bg-white backdrop-blur-md text-gray-900"
        }`}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full p-3 rounded-lg text-sm font-mono border border-gray-300 ${
            darkMode ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
          }`}
          placeholder="Paste your SSH input here..."
          rows={4}
        />

        <button
          onClick={handleDecrypt}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Decrypt SSH
        </button>

        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

        {result && (
          <div
            className={`mt-6 rounded-lg p-4 relative ${
              darkMode ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            <pre className="text-sm font-mono whitespace-pre-wrap">
              Server: {result.server}
              {"\n"}Port: {result.port}
              {"\n"}Username: {result.user}
              {"\n"}Password: {result.pass}
            </pre>
            <button
              onClick={copyOutput}
              className="absolute top-2 right-2 text-indigo-500 hover:text-indigo-700"
            >
              <Copy size={18} />
            </button>
            {copied && (
              <div className="text-green-500 text-xs mt-2">Copied!</div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-xs opacity-70">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://t.me/hamzaeditz2"
          className="text-indigo-400 hover:underline"
        >
          [ ★彡[ʜᴀᴍᴢᴀ ᴇᴅɪᴛᴢ]彡★
        </a>
        . All rights reserved.
      </footer>
    </div>
  );
}
