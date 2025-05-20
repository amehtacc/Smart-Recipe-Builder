import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";

function AddIngredientForm({onSubmit, editIngredient}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("g");
  const [nameError, setNameError] = useState(false)
  const [quantityError, setQuantityError] = useState(false)

  // Common units for cooking
  const units = [
    "g",
    "kg",
    "ml",
    "l",
    "tsp",
    "tbsp",
    "cup",
    "oz",
    "lb",
    "piece",
    "slice",
  ];

  useEffect(() => {
    if(editIngredient) {
      setName(editIngredient.name)
      setQuantity(editIngredient.quantity)
      setUnit(editIngredient.unit)
    } else {
      resetForm()
    }
  }, [editIngredient])

  const resetForm = () => {
    setName("");
    setQuantity(0);
    setUnit("g");
    setNameError(false)
    setQuantityError(false)
  };

  function handleSelectUnit(e) {
    setUnit(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!name.trim()) {
      setNameError(true)
      return
    }

    if(quantity <= 0) {
      setQuantityError(true)
      return
    }

    const ingredient = {
      id: editIngredient?.id || Date.now().toString(),
      name,
      quantity,
      unit,
    };

    onSubmit(ingredient)
    resetForm()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-5">
            <Input
              label="Name"
              name="ingredient-name"
              value={name}
              onChange={(e) => {
                setNameError(false)
                setName(e.target.value)
              }}
              placeholder="Ingredient name"
              error={nameError}
            />
          </div>

          <div className="col-span-3">
            <Input
              label="Quantity"
              name="ingredient-quantity"
              type="number"
              min="0"
              step="0.01"
              value={quantity}
              onChange={(e) => {
                setQuantityError(false)
                setQuantity(Number.parseFloat(e.target.value) || 0)
              }
              }
              error={quantityError}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="ingredient-unit" className="text-base font-medium text-black/70">Unit</label>
            <select id="ingredient-unit" value={unit} onChange={handleSelectUnit} className="w-full p-2 text-black text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-skyBlue focus:border-transparent transition-all duration-200">
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-center items-end">
            <Button type="submit" variant="primary" size="md">
              {editIngredient ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddIngredientForm;
