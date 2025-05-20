import React, { useState, useEffect } from "react";
import { Save, Upload, Printer, Moon, Sun, Plus } from "lucide-react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import ServingsAdjuster from "./ServingsAdjuster";
import AddIngredientForm from "./AddIngredientForm";
import IngredientList from "./IngredientList";
import MarkdownPreview from "./MarkdownPreview";

function RecipeBuilder() {
  const [recipe, setRecipe] = useState(() => {
    const savedRecipe = localStorage.getItem("recipe");
    if (savedRecipe) {
      return JSON.parse(savedRecipe);
    }
    return {
      title: "New Recipe",
      servings: 2,
      ingredients: [],
      instructions: "",
    };
  });
  const [editIngredient, setEditIngredient] = useState(null);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

  // Save recipe to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }, [recipe]);

  function handleTitleChange(e) {
    setRecipe({ ...recipe, title: e.target.value });
  }

  function handleInstructionsChange(e) {
    setRecipe({ ...recipe, instructions: e.target.value });
  }

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

  function handleAddIngredient(ingredient) {
    if (editIngredient) {
      setRecipe({
        ...recipe,
        ingredients: recipe.ingredients.map((item) =>
          item.id === editIngredient.id ? ingredient : item
        ),
      });
      setEditIngredient(null);
    } else {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ingredient],
      });
    }
  }

  function handleEditIngredient(ingredient) {
    setEditIngredient(ingredient);
  }

  function handleRemoveIngredient(id) {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  }

  function printRecipe() {
    window.print();
  }

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
    e.target.value = "";
  }

  return (
    <div className="w-full mx-auto py-8 px-4 max-w-5xl print:py-2">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl md:text-3xl font-bold">Smart Recipe Builder</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={printRecipe}
            aria-label="Print recipe"
          >
            <Printer className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={saveRecipe}
            aria-label="Save recipe"
          >
            <Save className="h-5 w-5" />
          </Button>
          <div className="relative">
            <input
              type="file"
              id="recipe-file"
              accept=".json"
              onChange={loadRecipe}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria_label="Load recipe"
            />
            <Button variant="outline" size="sm" aria-label="Upload recipe">
              <Upload className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div className="space-y-6">
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7">
              Recipe Details
            </h2>
            <div className="space-y-4">
              <div>
                <Input
                  label="Recipe Title"
                  name="recipe-title"
                  placeholder="Enter recipe title"
                  value={recipe.title}
                  onChange={handleTitleChange}
                />
              </div>
              <ServingsAdjuster
                servings={recipe.servings}
                onChange={handleServingsChange}
              />
            </div>
          </div>
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7">
              Ingredients
            </h2>
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

        <div className="space-y-6">
          <div className="w-full border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-7">
              <h2 className="text-black text-xl md:text-2xl font-semibold">
                Instructions
              </h2>
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

          <div className="w-full border rounded-xl p-5 shadow-sm print:block">
            <h2 className="text-black text-xl md:text-2xl font-semibold mb-7">
              Recipe Preview
            </h2>

            <div className="space-y-4">
              <h3 className="text-black text-lg font-medium">{recipe.title}</h3>
              <p>Servings: {recipe.servings}</p>

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
