import { combineReducers } from "redux";
import { users } from './Users/reducer'
import { conversations } from './Chat/reducer'

export const appReducer = combineReducers({
    users,
    conversations
});
// Type global of the state
export type IAppState = ReturnType<typeof appReducer>

/*
// 1
Fetch vers API
Creer reducer pour users
Passer par les valeurs par defau pour remplir le state avec la liste des user et celui connected

Charger les users et les mettre dans le store
Charger le user connecté et le mettre dans le sore
*/

/*
// 2
- Créer une fonction qui appelle les users de façon synchrone ("pre-action")
- Créer une fonction qui récupère la liste des users ("action")
- reducers reçoit les infos des users fetché (résultat de la préaction "cas dans le reducer")
- Composants
  - AppLayout => Dispatch la préaction pour fetch les users
  - UsersList => Connecter au store pour accéder à la liste
*/

/*
Implémentation des conversations dans le store
  Stocker conv dans le store
    Evite la logique dans le composant

    fonction (pre action/thunk) a dispatch depuis les composants
      appel API pour recuperer les conversation
      dispatch action qui update le sote
    Creer action qui va update le store avec les conversations données
    Creer le reducer
      réaction à l'action précédente
    Update des composants pour prendre en compte la liste dans le store
*/