import { Article } from './types';

export const freelanceArticles: Article[] = [

  // 💼 Gestion de projet & Freelance
  { 
    id: '41', 
    title: 'Premier contact client : comment qualifier le besoin efficacement', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Le premier échange = 80% du succès</h2>

Le premier contact client <strong class="font-bold text-primary">détermine si tu auras le projet et comment il se passera</strong>. But : comprendre, pas vendre.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Questions de découverte</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème à résoudre</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Quel problème voulez-vous résoudre ?"</li>
  <li class="ml-4">"Qu'est-ce qui ne fonctionne pas aujourd'hui ?"</li>
  <li class="ml-4">"Quel est l'impact sur votre business ?"</li>
</ul>

<strong class="font-bold text-primary">Exemple :</strong> Client dit "Je veux un site e-commerce". Tu creuses : "Pourquoi maintenant ? Quelle problématique business ?" → Il révèle : "Mes concurrents vendent en ligne, je perds 30% CA".

<h3 class="text-xl font-bold mt-6 mb-3">Utilisateurs finaux</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Qui va utiliser le produit ?"</li>
  <li class="ml-4">"Quel est leur niveau technique ?"</li>
  <li class="ml-4">"Sur quels devices (mobile/desktop) ?"</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Contraintes</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Budget</strong> : "Avez-vous une enveloppe en tête ?"</li>
  <li class="ml-4"><strong>Délai</strong> : "Date idéale de livraison ? Hard deadline ?"</li>
  <li class="ml-4"><strong>Technique</strong> : "Stack imposée ? Hébergement existant ?"</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Définir objectifs SMART</h2>

<strong class="font-bold text-primary">Avant (vague) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Je veux un site vitrine moderne"</li>
  <li class="ml-4">"Je veux augmenter mes ventes"</li>
</ul>

<strong class="font-bold text-primary">Après (SMART) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">"Site 5 pages + formulaire contact + SEO basique, livré en 3 semaines"</li>
  <li class="ml-4">"E-commerce avec paiement Stripe, objectif +20% conversions en 6 mois"</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Évaluer maturité technique client</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Client tech-savvy</h3>

Connaît Git, APIs, frameworks. Parle technique directement.

<strong class="font-bold text-primary">→ Vocabulaire :</strong> "On partira sur Next.js avec headless CMS Sanity, déploiement Vercel"

<h3 class="text-xl font-bold mt-6 mb-3">Client non-technique</h3>

Ne connaît pas la différence React/Vue.

<strong class="font-bold text-primary">→ Vocabulaire :</strong> "Je vais créer un site rapide et moderne, facile à mettre à jour via une interface d'admin"

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Fiche de qualification (Template)</h2>

<code>
# Fiche Qualification Client

## Informations générales
- Client : [Nom]
- Contact : [Email/Tel]
- Date premier échange : [Date]

## Besoin
- Problème à résoudre : [Description]
- Objectifs business : [Chiffres si possible]
- Utilisateurs cibles : [Profil]

## Fonctionnalités prioritaires
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## Contraintes
- Budget : [Fourchette]
- Délai : [Date cible]
- Technique : [Stack/Hébergement]

## Prochaines étapes
- [ ] Envoyer proposition commerciale
- [ ] Call de cadrage technique
- [ ] Signature contrat
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Red flags à détecter</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">❌ "Je n'ai pas de budget mais c'est un projet qui va cartonner"</li>
  <li class="ml-4">❌ "Je veux le Facebook de [niche]"</li>
  <li class="ml-4">❌ "C'est urgent, faut livrer en 3 jours"</li>
  <li class="ml-4">❌ "Je paierai quand le projet rapportera"</li>
</ul>

<strong class="font-bold text-primary">→ Si red flag :</strong> Refuse poliment ou ajuste attentes.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Synthèse fin d'appel</h2>

<strong class="font-bold text-primary">Reformule pour valider :</strong>

> "OK, si je résume : vous voulez un site e-commerce avec paiement Stripe, gestion stock, livraison en 6 semaines, budget 5-7K€. C'est bien ça ?"

<strong class="font-bold text-primary">→ Client confirme = tu peux envoyer devis précis.</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Checklist qualification</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Problème business compris</li>
  <li class="ml-4">✅ Utilisateurs cibles identifiés</li>
  <li class="ml-4">✅ Objectifs SMART définis</li>
  <li class="ml-4">✅ Budget/délai clarifiés</li>
  <li class="ml-4">✅ Red flags évalués</li>
  <li class="ml-4">✅ Synthèse validée par client</li>
</ul>

> "Comprendre avant de coder = 80% problèmes évités." 💼
    `
  },
  { 
    id: '42', 
    title: 'Rédiger un cahier des charges clair et complet', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : CDC = Boussole projet</h2>

Le cahier des charges (CDC) <strong class="font-bold text-primary">protège freelance ET client</strong> en formalisant attentes et périmètre.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Structure CDC complète</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Présentation projet</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Contexte</strong> : Pourquoi ce projet maintenant ?</li>
  <li class="ml-4"><strong>Problème business</strong> : Quel problème résoudre ?</li>
  <li class="ml-4"><strong>Cible utilisateurs</strong> : Qui va l'utiliser ?</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">2. Objectifs mesurables</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Augmenter conversions de 20% en 6 mois</li>
  <li class="ml-4">Réduire temps traitement commandes de 50%</li>
  <li class="ml-4">Obtenir 1000 utilisateurs en 3 mois</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">3. Fonctionnalités (MVP vs Nice-to-have)</h3>

<strong class="font-bold text-primary">MVP (Must Have) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Authentification email/password</li>
  <li class="ml-4">Dashboard utilisateur</li>
  <li class="ml-4">Paiement Stripe</li>
</ul>

<strong class="font-bold text-primary">Nice-to-have (Phase 2) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">OAuth Google/Facebook</li>
  <li class="ml-4">Notifications push</li>
  <li class="ml-4">Export PDF</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Découpage en lots</h2>

<strong class="font-bold text-primary">Exemple e-commerce :</strong>

<strong>Lot 1 : Authentification (2 semaines)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Register/Login</li>
  <li class="ml-4">Forgot password</li>
  <li class="ml-4">Email verification</li>
</ul>

<strong>Lot 2 : Catalogue produits (3 semaines)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Liste produits avec filtres</li>
  <li class="ml-4">Fiche produit détaillée</li>
  <li class="ml-4">Recherche</li>
</ul>

<strong>Lot 3 : Panier & Paiement (2 semaines)</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Gestion panier</li>
  <li class="ml-4">Checkout Stripe</li>
  <li class="ml-4">Confirmation commande</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Contraintes techniques</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Stack imposée</strong> : React + Node.js + PostgreSQL</li>
  <li class="ml-4"><strong>Hébergement</strong> : AWS (compte client fourni)</li>
  <li class="ml-4"><strong>Compatibilité</strong> : Chrome, Firefox, Safari (desktop + mobile)</li>
  <li class="ml-4"><strong>Performance</strong> : Page load <2s, Lighthouse >90</li>
  <li class="ml-4"><strong>Sécurité</strong> : HTTPS, GDPR compliant, OWASP best practices</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Planning & Livrables</h2>

| Phase | Durée | Livrable |
|-------|-------|----------|
| Lot 1 | S1-S2 | Auth fonctionnelle + tests |
| Lot 2 | S3-S5 | Catalogue + démo staging |
| Lot 3 | S6-S7 | Paiement + production |
| Hotfix | S8 | Corrections post-launch |

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Budget & Paiement</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Forfait</strong> : 12 000€ HT</li>
  <li class="ml-4"><strong>Acompte</strong> : 40% (4 800€) à signature</li>
  <li class="ml-4"><strong>Intermédiaire</strong> : 40% (4 800€) fin Lot 2</li>
  <li class="ml-4"><strong>Solde</strong> : 20% (2 400€) livraison finale</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Erreurs à éviter</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">❌ Trop technique : Client ne comprend pas</li>
  <li class="ml-4">❌ Trop vague : "Site moderne et performant"</li>
  <li class="ml-4">❌ Pas de priorités : Tout semble urgent</li>
  <li class="ml-4">❌ Pas de marge : Sous-estimation garantie</li>
</ul>

<strong class="font-bold text-primary">✅ Bon CDC :</strong> Client sait ce qu'il obtient, quand, et pour quel prix.

> "CDC clair = projet serein." 📋
    `
  },
  { 
    id: '43', 
    title: 'Créer une proposition commerciale et un devis professionnel', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Proposition = Selling Tool</h2>

Une proposition commerciale <strong class="font-bold text-primary">transforme expertise en valeur perçue</strong>. Elle montre que tu comprends le besoin.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Structure proposition complète</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Contexte & Compréhension besoin</h3>

<strong class="font-bold text-primary">Reformule problème client :</strong>

> "Vous souhaitez moderniser votre site vitrine actuel pour améliorer conversions et SEO. Actuellement, le taux de rebond est de 70% et le site n'apparaît pas dans les 3 premières pages Google."

<strong class="font-bold text-primary">→ Client voit que tu as compris.</strong>

<h3 class="text-xl font-bold mt-6 mb-3">2. Objectifs & Résultats attendus</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Réduire taux rebond à <40%</li>
  <li class="ml-4">Temps chargement <2s</li>
  <li class="ml-4">Score Lighthouse >90</li>
  <li class="ml-4">SEO : Top 10 Google sur 5 mots-clés cibles</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">3. Solution proposée & Livrables</h3>

<strong class="font-bold text-primary">Livrables concrets :</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Site responsive (desktop/mobile/tablet)</li>
  <li class="ml-4">✅ 5 pages optimisées SEO</li>
  <li class="ml-4">✅ Formulaire contact avec validation</li>
  <li class="ml-4">✅ Google Analytics configuré</li>
  <li class="ml-4">✅ Formation client (1h visio)</li>
  <li class="ml-4">✅ Documentation technique</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">4. Méthodologie</h3>

<strong class="font-bold text-primary">Exemple Agile :</strong>

> "Je travaille en sprints de 2 semaines avec livraisons régulières. Vous aurez accès à un environnement de staging pour valider chaque étape. Point hebdomadaire de 30min pour ajuster si besoin."

<strong class="font-bold text-primary">→ Rassure client sur suivi.</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Tarification : TJM vs Forfait</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Option 1 : TJM (Régie)</h3>

<strong class="font-bold text-primary">Quand :</strong> Projet flou, évolutif, client veut flexibilité.

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>TJM</strong> : 400€/jour</li>
  <li class="ml-4"><strong>Estimation</strong> : 10-12 jours</li>
  <li class="ml-4"><strong>Budget prévisionnel</strong> : 4 000 - 4 800€ HT</li>
</ul>

<strong class="font-bold text-primary">⚠️ Risque :</strong> Client craint dérive budget.

<h3 class="text-xl font-bold mt-6 mb-3">Option 2 : Forfait</h3>

<strong class="font-bold text-primary">Quand :</strong> Périmètre clair, client veut prix fixe.

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Forfait</strong> : 5 000€ HT</li>
  <li class="ml-4"><strong>Inclus</strong> : Tout ce qui est listé dans livrables</li>
  <li class="ml-4"><strong>Hors périmètre</strong> : Modifications majeures post-validation</li>
</ul>

<strong class="font-bold text-primary">✅ Préférence client : Forfait (budget maîtrisé).</strong>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Planning & Jalons</h2>

| Semaine | Livrable | Validation client |
|---------|----------|-------------------|
| S1-S2 | Maquettes + archi | ✅ Go/No-go |
| S3-S4 | Développement pages | ✅ Démo staging |
| S5 | SEO + optimisations | ✅ Tests |
| S6 | Mise en production | ✅ Formation |

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Conditions paiement</h2>

<strong class="font-bold text-primary">Paiement échelonné (sécurise trésorerie) :</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">30% acompte (1 500€) à signature</li>
  <li class="ml-4">40% (2 000€) fin développement (S4)</li>
  <li class="ml-4">30% solde (1 500€) mise en production</li>
</ul>

<strong class="font-bold text-primary">Délai paiement :</strong> 15 jours net.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Maintenance (optionnel)</h2>

<strong class="font-bold text-primary">Forfait maintenance mensuel :</strong>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">200€ HT/mois</li>
  <li class="ml-4">Inclus : MAJ sécurité, backup hebdo, support email (24-48h)</li>
  <li class="ml-4">Hors forfait : Nouvelles features (facturées au TJM)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Outils création devis</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Templates</strong> : Notion, Canva, Google Docs</li>
  <li class="ml-4"><strong>Facturation</strong> : Freebe, Shine, Henrri, Malt</li>
  <li class="ml-4"><strong>Signature</strong> : HelloSign, DocuSign, Yousign</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Checklist proposition pro</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Reformule besoin client</li>
  <li class="ml-4">✅ Objectifs mesurables</li>
  <li class="ml-4">✅ Livrables concrets listés</li>
  <li class="ml-4">✅ Méthodologie expliquée</li>
  <li class="ml-4">✅ Planning avec jalons</li>
  <li class="ml-4">✅ Tarif clair (TJM ou forfait)</li>
  <li class="ml-4">✅ Paiement échelonné</li>
  <li class="ml-4">✅ Date validité devis (30 jours)</li>
</ul>

> "Proposition claire = confiance client." 💼
    `
  },
  { 
    id: '44', 
    title: 'Modèle de contrat de prestation (TJM, livrables, clauses clés)', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction
</h2>

Le contrat te protège légalement.
Il formalise les droits, devoirs et conditions du projet.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Clauses à inclure
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Objet du contrat</strong> : description du projet.</li>
<li class="ml-4"><strong class="font-bold text-primary">Durée & planning</strong>.</li>
<li class="ml-4"><strong class="font-bold text-primary">Conditions financières</strong> (TJM, forfait, acomptes).</li>
<li class="ml-4"><strong class="font-bold text-primary">Propriété intellectuelle</strong>.</li>
<li class="ml-4"><strong class="font-bold text-primary">Confidentialité</strong>.</li>
<li class="ml-4"><strong class="font-bold text-primary">Maintenance et support</strong>.</li>
<li class="ml-4"><strong class="font-bold text-primary">Clause de résiliation</strong>.</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Astuce
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Ajoute une <strong class="font-bold text-primary">clause de validation de livrable</strong> : le client doit confirmer par écrit.</li>
<li class="ml-4">Prends toujours un <strong class="font-bold text-primary">acompte (30–40%) avant de commencer</strong>.</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Modèles gratuits : <strong class="font-bold text-primary">BNA</strong>, <strong class="font-bold text-primary">Malt</strong>, <strong class="font-bold text-primary">Compta Online</strong></li>
<li class="ml-4">Signature : <strong class="font-bold text-primary">HelloSign</strong>, <strong class="font-bold text-primary">DocuSign</strong>, <strong class="font-bold text-primary">NotionSign</strong></li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Pas de contrat = pas de mission.
C'est ton <strong class="font-bold text-primary">bouclier professionnel</strong>.
    `
  },
  { 
    id: '45', 
    title: 'Comment estimer un projet (temps, coûts, complexité)', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi bien estimer ?
</h2>

Sous-estimer un projet = <strong class="font-bold text-primary">stress, pertes, burnout</strong>.
Sur-estimer = perdre le client.
L'objectif : estimer <strong class="font-bold text-primary">réalistiquement</strong> avec marge sécurité.

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Mieux vaut annoncer trop et livrer plus tôt que l'inverse."
</blockquote>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Méthode d'estimation
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1️⃣ Découper le projet en tâches</h3>

Utilise <strong class="font-bold text-primary">WBS (Work Breakdown Structure)</strong> :
<code>
Projet E-commerce
├─ Frontend
│  ├─ Authentification (login, signup, reset pwd)
│  ├─ Catalogue produits (liste, détail, filtres)
│  ├─ Panier + Checkout
│  └─ Interface admin (gestion produits, commandes)
├─ Backend
│  ├─ API REST (CRUD produits, users, orders)
│  ├─ Authentification JWT
│  ├─ Intégration Stripe payment
│  └─ Dashboard analytics
└─ DevOps
   ├─ Setup CI/CD (GitHub Actions)
   ├─ Déploiement Vercel/Railway
   └─ Monitoring (Sentry)
</code>

<h3 class="text-xl font-bold mt-6 mb-3">2️⃣ Estimer chaque tâche</h3>

<strong class="font-bold text-primary">Techniques :</strong>

<strong>Analogie :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Compare avec projets similaires passés</li>
<li class="ml-4">"Authentification JWT : 1,5j la dernière fois"</li>
</ul>

<strong>Story Points (méthode Agile) :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Évalue complexité relative (1, 2, 3, 5, 8, 13)</li>
<li class="ml-4">Convertis en temps (1 point = 0,5 jour)</li>
</ul>

<strong>Estimation 3-points :</strong>
<code>
Temps optimiste : 2j
Temps probable : 3j
Temps pessimiste : 5j
→ Estimation = (2 + 4×3 + 5) / 6 = 3,2j
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3️⃣ Évaluer la complexité</h3>

<strong class="font-bold text-primary">Facteurs multiplicateurs :</strong>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong>Nouveauté techno</strong> : première fois React → +30%</li>
<li class="ml-4"><strong>Intégrations externes</strong> : API tierces complexes → +20-40%</li>
<li class="ml-4"><strong>UI/UX exigeante</strong> : animations custom → +20%</li>
<li class="ml-4"><strong>Sécurité critique</strong> : paiements, données sensibles → +15%</li>
<li class="ml-4"><strong>Client indécis</strong> : changements fréquents → +25%</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">4️⃣ Ajouter marge de sécurité</h3>

<strong class="font-bold text-primary">Règles :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong>Projet connu</strong> (techno maîtrisée) : +15-20%</li>
<li class="ml-4"><strong>Projet standard</strong> : +25-30%</li>
<li class="ml-4"><strong>Projet complexe/nouveau</strong> : +40-50%</li>
</ul>

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
La marge couvre : bugs imprévus, révisions client, optimisations.
</blockquote>

<h3 class="text-xl font-bold mt-6 mb-3">5️⃣ Convertir en budget</h3>

<code>
Temps total × TJM = Budget HT

Exemple :
12 jours × 450€ = 5 400€ HT
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Exemple complet : Projet SaaS MVP
</h2>

| Module | Tâches | Temps brut | Complexité | Temps ajusté | Coût (TJM 450€) |
|--------|--------|------------|------------|--------------|------------------|
| <strong>Auth</strong> | Login, Signup, Reset pwd, JWT | 2j | Standard | 2,5j | 1 125€ |
| <strong>Dashboard</strong> | Layout, Charts, Filters | 3j | UI exigeante | 4j | 1 800€ |
| <strong>API</strong> | CRUD users, data, permissions | 3j | Standard | 3,5j | 1 575€ |
| <strong>Paiement</strong> | Stripe integration, webhooks | 2j | Critique | 3j | 1 350€ |
| <strong>Admin</strong> | Gestion users, analytics | 2j | Standard | 2,5j | 1 125€ |
| <strong>Tests</strong> | Unit tests, E2E Playwright | 2j | - | 2j | 900€ |
| <strong>Deploy</strong> | CI/CD, Vercel, monitoring | 1j | - | 1,5j | 675€ |
| **Total** | | **15j** | **+25%** | **19j** | **8 550€** |

<strong class="font-bold text-primary">Budget proposé client :</strong> 9 000€ HT (arrondi commercial).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pièges à éviter ⚠️
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Oublier les imprévus</strong> : toujours marge +20% minimum</li>
<li class="ml-4"><strong class="font-bold text-primary">Sous-estimer communication</strong> : réunions, emails = 10-15% temps</li>
<li class="ml-4"><strong class="font-bold text-primary">Négliger tests</strong> : compte 15-20% temps dev pour tests</li>
<li class="ml-4"><strong class="font-bold text-primary">Scope flou</strong> : cadre toujours périmètre ("3 pages max")</li>
<li class="ml-4"><strong class="font-bold text-primary">Optimisme naïf</strong> : "ça ira vite" → spoiler : non</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils estimation
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Notion</strong> : database tâches + formules calcul auto</li>
<li class="ml-4"><strong class="font-bold text-primary">Spreadsheet</strong> : Google Sheets templates</li>
<li class="ml-4"><strong class="font-bold text-primary">Toggl Plan</strong> : planning visuel + estimation</li>
<li class="ml-4"><strong class="font-bold text-primary">Harvest Forecast</strong> : prévisionnel projet</li>
</ul>

<strong class="font-bold text-primary">Template Notion estimation :</strong>
<code>
[ ] Découpage WBS
[ ] Estimation temps brut
[ ] Facteurs complexité identifiés
[ ] Marge sécurité appliquée (+X%)
[ ] Conversion budget (TJM × jours)
[ ] Validation avec historique projets similaires
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Améliorer ses estimations
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Tracker temps réel</strong> : compare estimé vs réel (Toggl)</li>
<li class="ml-4"><strong class="font-bold text-primary">Post-mortem</strong> : analyse écarts après projet</li>
<li class="ml-4"><strong class="font-bold text-primary">Base données historique</strong> : garde traces projets passés</li>
<li class="ml-4"><strong class="font-bold text-primary">Spécialisation</strong> : même stack → estimations précises</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Communiquer l'estimation
</h2>

✅ <strong class="font-bold text-primary">Donne fourchette</strong> : "Entre 15 et 18 jours" (pas "15,7j")
✅ <strong class="font-bold text-primary">Explique hypothèses</strong> : "Sur base cahier charges actuel"
✅ <strong class="font-bold text-primary">Préviens changements</strong> : "Toute modif scope = réestimation"
✅ <strong class="font-bold text-primary">Propose options</strong> : MVP (8j) vs Complet (18j)

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

L'estimation s'améliore avec <strong class="font-bold text-primary">l'expérience</strong>.
Track ton temps, analyse tes écarts, ajuste.
Une bonne estimation = projet rentable + client satisfait. 📊
    `
  },
  { 
    id: '46', 
    title: 'Outils pour gérer un projet client (Trello, Notion, Jira, etc.)', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi des outils de gestion ?
</h2>

Gérer un projet sans outils = chaos garanti.
Les bons outils te permettent de :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Suivre l'avancement des tâches</li>
<li class="ml-4">Communiquer efficacement avec le client</li>
<li class="ml-4">Centraliser la documentation</li>
<li class="ml-4">Facturer et suivre les paiements</li>
</ul>

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Les bons outils te permettent de gérer plus, stresser moins."
</blockquote>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Gestion de tâches
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Trello</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : simple, visuel (Kanban), gratuit</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : projets simples, suivi visuel tâches</li>
<li class="ml-4"><strong class="font-bold text-primary">Exemple board</strong> : To Do → In Progress → Review → Done</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Notion</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : tout-en-un (docs + tasks + wiki), flexible</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : gestion projet + documentation client</li>
<li class="ml-4"><strong class="font-bold text-primary">Template</strong> : database tâches + timeline + notes projet</li>
</ul>

<strong class="font-bold text-primary">Exemple structure Notion :</strong>
<code>
📁 Projet E-commerce Client X
  ├── 📋 Backlog (database)
  ├── 📅 Timeline (Gantt)
  ├── 📝 Cahier des charges
  ├── 🔗 Liens utiles (Figma, GitHub, staging)
  └── 💬 Notes de réunion
</code>

<h3 class="text-xl font-bold mt-6 mb-3">Linear</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : rapide, moderne, parfait pour développeurs</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : sprints Agile, intégration Git</li>
<li class="ml-4"><strong class="font-bold text-primary">Fonctionnalités</strong> : cycles, roadmap, assignation rapide</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Projects</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : intégré au code, suivi issues/PRs</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : projets tech avec client technique</li>
<li class="ml-4"><strong class="font-bold text-primary">Workflow</strong> : Issues → PR → Review → Merge</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Jira</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : puissant, adapté grosses équipes</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : projets complexes, méthodologie Scrum/Kanban</li>
<li class="ml-4"><strong class="font-bold text-primary">Inconvénient</strong> : courbe d'apprentissage, overkill pour freelance solo</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">ClickUp</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Points forts</strong> : très complet, multi-vues (liste, board, Gantt)</li>
<li class="ml-4"><strong class="font-bold text-primary">Usage</strong> : gestion multi-projets, équipes</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Communication client
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Slack</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Channels dédiés par projet</li>
<li class="ml-4">Intégrations (GitHub, Figma, Google Drive)</li>
<li class="ml-4">Threads pour discussions structurées</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Discord</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Alternative gratuite à Slack</li>
<li class="ml-4">Vocal + écrit</li>
<li class="ml-4">Parfait pour communautés tech</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Google Meet / Zoom</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Visioconférences hebdomadaires</li>
<li class="ml-4">Enregistrement des réunions (avec accord client)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Loom</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Vidéos d'avancement asynchrones</li>
<li class="ml-4">Démos rapides de features</li>
<li class="ml-4">Évite réunions inutiles</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Documentation technique
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Notion / Confluence</strong> : wiki projet, architecture, API docs</li>
<li class="ml-4"><strong class="font-bold text-primary">Google Docs</strong> : collaboration temps réel avec client</li>
<li class="ml-4"><strong class="font-bold text-primary">Markdown + GitHub</strong> : README.md, docs/ folder</li>
<li class="ml-4"><strong class="font-bold text-primary">Docusaurus / MkDocs</strong> : documentation technique publiée</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Facturation et suivi financier
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Freebe</strong> : facturation simple pour freelances français</li>
<li class="ml-4"><strong class="font-bold text-primary">Shine</strong> : compte pro + facturation intégrée</li>
<li class="ml-4"><strong class="font-bold text-primary">Malt</strong> : facturation via plateforme (si mission Malt)</li>
<li class="ml-4"><strong class="font-bold text-primary">Henrri</strong> : comptabilité automatisée</li>
<li class="ml-4"><strong class="font-bold text-primary">Stripe Invoicing</strong> : facturation internationale</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Suivi du temps
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Toggl Track</strong> : simple, rapports détaillés</li>
<li class="ml-4"><strong class="font-bold text-primary">Clockify</strong> : gratuit illimité</li>
<li class="ml-4"><strong class="font-bold text-primary">Harvest</strong> : timetracking + facturation</li>
</ul>

<strong class="font-bold text-primary">Pourquoi tracker son temps ?</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Améliorer estimations futures</li>
<li class="ml-4">Justifier TJM au client</li>
<li class="ml-4">Identifier tâches chronophages</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Stack recommandée freelance solo
</h2>

<strong class="font-bold text-primary">Setup minimal (gratuit) :</strong>
<code>
📋 Tâches : Trello ou Notion
💬 Communication : Slack (plan gratuit) ou email
📝 Docs : Google Docs + README.md
💰 Facturation : Freebe ou Shine
⏱️ Temps : Toggl Track
</code>

<strong class="font-bold text-primary">Setup avancé :</strong>
<code>
📋 Tâches : Notion (workspace complet) ou Linear
💬 Communication : Slack + Loom
📝 Docs : Notion + GitHub Wiki
💰 Facturation : Shine ou Stripe
⏱️ Temps : Harvest (intégré facturation)
📊 Analytics : Notion dashboard personnalisé
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Astuce pro
</h2>

✅ <strong class="font-bold text-primary">Fixe UN outil de communication unique</strong> avec le client (évite dispersion)
✅ <strong class="font-bold text-primary">Centralise dans Notion</strong> : workspace dédié par client
✅ <strong class="font-bold text-primary">Automatise</strong> : Zapier/Make.com pour connecter outils (Trello → Slack → Notion)
✅ <strong class="font-bold text-primary">Template réutilisable</strong> : crée un template Notion à dupliquer par projet

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Pas besoin de 10 outils. Choisis <strong class="font-bold text-primary">2-3 outils max</strong> que tu maîtrises parfaitement.
La simplicité et la constance battent toujours la complexité.
    `
  },
  { 
    id: '47', 
    title: 'Créer une documentation technique à destination du client / futur dev', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi documenter ?
</h2>

La documentation technique fait partie du <strong class="font-bold text-primary">livrable professionnel</strong>.
Elle garantit la <strong class="font-bold text-primary">transmission du savoir</strong> au-delà du projet.

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Une doc, c'est une marque de respect envers ton client et ton successeur."
</blockquote>

<h3 class="text-xl font-bold mt-6 mb-3">Bénéfices :</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Autonomie client pour maintenance</li>
<li class="ml-4">Onboarding rapide futur développeur</li>
<li class="ml-4">Réduction support post-livraison</li>
<li class="ml-4">Professionnalisme et crédibilité</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Contenu essentiel
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1️⃣ Vue d'ensemble du projet</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Objectif de l'application</li>
<li class="ml-4">Fonctionnalités principales</li>
<li class="ml-4">Architecture globale (diagramme)</li>
</ul>

<strong class="font-bold text-primary">Exemple :</strong>
<code>
# Application E-commerce

Plateforme de vente en ligne avec panier, paiement Stripe,
et interface admin pour gestion produits/commandes.

Architecture :
Frontend (React) → API (Node.js/Express) → Database (PostgreSQL)
</code>

<h3 class="text-xl font-bold mt-6 mb-3">2️⃣ Technologies utilisées</h3>
Liste complète avec versions :
<code>
## Stack technique

**Frontend :**
- React 18.2.0
- TypeScript 5.0
- Tailwind CSS 3.3
- React Router 6.x

**Backend :**
- Node.js 20.x
- Express 4.18
- Prisma ORM 5.x
- PostgreSQL 15

**DevOps :**
- Docker
- GitHub Actions (CI/CD)
- Vercel (frontend), Railway (backend)
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3️⃣ Installation locale</h3>
<strong class="font-bold text-primary">Prérequis + instructions pas-à-pas :</strong>

<code>
## Installation

### Prérequis
- Node.js 20+
- PostgreSQL 15+
- Compte Stripe (mode test)

### Étapes

1. Cloner le repo
git clone https://github.com/client/projet.git
cd projet

2. Installer dépendances
npm install

3. Configurer .env
cp .env.example .env
# Remplir DATABASE_URL, STRIPE_SECRET_KEY

4. Lancer migrations DB
npx prisma migrate dev

5. Démarrer serveur
npm run dev

→ Frontend : http://localhost:5173
→ Backend : http://localhost:3000
</code>

<h3 class="text-xl font-bold mt-6 mb-3">4️⃣ Configuration environnement</h3>

<code>
## Variables d'environnement

Créer fichier .env :

DATABASE_URL=postgresql://user:password@localhost:5432/dbname
STRIPE_SECRET_KEY=sk_test_...
JWT_SECRET=votre_secret_jwt
NODE_ENV=development
</code>

<h3 class="text-xl font-bold mt-6 mb-3">5️⃣ Structure du projet</h3>

<code>
project/
├── frontend/
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/         # Pages routes
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utils, API client
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/        # Endpoints API
│   │   ├── controllers/   # Logique métier
│   │   ├── models/        # Prisma schema
│   │   └── middleware/    # Auth, validation
└── docs/
    └── API.md         # Documentation API
</code>

<h3 class="text-xl font-bold mt-6 mb-3">6️⃣ Documentation API</h3>

<strong class="font-bold text-primary">Endpoints avec exemples :</strong>

<code>
## API Reference

### Authentification

**POST /api/auth/login**
Connexion utilisateur.

Body :
{
  "email": "user@example.com",
  "password": "password123"
}

Réponse (200) :
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com" }
}

**POST /api/auth/register**
Inscription.

### Produits

**GET /api/products**
Liste produits (avec pagination).

Query params :
- page=1 (default)
- limit=20 (default)
- category=electronics (optionnel)

**POST /api/products** (Auth requise, admin)
Créer produit.

Body :
{
  "name": "iPhone 15",
  "price": 999,
  "stock": 50
}
</code>

<h3 class="text-xl font-bold mt-6 mb-3">7️⃣ Procédures de déploiement</h3>

<code>
## Déploiement Production

### Frontend (Vercel)
- Push sur branche main
- CI/CD auto via GitHub Actions
- Deploy Vercel automatique

### Backend (Railway)
- Push sur main
- Railway détecte changements
- Build + deploy auto

### Migrations DB
Railway PostgreSQL :
railway run npx prisma migrate deploy

### Rollback
Vercel : Revert via dashboard (Deployments → Rollback)
Railway : Redeploy version précédente
</code>

<h3 class="text-xl font-bold mt-6 mb-3">8️⃣ Troubleshooting</h3>

<code>
## Problèmes courants

**Erreur : "Database connection failed"**
Solution : Vérifier DATABASE_URL dans .env

**Erreur : "Port 3000 already in use"**
Solution : 
lsof -i :3000  # Trouver process
kill -9 PID     # Tuer process

**Stripe webhooks ne marchent pas**
Solution : Utiliser Stripe CLI pour tests locaux
stripe listen --forward-to localhost:3000/webhooks/stripe
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Formats de documentation
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">README.md</h3>
Essentiel minimum dans repo. Couvre installation + quick start.

<h3 class="text-xl font-bold mt-6 mb-3">docs/ folder</h3>
Dossier dédié pour docs avancées :
<code>
docs/
├── ARCHITECTURE.md
├── API.md
├── DEPLOYMENT.md
└── CONTRIBUTING.md
</code>

<h3 class="text-xl font-bold mt-6 mb-3">Notion page</h3>
Workspace client avec :
- Overview projet
- Stack technique
- Procédures
- Logins/credentials (sécurisés)

<h3 class="text-xl font-bold mt-6 mb-3">Documentation générée</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong>MkDocs</strong> : docs statiques (Python)</li>
<li class="ml-4"><strong>Docusaurus</strong> : docs React (gros projets)</li>
<li class="ml-4"><strong>Swagger/OpenAPI</strong> : API auto-documentée</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bonnes pratiques
</h2>

✅ <strong class="font-bold text-primary">Documente au fur et à mesure</strong> (pas à la fin)
✅ <strong class="font-bold text-primary">Garde la doc à jour</strong> : sync avec code
✅ <strong class="font-bold text-primary">Exemples concrets</strong> : code snippets, screenshots
✅ <strong class="font-bold text-primary">Langage clair</strong> : évite jargon excessif
✅ <strong class="font-bold text-primary">Structure claire</strong> : titres, sections, table matières
✅ <strong class="font-bold text-primary">Versioning</strong> : documente versions majeures

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Template README minimal
</h2>

<code>
# Nom Projet

Description 1 phrase.

## Stack
- React + TypeScript
- Node.js + PostgreSQL

## Installation
npm install
cp .env.example .env
npm run dev

## Scripts
npm run dev (Dev mode)
npm run build (Build prod)
npm test (Run tests)

## Env Variables
Voir .env.example

## Deploy
Push sur main → auto deploy Vercel

## Contact
Support : dev@example.com
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Markdown</strong> : README.md, docs/</li>
<li class="ml-4"><strong class="font-bold text-primary">GitHub Wiki</strong> : docs intégrées repo</li>
<li class="ml-4"><strong class="font-bold text-primary">Notion</strong> : handoff page client</li>
<li class="ml-4"><strong class="font-bold text-primary">MkDocs</strong> : docs statiques publiées</li>
<li class="ml-4"><strong class="font-bold text-primary">Docusaurus</strong> : gros projets</li>
<li class="ml-4"><strong class="font-bold text-primary">Swagger UI</strong> : API interactive</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Documentation = <strong class="font-bold text-primary">investissement rentable</strong>.
Client satisfait = recommandations + missions futures.
Une doc claire différencie un développeur professionnel d'un amateur. 📚
    `
  },
  { 
    id: '48', 
    title: 'Gérer la relation client pendant le développement (transparence, reporting, livrables intermédiaires)', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi la communication est critique ?
</h2>

Le secret d'un projet réussi : <strong class="font-bold text-primary">communication régulière et transparente</strong>.

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Un client informé est un client serein. Un client serein te recommande."
</blockquote>

<h3 class="text-xl font-bold mt-6 mb-3">Risques d'une mauvaise communication :</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Client anxieux → micro-management</li>
<li class="ml-4">Attentes décalées → déception livraison</li>
<li class="ml-4">Problèmes non détectés → retards coûteux</li>
<li class="ml-4">Mauvaise réputation → perte recommandations</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Bonnes pratiques
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1️⃣ Point d'avancement hebdomadaire</h3>

<strong class="font-bold text-primary">Format recommandé :</strong>
<code>
📅 Semaine du 13-17 nov 2025

✅ Réalisé :
- Auth système (login/signup)
- Interface dashboard (80% complete)
- Intégration Stripe test mode

⏳ En cours :
- Page admin (gestion produits)
- Tests unitaires auth

🚧 Blocages :
- Attente accès API client (relance faite)

📆 Prochaine semaine :
- Finaliser admin
- Déploiement staging
- Démo prévue vendredi 14h
</code>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Email structuré (si peu de projets)</li>
<li class="ml-4">Notion update page (partagée)</li>
<li class="ml-4">Slack message récapitulatif</li>
<li class="ml-4">Loom vidéo (2-3 min montrant progrès)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">2️⃣ Journal de bord transparent</h3>

Documente en temps réel :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Changements techniques</li>
<li class="ml-4">Décisions importantes</li>
<li class="ml-4">Problèmes rencontrés + solutions</li>
<li class="ml-4">Questions client non résolues</li>
</ul>

<strong class="font-bold text-primary">Exemple Notion changelog :</strong>
<code>
## Changelog Projet

### 13 nov 2025
- Migration DB vers PostgreSQL (perf +40%)
- Choix Stripe vs PayPal → Stripe (fees +bas)
- Bug fix : pagination produits

### 12 nov 2025
- Implémentation filtre catégories
- Question client : stockage images → Cloudinary OK
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3️⃣ Démos à chaque itération</h3>

<strong class="font-bold text-primary">Rythme recommandé :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Petits projets (< 2 semaines) : 2 démos (mid + final)</li>
<li class="ml-4">Projets moyens : démo hebdo ou bi-hebdo</li>
<li class="ml-4">Gros projets : démo fin de sprint (Agile)</li>
</ul>

<strong class="font-bold text-primary">Format démo efficace :</strong>
<code>
1. Recap objectifs semaine (1 min)
2. Démo live features (5-10 min)
3. Prochaines étapes (2 min)
4. Questions/feedbacks client (5 min)

Total : 15-20 min max
</code>

<strong class="font-bold text-primary">Outils :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Google Meet / Zoom (live)</li>
<li class="ml-4">Loom (async si client busy)</li>
<li class="ml-4">Staging URL partagée (client teste)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">4️⃣ Transparence sur délais et risques</h3>

✅ <strong class="font-bold text-primary">Annonce ASAP si retard</strong> :
<code>
"Feature X prendra 2j de plus (API complexe).
Nouvel ETA : vendredi au lieu de mercredi.
Impact planning global : aucun (marge prévue)."
</code>

✅ <strong class="font-bold text-primary">Identifie risques tôt</strong> :
<code>
"Attention : intégration Y dépend d'accès API.
Si pas reçu d'ici jeudi, risque retard 3-5j."
</code>

❌ <strong class="font-bold text-primary">Jamais</strong> :
- Cacher problème jusqu'à la deadline
- Promettre impossible pour rassurer
- Ghosting quand tu es bloqué

<h3 class="text-xl font-bold mt-6 mb-3">5️⃣ Canal de communication unique</h3>

Fixe <strong class="font-bold text-primary">DÈS LE DÉBUT</strong> :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Email pro uniquement ?</li>
<li class="ml-4">Slack workspace dédié ?</li>
<li class="ml-4">WhatsApp Business (si client préfère) ?</li>
<li class="ml-4">Notion comments pour questions techniques ?</li>
</ul>

⚠️ <strong class="font-bold text-primary">Évite dispersion</strong> : email + Slack + SMS + appels = chaos garanti.

<strong class="font-bold text-primary">Template onboarding client :</strong>
<code>
📋 Communication Projet

✉️ Updates hebdo : Email (tous les lundis)
💬 Questions rapides : Slack #projet-X
🎥 Démos : Google Meet (vendredis 14h)
📝 Documentation : Notion workspace partagé

⏰ Délai réponse : 24-48h (jours ouvrés)
</code>

<h3 class="text-xl font-bold mt-6 mb-3">6️⃣ Livrables intermédiaires</h3>

Ne livre PAS tout d'un coup en fin.

<strong class="font-bold text-primary">Exemple planning incrémental :</strong>

| Semaine | Livrable | Feedback attendu |
|---------|----------|------------------|
| S2 | Maquettes + archi | Validation design |
| S4 | MVP fonctionnel (staging) | Tests utilisateur |
| S6 | Version complète (beta) | UAT client |
| S7 | Production + docs | Recette finale |

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Corrections incrémentales (moins coûteuses)</li>
<li class="ml-4">Client voit progression concrète</li>
<li class="ml-4">Réduit risque "c'est pas ce que je voulais" final</li>
<li class="ml-4">Paiements échelonnés justifiés</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils recommandés
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Notion</strong> : workspace partagé (backlog, changelog, docs)</li>
<li class="ml-4"><strong class="font-bold text-primary">Loom</strong> : vidéos async (démos, explications)</li>
<li class="ml-4"><strong class="font-bold text-primary">Slack</strong> : communication temps réel</li>
<li class="ml-4"><strong class="font-bold text-primary">Calendly</strong> : planification démos (évite va-et-vient emails)</li>
<li class="ml-4"><strong class="font-bold text-primary">Vercel Preview</strong> : staging URLs automatiques (GitHub PRs)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Template reporting hebdo
</h2>

<code>
Objet : [Projet X] Point hebdo S42

Bonjour [Client],

Voici l'avancement cette semaine :

✅ TERMINÉ
- Feature A (auth système)
- Feature B (dashboard)
- Bug fix : problème pagination

⏳ EN COURS (80%)
- Feature C (interface admin)

📅 PRÉVISIONS SEMAINE PROCHAINE
- Finaliser Feature C
- Tests E2E
- Déploiement staging

🚧 POINTS D'ATTENTION
- Besoin validation maquette page admin (cf. lien Figma)
- Attente accès API [Service Y]

🎥 DÉMO
Vendredi 17 nov, 14h (lien Meet : ...)

Questions/remarques : répondez à ce mail ou Slack.

Bonne semaine,
[Ton nom]
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Checklist relation client ✅
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Update hebdo systématique (même sans gros progrès)</li>
<li class="ml-4">✅ Démo toutes les 1-2 semaines</li>
<li class="ml-4">✅ Transparence sur blocages/retards</li>
<li class="ml-4">✅ Canal communication unique défini</li>
<li class="ml-4">✅ Délai réponse clair (24-48h)</li>
<li class="ml-4">✅ Livrables intermédiaires planifiés</li>
<li class="ml-4">✅ Documentation accessible (Notion/GitHub)</li>
<li class="ml-4">✅ Feedback client sollicité régulièrement</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Erreurs à éviter ❌
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Silence radio pendant 2 semaines</li>
<li class="ml-4">Annoncer retard la veille de deadline</li>
<li class="ml-4">"Tout va bien" alors que tu es bloqué</li>
<li class="ml-4">Répondre avec 5j de délai</li>
<li class="ml-4">Jargon technique incompréhensible</li>
<li class="ml-4">Pas de trace écrite des décisions</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Communication = <strong class="font-bold text-primary">45% du succès projet</strong>.
Code parfait + communication nulle = client mécontent.
Code moyen + communication excellente = client ravi.

Investis dans la relation client : c'est ton meilleur ROI. 💬
    `
  },
  { 
    id: '49', 
    title: 'Déploiement en production : check-list et bonnes pratiques de livraison', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi un déploiement structuré ?
</h2>

La livraison en production est <strong class="font-bold text-primary">l'étape critique</strong> du projet.
Mauvais deploy = downtime, bugs, perte confiance client.

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Tu ne veux jamais croiser les doigts en prod. Un bon déploiement, c'est une livraison maîtrisée."
</blockquote>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Check-list pré-déploiement ✅
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1️⃣ Tests validés</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Tests unitaires passés (npm test)</li>
<li class="ml-4">✅ Tests E2E validés (Playwright/Cypress)</li>
<li class="ml-4">✅ Tests manuels features critiques</li>
<li class="ml-4">✅ Performance acceptable (Lighthouse > 90)</li>
<li class="ml-4">✅ Accessibilité vérifiée (a11y)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">2️⃣ Variables d'environnement</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Fichier .env.production configuré</li>
<li class="ml-4">✅ Secrets stockés sécurisés (Vercel Env, Railway Secrets)</li>
<li class="ml-4">✅ API keys production activées (Stripe live mode, etc.)</li>
<li class="ml-4">✅ URLs production correctes (frontend ↔ backend)</li>
</ul>

<strong class="font-bold text-primary">Exemple .env.production :</strong>
<code>
NODE_ENV=production
DATABASE_URL=postgresql://prod_user@prod_db/myapp
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://monapp.com
BACKEND_URL=https://api.monapp.com
JWT_SECRET=secret_ultra_securise_32_chars
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3️⃣ Backup base de données</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Export DB avant migration</li>
<li class="ml-4">✅ Snapshot/backup automatique activé</li>
<li class="ml-4">✅ Test restauration backup (au moins 1 fois)</li>
</ul>

<strong class="font-bold text-primary">Commandes PostgreSQL :</strong>
<code>
Backup :
pg_dump -U user -d dbname > backup_20251113.sql

Restore (si besoin) :
psql -U user -d dbname < backup_20251113.sql
</code>

<h3 class="text-xl font-bold mt-6 mb-3">4️⃣ Monitoring activé</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Error tracking (Sentry configuré)</li>
<li class="ml-4">✅ Uptime monitoring (UptimeRobot, Ping dom)</li>
<li class="ml-4">✅ Logs accessibles (Vercel Logs, Railway Console)</li>
<li class="ml-4">✅ Alertes email/Slack configurées</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">5️⃣ Documentation à jour</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ README.md complet</li>
<li class="ml-4">✅ Guide déploiement (docs/DEPLOY.md)</li>
<li class="ml-4">✅ Procédure rollback documentée</li>
<li class="ml-4">✅ Contacts support/maintenance</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">6️⃣ Plan de rollback</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Git tag version stable (git tag v1.0.0)</li>
<li class="ml-4">✅ Procédure retour arrière testée</li>
<li class="ml-4">✅ Backup DB récent (< 24h)</li>
<li class="ml-4">✅ Contact client pour validation rollback si besoin</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils CI/CD recommandés
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions</h3>
<strong class="font-bold text-primary">Workflow exemple :</strong>
<code>
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: secrets.VERCEL_TOKEN
          vercel-org-id: secrets.ORG_ID
          vercel-project-id: secrets.PROJECT_ID
          vercel-args: '--prod'
</code>

<h3 class="text-xl font-bold mt-6 mb-3">GitLab CI</h3>
<code>
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test

deploy_production:
  stage: deploy
  script:
    - npm run build
    - vercel --prod --token=VERCEL_TOKEN
  only:
    - main
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Hébergeurs recommandés
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Frontend statique</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Vercel</strong> : React/Next.js, deploy auto, preview URLs</li>
<li class="ml-4"><strong class="font-bold text-primary">Netlify</strong> : Alternative Vercel, forms intégrés</li>
<li class="ml-4"><strong class="font-bold text-primary">Cloudflare Pages</strong> : CDN ultra-rapide, gratuit</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Backend + DB</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Railway</strong> : PostgreSQL + Node.js, simple config</li>
<li class="ml-4"><strong class="font-bold text-primary">Render</strong> : Alternative Railway, plan gratuit</li>
<li class="ml-4"><strong class="font-bold text-primary">Fly.io</strong> : Global edge deployment</li>
<li class="ml-4"><strong class="font-bold text-primary">AWS/Azure</strong> : Gros projets, scalabilité</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Full-stack</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Vercel</strong> (Next.js full-stack)</li>
<li class="ml-4"><strong class="font-bold text-primary">Heroku</strong> : Simple mais cher</li>
<li class="ml-4"><strong class="font-bold text-primary">DigitalOcean App Platform</strong> : Droplets + managed</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Stratégies de déploiement
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Rolling deployment (standard)</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Remplace ancienne version par nouvelle</li>
<li class="ml-4">Downtime minimal (quelques secondes)</li>
<li class="ml-4">Rollback = redeploy version précédente</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">2. Blue-Green deployment</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">2 environnements : Blue (actuel) + Green (nouveau)</li>
<li class="ml-4">Switch instantané DNS/load balancer</li>
<li class="ml-4">Rollback immédiat (re-switch vers Blue)</li>
<li class="ml-4">Coût : double infra temporairement</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">3. Canary deployment</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Déploie nouvelle version pour 5-10% users</li>
<li class="ml-4">Monitor erreurs/performance</li>
<li class="ml-4">Si OK → rollout 100%</li>
<li class="ml-4">Usage : apps critiques, forte audience</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Post-déploiement
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Surveillance immédiate (24-48h)</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Vérifier logs (pas d'erreurs critiques)</li>
<li class="ml-4">✅ Tester flows principaux (auth, paiement)</li>
<li class="ml-4">✅ Monitor Sentry (zero errors idéalement)</li>
<li class="ml-4">✅ Check uptime (100% sur UptimeRobot)</li>
<li class="ml-4">✅ Performance (response time < 500ms)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Communication client</h3>
<code>
Objet : ✅ [Projet X] Mise en production réussie

Bonjour [Client],

Le projet est maintenant en production !

🌐 URL : https://monapp.com
📊 Monitoring : Dashboard Vercel
📧 Support : contact@monapp.com

📋 Prochaines étapes :
- Surveillance 48h (je reste dispo)
- Formation utilisateurs (si prévu)
- Maintenance J+30 (incluse)

Tout fonctionne parfaitement. N'hésite pas pour questions.

Félicitations pour le lancement ! 🚀

[Ton nom]
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Checklist déploiement finale ✅
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Tests unitaires + E2E passés</li>
<li class="ml-4">✅ Env vars production configurées</li>
<li class="ml-4">✅ Backup DB effectué</li>
<li class="ml-4">✅ Monitoring activé (Sentry, UptimeRobot)</li>
<li class="ml-4">✅ Documentation mise à jour</li>
<li class="ml-4">✅ Plan rollback préparé</li>
<li class="ml-4">✅ Git tag version (v1.0.0)</li>
<li class="ml-4">✅ CI/CD pipeline fonctionnel</li>
<li class="ml-4">✅ DNS/domaine configuré</li>
<li class="ml-4">✅ HTTPS/SSL actif</li>
<li class="ml-4">✅ Client prévenu + accès fournis</li>
<li class="ml-4">✅ Surveillance 48h planifiée</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils alerting
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Sentry</strong> : error tracking temps réel</li>
<li class="ml-4"><strong class="font-bold text-primary">UptimeRobot</strong> : monitoring uptime (gratuit 50 monitors)</li>
<li class="ml-4"><strong class="font-bold text-primary">Grafana</strong> : dashboards métriques avancées</li>
<li class="ml-4"><strong class="font-bold text-primary">Datadog</strong> : APM complet (enterprise)</li>
<li class="ml-4"><strong class="font-bold text-primary">PagerDuty</strong> : alertes on-call</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Un déploiement réussi = <strong class="font-bold text-primary">préparation + checklist + monitoring</strong>.
Pas de place pour l'improvisation en production.
Clone cette checklist pour chaque projet : zéro stress, zéro surprise. 🚀
    `
  },
  { 
    id: '50', 
    title: 'Assurer le suivi post-livraison : maintenance, retours, fidélisation du client', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi le suivi post-livraison ?
</h2>

La livraison n'est PAS la fin.
Un <strong class="font-bold text-primary">suivi bien géré</strong> transforme un one-shot en collaboration long terme.

<blockquote class="border-l-4 border-primary pl-4 italic my-4">
"Le suivi client, c'est du business durable. C'est là que ton professionnalisme fait toute la différence."
</blockquote>

<h3 class="text-xl font-bold mt-6 mb-3">Bénéfices :</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Missions récurrentes (maintenance, évolutions)</li>
<li class="ml-4">Recommandations clients satisfaits</li>
<li class="ml-4">Réputation professionnelle renforcée</li>
<li class="ml-4">Revenu passif (contrats maintenance)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Étapes clés post-livraison
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Semaine 1 : Surveillance intensive</h3>

<strong class="font-bold text-primary">Actions :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Vérifier logs quotidiennement</li>
<li class="ml-4">✅ Monitor erreurs Sentry</li>
<li class="ml-4">✅ Check uptime (doit être 100%)</li>
<li class="ml-4">✅ Répondre questions client < 2h</li>
<li class="ml-4">✅ Corriger bugs critiques immédiatement</li>
</ul>

<strong class="font-bold text-primary">Email J+7 :</strong>
<code>
Objet : [Projet X] Point 1 semaine post-lancement

Bonjour [Client],

Première semaine en production : tout roule ! 🚀

📊 Statistiques :
- Uptime : 100%
- Temps réponse moyen : 180ms
- Zero erreur critique
- 247 utilisateurs inscrits

🐞 Corrections apportées :
- Bug mineur affichage mobile (fixé J+3)
- Optimisation chargement images (-15%)

Des questions ou améliorations à discuter ?

Bonne continuation,
[Ton nom]
</code>

<h3 class="text-xl font-bold mt-6 mb-3">Mois 1 : Plan de maintenance</h3>

<strong class="font-bold text-primary">Proposition maintenance préventive :</strong>

<code>
🛠️ Forfait Maintenance Mensuel : 200€ HT/mois

✅ Inclus :
- MAJ sécurité dépendances
- Backup hebdomadaire auto
- Monitoring 24/7 (Sentry + UptimeRobot)
- Support email (réponse 24-48h)
- 1h/mois petites corrections

❌ Hors forfait :
- Nouvelles features (facturées au TJM)
- Refonte design
- Migrations majeures

Engagement : sans engagement, résiliable 30j
</code>

<strong class="font-bold text-primary">Tâches maintenance :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">MAJ React 18.2 → 18.3</li>
<li class="ml-4">Security patches Node.js</li>
<li class="ml-4">Optimisation DB (index, queries)</li>
<li class="ml-4">Vérification SSL/certificats</li>
<li class="ml-4">Nettoyage logs anciens</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Trimestre 1 : Évolutions et upsell</h3>

<strong class="font-bold text-primary">Identification opportunités :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Analytics : features les plus utilisées</li>
<li class="ml-4">Feedback users : demandes récurrentes</li>
<li class="ml-4">Concurrence : nouvelles tendances</li>
</ul>

<strong class="font-bold text-primary">Email proposition évolution :</strong>
<code>
Objet : [Projet X] Idée amélioration : Dashboard analytics

Bonjour [Client],

J'ai remarqué dans les stats que 80% des users consultent
les ventes quotidiennes.

💡 Proposition : Dashboard analytics temps réel
- Graphiques ventes (jour/semaine/mois)
- Top produits
- Taux conversion
- Export PDF rapports

💰 Estimation : 3-4 jours (1 350€ HT)
📅 Livraison : 2 semaines

Intéressé pour en discuter ?

Amicalement,
[Ton nom]
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Collecte feedback client
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Template questionnaire satisfaction</h3>

<code>
📝 Questionnaire Satisfaction Post-Projet

Bonjour [Client],

Le projet [X] est en ligne depuis 1 mois.
Ton avis m'intéresse pour améliorer mes services !

1. Note globale projet : /10
2. Communication durant projet : /10
3. Respect délais : /10
4. Qualité livrable : /10

Questions ouvertes :
- Qu'as-tu le plus apprécié ?
- Points d'amélioration ?
- Recommanderais-tu mes services ? (Oui/Non)
- Accepterais-tu un témoignage portfolio ? (Anonyme OK)

Merci ! 🙏
</code>

<strong class="font-bold text-primary">Utilisation feedback :</strong>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Témoignages portfolio (avec accord)</li>
<li class="ml-4">Case studies détaillées</li>
<li class="ml-4">Amélioration process</li>
<li class="ml-4">Social proof (LinkedIn, site)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Fidélisation stratégique
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Tactiques fidélisation</h3>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Newsletter tech</strong> : partage tips (1x/mois)</li>
<li class="ml-4"><strong class="font-bold text-primary">Check-in trimestriel</strong> : "Comment va l'app ?"</li>
<li class="ml-4"><strong class="font-bold text-primary">Offres spéciales</strong> : -10% si nouveau projet</li>
<li class="ml-4"><strong class="font-bold text-primary">Veille proactive</strong> : "Nouvelle techno qui pourrait t'aider"</li>
<li class="ml-4"><strong class="font-bold text-primary">Invitations events</strong> : meetups, webinaires</li>
</ul>

<strong class="font-bold text-primary">Exemple check-in T2 :</strong>
<code>
Objet : 👋 Comment va [Projet X] ?

Bonjour [Client],

6 mois depuis le lancement ! Le temps passe vite.

Comment se passe l'utilisation de l'app ?
Des besoins d'évolutions ou questions ?

Je reste dispo si besoin. Félicitations pour le succès ! 🚀

[Ton nom]
</code>

<h3 class="text-xl font-bold mt-6 mb-3">Programme référent</h3>

<code>
🎁 Programme Recommandation

Tu recommandes un client qui signe ?
→ Tu reçois 10% du montant projet en crédit maintenance

Exemple :
Projet recommandé : 5 000€
→ Ton bénéfice : 500€ crédit (= 2,5 mois maintenance gratuite)

Gagnant-gagnant ! 🤝
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils suivi client
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">CRM simples freelances</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Notion</strong> : database clients + suivi interactions</li>
<li class="ml-4"><strong class="font-bold text-primary">HubSpot CRM</strong> : gratuit, complet</li>
<li class="ml-4"><strong class="font-bold text-primary">Airtable</strong> : flexible, automations</li>
<li class="ml-4"><strong class="font-bold text-primary">Pipedrive</strong> : focus sales pipeline</li>
</ul>

<strong class="font-bold text-primary">Template Notion CRM :</strong>
<code>
📁 Database Clients

Champs :
- Nom client
- Projet (relation)
- Statut (Actif, Maintenance, Inactif)
- Dernier contact (date)
- Prochaine action (date + description)
- Potentiel upsell (Oui/Non)
- Satisfaction (/10)
- Notes

Vues :
- Actifs (maintenance en cours)
- À recontacter (> 3 mois sans news)
- Upsell opportunités
</code>

<h3 class="text-xl font-bold mt-6 mb-3">Automatisations utiles</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong>Zapier</strong> : Email client → crée tache Notion</li>
<li class="ml-4"><strong>Calendly</strong> : booking auto check-ins trimestriels</li>
<li class="ml-4"><strong>Mailchimp</strong> : newsletter automatique</li>
<li class="ml-4"><strong>UptimeRobot</strong> : alertes downtime → Slack + Email client</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Checklist suivi long-terme ✅
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">✅ Email recap J+7 post-lancement</li>
<li class="ml-4">✅ Proposition maintenance M+1</li>
<li class="ml-4">✅ Questionnaire satisfaction M+1</li>
<li class="ml-4">✅ Check-in informel T+1 (3 mois)</li>
<li class="ml-4">✅ Proposition évolutions T+1</li>
<li class="ml-4">✅ Newsletter tech (si pertinent)</li>
<li class="ml-4">✅ Suivi CRM systématique</li>
<li class="ml-4">✅ Recontact annuel minimum</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Erreurs à éviter ❌
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Ghosting après paiement final</li>
<li class="ml-4">Maintenance gratuite infinie (fixe limite temps)</li>
<li class="ml-4">Jamais demander feedback</li>
<li class="ml-4">Contact uniquement pour vendre</li>
<li class="ml-4">Oublier anniversaire projet (opportunité recontact)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Suivi post-livraison = <strong class="font-bold text-primary">investissement le plus rentable</strong>.

<strong class="font-bold text-primary">Statistiques :</strong>
- Coût acquisition nouveau client : 5x plus cher que fidélisation
- Client fidèle : 3-5 projets en moyenne vs 1 one-shot
- Recommandations : 40% nouveaux clients si suivi excellent

Ton meilleur commercial = tes anciens clients satisfaits. 🌟
    `
  },
  { 
    id: '51', 
    title: 'Pricing : comment fixer son TJM ou ses forfaits en freelance', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi le pricing est crucial ?
</h2>

Ton TJM (<strong class="font-bold text-primary">Taux Journalier Moyen</strong>) ou tes tarifs projet déterminent :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Ta rentabilité</li>
<li class="ml-4">Le type de clients que tu attires</li>
<li class="ml-4">Ton positionnement sur le marché</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Calculer son TJM de base
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Définir son revenu cible annuel
</h3>

<code>
Salaire net souhaité : 40 000 €
+ Charges sociales (~45%) : 18 000 €
+ Impôts (~15%) : 6 000 €
+ Frais pro : 5 000 €
= Chiffre d'affaires cible : 69 000 €
</code>

<h3 class="text-xl font-bold mt-6 mb-3">2. Calculer le nombre de jours facturables
</h3>

<code>
365 jours
<ul class="my-4 list-disc pl-6">
<li class="ml-4">104 week-ends</li>
<li class="ml-4">25 jours de congés</li>
<li class="ml-4">10 jours fériés</li>
<li class="ml-4">30 jours de prospection/admin</li>
</ul>
= 196 jours facturables
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3. Calculer le TJM minimum
</h3>

<code>
69 000 € / 196 jours = 352 € HT/jour
</code>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Ajuster son TJM selon la valeur
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Expertise</strong> : spécialisation technique (React, DevOps) = +20-50%</li>
<li class="ml-4"><strong class="font-bold text-primary">Mission</strong> : urgence, complexité = +30%</li>
<li class="ml-4"><strong class="font-bold text-primary">Région</strong> : Paris vs province = ±20%</li>
<li class="ml-4"><strong class="font-bold text-primary">Durée</strong> : mission courte = TJM plus élevé</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Forfait vs Régie
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Régie (TJM)
</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Facturation au temps passé</li>
<li class="ml-4">Risque faible, revenu stable</li>
<li class="ml-4">Moins de liberté créative</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">Forfait
</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Prix fixe pour un livrable</li>
<li class="ml-4">Potentiel de gain élevé si bien estimé</li>
<li class="ml-4">Risque : sous-estimation = perte</li>
</ul>
<strong class="font-bold text-primary">Astuce</strong> : Forfait = TJM × nb jours estimés × 1.3 (marge de sécurité)

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Communiquer son tarif
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4">Annoncer son TJM avec <strong class="font-bold text-primary">confiance</strong></li>
<li class="ml-4">Justifier par la <strong class="font-bold text-primary">valeur apportée</strong>, pas le temps</li>
<li class="ml-4">Proposer plusieurs options (basic, standard, premium)</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Malt</strong> : voir les TJM moyens par compétence</li>
<li class="ml-4"><strong class="font-bold text-primary">Comet</strong> : benchmark des freelances</li>
<li class="ml-4"><strong class="font-bold text-primary">Simulateur URSSAF</strong> : calculer charges</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

Ton TJM n'est pas figé : <strong class="font-bold text-primary">réévalue-le tous les 6 mois</strong>.
L'expérience et la spécialisation justifient une augmentation progressive.
    `
  },
  { 
    id: '52', 
    title: 'Contrats et aspects juridiques : se protéger en freelance', 
    category: 'freelance',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pourquoi un contrat est essentiel ?
</h2>

Le contrat = <strong class="font-bold text-primary">ta protection juridique</strong>.
Il fixe :
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Le périmètre de la mission</li>
<li class="ml-4">Les modalités de paiement</li>
<li class="ml-4">Les responsabilités de chacun</li>
<li class="ml-4">Les conditions de sortie</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Éléments indispensables d'un contrat
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">1. Parties contractantes
</h3>
Identité complète du client et du freelance (SIRET, adresse).

<h3 class="text-xl font-bold mt-6 mb-3">2. Objet de la mission
</h3>
Description précise du travail à réaliser.

<strong class="font-bold text-primary">Exemple</strong> :
<code>
"Développement d'une application React avec backend Node.js,
incluant authentification, gestion utilisateur et interface admin."
</code>

<h3 class="text-xl font-bold mt-6 mb-3">3. Durée et délais
</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Date de début et de fin</li>
<li class="ml-4">Jalons de livraison (milestones)</li>
<li class="ml-4">Conditions de prolongation</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">4. Tarif et modalités de paiement
</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">TJM ou forfait</li>
<li class="ml-4">Fréquence de facturation (mensuelle, par jalon)</li>
<li class="ml-4">Délai de paiement (30 jours fin de mois, etc.)</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">5. Propriété intellectuelle
</h3>
<strong class="font-bold text-primary">Crucial</strong> : qui possède le code ?

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Cession totale</strong> : le client devient propriétaire</li>
<li class="ml-4"><strong class="font-bold text-primary">Licence d'utilisation</strong> : tu gardes la propriété, le client a le droit d'usage</li>
<li class="ml-4"><strong class="font-bold text-primary">Code open-source</strong> : spécifier la licence (MIT, GPL...)</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">6. Confidentialité (NDA)
</h3>
Protection des informations sensibles du client.

<h3 class="text-xl font-bold mt-6 mb-3">7. Responsabilités et garanties
</h3>
<ul class="my-4 list-disc pl-6">
<li class="ml-4">Garantie de bon fonctionnement (combien de temps ?)</li>
<li class="ml-4">Limitation de responsabilité (montant max)</li>
</ul>
<h3 class="text-xl font-bold mt-6 mb-3">8. Résiliation
</h3>
Conditions de sortie anticipée (préavis, indemnités).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Types de contrats
</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Contrat de prestation de service
</h3>
Le plus courant. Relation commerciale B2B.

<h3 class="text-xl font-bold mt-6 mb-3">Contrat-cadre
</h3>
Pour missions récurrentes avec un même client.

<h3 class="text-xl font-bold mt-6 mb-3">Portage salarial
</h3>
Tu restes salarié, la société de portage gère l'admin.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Pièges à éviter
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Clause d'exclusivité</strong> : limite ta liberté de travailler pour d'autres clients</li>
<li class="ml-4"><strong class="font-bold text-primary">Lien de subordination</strong> : peut requalifier la relation en salariat</li>
<li class="ml-4"><strong class="font-bold text-primary">Paiement différé</strong> : méfie-toi des "on paie à 90 jours"</li>
<li class="ml-4"><strong class="font-bold text-primary">Scope illimité</strong> : toujours cadrer les révisions/modifications</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Outils et modèles
</h2>

<ul class="my-4 list-disc pl-6">
<li class="ml-4"><strong class="font-bold text-primary">Jurismatic</strong> : générateur de contrats juridiques</li>
<li class="ml-4"><strong class="font-bold text-primary">Legalstart</strong> : modèles de contrats</li>
<li class="ml-4"><strong class="font-bold text-primary">Avocat spécialisé</strong> : pour missions importantes (>20k€)</li>
</ul>
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Conclusion
</h2>

<strong class="font-bold text-primary">Jamais de mission sans contrat signé</strong>.
Un bon contrat protège les deux parties et évite 90% des litiges.
    `
  },
];
