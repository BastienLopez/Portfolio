Oui, tu avais raison. J’ai refait l’audit sur **la version actuellement en ligne**, en recroisant le HTML que le crawler reçoit aujourd’hui avec le `main` actuel du repo. Je retire donc complètement mon ancienne remarque sur **Starter → Business → ERP-Scale** : ce bloc n’existe plus. Ta page freelance actuelle repose bien sur **Sites vitrines / Applications métier / Automatisations & intégrations / Reprise & évolution technique**, suivis d’une méthode en quatre étapes. ([bastienlopez.fr][1])

Et oui : **la nouvelle version est sensiblement meilleure.**

## Audit actualisé — 14 septembre 2026

| Axe                        | Ancien audit | Audit actuel |
| -------------------------- | -----------: | -----------: |
| Positionnement             |       7.5/10 |   **8.5/10** |
| UI / UX                    |         7/10 |     **8/10** |
| Anti-AI-slop               |         6/10 |   **7.2/10** |
| Copywriting                |       6.5/10 |   **7.5/10** |
| Portfolio / projets        |       7.5/10 |   **8.5/10** |
| Crédibilité / preuves      |         6/10 |   **6.5/10** |
| SEO technique — code       |         8/10 |     **9/10** |
| SEO technique — production |      ~6.5/10 |   **7.5/10** |
| SEO contenu                |         7/10 |   **7.5/10** |
| GEO technique              |       7.5/10 |   **8.5/10** |
| GEO autorité / entité      |      ~5.5/10 |   **6.5/10** |
| **Global**                 |        ~7/10 | **≈ 7.9/10** |

Tu es désormais beaucoup plus proche d'un **bon portfolio d'ingénieur/freelance** que d'un site “full IA slop”. Il reste cependant quelques éléments qui empêchent encore le rendu d’atteindre le niveau 9/10.

---

# 1. La page freelance est maintenant réussie

C’est le plus gros changement par rapport à mon audit précédent.

Le nouveau H1 :

**« Des outils métier qui font avancer votre activité. »**

est bon. Il ne cherche pas à empiler 14 buzzwords et parle directement du résultat. La phrase suivante précise ensuite sites vitrines, applications métier, n8n et APIs sans transformer le H1 en catalogue. ([bastienlopez.fr][1])

La structure actuelle :

**Périmètre → Services → Méthode → Réalisations → Avis → FAQ → Contact**

est beaucoup plus crédible qu’une landing SaaS avec trois packages artificiels.

Et surtout, les services ne sont plus présentés sous forme de quatre grosses cartes identiques. Ton composant utilise maintenant des séparateurs et une composition plus éditoriale avec numéro, titre et explication. C’est nettement moins “shadcn + Claude m’a fait ma landing page”.

### Ce que je conserverais

Les quatre services actuels fonctionnent bien :

**Sites vitrines & présence en ligne** est concret.

**Applications métier** correspond très bien à ton expérience.

**Automatisations & intégrations** est suffisamment précis.

**Reprise & évolution technique** est excellent parce que c’est un service qu’on voit beaucoup moins dans les portfolios génériques.

Même chose pour ta méthode :

Cadrage → Construction → Production → Transmission.

C'est classique, mais justifié.

**Verdict page freelance : 8.5/10.**

---

# 2. Ton hero est meilleur sémantiquement… mais reste le principal signal “AI portfolio”

Le dernier changement est bon pour le SEO : ton H1 contient maintenant réellement :

**Bastien Lopez**
**Développeur Full-Stack IA & Automatisation**

et ton texte secondaire contient :

**Applications métier, APIs et workflows n8n.**

C’est une bien meilleure hiérarchie sémantique que de laisser uniquement ton nom dans le H1.

Le problème est maintenant purement visuel.

Tu empiles encore dans le hero :

gradient sombre + grille quadrillée + texte gradient + effet typing + shimmer infini + petites pills de compétences + trois CTA + flèche qui rebondit.

C’est beaucoup.

Le code actuel le confirme : grille de 50 px, gradient, typing à 50 ms, shimmer continu et `animate-bounce`.

Pris séparément, rien n’est mauvais.

Ensemble, ça dit encore fortement :

> “portfolio développeur généré avec une stack Tailwind/shadcn et amélioré par IA”.

### Ce que je changerais

Je garderais **la grille OU le gradient**, pas besoin de supprimer les deux.

