import type { hotBeverage } from "../data/hotBeverage";
import babyccino from "../assets/img/babyccino.webp";
import cappuccino from "../assets/img/cappuccino.webp";
import chaiLatte from "../assets/img/chailatte.webp";
import hotchocolate from "../assets/img/hotchocolate.webp";
import flatwhite from "../assets/img/flatwhite.webp";

export const allBeverages: hotBeverage[] = [
  {
    name: "Babyccino",
    description:
      "A frothy, steamed milk beverage for kids, often topped with a sprinkle of cocoa or cinnamon.",
    price: 2.5,
    image: babyccino,
  },
  {
    name: "Cappuccino",
    description:
      "Fluffy steamed milk, a shot of espresso, and a dusting of cocoa. A classic Italian delight.",
    price: 3.5,
    image: cappuccino,
  },
  {
    name: "Chai Latte",
    description:
      "Warming spices and creamy goodness. Like a hug in a mug.",
    price: 4.0,
    image: chaiLatte,
  },
  {
    name: "Hot Chocolate",
    description:
      "Silky, rich, and deeply chocolatey. Pure comfort in a cup.",
    price: 5.50,
    image: hotchocolate,
  },
  {
    name: "Flat White",
    description:
      "Smooth, creamy, and just the right amount of coffee kick.",
    price: 4.70,
    image: flatwhite,
  }
];