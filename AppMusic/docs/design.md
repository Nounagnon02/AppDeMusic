# MaestroSpirit - Guide de Design Visuel

## Philosophie de Design

### Concept Éditorial
L'application MaestroSpirit incarne l'union harmonieuse entre l'excellence musicale et la spiritualité chrétienne. Le design reflète cette dualité à travers une esthétique moderne, épurée et inspirante, créant un espace sacré pour le développement musical et spirituel.

### Palette de Couleurs Principale
- **Or Royal (#D4AF37)**: Couleur principale symbolisant la divinité, l'excellence et la gloire
  - Utilisation: Boutons principaux, éléments interactifs, titres importants
  - Variations: #F4E4BC (clair), #B8860B (foncé)
  
- **Blanc Pur (#FFFFFF)**: Pureté, clarté et espace
  - Utilisation: Fonds principaux, textes sur fond sombre, espaces de travail
  - Variations: #F8F8FF (blanc cassé), #F0F0F0 (gris très clair)
  
- **Noir Profond (#000000)**: Élégance, profondeur et sérieux
  - Utilisation: Textes principaux, éléments de navigation, contraste
  - Variations: #1C1C1C (charbon), #2F2F2F (gris foncé)

### Couleurs d'Accent
- **Or Pâle (#F4E4BC)**: Pour les éléments secondaires et les zones de repos
- **Gris Perle (#E5E4E2)**: Pour les bordures et séparations subtiles
- **Blanc Neige (#FFFAFA)**: Pour les cartes et conteneurs

## Typographie

### Police Principale - Titres
**Playfair Display** (serif élégant)
- Utilisée pour les titres principaux et les citations bibliques
- Connote l'élégance classique et la tradition musicale
- Tailles: 28px (mobile), 32px (tablette)

### Police Secondaire - Corps de Texte
**Inter** (sans-serif moderne)
- Utilisée pour tout le texte de lecture et les interfaces
- Optimisée pour la lisibilité mobile
- Tailles: 14px (corps), 16px (boutons), 12px (légendes)

### Hiérarchie Typographique
- **H1**: Playfair Display, 28px, #D4AF37
- **H2**: Playfair Display, 24px, #000000
- **H3**: Inter Bold, 18px, #000000
- **Corps**: Inter Regular, 14px, #2F2F2F
- **Boutons**: Inter Medium, 16px, #FFFFFF

## Éléments Visuels

### Icônes et Symboles
- **Style**: Icônes minimalistes en style line art
- **Couleur**: #D4AF37 pour les icônes actives, #2F2F2F pour les inactives
- **Taille**: 24px pour la navigation, 32px pour les éléments principaux

### Boutons et Contrôles
- **Primaire**: Fond #D4AF37, texte #FFFFFF, coins arrondis 12px
- **Secondaire**: Fond transparent, bordure #D4AF37, texte #D4AF37
- **Tertiaire**: Fond #F4E4BC, texte #2F2F2F
- **États**: Hover (#B8860B), Active (#B8860B), Disabled (#E5E4E2)

### Cartes et Conteneurs
- **Fond**: #FFFAFA avec ombre subtile
- **Bordures**: Arrondies 16px
- **Ombres**: box-shadow: 0 4px 12px rgba(212, 175, 55, 0.1)
- **Padding**: 20px pour mobile

## Effets Visuels et Animations

### Bibliothèques Utilisées
- **Anime.js**: Pour les animations fluides des éléments UI
- **Typed.js**: Pour l'effet de machine à écrire sur les citations du jour
- **Splitting.js**: Pour les animations de texte lettre par lettre
- **p5.js**: Pour les visualisations audio et les effets de particules

### Effets Principaux
1. **Texte Animé**: Les citations bibliques apparaissent avec un effet de typewriter
2. **Progress Bars**: Animations fluides de remplissage avec couleur dorée
3. **Transitions de Page**: Fades doux entre les sections
4. **Boutons**: Légère élévation au survol avec ombre dorée
5. **Cartes**: Animation d'apparition avec stagger pour les listes

### Fonds et Textures
- **Fond Principal**: Dégradé subtil du blanc au blanc cassé
- **Sections**: Fonds unis avec accents dorés discrets
- **Pas de textures agressives**: Maintien d'une esthétique épurée

## Mise en Page Mobile

### Grille et Espacement
- **Largeur Max**: 100% avec padding horizontal de 16px
- **Espacement Vertical**: 24px entre sections principales
- **Espacement d'éléments**: 16px entre éléments connexes
- **Ligne de Base**: 4px pour une grille cohérente

### Composants Clés
1. **Barre de Navigation Inférieure**: Icônes dorés sur fond blanc
2. **Cartes de Progression**: Design inspiré des applications de fitness
3. **Lecteur Audio**: Interface minimaliste avec contrôles intuitifs
4. **Quiz Interface**: Cards design avec feedback visuel immédiat

### Responsive Design
- **Mobile First**: Optimisé pour écrans de 375px à 768px
- **Touch Targets**: Minimum 44px pour tous les éléments interactifs
- **Lisibilité**: Contraste minimum 4.5:1 pour tous les textes

## Identité Visuelle

### Logo et Marque
- **Symbole**: Combinaison de note de musique et de croix stylisée
- **Couleur**: Or #D4AF37 sur fond blanc
- **Typographie**: Playfair Display pour le nom "MaestroSpirit"

### Éléments Décoratifs
- **Lignes Dorées**: Sublimes lignes horizontales comme séparateurs
- **Points d'Or**: Petits éléments décoratifs dans les coins des cartes
- **Flous Subtils**: Effets de flou doré en arrière-plan des sections principales

Cette identité visuelle crée une atmosphère de sanctuaire musical moderne, où la technologie sert la spiritualité et l'art, dans un écrin d'or et de lumière.