Mais je retirerais :

**le typing**,
**le shimmer continu**,
et **le bounce de la flèche**.

Ton nom + métier doivent simplement être là.

Un développeur expérimenté n’a pas besoin de faire “taper” son intitulé pendant deux secondes pour créer de la personnalité.

Ça rendrait immédiatement le site plus calme, plus sûr de lui et plus premium.

---

# 3. Le positionnement est maintenant beaucoup plus clair

La version live annonce :

> Développeur Full-Stack IA & Automatisation
> Applications métier, APIs et workflows n8n

puis :

> Je crée des outils internes et des automatisations qui simplifient le travail quotidien.

C’est bien. ([Portfolio Bastien Lopez][2])

On comprend enfin ton triangle principal :

**Applications métier / APIs / Automatisation n8n + IA**

sans donner l’impression que ton métier est simplement “je fais tout ce qui existe en informatique”.

C’est un vrai progrès.

---

# 4. En revanche, ta section compétences dilue encore ce positionnement

Là, je garde une partie de ma critique précédente.

Actuellement tu affiches encore :

React, TypeScript, Next, JS, HTML/CSS
Node, Python, FastAPI, Express
PostgreSQL, MongoDB, SQL, MySQL, Vector DB
n8n
Mastra
PyTorch
TensorFlow
NLP
Reinforcement Learning
CUDA
Docker
CI/CD
GitHub Actions
TDD
VPS…

C'est beaucoup trop horizontal.

Ton hero dit :

> “Je suis spécialisé dans X.”

puis ta section Skills dit presque :

> “En réalité je fais absolument tout.”

### Je ferais deux niveaux

**Stack principale**, très visible :

React / TypeScript
Node.js / Python
APIs
PostgreSQL / MongoDB
n8n
Docker / CI/CD

Et ensuite quelque chose de plus discret :

**Technologies utilisées selon les projets**

Mastra, PyTorch, TensorFlow, CUDA, Vector DB, etc.

Ça évite le symptôme classique du portfolio junior :

> liste de 35 technologies = expertise.

Et surtout, ça renforce ton SEO sémantique autour de ce que tu veux réellement vendre.

---

# 5. Tes études de cas sont maintenant l'une des meilleures parties du site

Très bonne décision d’avoir créé de vraies URLs :

`/projets/automatisations-n8n-reporting`
`/projets/automatisations-n8n-derush-video`
`/projets/altme-wallet-provider`
etc.

Ton sitemap en contient maintenant une vingtaine ainsi que tes trois pages services.

Et le contenu n8n est particulièrement bon.

Par exemple le reporting parle réellement de SocialPilot, PDF, normalisation des KPI, archivage, génération du rapport, contrôles qualité, etc. ([Portfolio Bastien Lopez][3])

Le dérush parle lui aussi de choses réelles et techniques plutôt que de “solution innovante alimentée par l’IA”. ([Portfolio Bastien Lopez][4])

C’est précisément ce qu’il faut pour SEO + GEO :

**informations spécifiques**,
**noms d’outils**,
**problèmes réels**,
**architecture**,
**limitations**,
**livrables**.

C’est également beaucoup plus difficile à confondre avec du contenu IA générique.

---

# 6. MAIS il y a encore un gros problème AI-slop dans les études de cas

C’est désormais probablement le problème éditorial principal.

Prenons le reporting n8n.

Tu commences avec le header de la page et une introduction.

Puis :

**Résumé du projet**

avec une description.

Puis tâches.

Puis résultats.

Puis métriques.

Et quelques lignes après :

**Automatisations n8n — Reporting**

**Contexte du projet**

qui recommence quasiment à raconter la même chose.

Puis :

**Ma contribution**

qui reprend encore plusieurs tâches déjà présentes dans le résumé. ([Portfolio Bastien Lopez][3])

Ce n’est pas une catastrophe SEO.

Mais humainement ça fait :

> “un template de case study a généré un résumé puis un autre template a rendu le contenu détaillé”.

Et en regardant le code, c’est effectivement proche de ce qui se passe : `ProjectDetail` affiche d’abord `ProjectCaseStudySummary`, puis affiche ensuite intégralement `detailedContentHtml`.

### Ici je modifierais l’architecture

Le haut d’une étude de cas devrait fournir uniquement les infos immédiatement utiles :

**Projet / mon rôle / année / stack / résultat**

