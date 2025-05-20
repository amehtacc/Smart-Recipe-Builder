// Import necessary hooks and components
import React, { useState, useEffect } from "react";
import { Save, Upload, Printer } from "lucide-react"; // Icons
import Input from "./Input"; // Reusable input component
import TextArea from "./TextArea"; // Reusable textarea for instructions
import Button from "./Button"; // Reusable button component
import ServingsAdjuster from "./ServingsAdjuster"; // Component to change servings
import AddIngredientForm from "./AddIngredientForm"; // Form to add/edit ingredients
import IngredientList from "./IngredientList"; // Displays list of ingredients
import MarkdownPreview from "./MarkdownPreview"; // Renders markdown-formatted instructions

function RecipeBuilder() {
  // Initialize recipe state lazily (read from localStorage if available)
  const [recipe, setRecipe] = useState(() => {
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      return JSON.parse(savedRecipe);
    }
    // Default state if nothing saved
    return {
      title: "New Recipe",
      servings: 2,
      ingredients: [],
      instructions: "",
    };
  });

  // State for tracking the ingredient being edited
  const [editIngredient, setEditIngredient] = useState(null);

  // Toggle state for showing markdown preview of instructions
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

  // Persist recipe state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }, [recipe]);

  // Update recipe title on user input
  function handleTitleChange(e) {
    setRecipe({ ...recipe, title: e.target.value });
  }

  // Update recipe instructions on user input
  function handleInstructionsChange(e) {
    setRecipe({ ...recipe, instructions: e.target.value });
  }

  // Adjust servings and proportionally update ingredient quantities
  function handleServingsChange(newServings) {
    const ratio = newServings / recipe.servings;
    setRecipe({
      ...recipe,
      servings: newServings,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: Number.parseFloat((ingredient.quantity * ratio).toFixed(2)),
      })),
    });
  }

  // Add a new ingredient or update existing one
  function handleAddIngredient(ingredient) {
    if (editIngredient) {
      // If editing, update the specific ingredient
      setRecipe({
        ...recipe,
        ingredients: recipe.ingredients.map((item) =>
          item.id === editIngredient.id ? ingredient : item
        ),
      });
      setEditIngredient(null); // Clear editing state
    } else {
      // Otherwise, append the new ingredient
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      });
    }
  }

  // Begin editing an ingredient
  function handleEditIngredient(ingredient) {
    setEditIngredient(ingredient);
  }

  // Remove an ingredient by its ID
  function handleRemoveIngredient(id) {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  }

  // Trigger print dialog
  function printRecipe() {
    window.print();
  }

  // Save recipe to a downloadable JSON file
  function saveRecipe() {
    const blob = new Blob([JSON.stringify(recipe, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title.replace(/\s+/g, "-").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Load recipe from a user-uploaded JSON file
  function loadRecipe(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loadedRecipe = JSON.parse(event.target?.result);
        setRecipe(loadedRecipe);
      } catch (error) {
        console.error("Failed to parse recipe file:", error);
        alert("Invalid recipe file format");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input so same file can be re-uploaded if needed
  }

  return (
    <div className="w-full mx-auto py-8 px-4 max-w-5xl print:py-2">
      {/* Header section with title and control buttons */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl md:text-3xl font-bold">Smart Recipe Builder</h1>
        <div className="flex gap-2">
          {/* Print button */}
          <Button variant="outline" size="sm" onClick={printRecipe} aria-label="Print recipe">
            <Printer className="h-5 w-5" />
          </Button>
          {/* Save to JSON button */}
          <Button variant="outline" size="sm" onClick={saveRecipe} aria-label="Save recipe">
            <Save className="h-5 w-5" />
          </Button>
          {/* Upload from JSON input (invisible but clickable via styled Button) */}
          <div className="relative">
            <input
              type="file"
              id="recipe-file"
              accept=".json"
              onChange={loadRecipe}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Load recipe"
            />
            <Button variant="outline" size="sm" aria-label="Upload recipe">
              <Upload className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main grid layout: left (form) + right (preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Left side: Input Forms (not printed) */}
        <div className="space-y-6 print:hidden">
          {/* Recipe title and servings */}
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7">Recipe Details</h2>
            <div className="space-y-4">
              <Input
                label="Recipe Title"
                name="recipe-title"
                placeholder="Enter recipe title"
                value={recipe.title}
                onChange={handleTitleChange}
              />
              <ServingsAdjuster
                servings={recipe.servings}
                onChange={handleServingsChange}
              />
            </div>
          </div>

          {/* Ingredient form and list */}
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7">Ingredients</h2>
            <AddIngredientForm
              onSubmit={handleAddIngredient}
              editIngredient={editIngredient}
            />
            <IngredientList
              ingredients={recipe.ingredients}
              onEdit={handleEditIngredient}
              onRemove={handleRemoveIngredient}
            />
          </div>
        </div>

        {/* Right side: Instructions and Preview */}
        <div className="space-y-6">
          {/* Markdown Editor / Preview Toggle */}
          <div className="w-full border rounded-xl p-5 shadow-sm print:hidden">
            <div className="flex justify-between items-center mb-7">
              <h2 className="text-black text-xl md:text-2xl font-semibold">Instructions</h2>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
              >
                {showMarkdownPreview ? "Edit" : "Preview"}
              </Button>
            </div>
            <div>
              {showMarkdownPreview ? (
                <MarkdownPreview markdown={recipe.instructions} />
              ) : (
                <TextArea
                  name="instructions"
                  placeholder="Write your recipe instructions using markdown..."
                  value={recipe.instructions}
                  onChange={handleInstructionsChange}
                />
              )}
            </div>
          </div>

          {/* Final Recipe Preview (also shown in print view) */}
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7 print:hidden">
              Recipe Preview
            </h2>
            <div className="space-y-4 print:block">
              <h3 className="text-black text-lg font-medium print:text-2xl">{recipe.title}</h3>
              <p>Servings: {recipe.servings}</p>

              {/* Ingredient List */}
              <div>
                <h3 className="text-black text-lg font-medium">Ingredients</h3>
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions Preview */}
              <div>
                <h3 className="text-black text-lg font-medium">Instructions</h3>
                <MarkdownPreview markdown={recipe.instructions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeBuilder;