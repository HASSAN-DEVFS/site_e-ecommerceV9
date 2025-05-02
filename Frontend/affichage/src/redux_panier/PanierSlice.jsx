import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panier: [],
  total: 0,       // Somme des prix des produits
  nbrArticles: 0  // Nombre total d'articles
};

const PanierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    ajouterAuPanier: (state, action) => {
      const article = action.payload;
      state.panier.push(article); // Ajoute l'article au panier
      state.nbrArticles += 1;     // Augmente le nombre total d'articles
      state.total += article.price; // Ajoute le prix au total
    },
    supprimerDuPanier: (state, action) => {
      const articleIndex = state.panier.findIndex(item => item.id === action.payload);
      if (articleIndex !== -1) {
        const article = state.panier[articleIndex];
        state.nbrArticles -= 1;      // Diminue le nombre total d'articles
        state.total -= article.price; // Diminue le total
        state.panier.splice(articleIndex, 1); // Supprime l'article
      }
    },
  },
});

export const { ajouterAuPanier, supprimerDuPanier } = PanierSlice.actions;
export default PanierSlice.reducer;
