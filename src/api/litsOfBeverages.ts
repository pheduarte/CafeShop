import babyccino from "../../public/images/babyccino.webp";
import cappuccino from "../../public/images/cappuccino.webp";
import chaiLatte from "../../public/images/chailatte.webp";
import hotchocolate from "../../public/images/hotchocolate.webp";
import flatwhite from "../../public/images/flatwhite.webp";
import icedcholate from "../../public/images/icedchocolate.webp";
import icedlatte from "../../public/images/icedlatte.webp";
import coldbrew from "../../public/images/coldbrew.webp";
import type { Beverage } from "../types/beverages";

export const allBeverages: Beverage[] = [
  {
    id: 1,
    name: "Babyccino",
    description:
      "A frothy, steamed milk beverage for kids, often topped with a sprinkle of cocoa or cinnamon.",
    price: 2.5,
    image: babyccino,
    type: "hot",
  },
  {
    id: 2,
    name: "Cappuccino",
    description:
      "Fluffy steamed milk, a shot of espresso, and a dusting of cocoa. A classic Italian delight.",
    price: 3.5,
    image: cappuccino,
    type: "hot",
  },
  {
    id: 3,
    name: "Chai Latte",
    description: "Warming spices and creamy goodness. Like a hug in a mug.",
    price: 4.0,
    image: chaiLatte,
    type: "hot",
  },
  {
    id: 4,
    name: "Hot Chocolate",
    description: "Silky, rich, and deeply chocolatey. Pure comfort in a cup.",
    price: 5.5,
    image: hotchocolate,
    type: "hot",
  },
  {
    id: 5,
    name: "Flat White",
    description: "Smooth, creamy, and just the right amount of coffee kick.",
    price: 4.7,
    image: flatwhite,
    type: "hot",
  },
  {
    id: 6,
    name: "Iced chocolate",
    description: "Chilled, creamy, and decadently chocolatey.",
    price: 5.0,
    image: icedcholate,
    type: "cold",
  },
  {
    id: 7,
    name: "Iced Latte",
    description: "Smooth espresso, chilled milk, and a touch of sweetness.",
    price: 4.5,
    image: icedlatte,
    type: "cold",
  },
  {
    id: 8,
    name: "Cold Brew",
    description: "Bold, smooth, and refreshingly cold. A coffee lover's dream.",
    price: 8.0,
    image: coldbrew,
    type: "special",
  },
];