Puis directement le contenu.

Pas :

Résumé → tâches → résultats → contexte → contribution → mêmes tâches → architecture.

Tu peux facilement supprimer **20 à 30 % du texte** de certaines pages sans perdre aucune information.

Et elles paraîtront immédiatement plus humaines.

---

# 7. Les projets secondaires ont encore un vrai pattern généré

C’est une découverte importante du nouvel audit.

Tes quatre projets principaux ont des intros spécifiques.

Mais les autres fiches projet utilisent automatiquement cette phrase :

> « Fiche projet avec le contexte, la solution, la stack et les éléments documentés dans le portfolio. »

Donc tu peux avoir 15–20 URLs avec exactement la même introduction générique.

Ça, je le supprimerais.

Pas tellement pour une “pénalité Google” magique.

Mais parce que c’est précisément du **boilerplate sans information ajoutée**.

Chaque projet devrait avoir une phrase spécifique.

Même une seule phrase suffit.

Par exemple pour Codex Limits :

> Application Windows locale conçue pour suivre la consommation des quotas Codex et estimer leur épuisement selon le rythme de travail.

C’est infiniment plus utile que :

> fiche projet avec contexte, solution et stack.

---

# 8. Les pages services sont excellentes pour le SEO… mais un peu trop uniformes pour l’anti-slop

Tu as maintenant :

`/services/sites-vitrines`
`/services/applications-metier`
`/services/automatisations-n8n`

C'est excellent.

Chaque URL a une vraie intention de recherche, du contenu spécifique, des projets liés et une FAQ. ([Portfolio Bastien Lopez][5])

Pour le SEO, énorme progrès.

Mais toutes suivent pratiquement la même construction :

Pour qui
Ce que vous recevez
Comment la mission avance
Résultat
Réalisations liées
FAQ

Ça peut devenir un autre pattern “LLM-generated service page”.

### Je garderais les URLs, mais différencierais les contenus

La page **Sites vitrines** pourrait afficher des captures, performance, mobile, structure de contenu.

La page **Applications métier** pourrait davantage montrer workflows métier, rôles, permissions, données, dashboard.

La page **Automatisation n8n** pourrait montrer un vrai schéma :

Source → n8n → contrôle → traitement → sortie → erreur/reprise.

Tu renforces ainsi à la fois :

**UX + SEO + GEO + crédibilité + identité.**

---

# 9. Il subsiste UN BUG SEO technique important en production

Celui-là n’a pas disparu avec le déploiement.

Actuellement :

`/freelance` est correctement envoyé vers `/freelance/`.

Mais quand je demande :

`https://bastienlopez.fr/mentions-legales`

je reçois toujours le contenu de **la homepage**, avec le titre de homepage. ([bastienlopez.fr][6])

Et ton sitemap donne justement :

`https://bastienlopez.fr/mentions-legales`

sans slash.

Donc c'est un vrai problème.

Le truc intéressant, c’est que ton **Caddyfile de référence dans GitHub semble justement prévoir les deux formes**, slash et sans slash, ainsi que le vrai `404.html`.

Conclusion probable :

**la configuration Caddy réellement active sur ton VPS n’est pas parfaitement synchronisée avec `deploy/Caddyfile.example`.**

Je mettrais ça en **P0**.

Choisis une seule convention, idéalement URLs sans slash :

`/freelance`
`/mentions-legales`
`/services/...`
`/projets/...`

Puis :

forme canonique → 200
forme avec slash → 301 vers canonique
canonical = forme canonique
sitemap = forme canonique.

---

# 10. Ton SEO technique est désormais vraiment solide

Ici, franchement, il y a peu à critiquer.

Tu as :

title et descriptions spécifiques, canonical, robots, sitemap, prerendering, Open Graph, Twitter Card, `WebSite`, `WebPage`, `ProfilePage`, `Person`, `ProfessionalService`, `Service`, `CreativeWork`, `BreadcrumbList`, internal linking et pages spécifiques.

Le prerender couvre désormais :

la home, freelance, mentions légales, les 22 projets, les 3 services et le 404.

C’est beaucoup mieux qu’une SPA React classique où le crawler reçoit uniquement :

`<div id="root"></div>`.

Le `robots.txt` autorise tout et autorise explicitement `OAI-SearchBot`.

OpenAI indique bien que l’accès à `OAI-SearchBot` permet aux pages éligibles d’être utilisées dans les résultats de ChatGPT Search. ([OpenAI Help Center][7])

