<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Name - Personal Page</title>
  <style>
    :root {
      --bg-color: #0d1117;
      --text-color: #c9d1d9;
      --accent-color: #58a6ff;
      --card-color: #161b22;
      --hover-color: #21262d;
      --gradient: linear-gradient(135deg, #58a6ff, #7c3aed);
    }
    
    * {
      box-sizing: border-box;
    }
    
    .pizza-container {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 200px;
      height: 200px;
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .pizza-container:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 40px rgba(88, 166, 255, 0.6);
    }
    
    .pizza-chart {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
      background: radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 20%, #FF8C00 40%, #D2691E 100%);
      box-shadow: 
        0 0 0 12px #8B4513,
        0 0 0 16px #A0522D,
        0 8px 25px rgba(0, 0, 0, 0.4),
        inset 0 0 30px rgba(255, 215, 0, 0.3);
      border: 2px solid #654321;
    }
    
    .pizza-slice {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform-origin: 0 0;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 3;
    }
    
    .pizza-slice::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 95px solid transparent;
      border-right: 95px solid transparent;
      border-bottom: 95px solid;
      border-bottom-color: inherit;
      transform: translateX(-95px);
      opacity: 0.9;
      transition: all 0.3s ease;
    }
    
    .pizza-slice:hover::before {
      transform: translateX(-95px) scale(1.05);
      opacity: 1;
      filter: brightness(1.2) drop-shadow(0 0 10px currentColor);
    }
    
    .pizza-slice:hover {
      z-index: 10;
    }
    
    .tech-icon {
      position: absolute;
      top: -60px;
      left: -12px;
      font-size: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid currentColor;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 5;
    }
    
    .pizza-slice:hover .tech-icon {
      transform: scale(1.2);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }
    
    .tech-tooltip {
      position: fixed;
      background: var(--card-color);
      color: var(--text-color);
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      border: 2px solid var(--accent-color);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      z-index: 1001;
      backdrop-filter: blur(10px);
      max-width: 200px;
      text-align: center;
      line-height: 1.4;
    }
    
    .pizza-slice:hover .tech-tooltip {
      opacity: 1;
    }
    
    .pizza-toppings {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      top: 0;
      left: 0;
      z-index: 2;
      pointer-events: none;
    }
    
    .topping {
      position: absolute;
      border-radius: 50%;
      opacity: 0.8;
      transition: all 0.3s ease;
    }
    
    .pepperoni {
      background: radial-gradient(circle at 30% 30%, #DC143C, #8B0000);
      width: 12px;
      height: 12px;
      border: 1px solid #660000;
      box-shadow: inset 1px 1px 2px rgba(220, 20, 60, 0.5);
    }
    
    .cheese-bubble {
      background: radial-gradient(circle at 40% 40%, #FFFACD, #FFD700);
      width: 8px;
      height: 8px;
      border: 1px solid #DAA520;
    }
    
    .mushroom {
      background: radial-gradient(circle at 30% 30%, #DEB887, #8B7355);
      width: 10px;
      height: 10px;
      border: 1px solid #654321;
    }
    
    .pizza-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: radial-gradient(circle at 40% 40%, #FFFACD, #FFD700, #FFA500);
      border-radius: 50%;
      border: 3px solid #DAA520;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      z-index: 20;
      box-shadow: 
        0 0 10px rgba(255, 215, 0, 0.6),
        inset 0 0 15px rgba(255, 255, 255, 0.3);
      animation: cheeseGlow 3s ease-in-out infinite alternate;
    }
    
    @keyframes cheeseGlow {
      from { box-shadow: 0 0 10px rgba(255, 215, 0, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3); }
      to { box-shadow: 0 0 20px rgba(255, 215, 0, 0.9), inset 0 0 25px rgba(255, 255, 255, 0.5); }
    }
    
    .dashboard-container {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: rgba(22, 27, 34, 0.95);
      border-radius: 12px;
      border: 1px solid rgba(88, 166, 255, 0.3);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      padding: 20px;
      transition: all 0.3s ease;
    }
    
    .dashboard-header {
      color: var(--accent-color);
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
      text-align: center;
    }
    
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px;
      background: rgba(33, 38, 45, 0.5);
      border-radius: 6px;
      border-left: 3px solid transparent;
      transition: all 0.3s ease;
    }
    
    .metric-row:hover {
      background: rgba(33, 38, 45, 0.8);
      border-left-color: var(--accent-color);
    }
    
    .metric-label {
      font-size: 12px;
      color: var(--text-color);
    }
    
    .metric-value {
      font-size: 12px;
      font-weight: 600;
      color: var(--accent-color);
    }
    
    .progress-bar {
      width: 60px;
      height: 4px;
      background: rgba(88, 166, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-color), #7c3aed);
      transition: width 2s ease;
      border-radius: 2px;
    }
    
    .mini-chart {
      width: 80px;
      height: 20px;
      background: rgba(88, 166, 255, 0.1);
      border-radius: 3px;
      position: relative;
      overflow: hidden;
    }
    
    .chart-line {
      position: absolute;
      bottom: 0;
      width: 2px;
      background: var(--accent-color);
      transition: height 0.5s ease;
      margin-right: 1px;
    }
      margin: 0;
      padding: 0;
      background: var(--bg-color);
      background-image: radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, #172554 0%, transparent 50%);
      color: var(--text-color);
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      animation: fadeIn 2s ease-in;
      line-height: 1.6;
      position: relative;
      overflow-x: hidden;
    }
    
    .sparks-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    
    .spark {
      position: absolute;
      width: 3px;
      height: 3px;
      background: var(--accent-color);
      border-radius: 50%;
      opacity: 0;
      animation: sparkle 4s infinite ease-in-out;
      box-shadow: 0 0 6px var(--accent-color);
    }
    
    .spark:nth-child(odd) {
      background: #7c3aed;
      box-shadow: 0 0 6px #7c3aed;
      animation-delay: -2s;
    }
    
    .spark:nth-child(3n) {
      background: #f59e0b;
      box-shadow: 0 0 6px #f59e0b;
      animation-delay: -1s;
    }
    
    .spark:nth-child(4n) {
      background: #10b981;
      box-shadow: 0 0 6px #10b981;
      animation-delay: -3s;
    }
    
    .floating-particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
    
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(88, 166, 255, 0.6);
      border-radius: 50%;
      animation: float 20s infinite linear;
    }
    
    .particle:nth-child(2n) {
      background: rgba(124, 58, 237, 0.4);
      animation-duration: 25s;
      animation-delay: -5s;
    }
    
    .particle:nth-child(3n) {
      background: rgba(245, 158, 11, 0.3);
      animation-duration: 30s;
      animation-delay: -10s;
    }
    
    header {
      text-align: center;
      margin: 50px 0 30px;
      position: relative;
    }
    
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--gradient);
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      animation: pulse 2s infinite;
      box-shadow: 0 0 30px rgba(88, 166, 255, 0.3);
    }
    
    h1 {
      font-size: 3em;
      margin-bottom: 10px;
      background: var(--gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: glow 3s ease-in-out infinite alternate;
    }
    
    .tagline {
      font-size: 1.2em;
      color: #8b949e;
      margin-bottom: 20px;
    }
    
    .social-links {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 20px;
    }
    
    .social-link {
      padding: 8px 16px;
      background: var(--card-color);
      border-radius: 20px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    .social-link:hover {
      background: var(--hover-color);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(88, 166, 255, 0.2);
      border-color: var(--accent-color);
    }
    
    .card {
      background: var(--card-color);
      background-image: linear-gradient(145deg, var(--card-color), #1a1f26);
      padding: 30px;
      margin: 20px;
      width: 90%;
      max-width: 700px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(88, 166, 255, 0.1);
      animation: slideUp 1.5s ease-out;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: var(--gradient);
      transition: left 0.5s ease;
    }
    
    .card:hover::before {
      left: 0;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
    }
    
    .card h2 {
      color: var(--accent-color);
      margin-bottom: 20px;
      font-size: 1.8em;
    }
    
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }
    
    .skill-tag {
      background: rgba(88, 166, 255, 0.1);
      color: var(--accent-color);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.9em;
      border: 1px solid rgba(88, 166, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .skill-tag:hover {
      background: rgba(88, 166, 255, 0.2);
      transform: scale(1.05);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .project-card {
      background: rgba(33, 38, 45, 0.8);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(88, 166, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .project-card:hover {
      border-color: var(--accent-color);
      transform: scale(1.02);
    }
    
    .project-title {
      color: var(--accent-color);
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .cta-button {
      display: inline-block;
      background: var(--gradient);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(88, 166, 255, 0.4);
      text-decoration: none;
    }
    
    a {
      color: var(--accent-color);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    a:hover {
      color: #79c0ff;
      text-decoration: underline;
    }
    
    footer {
      margin-top: auto;
      padding: 40px 20px 20px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
      border-top: 1px solid rgba(88, 166, 255, 0.1);
      width: 100%;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes glow {
      from { filter: drop-shadow(0 0 5px rgba(88, 166, 255, 0.5)); }
      to { filter: drop-shadow(0 0 20px rgba(88, 166, 255, 0.8)); }
    }
    
    @keyframes sparkle {
      0% {
        opacity: 0;
        transform: translateY(0) scale(0);
      }
      10% {
        opacity: 1;
        transform: translateY(-10px) scale(1);
      }
      20% {
        opacity: 1;
        transform: translateY(-20px) scale(1.2);
      }
      100% {
        opacity: 0;
        transform: translateY(-100px) scale(0);
      }
    }
    
    @keyframes float {
      0% {
        transform: translateY(100vh) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    @media (max-width: 768px) {
      h1 { font-size: 2.5em; }
      .card { margin: 15px; padding: 20px; }
      .social-links { flex-wrap: wrap; }
      .projects-grid { grid-template-columns: 1fr; }
      
      .dashboard-container {
        width: 180px;
        top: 10px;
        right: 10px;
        padding: 10px;
      }
      
      .dashboard-header {
        font-size: 10px;
        margin-bottom: 8px;
      }
      
      .metric-row {
        margin-bottom: 6px;
        padding: 4px;
      }
      
      .metric-label, .metric-value {
        font-size: 9px;
      }
      
      .progress-bar {
        width: 35px;
        height: 2px;
      }
      
      .mini-chart {
        width: 45px;
        height: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="sparks-container" id="sparksContainer"></div>
  <div class="floating-particles" id="particlesContainer"></div>
  
  <!-- Real-time Dashboard -->
  <div class="dashboard-container">
    <div class="dashboard-header">⚡ DevOps Metrics Dashboard</div>
    <div class="metric-row">
      <span class="metric-label">Docker Uptime</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 95%"></div>
      </div>
      <span class="metric-value">95%</span>
    </div>
    <div class="metric-row">
      <span class="metric-label">K8s Clusters</span>
      <div class="mini-chart" id="k8sChart"></div>
      <span class="metric-value">3 Active</span>
    </div>
    <div class="metric-row">
      <span class="metric-label">CI/CD Pipeline</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 87%"></div>
      </div>
      <span class="metric-value">87%</span>
    </div>
    <div class="metric-row">
      <span class="metric-label">AWS Load</span>
      <div class="mini-chart" id="awsChart"></div>
      <span class="metric-value">42%</span>
    </div>
    <div class="metric-row">
      <span class="metric-label">Monitoring</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 98%"></div>
      </div>
      <span class="metric-value">98%</span>
    </div>
  </div>
  
  <header>
    <div class="profile-image">🤖</div>
    <h1>Ben-levi</h1>
    <p class="tagline">AI Enthusiast • Electrical Engineer • Tech Innovator</p>
    <div class="social-links">
      <a href="https://github.com/Ben-levi" target="_blank" class="social-link">GitHub</a>
      <a href="https://linkedin.com/in/ben-levi" target="_blank" class="social-link">LinkedIn</a>
      <a href="mailto:philepin@gmail.com" class="social-link">Email</a>
      <a href="https://twitter.com/ben_levi" target="_blank" class="social-link">Twitter</a>
    </div>
  </header>

  <div class="card">
    <h2>👋 Hi there, I'm Ben-levi!</h2>
    <p>🚀 A tech enthusiast dedicated to leveraging AI and IoT to create impactful solutions and exploring the ever-evolving tech landscape.</p>
    <p>💡 <strong>Electrifying guy:</strong> I'm an Electrical Engineer with a zest for innovation, passionate about pushing the boundaries of what's possible with technology.</p>
    
    <div style="margin: 20px 0;">
      <p>👀 I'm interested in <strong>AI, tech in general, and Internet of Things (IoT)</strong></p>
      <p>🌱 I'm currently learning <strong>advanced neural networks, Python, and IoT systems</strong></p>
      <p>💞️ I'm looking to collaborate on <strong>AI-driven projects, IoT innovations, and tech community initiatives</strong></p>
      <p>📫 How to reach me: <a href="mailto:philepin@gmail.com">philepin@gmail.com</a></p>
    </div>
    
    <div style="background: rgba(88, 166, 255, 0.1); padding: 15px; border-radius: 10px; margin: 15px 0;">
      <p><strong>💖 Emoji lover:</strong> 😃🤖⚽️🏠🥋</p>
      <p><strong>⚡ Fun fact:</strong> I'm a passionate soccer fan ⚽️, a devoted family guy 🏠, and I love MMA! 🥋</p>
    </div>
    
    <div class="skills">
      <span class="skill-tag">🤖 AI/ML</span>
      <span class="skill-tag">🐍 Python</span>
      <span class="skill-tag">🌐 IoT</span>
      <span class="skill-tag">⚡ Electrical Engineering</span>
      <span class="skill-tag">🧠 Neural Networks</span>
      <span class="skill-tag">🔧 Hardware</span>
      <span class="skill-tag">💻 Software</span>
    </div>
  </div>

  <div class="card">
    <h2>💻 Tech Stack</h2>
    <div class="tech-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
      <div class="tech-category">
        <h4 style="color: var(--accent-color); margin-bottom: 10px;">🤖 AI/ML</h4>
        <div class="skills">
          <span class="skill-tag">TensorFlow</span>
          <span class="skill-tag">PyTorch</span>
          <span class="skill-tag">Scikit-learn</span>
          <span class="skill-tag">OpenCV</span>
        </div>
      </div>
      <div class="tech-category">
        <h4 style="color: var(--accent-color); margin-bottom: 10px;">🐍 Languages</h4>
        <div class="skills">
          <span class="skill-tag">Python</span>
          <span class="skill-tag">C++</span>
          <span class="skill-tag">JavaScript</span>
          <span class="skill-tag">MATLAB</span>
        </div>
      </div>
      <div class="tech-category">
        <h4 style="color: var(--accent-color); margin-bottom: 10px;">🌐 IoT & Hardware</h4>
        <div class="skills">
          <span class="skill-tag">Arduino</span>
          <span class="skill-tag">Raspberry Pi</span>
          <span class="skill-tag">ESP32</span>
          <span class="skill-tag">MQTT</span>
        </div>
      </div>
      <div class="tech-category">
        <h4 style="color: var(--accent-color); margin-bottom: 10px;">⚡ Engineering</h4>
        <div class="skills">
          <span class="skill-tag">Circuit Design</span>
          <span class="skill-tag">PCB Design</span>
          <span class="skill-tag">Signal Processing</span>
          <span class="skill-tag">Power Systems</span>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>🚀 Featured Projects</h2>
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-title">🤖 AI-Powered IoT System</div>
        <p>An intelligent IoT platform that uses machine learning to optimize home automation and energy consumption.</p>
      </div>
      <div class="project-card">
        <div class="project-title">🧠 Neural Network Framework</div>
        <p>A custom Python framework for building and training neural networks with a focus on IoT applications.</p>
      </div>
      <div class="project-card">
        <div class="project-title">⚡ Smart Circuit Designer</div>
        <p>An innovative tool that uses AI to assist electrical engineers in circuit design and optimization.</p>
      </div>
    </div>
    <a href="https://github.com/Ben-levi" target="_blank" class="cta-button">View All Projects</a>
  </div>

  <div class="card">
    <h2>📊 GitHub Stats</h2>
    <div style="text-align: center; margin: 20px 0;">
      <img src="https://github-readme-stats.vercel.app/api?username=Ben-levi&theme=dark&hide_border=true&include_all_commits=true&count_private=true" alt="GitHub Stats" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px;">
      <br>
      <img src="https://github-readme-streak-stats.herokuapp.com/?user=Ben-levi&theme=dark&hide_border=true" alt="GitHub Streak" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px;">
      <br>
      <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Ben-levi&theme=dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact" alt="Top Languages" style="max-width: 100%; height: auto; border-radius: 8px;">
    </div>
  </div>

  <div class="card">
    <h2>🏆 GitHub Trophies</h2>
    <div style="text-align: center; margin: 20px 0;">
      <img src="https://github-profile-trophy.vercel.app/?username=Ben-levi&theme=darkhub&no-frame=true&no-bg=false&margin-w=4" alt="GitHub Trophies" style="max-width: 100%; height: auto;">
    </div>
  </div>

  <div class="card">
    <h2>✍️ Random Dev Quote</h2>
    <div style="text-align: center; margin: 20px 0; padding: 20px; background: rgba(88, 166, 255, 0.1); border-radius: 10px; border-left: 4px solid var(--accent-color);">
      <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark" alt="Random Dev Quote" style="max-width: 100%; height: auto;">
    </div>
  </div>

  <div class="card">
    <h2>🤝 Let's Connect & Collaborate</h2>
    <p>I'm always interested in collaborating on <strong>AI-driven projects</strong>, <strong>IoT innovations</strong>, and <strong>tech community initiatives</strong>. Whether you have a groundbreaking project idea, want to contribute to open source, or just want to chat about the latest in AI and IoT, feel free to reach out!</p>
    <p>As a passionate tech enthusiast and electrical engineer, I love connecting with fellow innovators who share the same excitement for pushing technological boundaries. 🚀</p>
    <a href="mailto:philepin@gmail.com" class="cta-button">Get In Touch 📫</a>
  </div>

  <footer>
    <p>&copy; 2025 Ben-levi. Built with ❤️, AI enthusiasm, and lots of ⚡ electrical engineering magic!</p>
    <p>😃🤖⚽️🏠🥋 - Living life with passion for tech, family, and fun!</p>
  </footer>

  <script>
    // Create animated mini charts
    function createMiniChart(containerId, dataPoints) {
      const container = document.getElementById(containerId);
      const chartWidth = 60;
      const barWidth = 2;
      const barCount = Math.floor(chartWidth / (barWidth + 1));
      
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'chart-line';
        bar.style.left = `${i * (barWidth + 1)}px`;
        bar.style.height = `${Math.random() * 100}%`;
        container.appendChild(bar);
      }
    }
    
    // Animate charts
    function animateCharts() {
      const k8sChart = document.getElementById('k8sChart');
      const awsChart = document.getElementById('awsChart');
      
      setInterval(() => {
        // Animate K8s chart
        const k8sBars = k8sChart.querySelectorAll('.chart-line');
        k8sBars.forEach(bar => {
          bar.style.height = `${20 + Math.random() * 60}%`;
        });
        
        // Animate AWS chart
        const awsBars = awsChart.querySelectorAll('.chart-line');
        awsBars.forEach(bar => {
          bar.style.height = `${10 + Math.random() * 70}%`;
        });
      }, 2000);
    }
    
    // Update dashboard metrics randomly
    function updateMetrics() {
      setInterval(() => {
        const progressBars = document.querySelectorAll('.progress-fill');
        const metricValues = document.querySelectorAll('.metric-value');
        
        progressBars.forEach((bar, index) => {
          const randomValue = 80 + Math.random() * 20;
          bar.style.width = randomValue + '%';
          
          if (metricValues[index]) {
            const text = metricValues[index].textContent;
            if (text.includes('%')) {
              metricValues[index].textContent = Math.round(randomValue) + '%';
            }
          }
        });
      }, 3000);
    }
    function createSpark() {
      const spark = document.createElement('div');
      spark.className = 'spark';
      
      // Random position
      spark.style.left = Math.random() * 100 + '%';
      spark.style.top = Math.random() * 100 + '%';
      
      // Random animation duration
      spark.style.animationDuration = (2 + Math.random() * 4) + 's';
      
      document.getElementById('sparksContainer').appendChild(spark);
      
      // Remove spark after animation
      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark);
        }
      }, 4000);
    }
    
    // Create floating particles
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random starting position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '100vh';
      
      // Random size
      const size = 1 + Math.random() * 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random animation duration and delay
      particle.style.animationDuration = (15 + Math.random() * 20) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      document.getElementById('particlesContainer').appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 35000);
    }
    
    // Initialize animations
    function initAnimations() {
      // Create initial sparks
      for (let i = 0; i < 15; i++) {
        setTimeout(createSpark, Math.random() * 2000);
      }
      
      // Create initial particles
      for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, Math.random() * 3000);
      }
      
      // Continuously create sparks
      setInterval(() => {
        createSpark();
      }, 800);
      
      // Continuously create particles
      setInterval(() => {
        createParticle();
      }, 1500);
    }
    
    // Add interactive sparks on mouse movement
    let lastSparkTime = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSparkTime > 200) { // Throttle spark creation
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.position = 'fixed';
        spark.style.animationDuration = '2s';
        
        document.getElementById('sparksContainer').appendChild(spark);
        
        setTimeout(() => {
          if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
          }
        }, 2000);
        
        lastSparkTime = now;
      }
    });
    
    // Add click burst effect
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const spark = document.createElement('div');
          spark.className = 'spark';
          spark.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
          spark.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
          spark.style.position = 'fixed';
          spark.style.animationDuration = '1.5s';
          
          document.getElementById('sparksContainer').appendChild(spark);
          
          setTimeout(() => {
            if (spark.parentNode) {
              spark.parentNode.removeChild(spark);
            }
          }, 1500);
        }, i * 100);
      }
    });
    
    // Start animations when page loads
    window.addEventListener('load', () => {
      initAnimations();
      createMiniChart('k8sChart', []);
      createMiniChart('awsChart', []);
      animateCharts();
      updateMetrics();
    });
  </script>
</body>
</html>
