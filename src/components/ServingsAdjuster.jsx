import { Minus, Plus } from "lucide-react";
import Button from "./Button";

function ServingsAdjuster({ servings, onChange }) {
  function decreaseServings() {
    if (servings > 1) {
      onChange(servings - 1);
    }
  }

  function increaseServings() {
    onChange(servings + 1);
  }
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-base font-medium text-black/70">
        Servings
      </label>
      <div className="flex items-center mt-1">
        <Button
          variant="outline"
          size="sm"
          onClick={decreaseServings}
          disabled={servings <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease servings</span>
        </Button>

        <div className="w-12 text-center font-medium">{servings}</div>

        <Button variant="outline" size="sm" onClick={increaseServings}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase servings</span>
        </Button>
      </div>
    </div>
  );
}

export default ServingsAdjuster;
