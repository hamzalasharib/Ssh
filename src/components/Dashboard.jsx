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
    target="_blank"
    rel="noopener noreferrer"
  >
    [ ★彡[ʜᴀᴍᴢᴀ ᴇᴅɪᴛᴢ]彡★
  </a>
  . All rights reserved.
  <div className="mt-2 flex justify-center space-x-4">
    <a
      href="https://youtube.com/@hamzashafiq786"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-red-500 hover:underline"
    >
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
      Subscribe
    </a>
    <a
      href="https://chat.whatsapp.com/JnSg1CSyEIJ4hWpDRJVF3c"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-green-500 hover:underline"
    >
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Join WhatsApp
    </a>
  </div>
</footer>
    </div>
  );
}