### SEO technique code : 9/10.

Je ne mets pas 10 à cause de la prod/routage et de l’internationalisation.

---

# 11. Ton hreflang reste incorrect / inutile dans sa forme actuelle

Ton système anglais fonctionne avec `localStorage`.

Donc :

FR = `/`
EN = `/`

et le code génère actuellement :

`hreflang="fr-FR"` → même URL
`hreflang="en-US"` → même URL
`x-default` → même URL.

Ce n’est pas une véritable architecture internationale indexable.

Tu as deux choix corrects.

Soit tu assumes :

**le SEO est français**,
l’anglais est seulement une préférence UI,

et tu retires `en-US` du hreflang.

Soit tu veux réellement ranker en anglais et tu crées :

`/en/`
`/en/freelance`
`/en/services/...`
`/en/projects/...`

avec pages prerenderisées distinctes et hreflang réciproques.

Vu ton marché actuel, je prendrais **la première option** pour l’instant.

---

# 12. Tu as un énorme potentiel SEO actuellement gaspillé : les Dev Notes

C'est probablement **la meilleure amélioration SEO/GEO à faire après le routing**.

Tu as déjà tout un système de contenu :

Culture & méthodes
CI/CD & DevOps
Outils & productivité
Architecture
Freelance

mais les articles sont chargés dynamiquement après clic dans ton composant React.

Ils n’ont donc pas chacun :

une URL, un `<title>`, une meta description, un canonical, un `Article/TechArticle` schema, une entrée sitemap.

C'est dommage.

Parce que **c’est justement ton contenu le plus susceptible de générer du trafic SEO/GEO**.

Tes meilleurs Dev Notes devraient devenir :

`/notes/automatiser-reporting-n8n-socialpilot`
`/notes/pipeline-derush-whisper-ffmpeg-n8n`
`/notes/deployer-react-vps-caddy`
etc.

Et la section home deviendrait seulement une sélection vers ces pages.

Google insiste désormais explicitement pour ses expériences de recherche IA sur l’importance d’un contenu réellement utile et non commoditisé, tandis que les fondamentaux SEO classiques restent pertinents. ([Google for Developers][8])

Ça colle parfaitement à ton cas.

---

# 13. GEO : tu es techniquement très bien préparé

Ton GEO machine-readable est franchement propre.

Ton `Person` dit clairement :

Bastien Lopez
Développeur Full-Stack IA & Automatisation
Reims
GitHub
LinkedIn
domain officiel
compétences / sujets connus.

Ton `llms.txt` fournit aussi identité, services, localisation, principales pages et la liste de tes études de cas.

Tu peux le conserver.

Simplement : Google précise maintenant que `llms.txt` **ne donne aucun bonus ni malus au classement Google**. ([Google for Developers][8])

Donc :

`llms.txt` = bien.

Mais le vrai GEO sera obtenu via :

**contenu original + entité cohérente + preuves + citations externes + pages crawlables**.

---

# 14. Ton principal frein GEO devient la cohérence de ton identité externe

Ton site affirme actuellement :

**7+ ans d’expérience**
**30+ projets**
**10+ secteurs**. ([Portfolio Bastien Lopez][2])

Le repo affiche bien les mêmes chiffres.

Mais ton profil Malt découvert publiquement utilise encore une tranche **3–7 ans** et un positionnement plus ancien incluant notamment Web3. Ton LinkedIn utilise lui aussi un intitulé légèrement différent autour de Full Stack IA / agents / RAG / automatisation.

Ce n’est pas dramatique.

Mais pour le GEO, tu veux progressivement faire converger toutes les sources vers :

**Bastien Lopez**
**Développeur Full-Stack IA & Automatisation**
**Applications métier · APIs · automatisations n8n/IA**
**Reims / remote France**

C’est ainsi qu’un moteur peut résoudre ton entité avec confiance.

---

# 15. Le “90 % de mes missions sont des sites vitrines” me gêne encore

Tu l’affiches plusieurs fois :

sur freelance et sur la page service Sites vitrines. ([Portfolio Bastien Lopez][1])

Et cette valeur est directement codée dans tes données.

Si c'est réellement calculable et vrai : okay.

Mais sinon, ça donne exactement l’apparence d’un chiffre inventé pour rendre une landing page plus crédible.

