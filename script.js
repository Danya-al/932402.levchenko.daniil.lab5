const calories = [290, 120, 610, 450, 280, 720, 700];

function findMax(numbers) {
  let max = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }

  return max;
}

function filterHigh(numbers, limit) {
  const result = [];

  for (const value of numbers) {
    if (value > limit) {
      result.push(value);
    }
  }

  return result;
}

function getSum(numbers) {
  let sum = 0;

  for (const value of numbers) {
    sum += value;
  }

  return sum;
}

function countLowCalorie(numbers, limit) {
  let count = 0;

  for (const value of numbers) {
    if (value <= limit) {
      count++;
    }
  }

  const share = Math.round((count / numbers.length) * 100);

  return { count: count, share: share };
}

const userName = prompt("Как вас зовут?", "Гость");

if (userName) {
  alert("Здравствуйте, " + userName + "! Это блог о домашней кухне.");
} else {
  alert("Здравствуйте! Это блог о домашней кухне.");
}

console.log("Калорийность блюд:", calories);

const total = getSum(calories);
const highCalorie = filterHigh(calories, 600);
const highTotal = getSum(highCalorie);
const maxCalorie = findMax(calories);
const lowCalorie = countLowCalorie(calories, 300);

alert(
  "Суммарная калорийность — " + total + " ккал, из них " +
  highTotal + " ккал — в высококалорийных блюдах."
);

console.log("Максимальная калорийность:", maxCalorie, "ккал");
console.log("Высококалорийные блюда (> 600 ккал):", highCalorie);
console.log("Низкокалорийных блюд (≤ 300 ккал):", lowCalorie.count, "из", calories.length);
console.log("Их доля:", lowCalorie.share + "%");

if (total > 3000) {
  console.log("Такой рацион лучше распределить на 2 дня");
}

const recipesSection = document.getElementById("recipes-section");
const recipesList = document.getElementById("recipes-list");
const addButton = document.getElementById("add-recipe");
const removeButton = document.getElementById("remove-last");
const toggleRecipesButton = document.getElementById("toggle-recipes");
const toggleThemeButton = document.getElementById("toggle-theme");

if (!recipesList || !addButton || !removeButton || !toggleRecipesButton || !toggleThemeButton) {
  console.error("Не найдены элементы интерфейса рецептов");
} else {
  console.log("Элементы интерфейса найдены");
}

let recipes = [];

function renderRecipes() {
  recipesList.textContent = "";

  for (const recipe of recipes) {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const list = document.createElement("ul");

    for (const item of recipe.ingredients) {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    }

    card.append(title);
    card.append(list);
    recipesList.append(card);
  }
}

function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function loadRecipes() {
  const saved = localStorage.getItem("recipes");

  if (!saved) {
    return;
  }

  try {
    recipes = JSON.parse(saved);
  } catch (error) {
    console.error("Не удалось прочитать сохранённые рецепты:", error);
    recipes = [];
  }
}

addButton.addEventListener("click", function () {
  const name = prompt("Название рецепта:");

  if (!name) {
    return;
  }

  const ingredientsInput = prompt("Ингредиенты через запятую:");

  if (!ingredientsInput) {
    return;
  }

  const ingredients = ingredientsInput.split(",");

  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i] = ingredients[i].trim();
  }

  recipes.push({ name: name, ingredients: ingredients });
  saveRecipes();
  renderRecipes();
});

removeButton.addEventListener("click", function () {
  if (recipes.length === 0) {
    alert("Список рецептов пуст");
    return;
  }

  recipes.pop();
  saveRecipes();
  renderRecipes();
});

toggleRecipesButton.addEventListener("click", function () {
  recipesList.classList.toggle("hidden");

  if (recipesList.classList.contains("hidden")) {
    toggleRecipesButton.textContent = "Показать рецепты";
  } else {
    toggleRecipesButton.textContent = "Скрыть рецепты";
  }
});

toggleThemeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    localStorage.setItem("theme", "dark");
    toggleThemeButton.textContent = "Светлая тема";
  } else {
    localStorage.setItem("theme", "light");
    toggleThemeButton.textContent = "Тёмная тема";
  }
});

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggleThemeButton.textContent = "Светлая тема";
  }
}

applySavedTheme();
loadRecipes();
renderRecipes();

console.log("Загружено рецептов:", recipes.length);
console.log("Карточек на странице:", document.querySelectorAll(".recipe-card").length);