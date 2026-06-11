# 📄 Resumer  —AI Resume Builder

Visual-first, high-performance web suite engineered to streamline resume creation and optimization using modern declarative user interfaces and cloud-synced database layers.

![Stack](https://img.shields.io/badge/STACK-FULL--STACK-blue?style=for-the-badge)
![Frontend](https://img.shields.io/badge/FRONTEND-REACT%20%2F%20VITE-purple?style=for-the-badge)
![Backend](https://img.shields.io/badge/BACKEND-NODE%20%2F%20EXPRESS-brightgreen?style=for-the-badge)
![Database](https://img.shields.io/badge/DATABASE-FIREBASE-orange?style=for-the-badge)
![AI](https://img.shields.io/badge/AI%20ENGINE-GROQ%20LLM-red?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-yellow?style=for-the-badge)

🚀 [Click here  to open the website ](https://resumer-ai-resume-builder.vercel.app/)

---

## 📖 Project Description

**Resumer AI** is a fast and easy-to-use web application built to help job seekers create beautiful, professional resumes that easily pass through corporate hiring systems (ATS). The app features a clean layout, a step-by-step form wizard, a secure login system to save your work to the cloud, and a live side-by-side preview that updates instantly as you type.

Unlike old-school resume builders that are slow or lock your data behind hidden paywalls, this application focuses on speed and quality. It generates and handles everything right inside your web browser, allowing you to instantly download a pixel-perfect, print-ready PDF without any lag or expensive server setups.

---

## 🗺️ Table of Contents

1. 📱 [Features & Screenshots](#-features--screenshots)
2. 🏗️ [Technical Architecture](#-technical-architecture)
3. ⚙️ [Installation & Setup](#-installation--setup)
4. 🛠️ [How to Use the Project](#-how-to-use-the-project)
5. 📜 [License](#-license)
6. 🤝 [Credits & Acknowledgments](#-credits--acknowledgments)

---

## 📱 Features & Screenshots

### 🏠 1. Landing & Home Page
A clean, conversion-optimized landing page inviting users to build their ATS-friendly resume for free in just a few minutes.
<img src="https://github.com/user-attachments/assets/e3082d9f-d237-47fa-93c2-a179080e8e56" alt="Home Page" width="100%">

---

### 🔐 2. Secure Authentication
Seamless Google OAuth and Email/Password authentication powered by Firebase, keeping user data securely synced across sessions.
<img src="https://github.com/user-attachments/assets/31f345be-e333-4dad-9f19-3e7d3b17559a" alt="Login and Sign Up" width="100%">

---

### 📊 3. AI-Powered ATS Checker
A dedicated ATS resume scoring system evaluating parse rates, formatting, brevity, and impact metrics to ensure high interview callback rates.
<img src="https://github.com/user-attachments/assets/fddc65e9-0730-4897-bbbb-67c7586f5f73" alt="ATS Checker Page" width="100%">

---

### 🎨 4. Premium Template Selection
A curated library of modern, recruiter-approved templates tailored for various industries and experience levels.
<img src="https://github.com/user-attachments/assets/869562dc-e8b8-4a9e-bf5b-2454c18b5631" alt="Template Selection" width="100%">

---

### ✍️ 5. Smart Builder & Live Preview
Start from scratch manually or auto-fill your data by importing an existing PDF/DOCX. Features a real-time, side-by-side live preview that updates exactly as you type.
<img src="https://github.com/user-attachments/assets/6dbf8ecd-e055-4b39-a3fd-c8779f283c1a" alt="Data Entry and Live Preview" width="100%">

---

### 💾 6. Final Review & Export
Run a final ATS analysis on your newly built resume, save it directly to your cloud account, or instantly download a high-fidelity PDF to your device.
<img src="https://github.com/user-attachments/assets/cf5cc014-ddb5-4868-a0d7-31ed0e349897" alt="Final Review and Download" width="100%">

---

### 🗂️ 7. Personal Resume Dashboard
A centralized hub to manage previously created resumes. Easily edit, download, or permanently delete past versions with a single click.
<img src="https://github.com/user-attachments/assets/363b1efc-c34f-437d-9825-e1384a5e770f" alt="User Dashboard" width="100%">

---

## 🏗️ Technical Architecture

<img src="https://github.com/user-attachments/assets/1cf22db8-d7c4-4dee-a038-dc329a509fd2" alt="Technical Architecture Diagram" width="100%">

### 💻 1. Frontend System Layer (React + Vite)
* **UI Components & Live Preview:** Handles user data entry and displays real-time visual updates.
* **Form State Engine:** Monitors form inputs and feeds values down to the document extractor seamlessly.
* **Off-screen DOM Extractor & Client-Side PDF Generator:** Renders a clean, print-ready page layout off-screen and converts it directly into a PDF within the user's browser, bypassing heavy server processing.

### ⚙️ 2. Backend Service Layer (Node.js + Express)
* **Express Router / API Gateway:** Manages communication pathways between the frontend UI and backend parsing/scoring modules.
* **Document Parser (PDF/DOCX):** Extracts text data when a user uploads an old resume.
* **ATS Scoring Service:** Connects with external AI engines to analyze the extracted text and return actionable metrics.

### ☁️ 3. Cloud & External Services
* **Firebase Authentication:** Handles user login securely via OAuth or Email.
* **Firebase Firestore (Cloud Sync):** Saves and retrieves user resumes across sessions.
* **Groq AI Engine (LLM):** Receives resume text from the backend and computes ATS impact metrics.

---

## ⚙️ Installation & Setup

Follow these steps to clone the repository and spin up both the development backend server and frontend application workspace locally.

### 📋 Prerequisites
Make sure you have the following installed on your computer:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* [npm](https://www.npmjs.com/) (comes bundled with Node)

---

### 1. Clone the Repository
Open your terminal, navigate to the folder where you want to save the project, and run:

```bash
git clone [https://github.com/JAKOB-010/Resumer-ai-resume-builder.git](https://github.com/JAKOB-010/Resumer-ai-resume-builder.git)
cd Resumer-ai-resume-builder
```

---

### ⚙️ 2. Backend Environment Setup (`/backend`)
Navigate into the backend directory, install the required dependencies, and create your environment file:

```bash
cd backend
npm install
touch .env
```

Open the newly created `.env` file in your code editor and configure your API keys:

```env
PORT=5000
GROQ_API_KEY=gsk_your_actual_groq_key_here
```

Start the backend server:

```bash
npm run dev
```

---

### 💻 3. Frontend Environment Setup (`/frontend`)
Open a new terminal window, ensure you are in the root project folder, and step into the frontend workspace:

```bash
cd frontend
npm install
touch .env
```

Open the frontend `.env` file and add your Firebase configuration details:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Launch the local development preview:

```bash
npm run dev
```

Once both servers are actively listening, open your browser and navigate to the address displayed in your frontend terminal (typically `http://localhost:5173`) to start building resumes!

---

## 🛠️ How to Use the Project

Follow this walk-through to see how to navigate the application and build your own ATS-optimized resume.

### 🔐 Step 1: Authentication
* **Secure Access:** Click **Get Started** and sign in using either Google OAuth or standard email credentials to create your persistent workspace.

---

### 📊 Step 2: Choose Your Path
From the primary application landing page, you can select one of two main entry points:
1. **Check Resume ATS Score:** Navigate straight to the diagnostic scanner.
2. **Create New Resume:** Move directly into the premium templates list.

> 💡 **Option A: Run an ATS Diagnostic Audit**
> If you choose to audit an existing file, drop your current PDF or DOCX file (up to 2MB) into the smart scanner. The AI backend will extract data points instantly to return an aggregate score along with individual indicators for **ATS Parse Rate**, **Format & Brevity**, and **Impact Metrics**.

---

### 🎨 Step 3: Select an ATS-Friendly Template
* **Recruiter-Tested Designs:** Browse through over 20+ layout matrices optimized for corporate tracking systems.
* **Layout Isolation:** Click **Full View** to inspect details or hit **Select** to activate that template profile for your builder sandbox.

---

### ✍️ Step 4: Populate Data & Watch the Live Preview
* **Data Ingestion:** Choose to **Upload from Resume** to automatically parse your old background info into form structures, or click **Start Manually** to build from scratch.
* **Reactive Feedback Loop:** Enter your personal, contact, and professional history into the structured input panel on the left. The canvas workspace on the right updates instantly as you type without screen flicker.

---

### 🚀 Step 5: Run Final Audit & Export
* **Run AI Analysis:** Click **Run ATS Score** inside your evaluation window to trigger the external LLM pipeline for line-by-line optimization tips.
* **Local Printing Engine:** Hit **Download as PDF** to invoke the client-side canvas engine, exporting a perfectly formatted document straight to your local drive.
* **Cloud Persistence:** Select **Save to Account** to back up your current progress to the Firestore database workspace.

---

### 🗂️ Step 6: Central Workspace Management
* **My Resumes Dashboard:** Return to your dashboard home anytime to access saved resume structures. From here, you can **Edit** to adjust details, instantly **Download** updated variations, or permanently remove copies via the **Delete** button.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute this software.

---

## 🤝 Credits & Acknowledgments

* **Frontend Framework:** [React](https://react.dev/) & [Vite](https://vitejs.dev/)
* **Backend Runtime:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
* **Database & Auth:** [Firebase](https://firebase.google.com/)
* **AI Engine:** [Groq](https://groq.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
