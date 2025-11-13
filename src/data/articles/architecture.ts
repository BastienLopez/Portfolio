import { Article } from './types';

export const architectureArticles: Article[] = [
// 🧰 Architecture & Bonnes pratiques de code
  { 
    id: '31', 
    title: 'Comprendre les principes SOLID en développement', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Les 5 règles d'or du code propre</h2>

Les principes <strong class="font-bold text-primary">SOLID</strong> (Robert C. Martin) = base du code orienté objet maintenable.

<strong class="font-bold text-primary">Objectif :</strong> Code flexible, testable, évolutif.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔤 S — Single Responsibility Principle</h2>

<strong class="font-bold text-primary">Règle :</strong> Une classe = une seule responsabilité.

<h3 class="text-xl font-bold mt-6 mb-3">❌ Mauvais</h3>

\`\`\`typescript
class User {
  save() { /* DB */ }
  sendEmail() { /* Email */ }
  generateReport() { /* PDF */ }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bon</h3>

\`\`\`typescript
class User { constructor(public name: string) {} }
class UserRepository { save(user: User) {} }
class EmailService { send(user: User) {} }
class ReportGenerator { generate(user: User) {} }
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔓 O — Open/Closed Principle</h2>

<strong class="font-bold text-primary">Règle :</strong> Ouvert à l'extension, fermé à la modification.

<h3 class="text-xl font-bold mt-6 mb-3">❌ Mauvais</h3>

\`\`\`typescript
class PaymentProcessor {
  process(type: string) {
    if (type === 'card') {}
    else if (type === 'paypal') {}
    // Ajout = modification
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bon</h3>

\`\`\`typescript
interface Payment { process(): void; }
class CardPayment implements Payment { process() {} }
class PayPalPayment implements Payment { process() {} }
// Ajout = nouvelle classe
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔄 L — Liskov Substitution Principle</h2>

<strong class="font-bold text-primary">Règle :</strong> Sous-classe remplace super-classe sans casser.

<h3 class="text-xl font-bold mt-6 mb-3">❌ Mauvais</h3>

\`\`\`typescript
class Bird { fly() {} }
class Penguin extends Bird {
  fly() { throw new Error('Cannot fly!'); }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bon</h3>

\`\`\`typescript
interface Bird { move(): void; }
class Sparrow implements Bird { move() { /* fly */ } }
class Penguin implements Bird { move() { /* swim */ } }
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🧩 I — Interface Segregation Principle</h2>

<strong class="font-bold text-primary">Règle :</strong> Petites interfaces ciblées > grosse interface.

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bon</h3>

\`\`\`typescript
interface Workable { work(): void; }
interface Eatable { eat(): void; }

class Human implements Workable, Eatable {
  work() {}
  eat() {}
}

class Robot implements Workable {
  work() {} // Pas de eat()
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🔌 D — Dependency Inversion Principle</h2>

<strong class="font-bold text-primary">Règle :</strong> Dépendre d'abstractions, pas d'implémentations.

<h3 class="text-xl font-bold mt-6 mb-3">❌ Mauvais</h3>

\`\`\`typescript
class MySQLDatabase { save(data: any) {} }
class UserService {
  db = new MySQLDatabase(); // Couplage fort
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">✅ Bon</h3>

\`\`\`typescript
interface Database { save(data: any): void; }
class MySQLDatabase implements Database { save(data: any) {} }

class UserService {
  constructor(private db: Database) {} // Injection
}

const service = new UserService(new MySQLDatabase());
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

<strong class="font-bold text-primary">Résumé SOLID :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">S</strong> : Une responsabilité par classe</li>
  <li class="ml-4"><strong class="font-bold text-primary">O</strong> : Extend, not modify</li>
  <li class="ml-4"><strong class="font-bold text-primary">L</strong> : Substitution sans casse</li>
  <li class="ml-4"><strong class="font-bold text-primary">I</strong> : Interfaces ciblées</li>
  <li class="ml-4"><strong class="font-bold text-primary">D</strong> : Abstractions > Implémentations</li>
</ul>

> "SOLID n'est pas un dogme, c'est une boussole." 🧭
    `
  },
  { 
    id: '32', 
    title: 'Comment découper proprement une application en modules ou microservices', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Modularité = maintenabilité</h2>

Un projet bien structuré est plus facile à <strong class="font-bold text-primary">maintenir, tester et faire évoluer</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Identifier domaines fonctionnels</h2>

Découpe par <strong class="font-bold text-primary">responsabilités métier</strong> :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">User (authentification, profil)</li>
  <li class="ml-4">Product (catalogue, inventory)</li>
  <li class="ml-4">Payment (transactions, factures)</li>
  <li class="ml-4">Notification (email, SMS)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structure modulaire (Monolithe)</h2>

\`\`\`
src/
 ├── user/
 │   ├── user.controller.ts
 │   ├── user.service.ts
 │   ├── user.repository.ts
 │   └── user.model.ts
 ├── product/
 │   ├── product.controller.ts
 │   ├── product.service.ts
 │   └── product.model.ts
 ├── payment/
 └── notification/
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Règles de communication</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Interfaces publiques</strong> : Chaque module expose API claire</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pas d'accès direct DB</strong> : Passer par service du module</li>
  <li class="ml-4"><strong class="font-bold text-primary">Events</strong> : Communication asynchrone entre modules</li>
</ul>

Exemple :
\`\`\`typescript
// ❌ Mauvais
import { UserRepository } from '../user/user.repository';
const user = new UserRepository().findById(id);

// ✅ Bon
import { UserService } from '../user/user.service';
const user = await userService.getUser(id);
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Architecture Microservices</h2>

Chaque module = service autonome avec sa propre DB.

<h3 class="text-xl font-bold mt-6 mb-3">Structure</h3>

\`\`\`
services/
 ├── user-service/
 │   ├── src/
 │   ├── Dockerfile
 │   └── package.json
 ├── product-service/
 ├── payment-service/
 └── api-gateway/
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Communication</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Synchrone</strong> : REST API / gRPC</li>
  <li class="ml-4"><strong class="font-bold text-primary">Asynchrone</strong> : Message queues (RabbitMQ, Kafka)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Bounded Contexts (DDD)</h2>

Concept Domain-Driven Design :

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Chaque module a son propre langage métier</li>
  <li class="ml-4">Un "User" en Auth ≠ "User" en Billing</li>
  <li class="ml-4">Pas de partage de models entre contextes</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Quand passer en microservices ?</h2>

<strong class="font-bold text-primary">Monolithe modulaire :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Petite équipe (&lt;10 devs)</li>
  <li class="ml-4">✅ Produit simple/moyen</li>
  <li class="ml-4">✅ Déploiements rares</li>
</ul>

<strong class="font-bold text-primary">Microservices :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Équipes multiples</li>
  <li class="ml-4">✅ Scalabilité différenciée (payment ≠ blog)</li>
  <li class="ml-4">✅ Déploiements fréquents et indépendants</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Découpe bien pensée = <strong class="font-bold text-primary">longévité du projet</strong>.

<strong class="font-bold text-primary">Règles d'or :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Modules par domaine métier</li>
  <li class="ml-4">Interfaces claires entre modules</li>
  <li class="ml-4">Monolithe d'abord, microservices si nécessaire</li>
</ul>

> "Commence monolithe modulaire, passe en microservices quand la douleur justifie la complexité." 🏗️
    `
  },
  { 
    id: '33', 
    title: 'Quand (et comment) adopter une architecture hexagonale', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Ports & Adapters</h2>

L'<strong class="font-bold text-primary">architecture hexagonale</strong> (Alistair Cockburn) sépare <strong class="font-bold text-primary">logique métier</strong> du monde extérieur.

<strong class="font-bold text-primary">Objectif :</strong> Code métier indépendant de l'infrastructure.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Les 3 couches</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Domain (cœur métier)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Règles métier pures</li>
  <li class="ml-4">Entités, Value Objects</li>
  <li class="ml-4"><strong class="font-bold text-primary">Aucune dépendance externe</strong></li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Application (use cases)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Orchestration de la logique métier</li>
  <li class="ml-4">Définit les <strong class="font-bold text-primary">ports</strong> (interfaces)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Infrastructure (adapters)</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Implémentations concrètes</li>
  <li class="ml-4">DB, API, UI, Email...</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structure projet</h2>

\`\`\`
src/
 ├── domain/
 │   ├── entities/
 │   │   └── User.ts
 │   └── value-objects/
 │       └── Email.ts
 ├── application/
 │   ├── ports/
 │   │   ├── UserRepository.ts  (interface)
 │   │   └── EmailService.ts    (interface)
 │   └── use-cases/
 │       └── CreateUser.ts
 └── infrastructure/
     ├── adapters/
     │   ├── PostgresUserRepository.ts
     │   └── SendGridEmailService.ts
     └── http/
         └── UserController.ts
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Exemple concret</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Domain</h3>

\`\`\`typescript
// domain/entities/User.ts
export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string
  ) {}
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Application (Port)</h3>

\`\`\`typescript
// application/ports/UserRepository.ts
export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Application (Use Case)</h3>

\`\`\`typescript
// application/use-cases/CreateUser.ts
export class CreateUser {
  constructor(private userRepo: UserRepository) {}
  
  async execute(email: string, name: string) {
    const user = new User(uuid(), email, name);
    await this.userRepo.save(user);
    return user;
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Infrastructure (Adapter)</h3>

\`\`\`typescript
// infrastructure/adapters/PostgresUserRepository.ts
export class PostgresUserRepository implements UserRepository {
  async save(user: User) {
    await db.query('INSERT INTO users...', [user.id, user.email]);
  }
  
  async findById(id: string) {
    const row = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return row ? new User(row.id, row.email, row.name) : null;
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Avantages</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Tests faciles</strong> : Mock repositories sans vraie DB</li>
  <li class="ml-4"><strong class="font-bold text-primary">Flexibilité</strong> : Changer de DB/API sans toucher métier</li>
  <li class="ml-4"><strong class="font-bold text-primary">Longévité</strong> : Code métier stable même si infra change</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Quand l'utiliser ?</h2>

<strong class="font-bold text-primary">✅ Oui si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Logique métier complexe</li>
  <li class="ml-4">Projet long terme (5+ ans)</li>
  <li class="ml-4">Besoin de tests robustes</li>
  <li class="ml-4">Infrastructure susceptible de changer</li>
</ul>

<strong class="font-bold text-primary">❌ Non si :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">CRUD simple</li>
  <li class="ml-4">Prototype / MVP rapide</li>
  <li class="ml-4">Équipe junior (courbe d'apprentissage)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Architecture hexagonale = <strong class="font-bold text-primary">séparation "quoi" (métier) et "comment" (infra)</strong>.

Idéale pour projets évolutifs avec logique métier riche.

> "Le métier ne devrait jamais dépendre de la technique." 🔷
    `
  },
  { 
    id: '34', 
    title: 'Les design patterns essentiels à connaître (Factory, Singleton, Observer…)', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Solutions éprouvées</h2>

Les <strong class="font-bold text-primary">design patterns</strong> = solutions réutilisables à problèmes récurrents.

<strong class="font-bold text-primary">Objectif :</strong> Éviter de réinventer la roue.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Singleton</h2>

<strong class="font-bold text-primary">Problème :</strong> Une seule instance globale (DB connection, logger...).

\`\`\`typescript
class Database {
  private static instance: Database;
  
  private constructor() {} // Empêche new Database()
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Factory</h2>

<strong class="font-bold text-primary">Problème :</strong> Créer objets selon contexte.

\`\`\`typescript
interface Payment { process(): void; }

class CardPayment implements Payment {
  process() { console.log('Card payment'); }
}

class PayPalPayment implements Payment {
  process() { console.log('PayPal payment'); }
}

class PaymentFactory {
  static create(type: string): Payment {
    switch (type) {
      case 'card': return new CardPayment();
      case 'paypal': return new PayPalPayment();
      default: throw new Error('Unknown payment type');
    }
  }
}

const payment = PaymentFactory.create('card');
payment.process();
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Observer</h2>

<strong class="font-bold text-primary">Problème :</strong> Notifier plusieurs éléments d'un changement.

\`\`\`typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];
  
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
  
  notify(data: any) {
    this.observers.forEach(obs => obs.update(data));
  }
}

class EmailNotifier implements Observer {
  update(data: any) {
    console.log('Email sent:', data);
  }
}

class SMSNotifier implements Observer {
  update(data: any) {
    console.log('SMS sent:', data);
  }
}

const userRegistered = new Subject();
userRegistered.subscribe(new EmailNotifier());
userRegistered.subscribe(new SMSNotifier());

userRegistered.notify({ user: 'John' }); 
// Email sent + SMS sent
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Strategy</h2>

<strong class="font-bold text-primary">Problème :</strong> Changer d'algorithme dynamiquement.

\`\`\`typescript
interface SortStrategy {
  sort(data: number[]): number[];
}

class BubbleSort implements SortStrategy {
  sort(data: number[]) {
    // Bubble sort logic
    return data;
  }
}

class QuickSort implements SortStrategy {
  sort(data: number[]) {
    // Quick sort logic
    return data;
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}
  
  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }
  
  sort(data: number[]) {
    return this.strategy.sort(data);
  }
}

const sorter = new Sorter(new BubbleSort());
sorter.sort([3, 1, 2]);

sorter.setStrategy(new QuickSort());
sorter.sort([5, 2, 8]);
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Adapter</h2>

<strong class="font-bold text-primary">Problème :</strong> Rendre compatibles deux interfaces différentes.

\`\`\`typescript
// Ancienne API
class OldPaymentAPI {
  makePayment(amount: number) {
    console.log('Old API:', amount);
  }
}

// Nouvelle interface attendue
interface NewPaymentAPI {
  processPayment(amount: number, currency: string): void;
}

// Adapter
class PaymentAdapter implements NewPaymentAPI {
  constructor(private oldAPI: OldPaymentAPI) {}
  
  processPayment(amount: number, currency: string) {
    // Adaptation
    this.oldAPI.makePayment(amount);
  }
}

const oldAPI = new OldPaymentAPI();
const adapter = new PaymentAdapter(oldAPI);
adapter.processPayment(100, 'EUR');
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Decorator</h2>

<strong class="font-bold text-primary">Problème :</strong> Ajouter fonctionnalités sans modifier classe.

\`\`\`typescript
interface Coffee {
  cost(): number;
}

class SimpleCoffee implements Coffee {
  cost() { return 5; }
}

class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 2; }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 1; }
}

let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.cost()); // 5 + 2 + 1 = 8
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

Design patterns = <strong class="font-bold text-primary">vocabulaire commun</strong> entre devs.

<strong class="font-bold text-primary">Les 6 essentiels :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Singleton</strong> : Instance unique</li>
  <li class="ml-4"><strong class="font-bold text-primary">Factory</strong> : Création conditionnelle</li>
  <li class="ml-4"><strong class="font-bold text-primary">Observer</strong> : Pub/Sub</li>
  <li class="ml-4"><strong class="font-bold text-primary">Strategy</strong> : Algorithmes interchangeables</li>
  <li class="ml-4"><strong class="font-bold text-primary">Adapter</strong> : Compatibilité interfaces</li>
  <li class="ml-4"><strong class="font-bold text-primary">Decorator</strong> : Extension dynamique</li>
</ul>

> "Utilise les patterns avec mesure, pas par habitude." 🔧
    `
  },
  { 
    id: '35', 
    title: 'Gérer la dette technique intelligemment', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Dette = choix conscient</h2>

La dette technique, c'est tout ce qu'on repousse "pour plus tard". Elle n'est pas mauvaise en soi, mais doit être <strong class="font-bold text-primary">contrôlée et remboursée</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Types de dette</h2>

<strong class="font-bold text-primary">Dette volontaire (bonne) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Livrer MVP rapidement pour valider marché</li>
  <li class="ml-4">Skiper refacto pour respecter deadline</li>
  <li class="ml-4">Documentation minimal pour prototype</li>
</ul>

<strong class="font-bold text-primary">Dette involontaire (mauvaise) :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code mal conçu par manque de compétence</li>
  <li class="ml-4">Pas de tests parce qu'"on n'a pas le temps"</li>
  <li class="ml-4">Duplication incontrôlée</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Mesurer la dette</h2>

<h3 class="text-xl font-bold mt-6 mb-3">SonarQube</h3>

\`\`\`bash
# Installe SonarQube via Docker
docker run -d -p 9000:9000 sonarqube

# Scan projet
sonar-scanner -Dsonar.projectKey=my-project
\`\`\`

<strong class="font-bold text-primary">Métriques clés :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code smells : Anti-patterns détectés</li>
  <li class="ml-4">Coverage : % code testé</li>
  <li class="ml-4">Duplications : Code dupliqué</li>
  <li class="ml-4">Complexité cyclomatique : Complexité fonctions</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Documenter la dette</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Commentaires TODO</h3>

\`\`\`typescript
// TODO: Refactor - Extract UserService logic
// Reason: Mixed responsibilities (SRP violation)
// Impact: Hard to test, tight coupling
// Priority: High (before v2.0)
function createUser(data: any) {
  // ...
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Issues GitHub/Jira</h3>

\`\`\`markdown
Title: [TECH DEBT] Extract payment logic to service

Description:
- Current: Payment logic in controller (violates MVC)
- Impact: Hard to test, reuse
- Effort: 2h
- Priority: Medium
- Due: Before v1.5
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Rembourser la dette</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Règle des Scouts</h3>

> "Laisse le code plus propre que tu ne l'as trouvé."

Chaque PR = 1 petite amélioration.

<h3 class="text-xl font-bold mt-6 mb-3">Time-boxing</h3>

Alloue <strong class="font-bold text-primary">20% du temps sprint</strong> à la dette technique :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Sprint 2 semaines = 2 jours refacto</li>
  <li class="ml-4">Priorité : Dette haute criticité</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Refactoring continu</h3>

\`\`\`bash
# Avant feature
git checkout -b feature/new-endpoint

# Pendant dev : améliore code touché
# Commit 1: Refactor existing code
# Commit 2: Add new feature

# PR review vérifie les deux
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Prioriser la dette</h2>

<strong class="font-bold text-primary">Matrice Impact/Effort :</strong>

| Impact | Effort faible | Effort fort |
|--------|---------------|-------------|
| **Haut** | ✅ Faire immédiatement | 🟡 Planifier sprint |
| **Bas** | 🟢 Nice to have | ❌ Ignorer |

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Éviter la dette</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">Code reviews</strong> : Détecter tôt</li>
  <li class="ml-4"><strong class="font-bold text-primary">Tests automatisés</strong> : Filet de sécurité</li>
  <li class="ml-4"><strong class="font-bold text-primary">CI/CD strict</strong> : Bloque merge si qualité <80%</li>
  <li class="ml-4"><strong class="font-bold text-primary">Pair programming</strong> : Partage connaissance</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Conclusion</h2>

La dette technique, c'est comme un crédit : <strong class="font-bold text-primary">normal tant qu'on sait quand/comment rembourser</strong>.

<strong class="font-bold text-primary">Règles d'or :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Documente toute dette volontaire</li>
  <li class="ml-4">20% temps sprint = refacto</li>
  <li class="ml-4">Priorise par impact/effort</li>
  <li class="ml-4">Mesure avec SonarQube</li>
</ul>

> "La meilleure dette technique est celle qu'on évite." 🏗️
    `
  },
  { 
    id: '36', 
    title: 'Créer un projet scalable dès le départ', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Scalabilité = Anticipation</h2>

Une architecture scalable gère l'augmentation de charge (utilisateurs, données, trafic) <strong class="font-bold text-primary">sans refonte complète</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Types de scaling</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Vertical Scaling (Scale Up)</h3>

Augmente ressources machine (CPU, RAM, disque).

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Simple : pas de changement code</li>
  <li class="ml-4">Pas de complexité réseau</li>
</ul>

<strong class="font-bold text-primary">Inconvénients :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Limite physique (max 128 CPU)</li>
  <li class="ml-4">Single Point of Failure</li>
  <li class="ml-4">Coût exponentiel</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Horizontal Scaling (Scale Out)</h3>

Ajoute machines/instances.

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Pas de limite (add instances infiniment)</li>
  <li class="ml-4">Redondance = High Availability</li>
  <li class="ml-4">Coût linéaire</li>
</ul>

<strong class="font-bold text-primary">Inconvénients :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Complexité (load balancer, sessions)</li>
  <li class="ml-4">Code doit être stateless</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Patterns pour scale</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Load Balancing</h3>

Répartit trafic entre instances.

\`\`\`nginx
# nginx.conf
upstream backend {
  server backend1:3000;
  server backend2:3000;
  server backend3:3000;
}

server {
  location /api {
    proxy_pass http://backend;
    proxy_set_header Host \$host;
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Stateless Applications</h3>

Sessions stockées en Redis, pas en mémoire serveur.

\`\`\`typescript
// ❌ Pas scalable (session en RAM)
const sessions = new Map();

// ✅ Scalable (session partagée)
import { createClient } from 'redis';
const redis = createClient();

async function setSession(userId: string, data: any) {
  await redis.set(\`session:\${userId}\`, JSON.stringify(data), {
    EX: 3600 // 1h TTL
  });
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Database Sharding</h3>

Divise données entre plusieurs DB.

\`\`\`typescript
// Sharding par user_id modulo
function getShardForUser(userId: number): string {
  const shardCount = 4;
  const shard = userId % shardCount;
  return \`db-shard-\${shard}\`;
}

// Requête user_id=12345 → db-shard-1
const db = getShardForUser(12345); // db-shard-1
await queryDatabase(db, "SELECT * FROM users WHERE id=12345");
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Caching</h3>

Réduit charge DB avec cache distribué.

\`\`\`typescript
async function getUser(id: number): Promise<User> {
  // 1. Check cache
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  // 2. DB query
  const user = await db.query("SELECT * FROM users WHERE id=?", [id]);

  // 3. Cache result
  await redis.set(\`user:\${id}\`, JSON.stringify(user), { EX: 600 });

  return user;
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Message Queues</h2>

Traite tâches lourdes en asynchrone.

\`\`\`typescript
import { Queue } from 'bullmq';

const emailQueue = new Queue('emails');

// Producer: envoie job
await emailQueue.add('sendWelcome', {
  to: 'user@example.com',
  template: 'welcome'
});

// Consumer: traite jobs
const worker = new Worker('emails', async job => {
  await sendEmail(job.data.to, job.data.template);
});
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Auto-Scaling (Cloud)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Kubernetes HPA</h3>

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-scaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Monitoring scalabilité</h2>

<strong class="font-bold text-primary">Métriques critiques :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>CPU/RAM</strong> : Target <70%</li>
  <li class="ml-4"><strong>Response time</strong> : p95 <500ms</li>
  <li class="ml-4"><strong>Queue depth</strong> : <1000 jobs pending</li>
  <li class="ml-4"><strong>DB connections</strong> : <80% pool</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Checklist scalabilité</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ App stateless (sessions in Redis)</li>
  <li class="ml-4">✅ Load balancer devant instances</li>
  <li class="ml-4">✅ Cache (Redis/Memcached)</li>
  <li class="ml-4">✅ DB read replicas</li>
  <li class="ml-4">✅ Message queue (tâches async)</li>
  <li class="ml-4">✅ Auto-scaling activé</li>
  <li class="ml-4">✅ Monitoring temps réel</li>
</ul>

> "Scale early, optimize often." 🚀
    `
  },
  { 
    id: '37', 
    title: 'Bien gérer les logs et erreurs dans une app', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Logs = Boîte noire</h2>

Les logs sont essentiels pour <strong class="font-bold text-primary">diagnostiquer bugs en production</strong>. Sans eux, impossible de comprendre ce qui s'est passé.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Niveaux de logs</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong class="font-bold text-primary">DEBUG</strong> : Détails pour développement (désactivé en prod)</li>
  <li class="ml-4"><strong class="font-bold text-primary">INFO</strong> : Événements normaux (user logged in, payment processed)</li>
  <li class="ml-4"><strong class="font-bold text-primary">WARN</strong> : Anomalies non critiques (deprecated API used, slow query)</li>
  <li class="ml-4"><strong class="font-bold text-primary">ERROR</strong> : Erreurs graves (DB connection failed, payment error)</li>
  <li class="ml-4"><strong class="font-bold text-primary">FATAL</strong> : Crash application</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structure logs</h2>

<h3 class="text-xl font-bold mt-6 mb-3">JSON structuré (pas de console.log)</h3>

\`\`\`typescript
// ❌ Pas exploitable
console.log("User John logged in");

// ✅ Structuré, exploitable
logger.info({
  event: 'user.login',
  userId: 12345,
  username: 'john',
  ip: '192.168.1.1',
  timestamp: new Date().toISOString()
});
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Correlation ID</h3>

Trace une requête à travers microservices.

\`\`\`typescript
import { v4 as uuidv4 } from 'uuid';

app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || uuidv4();
  res.setHeader('x-correlation-id', req.correlationId);
  next();
});

app.get('/api/users', async (req, res) => {
  logger.info({
    correlationId: req.correlationId,
    event: 'api.request',
    path: '/api/users'
  });
  // ...
});
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Loggers modernes</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Winston (Node.js)</h3>

\`\`\`typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

logger.error('Payment failed', {
  userId: 123,
  amount: 99.99,
  error: err.message
});
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Loguru (Python)</h3>

\`\`\`python
from loguru import logger

logger.add("logs/app.log", rotation="500 MB", level="INFO")

try:
    result = process_payment(user_id=123, amount=99.99)
    logger.info(f"Payment success: {result}")
except Exception as e:
    logger.exception("Payment failed")
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Gestion des erreurs</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Error handling global</h3>

\`\`\`typescript
// Express middleware
app.use((err, req, res, next) => {
  logger.error({
    correlationId: req.correlationId,
    event: 'api.error',
    path: req.path,
    method: req.method,
    error: {
      message: err.message,
      stack: err.stack,
      code: err.code
    }
  });

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message,
    correlationId: req.correlationId
  });
});
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Custom Error classes</h3>

\`\`\`typescript
class PaymentError extends Error {
  constructor(message: string, public userId: number, public amount: number) {
    super(message);
    this.name = 'PaymentError';
  }
}

try {
  throw new PaymentError('Insufficient funds', 123, 99.99);
} catch (err) {
  if (err instanceof PaymentError) {
    logger.error({
      event: 'payment.failed',
      userId: err.userId,
      amount: err.amount,
      reason: err.message
    });
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Agrégation logs (Production)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">ELK Stack</h3>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Elasticsearch</strong> : Stocke logs</li>
  <li class="ml-4"><strong>Logstash</strong> : Parse logs</li>
  <li class="ml-4"><strong>Kibana</strong> : Visualisation</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Datadog / Sentry</h3>

\`\`\`typescript
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Règles d'or</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">❌ <strong>Jamais de mots de passe/tokens dans logs</strong></li>
  <li class="ml-4">✅ Logger requête ID, user ID, timestamp</li>
  <li class="ml-4">✅ Format JSON structuré</li>
  <li class="ml-4">✅ Rotation logs (max 500MB/fichier)</li>
  <li class="ml-4">✅ Alertes sur erreurs critiques (Slack/email)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Checklist logs</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Logger tous try/catch</li>
  <li class="ml-4">✅ Correlation ID sur requêtes</li>
  <li class="ml-4">✅ Niveaux de logs respectés</li>
  <li class="ml-4">✅ Pas de données sensibles</li>
  <li class="ml-4">✅ Agrégation centralisée (ELK/Datadog)</li>
  <li class="ml-4">✅ Alertes sur erreurs critiques</li>
</ul>

> "Les logs sont l'assurance-vie de la prod." 📝
    `
  },
  { 
    id: '38', 
    title: 'Structurer un projet front (React, Vue, Angular) proprement', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Organisation = Maintenabilité</h2>

Un projet front bien structuré reste <strong class="font-bold text-primary">compréhensible et évolutif</strong> même après 2 ans.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Structure par domaine (Feature-based)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">React + TypeScript</h3>

\`\`\`
src/
 ├── features/
 │   ├── auth/
 │   │   ├── components/
 │   │   │   ├── LoginForm.tsx
 │   │   │   └── RegisterForm.tsx
 │   │   ├── hooks/
 │   │   │   └── useAuth.ts
 │   │   ├── services/
 │   │   │   └── authService.ts
 │   │   └── types/
 │   │       └── user.types.ts
 │   ├── products/
 │   │   ├── components/
 │   │   ├── hooks/
 │   │   └── services/
 │   └── cart/
 ├── shared/
 │   ├── components/  (Button, Modal, Card)
 │   ├── hooks/       (useDebounce, useLocalStorage)
 │   ├── utils/       (formatDate, validateEmail)
 │   └── types/       (global types)
 ├── pages/
 │   ├── HomePage.tsx
 │   ├── ProductsPage.tsx
 │   └── CheckoutPage.tsx
 ├── routes/
 │   └── AppRoutes.tsx
 ├── store/          (Redux/Zustand)
 ├── api/            (axios config, interceptors)
 └── App.tsx
\`\`\`

<strong class="font-bold text-primary">Avantages :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Code regroupé par fonctionnalité</li>
  <li class="ml-4">Facile de supprimer une feature</li>
  <li class="ml-4">Évite imports chaotiques</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Structure par type (Classic)</h2>

\`\`\`
src/
 ├── components/
 │   ├── Button.tsx
 │   ├── Modal.tsx
 │   └── ProductCard.tsx
 ├── pages/
 ├── hooks/
 ├── services/
 ├── utils/
 └── types/
\`\`\`

<strong class="font-bold text-primary">Quand utiliser :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Petits projets (<20 composants)</li>
  <li class="ml-4">Apps simples (landing page, blog)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Règles de nommage</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Composants</h3>

\`\`\`typescript
// ✅ PascalCase pour composants
export function UserProfile() { }
export const ProductList = () => { };

// ✅ 1 composant = 1 fichier
UserProfile.tsx
ProductList.tsx
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Hooks</h3>

\`\`\`typescript
// ✅ Préfixe 'use'
export function useAuth() { }
export function useFetch<T>(url: string) { }
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Services</h3>

\`\`\`typescript
// ✅ Suffixe 'Service'
export class AuthService {
  static login(email: string, password: string) { }
}

// authService.ts
export const authService = {
  login: async (email, password) => { },
  logout: async () => { }
};
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Gestion d'état</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Context API (local state)</h3>

\`\`\`typescript
// src/features/auth/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Zustand (global state)</h3>

\`\`\`typescript
// src/store/useCartStore.ts
import { create } from 'zustand';

export const useCartStore = create<CartState>(set => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (id) => set(state => ({ 
    items: state.items.filter(i => i.id !== id) 
  }))
}));
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ API Layer</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Configuration Axios</h3>

\`\`\`typescript
// src/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Services</h3>

\`\`\`typescript
// src/features/products/services/productService.ts
import { api } from '@/api/axios';

export const productService = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: number) => api.get<Product>(\`/products/\${id}\`),
  create: (data: CreateProductDto) => api.post('/products', data)
};
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Path Aliases</h2>

<h3 class="text-xl font-bold mt-6 mb-3">tsconfig.json</h3>

\`\`\`json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Imports propres</h3>

\`\`\`typescript
// ❌ Imports relatifs sales
import { Button } from '../../../shared/components/Button';

// ✅ Path aliases
import { Button } from '@/shared/components/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Checklist projet front</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Structure feature-based (projets >20 composants)</li>
  <li class="ml-4">✅ 1 composant = 1 fichier</li>
  <li class="ml-4">✅ Noms clairs (PascalCase composants, camelCase hooks)</li>
  <li class="ml-4">✅ Path aliases configurés</li>
  <li class="ml-4">✅ Services séparés (API layer)</li>
  <li class="ml-4">✅ État global isolé (Zustand/Redux)</li>
  <li class="ml-4">✅ ESLint + Prettier configurés</li>
</ul>

> "Architecture front solide = équipe heureuse." 🎨
    `
  },
  { 
    id: '39', 
    title: 'Pourquoi et comment faire du linting / formattage automatique (ESLint, Prettier, etc.)', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : Code cohérent = Équipe efficace</h2>

Linting + Formatting = <strong class="font-bold text-primary">cohérence automatique</strong>, zéro débat en code review sur les styles.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Linting : Détecte erreurs</h2>

<strong class="font-bold text-primary">ESLint (JavaScript/TypeScript)</strong> détecte :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Variables non utilisées</li>
  <li class="ml-4">Imports manquants</li>
  <li class="ml-4">Anti-patterns (== au lieu de ===)</li>
  <li class="ml-4">Violations règles d'accessibilité</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Installation ESLint</h3>

\`\`\`bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint --init
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Configuration .eslintrc.json</h3>

\`\`\`json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Exécution</h3>

\`\`\`bash
# Lint tout le projet
npx eslint src/

# Autofix erreurs simples
npx eslint src/ --fix
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Formatting : Style uniforme</h2>

<strong class="font-bold text-primary">Prettier</strong> formate automatiquement :
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Indentation (2 ou 4 espaces)</li>
  <li class="ml-4">Guillemets simples/doubles</li>
  <li class="ml-4">Point-virgules (presence/absence)</li>
  <li class="ml-4">Largeur max ligne</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Installation Prettier</h3>

\`\`\`bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Configuration .prettierrc</h3>

\`\`\`json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Intégration ESLint + Prettier</h3>

\`\`\`json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"  // Évite conflits
  ]
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Auto-format au save (VS Code)</h2>

<h3 class="text-xl font-bold mt-6 mb-3">.vscode/settings.json</h3>

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Pre-commit hooks (Husky + lint-staged)</h2>

Force linting/formatting avant commit.

<h3 class="text-xl font-bold mt-6 mb-3">Installation</h3>

\`\`\`bash
npm install -D husky lint-staged
npx husky init
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">.husky/pre-commit</h3>

\`\`\`bash
#!/bin/sh
npx lint-staged
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">package.json</h3>

\`\`\`json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
\`\`\`

<strong class="font-bold text-primary">Résultat :</strong> Impossible de commit code non conforme.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ CI/CD : Lint en pipeline</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions</h3>

\`\`\`yaml
name: Lint
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">package.json scripts</h3>

\`\`\`json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write \"src/**/*.{js,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{js,ts,tsx,json,css,md}\""
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ Autres langages</h2>

<strong class="font-bold text-primary">Python :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Linting</strong> : Pylint, Flake8, Ruff</li>
  <li class="ml-4"><strong>Formatting</strong> : Black, autopep8</li>
</ul>

\`\`\`bash
# Install
pip install black flake8

# Run
black src/
flake8 src/
\`\`\`

<strong class="font-bold text-primary">Go :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">go fmt (built-in)</li>
  <li class="ml-4">golangci-lint</li>
</ul>

\`\`\`bash
go fmt ./...
golangci-lint run
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Bénéfices</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4">✅ Zéro débat style en PR</li>
  <li class="ml-4">✅ Code uniforme même avec 10 devs</li>
  <li class="ml-4">✅ Bugs détectés tôt (linting)</li>
  <li class="ml-4">✅ Onboarding rapide (règles claires)</li>
</ul>

> "Prettier tue les débats inutiles." 💅
    `
  },
  { 
    id: '40', 
    title: 'Mesurer la qualité du code : coverage, performance et maintainability', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Introduction : On n'améliore que ce qu'on mesure</h2>

La qualité logicielle <strong class="font-bold text-primary">se mesure objectivement</strong> via indicateurs et outils.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Code Coverage (Couverture de tests)</h2>

<strong class="font-bold text-primary">Définition :</strong> Pourcentage de code exécuté par tests.

<h3 class="text-xl font-bold mt-6 mb-3">Jest (JavaScript/TypeScript)</h3>

\`\`\`bash
# Run tests avec coverage
npm test -- --coverage

# Output
File      | % Stmts | % Branch | % Funcs | % Lines
----------|---------|----------|---------|--------
user.ts   |   85.7  |   75.0   |   80.0  |   85.0
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">pytest-cov (Python)</h3>

\`\`\`bash
pytest --cov=src --cov-report=html

# Génère htmlcov/index.html
\`\`\`

<strong class="font-bold text-primary">Target :</strong> 80%+ (mais 100% != qualité garantie).

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Complexité cyclomatique</h2>

<strong class="font-bold text-primary">Définition :</strong> Nombre de chemins indépendants dans une fonction.

<h3 class="text-xl font-bold mt-6 mb-3">Exemple</h3>

\`\`\`typescript
// Complexité = 1 (simple)
function add(a: number, b: number) {
  return a + b;
}

// Complexité = 4 (trop élevée)
function validateUser(user: User) {
  if (!user.email) throw new Error('Email required');
  if (!user.password) throw new Error('Password required');
  if (user.age < 18) throw new Error('Too young');
  if (!user.terms) throw new Error('Accept terms');
}
\`\`\`

<strong class="font-bold text-primary">Target :</strong> <10 par fonction.

<h3 class="text-xl font-bold mt-6 mb-3">Mesure avec ESLint</h3>

\`\`\`json
// .eslintrc.json
{
  "rules": {
    "complexity": ["warn", 10]
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Maintainability Index</h2>

<strong class="font-bold text-primary">Formule Microsoft :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Combine volume code, complexité cyclomatique, lignes de code</li>
  <li class="ml-4">Score 0-100 (>20 = OK, >85 = excellent)</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">SonarQube</h3>

\`\`\`bash
# Run SonarQube scan
sonar-scanner \\
  -Dsonar.projectKey=my-project \\
  -Dsonar.sources=src \\
  -Dsonar.host.url=http://localhost:9000
\`\`\`

<strong class="font-bold text-primary">Métriques affichées :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Technical Debt (temps pour fixer)</li>
  <li class="ml-4">Code Smells (anti-patterns)</li>
  <li class="ml-4">Duplications</li>
  <li class="ml-4">Maintainability Rating (A-E)</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ Performance Metrics</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Lighthouse (Web)</h3>

\`\`\`bash
npm install -g lighthouse

lighthouse https://example.com --view
\`\`\`

<strong class="font-bold text-primary">Scores :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Performance (LCP, FID, CLS)</li>
  <li class="ml-4">Accessibility</li>
  <li class="ml-4">Best Practices</li>
  <li class="ml-4">SEO</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Backend Performance</h3>

\`\`\`typescript
// Measure endpoint performance
import { performance } from 'perf_hooks';

app.get('/api/users', async (req, res) => {
  const start = performance.now();
  
  const users = await db.query('SELECT * FROM users');
  
  const duration = performance.now() - start;
  logger.info({ endpoint: '/users', duration });
  
  res.json(users);
});
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ Monitoring Production</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Datadog / New Relic</h3>

<strong class="font-bold text-primary">Traces :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4">Latence moyenne (p50, p95, p99)</li>
  <li class="ml-4">Throughput (req/s)</li>
  <li class="ml-4">Error rate</li>
  <li class="ml-4">DB query duration</li>
</ul>

<h3 class="text-xl font-bold mt-6 mb-3">Sentry (Error tracking)</h3>

\`\`\`typescript
import * as Sentry from '@sentry/node';

Sentry.init({ 
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1  // 10% traces
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">6️⃣ CI/CD Quality Gates</h2>

<h3 class="text-xl font-bold mt-6 mb-3">GitHub Actions</h3>

\`\`\`yaml
name: Quality
on: [pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      
      # Coverage check
      - run: npm test -- --coverage --coverageThreshold='{"global":{"statements":80}}'
      
      # SonarQube
      - uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
      
      # Lighthouse CI
      - run: |
          npm run build
          lhci autorun
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">7️⃣ Dashboard centralisation</h2>

<strong class="font-bold text-primary">Exemple stack :</strong>
<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>SonarQube</strong> : Code quality</li>
  <li class="ml-4"><strong>Grafana + Prometheus</strong> : Metrics temps réel</li>
  <li class="ml-4"><strong>Sentry</strong> : Errors</li>
  <li class="ml-4"><strong>Lighthouse CI</strong> : Web performance</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Targets recommandés</h2>

| Métrique | Target |
|----------|--------|
| Code Coverage | >80% |
| Complexité cyclomatique | <10/fonction |
| Maintainability Index | >65 |
| Lighthouse Performance | >90 |
| API Latency p95 | <500ms |
| Error Rate | <1% |

> "On ne maîtrise que ce qu'on mesure." 📊
    `
  },
  { 
    id: '41', 
    title: 'SOLID à la loupe : approfondir les principes de conception objet', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">SOLID : Au-delà des bases</h2>

Après avoir vu SOLID (article 31), on approfondit avec <strong class="font-bold text-primary">cas limites, pièges et applications avancées</strong>.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ SRP : Définir "une responsabilité"</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Piège fréquent</h3>

\`\`\`typescript
// ❌ SRP violé (User gère persistence + validation + email)
class User {
  constructor(public email: string, public password: string) {}
  
  save() {
    db.query('INSERT INTO users...');  // Persistence
  }
  
  validate() {
    if (!this.email.includes('@')) throw new Error('Invalid email');  // Validation
  }
  
  sendWelcomeEmail() {
    mailer.send(this.email, 'Welcome!');  // Email
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Solution avancée</h3>

\`\`\`typescript
// ✅ Chaque classe = 1 raison de changer
class User {
  constructor(public email: string, public password: string) {}
}

class UserRepository {
  save(user: User): Promise<void> {
    return db.query('INSERT INTO users (email, password) VALUES (?, ?)', 
      [user.email, user.password]);
  }
}

class UserValidator {
  validate(user: User): void {
    if (!user.email.includes('@')) throw new ValidationError('Invalid email');
    if (user.password.length < 8) throw new ValidationError('Password too short');
  }
}

class UserNotifier {
  async sendWelcomeEmail(user: User): Promise<void> {
    await mailer.send(user.email, 'welcome', { name: user.email });
  }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ OCP : Extension sans modification</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Stratégie avancée (Plugin system)</h3>

\`\`\`typescript
// ✅ Nouveau payment method = nouvelle classe (zéro modif existant)
interface PaymentProcessor {
  process(amount: number): Promise<PaymentResult>;
}

class StripeProcessor implements PaymentProcessor {
  async process(amount: number) {
    return stripe.charge({ amount, currency: 'eur' });
  }
}

class PayPalProcessor implements PaymentProcessor {
  async process(amount: number) {
    return paypal.createPayment({ amount });
  }
}

// Nouveau : ajoute Crypto sans toucher code existant
class CryptoProcessor implements PaymentProcessor {
  async process(amount: number) {
    return crypto.pay({ amount, wallet: '0x123...' });
  }
}

class PaymentService {
  private processors = new Map<string, PaymentProcessor>();
  
  register(name: string, processor: PaymentProcessor) {
    this.processors.set(name, processor);
  }
  
  async pay(method: string, amount: number) {
    const processor = this.processors.get(method);
    if (!processor) throw new Error(\`Unknown method: \${method}\`);
    return processor.process(amount);
  }
}

// Usage
const service = new PaymentService();
service.register('stripe', new StripeProcessor());
service.register('paypal', new PayPalProcessor());
service.register('crypto', new CryptoProcessor());  // Extension
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ LSP : Cas limite</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Violation classique (Rectangle/Square)</h3>

\`\`\`typescript
// ❌ LSP violé : Square change comportement de Rectangle
class Rectangle {
  constructor(protected width: number, protected height: number) {}
  
  setWidth(width: number) { this.width = width; }
  setHeight(height: number) { this.height = height; }
  area() { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width;  // ❌ Comportement différent !
  }
}

// Test échoue avec Square
function testRectangle(r: Rectangle) {
  r.setWidth(5);
  r.setHeight(10);
  console.assert(r.area() === 50);  // ❌ Square area = 100 !
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Solution : Composition > Héritage</h3>

\`\`\`typescript
// ✅ Pas d'héritage trompeur
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area() { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area() { return this.side ** 2; }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">4️⃣ ISP : Interfaces fines</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

\`\`\`typescript
// ❌ Interface grasse : oblige implémentation inutile
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work() { console.log('Working'); }
  eat() { throw new Error('Robots don't eat'); }  // ❌ Inutile
  sleep() { throw new Error('Robots don't sleep'); }  // ❌ Inutile
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Solution : Interfaces ségrégées</h3>

\`\`\`typescript
// ✅ Interfaces fines
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
  sleep() { console.log('Sleeping'); }
}

class Robot implements Workable {
  work() { console.log('Working 24/7'); }
}
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">5️⃣ DIP : Injection de dépendances</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Problème</h3>

\`\`\`typescript
// ❌ Dépendance concrète (hard to test)
class UserService {
  private repo = new MySQLUserRepository();  // ❌ Tight coupling
  
  async createUser(email: string) {
    return this.repo.save({ email });
  }
}
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Solution : Dependency Injection</h3>

\`\`\`typescript
// ✅ Dépendance abstraite
interface UserRepository {
  save(user: User): Promise<void>;
}

class MySQLUserRepository implements UserRepository {
  async save(user: User) { /* MySQL logic */ }
}

class PostgresUserRepository implements UserRepository {
  async save(user: User) { /* Postgres logic */ }
}

class UserService {
  constructor(private repo: UserRepository) {}  // ✅ Inject abstraction
  
  async createUser(email: string) {
    return this.repo.save({ email });
  }
}

// Usage
const service = new UserService(new MySQLUserRepository());

// Testing
const mockRepo: UserRepository = {
  save: jest.fn().mockResolvedValue(undefined)
};
const testService = new UserService(mockRepo);
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 SOLID en pratique</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>SRP</strong> : Classe change pour 1 raison uniquement</li>
  <li class="ml-4"><strong>OCP</strong> : Extension via nouvelles classes, pas modification</li>
  <li class="ml-4"><strong>LSP</strong> : Composition > Héritage si doute</li>
  <li class="ml-4"><strong>ISP</strong> : Plusieurs petites interfaces > 1 grosse</li>
  <li class="ml-4"><strong>DIP</strong> : Inject abstractions, pas implémentations</li>
</ul>

> "SOLID = discipline, pas dogme." 🏗️
    `
  },
  { 
    id: '42', 
    title: 'Design Patterns : catalogue des patterns incontournables', 
    category: 'architecture',
    content: `
<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Design Patterns : Vocabulaire commun</h2>

Les Design Patterns sont des <strong class="font-bold text-primary">solutions réutilisables</strong> à problèmes récurrents. Catalogue approfondi.

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">1️⃣ Patterns Créationnels</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Singleton (Instance unique)</h3>

<strong class="font-bold text-primary">Quand :</strong> 1 seule instance globale (DB connection, config).

\`\`\`typescript
class Database {
  private static instance: Database;
  private constructor() {}  // Private constructor
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  query(sql: string) { /* ... */ }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);  // true (même instance)
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Factory Method (Création déléguée)</h3>

<strong class="font-bold text-primary">Quand :</strong> Création complexe ou variants.

\`\`\`typescript
interface Vehicle {
  drive(): void;
}

class Car implements Vehicle {
  drive() { console.log('Driving car'); }
}

class Bike implements Vehicle {
  drive() { console.log('Riding bike'); }
}

class VehicleFactory {
  static create(type: 'car' | 'bike'): Vehicle {
    switch (type) {
      case 'car': return new Car();
      case 'bike': return new Bike();
      default: throw new Error('Unknown type');
    }
  }
}

// Usage
const vehicle = VehicleFactory.create('car');
vehicle.drive();
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Builder (Construction étape par étape)</h3>

<strong class="font-bold text-primary">Quand :</strong> Objet complexe avec options multiples.

\`\`\`typescript
class HttpRequest {
  constructor(
    public url: string,
    public method: string = 'GET',
    public headers: Record<string, string> = {},
    public body?: any
  ) {}
}

class HttpRequestBuilder {
  private url = '';
  private method = 'GET';
  private headers: Record<string, string> = {};
  private body?: any;
  
  setUrl(url: string) {
    this.url = url;
    return this;  // Fluent interface
  }
  
  setMethod(method: string) {
    this.method = method;
    return this;
  }
  
  setHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }
  
  setBody(body: any) {
    this.body = body;
    return this;
  }
  
  build(): HttpRequest {
    return new HttpRequest(this.url, this.method, this.headers, this.body);
  }
}

// Usage
const request = new HttpRequestBuilder()
  .setUrl('/api/users')
  .setMethod('POST')
  .setHeader('Content-Type', 'application/json')
  .setBody({ name: 'John' })
  .build();
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">2️⃣ Patterns Structuraux</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Adapter (Conversion d'interface)</h3>

<strong class="font-bold text-primary">Quand :</strong> Interfacer système legacy avec nouveau code.

\`\`\`typescript
// Old system
class OldLogger {
  logMessage(msg: string) {
    console.log(\`[OLD] \${msg}\`);
  }
}

// New interface
interface Logger {
  log(level: string, message: string): void;
}

// Adapter
class LoggerAdapter implements Logger {
  constructor(private oldLogger: OldLogger) {}
  
  log(level: string, message: string) {
    this.oldLogger.logMessage(\`[\${level}] \${message}\`);
  }
}

// Usage
const logger: Logger = new LoggerAdapter(new OldLogger());
logger.log('INFO', 'Application started');
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Decorator (Ajout dynamique de comportements)</h3>

<strong class="font-bold text-primary">Quand :</strong> Ajouter fonctionnalités sans modifier classe originale.

\`\`\`typescript
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost() { return 5; }
  description() { return 'Coffee'; }
}

// Decorators
class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost() { return this.coffee.cost() + 1; }
  description() { return \`\${this.coffee.description()} + Milk\`; }
}

class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  
  cost() { return this.coffee.cost() + 0.5; }
  description() { return \`\${this.coffee.description()} + Sugar\`; }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description());  // "Coffee + Milk + Sugar"
console.log(coffee.cost());  // 6.5
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Facade (Interface simplifiée)</h3>

<strong class="font-bold text-primary">Quand :</strong> Simplifier accès à système complexe.

\`\`\`typescript
class CPU {
  freeze() { console.log('CPU freeze'); }
  execute() { console.log('CPU execute'); }
}

class Memory {
  load() { console.log('Memory load'); }
}

class HardDrive {
  read() { console.log('HDD read'); }
}

// Facade
class ComputerFacade {
  private cpu = new CPU();
  private memory = new Memory();
  private hdd = new HardDrive();
  
  start() {
    this.hdd.read();
    this.memory.load();
    this.cpu.freeze();
    this.cpu.execute();
  }
}

// Usage (simplifié)
const computer = new ComputerFacade();
computer.start();
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">3️⃣ Patterns Comportementaux</h2>

<h3 class="text-xl font-bold mt-6 mb-3">Observer (Pub/Sub)</h3>

<strong class="font-bold text-primary">Quand :</strong> Notifications automatiques (events, state management).

\`\`\`typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];
  
  attach(observer: Observer) {
    this.observers.push(observer);
  }
  
  notify(data: any) {
    this.observers.forEach(o => o.update(data));
  }
}

class EmailNotifier implements Observer {
  update(data: any) {
    console.log(\`Email sent: \${data}\`);
  }
}

class SMSNotifier implements Observer {
  update(data: any) {
    console.log(\`SMS sent: \${data}\`);
  }
}

// Usage
const userCreated = new Subject();
userCreated.attach(new EmailNotifier());
userCreated.attach(new SMSNotifier());
userCreated.notify('New user: John');
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Strategy (Algorithmes interchangeables)</h3>

<strong class="font-bold text-primary">Quand :</strong> Plusieurs variantes d'algorithme.

\`\`\`typescript
interface CompressionStrategy {
  compress(data: string): string;
}

class ZipCompression implements CompressionStrategy {
  compress(data: string) { return \`[ZIP] \${data}\`; }
}

class RarCompression implements CompressionStrategy {
  compress(data: string) { return \`[RAR] \${data}\`; }
}

class FileCompressor {
  constructor(private strategy: CompressionStrategy) {}
  
  setStrategy(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }
  
  compress(file: string) {
    return this.strategy.compress(file);
  }
}

// Usage
const compressor = new FileCompressor(new ZipCompression());
console.log(compressor.compress('data.txt'));  // [ZIP] data.txt

compressor.setStrategy(new RarCompression());
console.log(compressor.compress('data.txt'));  // [RAR] data.txt
\`\`\`

<h3 class="text-xl font-bold mt-6 mb-3">Command (Encapsulation d'actions)</h3>

<strong class="font-bold text-primary">Quand :</strong> Undo/Redo, queues, logging.

\`\`\`typescript
interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  on() { console.log('Light ON'); }
  off() { console.log('Light OFF'); }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
  undo() { this.light.off(); }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.off(); }
  undo() { this.light.on(); }
}

class RemoteControl {
  private history: Command[] = [];
  
  execute(command: Command) {
    command.execute();
    this.history.push(command);
  }
  
  undo() {
    const command = this.history.pop();
    command?.undo();
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

remote.execute(new LightOnCommand(light));  // Light ON
remote.execute(new LightOffCommand(light));  // Light OFF
remote.undo();  // Light ON (undo last)
\`\`\`

<h2 class="text-2xl font-bold mt-8 mb-4 text-primary">🎯 Quand utiliser ?</h2>

<ul class="my-4 list-disc pl-6">
  <li class="ml-4"><strong>Singleton</strong> : Config, DB pool, cache</li>
  <li class="ml-4"><strong>Factory</strong> : Variants objets (user types, vehicles)</li>
  <li class="ml-4"><strong>Builder</strong> : Objets complexes (HTTP requests, queries)</li>
  <li class="ml-4"><strong>Adapter</strong> : Intégration legacy/3rd party</li>
  <li class="ml-4"><strong>Decorator</strong> : Middlewares, logging, caching</li>
  <li class="ml-4"><strong>Observer</strong> : Events, reactive programming (React, Vue)</li>
  <li class="ml-4"><strong>Strategy</strong> : Payments, sorting, compression</li>
  <li class="ml-4"><strong>Command</strong> : Undo/Redo, task queues</li>
</ul>

> "Patterns = solutions, pas obligations." 🎨
    `
  },
];
