# 🚀 PromptPad — The Full-Stack Prompt Engineering Workspace

*PromptPad* is a full-stack *Next.js* application built from scratch — a complete workspace for *prompt engineers, **AI creators, and **developers* who want to write, test, and analyze prompts in one place.

This project was developed independently from the ground up — *idea → execution → UI/UX → database + authentication → debugging → final prototype*.

---

## ✨ Overview

PromptPad is designed to feel like a *VS Code–style editor* for AI prompt workflows.  
It lets you:

- 🧾 Write and save prompts (with version-like tracking)  
- ✏ Edit and update prompts directly in the editor  
- ⚖ Compare multiple prompts side-by-side  
- 📊 Analyze latency per prompt  
- 🤖 Generate AI outputs directly using the *open-source [Puter.js](https://puter.com)* library  

> Built for prompt engineers who actually build.

---

## 🔥 Features

| Feature | Description |
|----------|-------------|
| *AI Output Generation* | Integrated with Puter.js to generate outputs without external API dependencies. |
| *Prompt Analytics* | Displays prompt performance (currently reads 0 ms latency due to site design). |
| *GitHub Authentication* | Uses NextAuth.js with GitHub OAuth — simple, secure, dev-centric. |
| *Responsive Dashboard* | Built with Tailwind CSS for a clean, modern UI. |
| *MongoDB + Mongoose* | Persistent storage for all prompts and generated outputs. |
| *Compare View* | View and analyze prompts side by side. |
| *Production-Ready Architecture* | Modular code, RESTful API routes, and full Next.js app-router setup. |

---

## 🔒 Why Only GitHub Auth?

PromptPad is designed for *developers and prompt engineers* — people who already live on GitHub.  
It’s not meant for casual users or generic accounts; it’s a focused workspace for builders.

That’s why the only sign-in method right now is *GitHub OAuth*.  
> Other providers (Google, etc.) may be added later — but keeping the workspace focused felt right for this stage.

---

## 🧠 Tech Stack

| Layer | Tech |
|-------|------|
| *Framework* | Next.js 15 (App Router) |
| *Styling* | Tailwind CSS |
| *Backend* | Next.js API Routes |
| *Database* | MongoDB Atlas + Mongoose |
| *Auth* | NextAuth.js (GitHub OAuth) |
| *AI Integration* | Puter.js (open-source AI API) |

---

## 🧰 Future Improvements

🔁 Multi-model support (GPT-5 Nano, Llama, Mistral, etc.)  
🌐 Multi-auth providers (Google OAuth + Email Magic Link)  
📈 Real-time analytics for latency & output metrics  
🧱 Collaborative prompt editing  

---

## 💬 About

PromptPad started as an experiment — a personal challenge to build something uniquely mine rather than another tutorial clone.  
Now it stands as a fully functional AI prompt editor ready for future scalability.

> “I made a VS Code-like workspace for prompt engineers — not a clone, not a course assignment, but an idea I built end-to-end.”

---

## 📎 Links

🔗 Initial Prototype Post: [Initial prototype](https://www.linkedin.com/posts/mohd-abdul-sabeeh-38429a2ba_buildinpublic-nextjs-mernstack-activity-7393017755643465728-CGaJ)  
🚀 Final Prototype Post: [Final Prototype](https://www.linkedin.com/posts/mohd-abdul-sabeeh-38429a2ba_nextjs-react-puterjs-activity-7394035822301384704-WWis)

---

## 🧑‍💻 Author

*Mohd Abdul Sabeeh*  
Full-Stack Developer 
📧 sabeeh.abdul@outlook.com  
🌐 [LinkedIn](https://www.linkedin.com/in/mohd-abdul-sabeeh-38429a2ba) • [GitHub](https://github.com/qwerty12-ai/)

---

## 🪪 License

This project is licensed under the *MIT License* — you’re free to use, modify, and distribute this project, provided that proper credit is given to the original author.  

See the [LICENSE](./LICENSE) file for details.

---

🏷 *Tags*  
#Nextjs #PuterJS #AI #FullStack #PromptEngineering #BuildInPublic #NextAuth #Tailwind
