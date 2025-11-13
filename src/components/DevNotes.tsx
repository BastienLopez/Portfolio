import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { allArticles, Article } from '../data/articles';

const articles = allArticles;
const DevNotes = () => {
  const [selectedCategory, setSelectedCategory] = useState<'culture' | 'devops' | 'tools' | 'architecture' | 'freelance' | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categoryConfig = {
    culture: {
      emoji: '🧠',
      title: 'Culture & Méthodes',
      color: 'from-purple-500 to-pink-500'
    },
    devops: {
      emoji: '⚙️',
      title: 'CI/CD & DevOps',
      color: 'from-blue-500 to-cyan-500'
    },
    tools: {
      emoji: '🧩',
      title: 'Outils & Productivité',
      color: 'from-green-500 to-emerald-500'
    },
    architecture: {
      emoji: '🧰',
      title: 'Architecture & Bonnes pratiques',
      color: 'from-orange-500 to-red-500'
    },
    freelance: {
      emoji: '💼',
      title: 'Gestion de projet & Freelance',
      color: 'from-indigo-500 to-purple-500'
    }
  };

  const filteredArticles = selectedCategory 
    ? articles.filter(article => article.category === selectedCategory)
    : [];

  const handleCategoryClick = (category: 'culture' | 'devops' | 'tools' | 'architecture' | 'freelance') => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedArticle(null);
    } else {
      setSelectedCategory(category);
      setSelectedArticle(null);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  return (
    <section id="devnotes" className="py-20 px-4 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-6xl w-full">
        <div className="text-center mb-12 w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dev Notes 📝</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-2 px-4">
            Une collection d'articles sur les bonnes pratiques de développement,
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
            les méthodologies agiles et les outils pour être plus productif.
          </p>
          
          {!selectedArticle && (
            <p className="text-sm md:text-md text-muted-foreground font-medium mb-8">
              Sélectionnez le topic souhaité :
            </p>
          )}
        </div>

        {/* Article Detail View */}
        {selectedArticle ? (
          <div className="max-w-4xl mx-auto w-full">
            <Button 
              onClick={handleBackToList}
              variant="outline"
              className="mb-6"
            >
              ← Retour aux articles
            </Button>
            
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {categoryConfig[selectedArticle.category].emoji}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {categoryConfig[selectedArticle.category].title}
                  </span>
                </div>
                <CardTitle className="text-xl md:text-2xl">{selectedArticle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm md:prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mb-6
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                    prose-p:my-3 prose-p:leading-relaxed
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                    prose-strong:text-primary
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4
                    prose-li:my-0.5 prose-li:list-disc prose-li:ml-6
                    prose-ul:my-3 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-6
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                    prose-table:my-6 prose-table:w-full prose-table:border-collapse
                    prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                    prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-3
                    prose-img:rounded-lg prose-img:my-6
                    [&_ul]:my-3 [&_ul]:space-y-0
                    [&_li]:my-0.5 [&_li]:leading-relaxed">
                  {selectedArticle.content ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                  ) : (
                    <p className="text-muted-foreground italic">
                      Contenu de l'article à venir...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Category Buttons */}
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mb-12 px-2">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Button
                  key={key}
                  onClick={() => handleCategoryClick(key as 'culture' | 'devops' | 'tools' | 'architecture' | 'freelance')}
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`w-full sm:w-auto text-sm md:text-base lg:text-lg px-4 md:px-5 lg:px-6 py-4 md:py-4 lg:py-5 transition-all ${
                    selectedCategory === key 
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg` 
                      : 'hover:scale-105'
                  }`}
                >
                  <span className="mr-2 text-lg">{config.emoji}</span>
                  <span>{config.title}</span>
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            {selectedCategory && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 w-full"
                    onClick={() => handleArticleClick(article)}
                  >
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" className="px-0">
                        Lire l'article →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DevNotes;
