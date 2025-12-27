export default function BooksPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-vintage-teal-800)' }}>
        Books
      </h1>
      <div className="prose prose-lg max-w-none">
        <p style={{ color: 'var(--color-vintage-teal-700)' }}>
          Welcome to my library of published works and literary contributions.
          This section showcases my books, chapters, and other written works.
        </p>
        <div className="mt-8 p-6 rounded-lg" style={{
          backgroundColor: 'var(--color-cream-100)',
          border: '2px solid var(--color-vintage-teal-200)'
        }}>
          <p className="italic" style={{ color: 'var(--color-cream-700)' }}>
            Content coming soon! Check back later for updates on my published books and writing projects.
          </p>
        </div>
      </div>
    </div>
  );
}
