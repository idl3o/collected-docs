# 🎯 Prompt Generator

A modern React-based web application for creating professional prompts for AI, coding, creative writing, and various other purposes. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## ✨ Features

- **Multiple Categories**: AI & ML, Programming, Creative Writing, Business, Education, and Analysis prompts
- **Template-Based Generation**: Pre-built templates with customizable variables
- **Modern UI**: Clean, responsive design with intuitive user experience
- **Copy to Clipboard**: Easy copying of generated prompts
- **Search & Filter**: Find the perfect template quickly
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 How to Use

1. **Browse Templates**: Start by exploring the available prompt categories
2. **Select a Template**: Click on any template card to begin customization
3. **Fill Variables**: Complete the required fields and optional parameters
4. **Generate**: Click "Generate Prompt" to create your custom prompt
5. **Copy & Use**: Copy the generated prompt to your clipboard and use it wherever needed

## 📝 Template Categories

- **🤖 AI & Machine Learning**: Configure AI assistants with specific roles and expertise
- **💻 Programming**: Code review requests, debugging help, and development guidance
- **✍️ Creative Writing**: Story generation, creative content, and writing assistance
- **📊 Business**: Analysis frameworks, strategy planning, and business communications
- **🎓 Education**: Learning plans, curriculum development, and educational content
- **🔍 Analysis**: Data analysis, research methodologies, and analytical frameworks

## 🛠 Built With

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with responsive design
- **ESLint** - Code quality and consistency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-template`)
3. Commit your changes (`git commit -am 'Add new template'`)
4. Push to the branch (`git push origin feature/new-template`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development

### Project Structure
```
src/
├── components/     # React components
├── data/          # Template data and configurations
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

### Adding New Templates

To add new prompt templates, edit `src/data/templates.ts` and follow the existing structure:

```typescript
{
  id: 'unique-id',
  name: 'Template Name',
  category: 'category-id',
  description: 'Brief description',
  template: 'Template with {variables}',
  variables: [
    {
      name: 'variable_name',
      label: 'Display Label',
      type: 'text|textarea|select|number',
      required: true|false,
      placeholder: 'Optional placeholder'
    }
  ],
  tags: ['tag1', 'tag2']
}
```
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
