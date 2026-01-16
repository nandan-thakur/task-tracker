# TaskFlow - Modern Task Management Application

A sleek, modern task management application built with React, Vite, and Tailwind CSS. TaskFlow provides an intuitive interface for managing your tasks with features like priority levels, due dates, search functionality, and local storage persistence.

## 🚀 Features

### Core Functionality
- **Create Tasks**: Add new tasks with titles, descriptions, priority levels, and due dates
- **Edit Tasks**: Modify existing tasks while preserving creation timestamps
- **Delete Tasks**: Remove tasks with confirmation prompts
- **Mark Complete**: Toggle task completion status with visual feedback
- **Local Storage**: All tasks are automatically saved to browser local storage

### User Experience
- **Search & Filter**: Find tasks by title or description, filter by status (All/Active/Completed)
- **Priority System**: Three priority levels (High/Medium/Low) with color-coded badges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Statistics**: Live count of total, completed, and pending tasks
- **Modern UI**: Clean, minimalist design with smooth animations and hover effects

### Technical Features
- **React 19**: Built with the latest React features
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide Icons**: Beautiful, consistent icon set
- **TypeScript Ready**: Configured for TypeScript development

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Testing**: Playwright (E2E)
- **Linting**: ESLint with React hooks support
- **Deployment**: GitHub Pages

## 📦 Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-tracker.git
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3001/task-tracker/`

## 🏗️ Project Structure

```
task-tracker/
├── .github/
│   ├── workflows/           # CI/CD workflows
│   │   ├── copilot-setup-steps.yml
│   │   └── deploy.yml
│   └── agents/              # Playwright agents
│       ├── playwright-test-generator.agent.md
│       ├── playwright-test-healer.agent.md
│       └── playwright-test-planner.agent.md
├── .vscode/                 # VS Code configuration
│   └── mcp.json             # Model Context Protocol configuration
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Tailwind imports and custom styles
│   ├── App.css              # Additional CSS styles
│   └── assets/              # Static assets
├── public/
│   └── vite.svg             # Vite logo
├── e2e/                     # End-to-end tests
│   ├── seed.spec.ts         # Seed file for test setup
│   ├── authentication/      # Authentication tests
│   │   ├── sign-in.spec.ts
│   │   └── sign-out.spec.ts
│   ├── task-filtering/      # Task filtering tests
│   │   └── filter-tasks.spec.ts
│   └── task-management/     # Task management tests
│       ├── complete-task.spec.ts
│       ├── create-task.spec.ts
│       ├── delete-task.spec.ts
│       └── edit-task.spec.ts
├── specs/                   # Test specifications
│   ├── README.md            # Specs documentation
│   └── test.plan.md         # Test plan
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── playwright.config.js     # Playwright configuration
└── README.md                # This file
```

## 🎯 Usage

### Creating a Task
1. Click the "New Task" button
2. Fill in the task details:
   - **Title**: Required field for the task name
   - **Description**: Optional detailed description
   - **Priority**: Select from Low, Medium, or High
   - **Due Date**: Optional deadline for the task
3. Click "Create Task" to save

### Managing Tasks
- **Edit**: Click the edit icon to modify task details
- **Complete**: Click the checkbox to mark a task as done
- **Delete**: Click the trash icon to remove a task (with confirmation)
- **Search**: Use the search bar to find specific tasks
- **Filter**: Use the filter buttons to show All, Active, or Completed tasks

### Keyboard Shortcuts
- **Esc**: Close the task form
- **Enter**: Submit the task form

## 🧪 Testing

The application includes comprehensive end-to-end tests using Playwright:

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in headed mode (with browser visible)
npx playwright test --headed

# Run specific test
npx playwright test create-task.spec.ts

# Generate test report
npx playwright show-report
```

### Test Coverage
- ✅ Task creation with validation
- ✅ Task editing functionality
- ✅ Task deletion with confirmation
- ✅ Task completion toggling
- ✅ Search and filter functionality
- ✅ Local storage persistence
- ✅ Form validation and required fields

### Writing Tests with Playwright Agents
For detailed guidance on writing test cases using Playwright Agents, refer to the official documentation:
- [Playwright Test Agents Documentation](https://playwright.dev/docs/test-agents)

### Tutorial Video
To learn how to set up and use Playwright Agents, watch this tutorial:
- [Playwright Agents Setup and Usage Tutorial](https://www.youtube.com/watch?v=HQ-XpZPDDdk)

## 🚀 Deployment

### GitHub Pages
The application is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** triggers deployment workflow
2. **Build process** runs automatically
3. **Static files** are deployed to GitHub Pages

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run Playwright tests
- `npm run deploy` - Deploy to GitHub Pages

### Code Style
The project uses ESLint with React-specific rules:
- React hooks linting
- React refresh for development
- Modern JavaScript features
- Consistent code formatting

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Todo List

- [ ] Add task categories/tags
- [ ] Implement task sorting options
- [ ] Add task reminders/notifications
- [ ] Dark mode toggle
- [ ] Export tasks to various formats
- [ ] Task templates for recurring tasks
- [ ] Keyboard navigation improvements

## 🐛 Bug Reports

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected behavior vs actual behavior
- Browser and OS information

## 💡 Feature Requests

Have an idea for a new feature? We'd love to hear it! Please:
- Check if the feature already exists or is planned
- Create a detailed feature request
- Explain the use case and benefits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Testing with [Playwright](https://playwright.dev/)
- Code quality with [ESLint](https://eslint.org/)

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

**TaskFlow** - Simplify your task management with style and efficiency! 🎯