Et paradoxalement, ça entre un peu en conflit avec ton positionnement principal :

> développeur applications métier / API / automatisations

si tu annonces ensuite que 90 % de ton activité freelance est du site vitrine.

Je préférerais :

> « Une grande partie de mes missions freelance concerne des sites vitrines. »

Ou ne rien dire du tout.

L’utilisateur n’a pas besoin de connaître le ratio.

---

# 16. Même problème pour 7+ / 30+ / 10+

Les chiffres dans le About donnent de la preuve sociale, mais ils doivent être totalement défendables.

**30+ projets**, ça peut être vérifiable.

**7+ années**, il faut juste être cohérent sur ce que signifie “expérience” : perso ? pro ? freelance ? première ligne de code ?

**10+ secteurs**, c’est le plus faible des trois. Ça ressemble davantage à une métrique de landing page qu’à quelque chose que le recruteur veut connaître.

Je garderais probablement :

**7+ ans**
**30+ réalisations**

et je supprimerais **10+ secteurs** pour le remplacer par une information plus forte :

par exemple :

**CDI & freelance**
ou
**Remote France**
ou une métrique réelle liée aux déploiements.

---

# 17. Les témoignages sont meilleurs mais encore trop lisses

Tu as actuellement :

Éloi V.
J. DM
Marino / Clé de Voûte
etc.

La mention :

**« Retours clients et utilisateurs anonymisés »**

est une bonne idée. Elle évite de prétendre que tout est publiquement identifiable. ([bastienlopez.fr][1])

Mais certaines citations restent tellement propres qu’elles ressemblent à du copywriting :

> clair, professionnel, simple
> échanges fluides
> résultat propre
> interface claire et adaptée

Je ne dis pas qu’elles sont fausses.

Mais si tu as le texte original du client, je conserverais plutôt **sa formulation exacte**, même si elle est moins jolie.

Et quand possible :

**projet + année + contexte**.

Exemple visuel :

Éloi V.
Coach sportif & ostéopathe
**Site vitrine — 2026**

Ça apporte davantage de crédibilité qu’une citation parfaitement marketée.

---

# 18. Petit problème de conversion spécifique à `/freelance`

Tu as déjà développé un excellent `Contact variant="freelance"` avec :

> « Parlons de ce qui doit avancer. »

et un CTA uniquement orienté projet.

Mais `/freelance` appelle actuellement :

`<Contact />`

et pas :

`<Contact variant="freelance" />`

Résultat : tout en bas de la page freelance, tu reparles de :

> « Parlons d’un poste ou d’une mission »

avec une colonne recrutement + une colonne projet.

Ça dilue le funnel.

Sur `/freelance`, mets simplement :

`<Contact variant="freelance" />`

La home peut continuer à parler CDI + freelance.

La page `/freelance` doit être **100 % client**.

---

# 19. L’Open Graph SVG reste à changer

Tu utilises toujours :

`og-image.svg`

en 1200×630.

Je passerais en PNG ou WebP.

Ce n’est pas un problème SEO critique.

C’est simplement plus robuste pour LinkedIn, Slack, Discord, X, iMessage et autres scrapers.

---

# 20. Un point technique à surveiller : ton prerender de la home

Ta home utilise `DeferredSection` pour ne charger About, Projects, Skills, Dev Notes et Contact qu’à proximité du viewport.

Ton prerender a prévu le problème : il scroll automatiquement tout en bas puis remonte avant de sérialiser le HTML.

Bonne idée.

Mais il se contente ensuite d’une attente assez courte.

Je ferais un test automatique dans `verify-build.mjs` du type :

`dist/index.html` doit contenir :

**À propos de moi**
**Études de cas et réalisations**
**Compétences & Technologies**
**Dev Notes sélectionnées**
**Parlons d’un poste ou d’une mission**

avant d’autoriser le déploiement.

Parce qu’il serait dommage qu’une modification de lazy loading fasse disparaître la moitié du contenu du HTML prérendu sans que tu t’en aperçoives.

Je classe ça **à vérifier**, pas comme bug confirmé.

---

# Mon diagnostic anti-AI-slop actuel

Ce n’est plus la page freelance qui pose problème.

Aujourd’hui, les signaux qui font encore “IA” sont surtout :

