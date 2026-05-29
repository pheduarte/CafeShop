import "./NewBeverageForm.scss";
import type { Beverage, BeverageType } from "../../../types/beverages";
import { useState } from "react";
import { CloseButton } from "../../../global/ui/closeButton";

type NewBeverageFormProps = {
  addNewBeverage: (beverage: Beverage) => void;
  closeForm: () => void;
};

type NewBeverageFormData = {
  name: string;
  description: string;
  price: string;
  image: string;
  type: BeverageType;
};

const initialFormData: NewBeverageFormData = {
  name: "",
  description: "",
  price: "",
  image: "",
  type: "hot",
};

function NewBeverageForm({ addNewBeverage, closeForm }: NewBeverageFormProps) {
  const [formData, setFormData] =
    useState<NewBeverageFormData>(initialFormData);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newBeverage: Beverage = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image,
      type: formData.type,
    };

    addNewBeverage(newBeverage);

    setFormData(initialFormData);
  }

  return (
    <section className="newBeverage-form-card">
      <header className="admin-card-header">
        <h2>New Beverage</h2>
        <CloseButton onCloseButton={closeForm} />
      </header>
      <form className="newBeverage-form" onSubmit={handleSubmit}>
        <label>Beverage name:</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Description:</label>
        <input
          type="text"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>Price:</label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <label>Image URL:</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <label>Type:</label>
        <select
          name="type"
          id="type"
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as BeverageType,
            })
          }
        >
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
          <option value="special">Special</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default NewBeverageForm;
