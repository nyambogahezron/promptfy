# AI Prompt Manager 🚀

A professional web application for creating, managing, and optimizing AI prompts with intelligent enhancements powered by Google's Gemini API.

## ✨ Features

### 🎯 Core Functionality
- **Rich Prompt Editor** - Intuitive interface with real-time character/word count
- **AI-Powered Enhancement** - Get optimization suggestions and effectiveness scoring
- **Template System** - Pre-built templates for various use cases
- **Smart Organization** - Categories, tags, and advanced filtering
- **Export Options** - JSON, TXT, and Markdown formats

### 🤖 AI Integration
- **Prompt Analysis** - Effectiveness scoring (0-100)
- **Optimization Suggestions** - Specific improvement recommendations  
- **Automatic Variations** - Generate alternative prompt versions
- **Real-time Enhancement** - Instant feedback on prompt quality

### 🎨 User Experience
- **Modern Design** - Clean, professional interface
- **Dark/Light Theme** - System preference detection
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Polished micro-interactions
- **Comprehensive Search** - Find prompts by title, content, or tags

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd ai-prompt-manager
npm install
```

2. **Configure API access:**
```bash
cp .env.example .env.local
```

3. **Get your Gemini API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Creating Your First Prompt

1. **Start Fresh** - Click "New Prompt" to open the editor
2. **Use Templates** - Browse professional templates for quick starts
3. **Add Details** - Fill in title, category, tags, and content
4. **Get AI Help** - Click "AI Enhance" for optimization suggestions
5. **Save & Organize** - Store with proper categorization

### Managing Your Prompts

- **Search & Filter** - Use the comprehensive search and filtering system
- **Favorites** - Mark important prompts with the heart icon
- **Categories** - Organize by Creative, Coding, Business, etc.
- **Tags** - Add custom tags for fine-grained organization
- **Export** - Download your prompts in multiple formats

### AI Enhancement Workflow

1. **Write Your Prompt** - Create your initial prompt content
2. **Request Analysis** - Click "AI Enhance" to get feedback
3. **Review Score** - See effectiveness rating (0-100)
4. **Apply Suggestions** - Use the improvement recommendations
5. **Try Variations** - Experiment with alternative versions

## 🏗️ Project Structure

```
├── app/
│   ├── api/gemini/route.ts    # Gemini API integration
│   ├── layout.tsx             # Root layout with theming
│   └── page.tsx              # Main application component
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── prompt-editor.tsx     # Main prompt editing interface
│   ├── prompt-card.tsx       # Individual prompt display
│   ├── search-filter.tsx     # Search and filtering
│   ├── ai-enhancement.tsx    # AI suggestions panel
│   └── template-selector.tsx # Template browser
├── lib/
│   ├── gemini.ts            # Gemini API service
│   ├── storage.ts           # Local storage management
│   ├── templates.ts         # Template definitions
│   └── utils.ts            # Utility functions
└── types/
    └── prompt.ts           # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue gradients for actions
- **Categories**: Color-coded system for organization
- **Status**: Success (green), warning (yellow), error (red)
- **Neutral**: Gray scales for text and backgrounds

### Typography
- **Headings**: Inter font family, multiple weights
- **Body Text**: Optimized for readability
- **Code**: Monospace for prompt content

### Components
- Built with Radix UI primitives
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn/ui component library

## 🔧 Technical Details

### Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with local storage
- **Animations**: Framer Motion for smooth interactions

### API Integration
- **AI Service**: Google Gemini API
- **Rate Limiting**: Built-in request throttling
- **Error Handling**: Comprehensive error states
- **Offline Support**: Local storage fallback

### Performance Optimizations
- **Client-side Caching**: Smart storage management
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Tree-shaking and code splitting
- **Image Optimization**: Next.js image optimization

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
```
NEXT_PUBLIC_GEMINI_API_KEY=your_production_api_key
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**API Key Not Working?**
- Verify the key is correct in `.env.local`
- Ensure billing is enabled on your Google Cloud project
- Check API quotas and limits

**Local Storage Issues?**
- Clear browser cache and local storage
- Check browser compatibility
- Ensure third-party cookies are enabled

**Build Errors?**
- Delete `node_modules` and reinstall
- Clear Next.js cache: `rm -rf .next`
- Verify Node.js version compatibility

### Getting Help
- Check the documentation
- Open an issue on GitHub
- Review existing discussions

---

**Built with ❤️ using Next.js, TypeScript, and Google Gemini AI**