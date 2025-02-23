// "use client";
// import { useState, useEffect } from "react";
// import { addAdmin } from "../../utils/admin";
// import { storeAdminCredentials } from "../../utils/db";

// export default function AdminSignup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [account, setAccount] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const connectWallet = async () => {
//     if (typeof window !== "undefined" && window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error("Wallet connection failed:", error);
//         setMessage("⚠ Wallet connection failed.");
//       }
//     } else {
//       alert("⚠ MetaMask is not installed. Please install it to continue.");
//     }
//   };

//   const handleSignup = async () => {
//     if (!account) {
//       setMessage("⚠️ Please connect your wallet first.");
//       return;
//     }
  
//     try {
//       const response = await fetch("/api/storeAdmin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           password,
//           walletAddress: account,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setMessage("✅ Admin registered successfully!");
//       } else {
//         setMessage(`❌ ${data.error}`);
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setMessage("❌ Signup failed.");
//     }
//   };
  

//   const styles = {
//     container: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "100vh",
//       background: "url('/background.jpg') no-repeat center center/cover",
//     },
//     card: {
//       background: "rgba(255, 255, 255, 0.9)",
//       padding: "2rem",
//       borderRadius: "10px",
//       boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
//       textAlign: "center",
//       width: "400px",
//     },
//     heading: {
//       fontSize: "2rem",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       margin: "10px 0",
//       border: "1px solid #ccc",
//       borderRadius: "5px",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: "linear-gradient(135deg, #007bff, #00d4ff)",
//       color: "white",
//       border: "none",
//       borderRadius: "5px",
//       cursor: "pointer",
//       transition: "transform 0.2s",
//     },
//     buttonHover: {
//       background: "linear-gradient(135deg, #0056b3, #00aaff)",
//       transform: "scale(1.05)",
//     },
//     message: {
//       marginTop: "10px",
//       color: "red",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       {isClient && (
//         <div style={styles.card}>
//           <h1 style={styles.heading}>Admin Signup</h1>
//           {!account ? (
//             <button
//               style={styles.button}
//               onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//               onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//               onClick={connectWallet}
//             >
//               Connect Wallet
//             </button>
//           ) : (
//             <>
//               <p style={{ color: "green" }}>✅ Connected: {account}</p>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 style={styles.input}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 style={styles.input}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 style={styles.button}
//                 onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//                 onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//                 onClick={handleSignup}
//               >
//                 Sign Up
//               </button>
//               <p>Already have an account?</p>
//               <a href="/admin-login">
//                 <button
//                   style={styles.button}
//                   onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//                   onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//                 >
//                   Login
//                 </button>
//               </a>
//               {message && <p style={styles.message}>{message}</p>}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        setMessage("⚠ Wallet connection failed.");
      }
    } else {
      alert("⚠ MetaMask is not installed. Please install it to continue.");
    }
  };

  const handleSignup = async () => {
    if (!account) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }
  
    try {
      const response = await fetch("/api/storeAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          walletAddress: account,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("✅ Admin registered successfully!");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setMessage("❌ Signup failed. Please check the console for details.");
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch("/api/fetchAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched admin data:", data.admin);
        setMessage("✅ Admin data fetched successfully!");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
      setMessage("❌ Failed to fetch admin data.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "url('/background.jpg') no-repeat center center/cover",
    },
    card: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
      textAlign: "center",
      width: "400px",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(135deg, #007bff, #00d4ff)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    buttonHover: {
      background: "linear-gradient(135deg, #0056b3, #00aaff)",
      transform: "scale(1.05)",
    },
    message: {
      marginTop: "10px",
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      {isClient && (
        <div style={styles.card}>
          <h1 style={styles.heading}>Admin Signup</h1>
          {!account ? (
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <p style={{ color: "green" }}>✅ Connected: {account}</p>
              <input
                type="email"
                placeholder="Email"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                style={styles.button}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                onClick={handleSignup}
              >
                Sign Up
              </button>
              <p>Already have an account?</p>
              <a href="/admin-login">
                <button
                  style={styles.button}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Login
                </button>
              </a>
              {message && <p style={styles.message}>{message}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}