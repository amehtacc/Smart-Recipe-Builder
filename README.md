# 🧠 Smart Recipe Builder

A modern React-based web application to help you create, manage, and print your cooking recipes effortlessly. Built with flexibility in mind, it allows live editing, ingredient adjustments, markdown instruction writing, and saving/loading recipes from JSON files.

<br>

## 📺 Live Project
- Live Link: [Smart Recipe Builder](https://smart-recipe-builder.netlify.app/)

<br>

## ✨ Features

- 📝 **Create and Edit Recipes** – Add a title, servings, ingredients, and instructions.
- ⚖️ **Auto-Adjust Ingredients** – Change servings and automatically update quantities.
- 🔁 **Markdown Instructions** – Write rich instructions using Markdown with preview support.
- 💾 **LocalStorage Sync** – Automatically saves your progress in the browser.
- 📤 **Export as JSON** – Save your recipe as a `.json` file.
- 📥 **Import Recipes** – Load recipes from previously saved JSON files.
- 🖨️ **Print-Friendly Layout** – Optimized recipe layout for printing.
- 🌗 **Clean, Responsive UI** – Built with Tailwind CSS and fully responsive across devices.

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amehtacc/Smart-Recipe-Builder.git
   cd Smart-Recipe-Builder

   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to http://localhost:5173 (if using Vite) or whatever port is shown.

<br>

## 📂 Project Structure
```
src/
├── components/
│   ├── AddIngredientForm.jsx
│   ├── Button.jsx
│   ├── IngredientList.jsx
│   ├── Input.jsx
│   ├── MarkdownPreview.jsx
│   ├── RecipeBuilder.jsx
│   ├── ServingsAdjuster.jsx
│   └── TextArea.jsx
├── App.jsx
├── main.jsx
└── index.css

```

<br>

## 🛠️ Technologies Used
- React
- Tailwind CSS
- Lucide React Icons
- Markdown rendering

<br>

## 🖨️ Print-Friendly Mode
- Elements like input fields and buttons are hidden using Tailwind's print:hidden utility.
- The preview section is made visible using print:block to generate a clean print layout.
- Use your browser's print function (Ctrl+P or Cmd+P) to print the recipe.

<br>

## 📄 Saving and Loading Recipes
- Save your recipe to a .json file via the Save button.
- Load a saved recipe using the Upload button and selecting a JSON file.
- Data is also persisted automatically using localStorage.

<br>

## 🙌 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

<br>

## 🌐 Contact Information

Build with ❤️ by [Aryan Mehta](https://aryanmehta.netlify.app/) - feel free to contact me!
