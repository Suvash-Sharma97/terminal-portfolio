import { useState, useEffect, useRef } from "react";
import "./styles.css";

const Terminal = ({ root, user }) => {
    const [history, setHistory] = useState([
        "Welcome to my portfolio! Type 'help' to see available commands."
    ]);
    const [input, setInput] = useState("");
    const [historyIndex, setHistoryIndex] = useState(null);
    const [previousCommands, setPreviousCommands] = useState([]);
    const inputRef = useRef(null);

    const designation = (
        <span className="text-large terminal-heading">
            <span className="terminal-user">{root}</span>
            <span className="terminal-symbol">@</span>
            <span className="terminal-user">{user}</span>
            <span className="terminal-symbol">:</span>
            <span className="terminal-tilde">~</span>
            <span className="terminal-symbol">$</span>
        </span>
    );

    const commands = {
        help: (
            <>
                Available commands: help, about, contact, clear, projects, resume, skills, sayhi, neofetch, uname, uptime, whoami, fortune, cowsay
            </>
        ),
        about: (
            <>
                <div>Hello, I'm Suvash — a web developer with a strong interest in cybersecurity and secure software development practices.</div>
                <div>I'm from Nepal, and I'm deeply passionate about working in Linux environments and exploring open-source security tools.</div>
                <div>My stack includes React, Spring Boot (with Spring Security & Spring AI), and MySQL.</div>
                <div>I strongly believe in building secure-by-design systems and continuously improving through hands-on practice and learning.</div>
            </>
        ),
        contact: (
            <>
                <div>You can reach me through the following channels:</div>
                <div>Email: <a href="mailto:suvashsharma97@gmail.com" className="text-success">suvashsharma97@gmail.com</a></div>
                <div>WhatsApp: <a href="https://wa.me/916381282910" target="_blank" rel="noopener noreferrer" className="text-success">+91-6381282910</a></div>
                <div>GitHub: <a href="https://www.github.com/Suvash-Sharma97" target="_blank" rel="noopener noreferrer" className="text-success">github.com/Suvash-Sharma97</a></div>
            </>
        ),
        projects: (
            <>
                <div>Here are some of my highlighted projects:</div>
                <ul>
                    <li><strong>SecureNotes</strong> - A full-stack notes app with Spring Security & JWT. [<a href="https://github.com/Suvash-Sharma97/SecureNotes" target="_blank" rel="noopener noreferrer" className="text-success">GitHub</a>]</li>
                    <li><strong>Fake News Detector</strong> - An LSTM-based ML project using Word2Vec for NLP. [<a href="https://github.com/Suvash-Sharma97/FakeNewsDetector" target="_blank" rel="noopener noreferrer" className="text-success">GitHub</a>]</li>
                </ul>
            </>
        ),
        clear: "clear",
        resume: (
            <>
                <div>You can download my resume <a href="/resume.pdf" target="_blank" className="text-success">here</a>.</div>
            </>
        ),
        skills: (
            <>
                <div>Frontend : React.js</div>
                <div>Backend : Spring Boot with Spring AI and Spring Security</div>
                <div>Database: MySQL</div>
                <div>Languages: Python, Java and C</div>
                <div>Plus: Version Control with Git and Github, Postman</div>
                <div>Security: Burpsuite, Linux and Shell Scripting, Experience with CTFs, PortSwigger Labs and DVWA</div>
                <div>I guess being excellent with problem solving also counts as a skill :)</div>

            </>
        ),
        sayhi: (<div>Thanks for reaching out! Message recorded (mocked).</div>),
        uname: (<div>Linux suportfolio 6.1.0-0-amd64 #1 SMP x86_64 GNU/Linux</div>),
        whoami: (<div>suvash</div>),
        dir: "They say it's not a good habit to peek into someone else's folders.....jk :)",
        ls: "They say it's not a good habit to peek into someone else's folders.....jk :)",
        uptime: (<div>Uptime: 8 months, 12 days</div>),
        neofetch: (
            <>
                <div>OS: Suvash Linux x86_64</div>
                <div>Kernel: 6.1.0</div>
                <div>Uptime: 8 months</div>
                <div>Packages: 1823 (npm)</div>
                <div>Shell: custom-terminal</div>
                <div>Resolution: 1920x1080</div>
                <div>Theme: Navy Blue [Dark]</div>
                <div>Terminal: WebTTY</div>
            </>
        ),
        exit: "No, please don't leave this early :(",
        fortune: (<div>"Code is like humor. When you have to explain it, it’s bad."</div>),
        cowsay: (<><pre>  ________
            Hello!
            ___________
            <div> \   ^__^</div>
            <div>  \  (oo)\_______</div>
            <div>     (__)\       )\/\</div>
            <div>         ||----w |</div>
            <div>         ||     ||</div></pre></>)
    };

    const handleCommand = (cmd) => {
        if (!cmd.trim()) return;

        if (cmd === "clear" || cmd === "cls") {
            setHistory([]);
        } else {
            const baseCommand = cmd.split(" ")[0];
            setHistory((prevHistory) => [
                ...prevHistory,
                <span className="text-large terminal-heading" style={{ lineHeight: "1.25rem" }}>{designation} <span>{cmd}</span></span>,
                commands[baseCommand] || <span>Command not found. Type 'help' for available commands.</span>
            ]);
        }
        setPreviousCommands((prev) => [...prev, cmd]);
        setHistoryIndex(null);
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCommand(input);
        } else if (e.key === "ArrowUp") {
            if (previousCommands.length) {
                const newIndex = historyIndex === null ? previousCommands.length - 1 : Math.max(0, historyIndex - 1);
                setInput(previousCommands[newIndex]);
                setHistoryIndex(newIndex);
            }
        } else if (e.key === "ArrowDown") {
            if (previousCommands.length && historyIndex !== null) {
                const newIndex = historyIndex + 1;
                if (newIndex < previousCommands.length) {
                    setInput(previousCommands[newIndex]);
                    setHistoryIndex(newIndex);
                } else {
                    setInput("");
                    setHistoryIndex(null);
                }
            }
        }
    };

    useEffect(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-dark text-success p-3 m-0" style={{ fontFamily: "monospace" }}>
            <div className="flex-grow-1 overflow-auto">
                {history.map((line, index) => (
                    <p key={index} className="mb-1 text-large">{line}</p>
                ))}
                <div className="d-flex">
                    {designation}
                    <input
                        ref={inputRef}
                        type="text"
                        className="form-control bg-dark border-0 ml-2 terminal-input"
                        style={{
                            outline: "none",
                            boxShadow: "none",
                            fontSize: "1.25rem",
                            fontFamily: "monospace",
                            lineHeight: "1.25rem",
                            padding: "0 10px",
                            margin: "0",
                            height: "auto",
                            color: "#0f0"
                        }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