| Signal                                                  |                  Niveau |
| ------------------------------------------------------- | ----------------------: |
| Grille + gradient hero                                  |                   moyen |
| Typewriter                                              |                **fort** |
| Shimmer texte                                           |                **fort** |
| Flèche bounce                                           |                   moyen |
| Pills tech                                              |                   léger |
| 6 cartes de compétences                                 |                   moyen |
| Même template pour toutes les pages services            |                   moyen |
| Intro générique des projets secondaires                 |                **fort** |
| Résumé + contexte qui se répètent dans les case studies |                **fort** |
| Témoignages très polis                                  |                   moyen |
| Multiplication de petits labels uppercase / tracking    |                   moyen |
| Contenu technique réel et captures                      | **excellent anti-slop** |
| Projets réellement détaillés                            | **excellent anti-slop** |
| Texte freelance actuel                                  |                     bon |
| About actuel                                            |                     bon |

Donc je ne referais surtout **pas tout le portfolio**.

La dernière refonte a déjà corrigé une grosse partie.

---

# Ce que je ferais maintenant, dans cet ordre

1. **P0 — Corriger Caddy/routage live** : `/mentions-legales`, slash/no-slash, canonical, sitemap et vraie 404.
2. **P0 — Supprimer les répétitions des études de cas** : `ProjectCaseStudySummary` ne doit pas redire le contenu détaillé.
3. **P1 — Remplacer toutes les intros génériques des projets secondaires** par une phrase spécifique au projet.
4. **P1 — Transformer 5–10 meilleures Dev Notes en vraies URLs indexables**, avec `TechArticle`, canonical, sitemap et maillage vers tes projets.
5. **P1 — Simplifier le hero** : supprimer typing + shimmer + bounce. Conserver éventuellement grille/gradient comme identité.
6. **P1 — Corriger le hreflang** : soit FR uniquement pour SEO, soit vraie arborescence `/en/`.
7. **P1 — Utiliser `Contact variant="freelance"` sur `/freelance`**.
8. **P1 — Vérifier/supprimer les métriques 7+/30+/10+/90 %** et aligner LinkedIn/Malt/CV/site.
9. **P2 — Réduire la section Skills** à une stack principale et déplacer les technologies spécialisées vers les projets.
10. **P2 — Différencier visuellement et éditorialement les 3 pages services**, puis améliorer provenance/contexte des témoignages et passer l’OG image en PNG/WebP.

### Nouvelle conclusion

Ton portfolio n’est **plus du tout au même stade** que celui que j’avais décrit dans le premier audit.

La nouvelle `/freelance` est **beaucoup plus mature**, les nouvelles pages `/services/*` sont très bonnes pour le SEO, les URLs `/projets/*` constituent un gros progrès SEO/GEO, et ton nouveau H1 est sémantiquement meilleur.

Le prochain niveau ne consiste plus à “ajouter plus de SEO/GEO”.

Il consiste surtout à **retirer** :

moins d’effets dans le hero,
moins de templates répétitifs,
moins de métriques décoratives,
moins de contenu dupliqué.

Et à rendre davantage de ton vrai savoir-faire technique **indexable individuellement**.

Après ces corrections, je pense que le portfolio peut très raisonnablement passer de **~7.9/10 aujourd’hui à 9/10+**, sans refonte complète de la direction actuelle.

[1]: https://bastienlopez.fr/freelance "Freelance — Développement web, IA et automatisation | Bastien Lopez"
[2]: https://bastienlopez.fr/ "Bastien Lopez — Développeur Full-Stack IA & Automatisation"
[3]: https://bastienlopez.fr/projets/automatisations-n8n-reporting "Automatisations n8n — Reporting — Étude de cas | Bastien Lopez"
[4]: https://bastienlopez.fr/projets/automatisations-n8n-derush-video "Automatisations n8n — Dérush vidéo — Étude de cas | Bastien Lopez"
[5]: https://bastienlopez.fr/services/sites-vitrines "Sites vitrines et présence en ligne — Bastien Lopez"
[6]: https://bastienlopez.fr/mentions-legales "Bastien Lopez — Développeur Full-Stack IA & Automatisation"
[7]: https://help.openai.com/fr-fr/articles/12627856-publishers-and-developers-faq?utm_source=chatgpt.com "Éditeurs et développeurs - FAQ | OpenAI Help Center"
[8]: https://developers.google.com/search/updates?utm_source=chatgpt.com "Latest Google Search Documentation Updates | Google Search Central  |  What's new  |  Google for Developers"
