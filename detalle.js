// Función para obtener el ID de la receta de la URL
function getRecipeId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') ? parseInt(urlParams.get('id')) : null;
}

// Función para cargar los datos de la receta
function loadRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        window.location.href = 'index.html';
        return;
    }

    // Actualizar título de la página
    document.title = `${recipe.name} - Recetas Deliciosas`;

    // Actualizar contenido
    document.getElementById('recipeTitle').textContent = recipe.name;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeImage').alt = recipe.name;
    document.getElementById('recipeCategory').textContent = recipe.category;
    document.getElementById('recipeTime').textContent = recipe.cookingTime;
    document.getElementById('recipeDifficulty').textContent = recipe.difficulty;
    document.getElementById('recipeDescription').textContent = recipe.description;

    // Cargar ingredientes
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = recipe.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');

    // Cargar instrucciones
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = recipe.instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');

    // Cargar consejos
    const tipsList = document.getElementById('tipsList');
    tipsList.innerHTML = `<li>${recipe.tips}</li>`;

    // Actualizar navegación
    updateNavigation(recipeId);
}

// Función para actualizar los botones de navegación
function updateNavigation(currentId) {
    const prevButton = document.getElementById('prevRecipe');
    const homeButton = document.getElementById('homeRecipe');
    const nextButton = document.getElementById('nextRecipe');
    
    const currentIndex = recipes.findIndex(r => r.id === currentId);
    
    // Configurar botón anterior
    if (currentIndex > 0) {
        const prevRecipe = recipes[currentIndex - 1];
        prevButton.disabled = false;
        prevButton.onclick = () => {
            window.location.href = `detalle.html?id=${prevRecipe.id}`;
        };
    } else {
        prevButton.disabled = true;
    }
    //Configurar Boton Home
    if (currentIndex > 0) {
        const homeRecipe = recipes[currentIndex - 1];
        homeButton.disabled = false;
        homeButton.onclick = () => {
            window.location.href = `index.html?id=${homeRecipe.id}`;
        };
    } else {
        homeButton.disabled = true;
    }
    // Configurar botón siguiente
    if (currentIndex < recipes.length - 1) {
        const nextRecipe = recipes[currentIndex + 1];
        nextButton.disabled = false;
        nextButton.onclick = () => {
            window.location.href = `detalle.html?id=${nextRecipe.id}`;
        };
    } else {
        nextButton.disabled = true;
    }
}

// Manejar clics en los botones de navegación de categorías
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        window.location.href = `index.html?category=${category}`;
    });
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    const recipeId = getRecipeId();
    if (recipeId) {
        loadRecipe(recipeId);
    } else {
        window.location.href = 'index.html';
    }
}); 