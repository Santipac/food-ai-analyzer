# 🥗 AI Food Nutrition Analyzer

An intelligent web application that analyzes food and provides detailed nutritional information using AI. Designed for health-conscious users who want to better understand what they eat and receive personalized advice.

## 🌟 Features

### 📊 Complete Nutritional Analysis
- **Macronutrient analysis**: Proteins, carbohydrates, fats, and fiber
- **Micronutrient information**: Essential vitamins and minerals
- **Calorie counting**: Accurate estimation of caloric content
- **Health score**: Overall food healthiness evaluation (0-100)

### 🤖 Smart Nutritional Chat  
- Natural conversations with a virtual nutritionist
- Personalized advice based on your profile
- Responses in your preferred language
- Specific recommendations according to your fitness goals

### 👤 Personalized Profiles
- Basic information: age, gender, height, weight
- Fitness objectives: weight loss, muscle gain, maintenance
- Training frequency
- Recommendations tailored to your profile

### 🛡️ Backend Protection
- Smart rate limiting without database
- Protection against prompt injection and malicious content
- Multiple security layers
- Flexible configuration for different environments

## 🚀 Technologies & Libraries

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - User interface library
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible and unstyled components
- **[Lucide React](https://lucide.dev/)** - Modern SVG icons
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### Backend & AI
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI model integration
- **[OpenAI GPT-3.5 Turbo](https://openai.com/)** - Language model for analysis and chat
- **Next.js API Routes** - Backend endpoints
- **Edge Runtime** - Optimized execution

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast package manager
- **[PostCSS](https://postcss.org/)** - CSS processor
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (automatically installs if you use npm)

### 1. Clone the repository
```bash
git clone <repository-url>
cd food-analyzer
```

### 2. Install dependencies
```bash
npm install -g pnpm  # if you don't have pnpm installed
pnpm install
```

### 3. Configure environment variables
Create a `.env.local` file in the project root:

```env
# Required
OPENAI_API_KEY=your_openai_key_here

# Optional - Rate Limiting (default values)
CHAT_MAX_REQUESTS=20           # Requests per minute for chat
NUTRITION_MAX_REQUESTS=10      # Requests per minute for analysis
GLOBAL_MAX_REQUESTS=100        # Global requests every 5 minutes

# Optional - Security
MAX_REQUEST_SIZE=51200         # 50KB maximum per request
MAX_MESSAGE_LENGTH=2000        # Maximum characters per message
ENABLE_RATE_LIMITING=true      # Enable protections
```

### 4. Run in development
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### 5. Build for production
```bash
pnpm build
pnpm start
```

## 🔒 Security

The project includes multiple protection layers:

- **Rate Limiting**: Prevents abuse with endpoint-specific limits
- **Content validation**: Detects prompt injection and malicious content  
- **Size limits**: Controls request and message sizes
- **Robust identification**: IP + User Agent for user identification
- **Flexible configuration**: Adjust limits according to environment

See complete documentation in the security configuration file.

## 🏗️ Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # Backend endpoints
│   │   ├── chat/          # Nutritional chat
│   │   └── nutrition-analysis/ # Food analysis
│   ├── chat/              # Chat page
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── analysis/          # Analysis components
│   ├── chat/              # Chat components
│   ├── onboarding/        # Profile form
│   └── ui/                # Base components (Radix UI)
├── lib/                   # Utilities and configuration
│   ├── rate-limiter.ts    # Rate limiting system
│   ├── security-middleware.ts # Security middleware
│   ├── config.ts          # Central configuration
│   └── utils.ts           # General utilities
├── stores/                # Global state (Zustand)
├── interfaces/            # TypeScript types
└── helpers/               # Helper functions
```

## 🤝 Contributing

Contributions are welcome! If you have ideas to improve the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License - see the [LICENSE](LICENSE) file for details.

This means you can:
- ✅ Use the code commercially
- ✅ Modify the code  
- ✅ Distribute the code
- ✅ Private use
- ✅ Include in proprietary projects

**No restrictions**. Use it however you want, learn from it, improve it, share it.

---

**Developed as a portfolio project to demonstrate skills in:**
- Full-Stack development with Next.js and TypeScript
- AI API integration (OpenAI)
- State management and component architecture
- Security implementation without database
- Modern and accessible UI/UX design


