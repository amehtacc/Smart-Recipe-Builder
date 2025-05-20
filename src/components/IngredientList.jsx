import { Edit, Trash2 } from "lucide-react";
import Button from "./Button";

function IngredientItem({ ingredient, onEdit, onRemove }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2">
      <div>
        <span className="font-medium">
          {ingredient.quantity} {ingredient.unit}
        </span> {" "}
        {ingredient.name}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => onEdit(ingredient)}
          className="outline-none border-none"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          size="sm"
          onClick={() => onRemove(ingredient.id)}
          className="outline-none border-none"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default function IngredientList({ ingredients, onEdit, onRemove }) {
  return (
    <div className="mt-4">
      {ingredients.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No ingredients added yet
        </div>
      ) : (
        ingredients.map((ingredient, index) => (
          <IngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
}
