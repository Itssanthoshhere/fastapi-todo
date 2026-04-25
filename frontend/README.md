# 📝 FastAPI Todo Frontend

A **modern, minimal todo web application** built with React, TypeScript, and Tailwind CSS. Connects to a FastAPI backend for full CRUD operations.

## ✨ Features

- ✅ **Create, Read, Update, Delete** todos
- 🎨 **Refined minimalist design** - inspired by Linear & Notion
- ⚡ **Optimistic updates** - instant UI feedback
- 🔄 **Real-time sync** with FastAPI backend
- 📱 **Fully responsive** - mobile, tablet, desktop
- 🎯 **Smart filtering** - view all, active, or completed todos
- 🚀 **Production-ready** - TypeScript, proper error handling
- ♿ **Accessible** - semantic HTML, ARIA labels

## 🛠️ Tech Stack

| Layer        | Technology            |
| ------------ | --------------------- |
| **Frontend** | React 18 + TypeScript |
| **Styling**  | Tailwind CSS 3        |
| **HTTP**     | Axios                 |
| **Build**    | Vite                  |
| **Backend**  | FastAPI (external)    |

## 📂 Project Structure

```
src/
├── components/
│   ├── TodoItem.tsx      # Individual todo card with edit/delete
│   ├── TodoForm.tsx      # Form for creating new todos
│   └── TodoList.tsx      # List view with filtering & stats
├── hooks/
│   └── useTodos.ts       # Custom hook for todo state management
├── services/
│   └── api.ts            # Axios API client with error handling
├── types/
│   └── todo.ts           # TypeScript interfaces
├── App.tsx               # Main application component
├── App.css               # App-specific styles
├── index.css             # Global styles & Tailwind
└── main.tsx              # Entry point
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+
- **npm** or **yarn**
- FastAPI backend running (see [backend docs](./backend-setup.md))

### 1. Clone & Install

```bash
git clone https://github.com/Itssanthoshhere/fastapi-todo.git
cd frontend

npm install
```

### 2. Configure Backend URL

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Edit `.env` and set your FastAPI backend URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

**Options:**

- **Local development**: `http://127.0.0.1:8000`
- **Deployed**: `https://fastapi-todo-server-tlkx.onrender.com`

### 3. Run Development Server

```bash
npm run dev
```

The app opens at **http://localhost:5173** 🎉

### 4. Build for Production

```bash
npm run build
```

Output in `dist/` directory.

## 📡 API Integration

### Connected Endpoints

The app uses these FastAPI endpoints:

```typescript
GET    /todos              # Fetch all todos
POST   /todos              # Create todo
GET    /todos/{id}         # Get single todo
PUT    /todos/{id}         # Update todo
DELETE /todos/{id}         # Delete todo
```

See [`src/services/api.ts`](./src/services/api.ts) for implementation.

## 🎨 Design System

### Color Palette

- **Primary**: Slate 900 (`#0f172a`) - Deep, professional
- **Secondary**: Slate 700 (`#334155`) - Hover states
- **Neutral**: Slate grays - Borders, backgrounds
- **Accent**: White - Contrast

### Typography

- **Display**: System fonts for performance
- **Size Hierarchy**: 4xl → xs for clear information density

### Animations

- **Slide up**: Staggered load animation
- **Fade in**: Smooth transitions
- **Pulse**: Subtle loading indicators
- **Scale**: Interactive feedback

## 🧠 Architecture

### State Management

Uses React hooks for simplicity:

- `useState` - Local component state
- `useCallback` - Memoized handlers
- Custom `useTodos` hook - Global todo state

**No Redux needed** for this scope.

### Optimistic Updates

Form submissions update UI immediately:

1. Update state optimistically
2. Send request to server
3. Revert on error

### Error Handling

- Network errors caught & displayed
- User-friendly error messages
- Graceful degradation

## 📝 Component API

### `useTodos`

```typescript
const {
  todos, // Todo[]
  loading, // boolean
  error, // string | null
  addTodo, // (todo) => Promise<Todo>
  updateTodo, // (id, updates) => Promise<Todo>
  toggleTodo, // (id, completed) => Promise<void>
  deleteTodo, // (id) => Promise<void>
  refetch, // () => Promise<void>
} = useTodos();
```

### `TodoForm`

```typescript
<TodoForm
  onSubmit={(todo) => createTodo(todo)}
  isLoading={loading}
/>
```

### `TodoList`

```typescript
<TodoList
  todos={todos}
  filter="active"  // 'all' | 'active' | 'completed'
  onToggle={(id, completed) => toggleTodo(id, completed)}
  onUpdate={(id, title, desc) => updateTodo(id, { title, description: desc })}
  onDelete={(id) => deleteTodo(id)}
/>
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:

```
VITE_API_BASE_URL=https://your-fastapi-url.com
```

### Option 2: Netlify

```bash
# Build
npm run build

# Deploy dist/ folder via Netlify UI
```

### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "dist"]
```

```bash
docker build -t todo-frontend .
docker run -p 3000:8080 todo-frontend
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run type-check   # Check TypeScript
npm run lint         # Run ESLint
```

### Environment Variables

```env
# Required
VITE_API_BASE_URL=http://127.0.0.1:8000

# Optional
VITE_DEBUG=true
```

## 🧪 Testing (Future)

Currently no tests, but structure supports:

- Unit tests with Vitest
- E2E tests with Playwright
- Component tests with Testing Library

## 📚 Learning Resources

- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🎯 Future Enhancements

- [ ] JWT authentication
- [ ] User accounts & todo ownership
- [ ] Search & advanced filtering
- [ ] Due dates & priorities
- [ ] Recurring todos
- [ ] Dark mode toggle
- [ ] PWA support (offline mode)
- [ ] Unit & integration tests
- [ ] Performance optimizations

## 🤝 Contributing

Found a bug or have a feature idea?

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT - Feel free to use this in your projects!

## 👤 Author

**Santhosh VS**

- **GitHub**: [@Itssanthoshhere](https://github.com/Itssanthoshhere)
- **LinkedIn**: [@thesanthoshvs](https://www.linkedin.com/in/thesanthoshvs/)
- **Portfolio**: [santhosh-vs-portfolio.vercel.app](https://santhosh-vs-portfolio.vercel.app)

---

<div align="center">

**Built with ❤️ using React + TypeScript + Tailwind**

⭐ Star this repo if you found it helpful!

</div>
