export default function PapersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-vintage-teal-800)' }}>
        Conferences & Papers
      </h1>
      <div className="prose prose-lg max-w-none">
        <p style={{ color: 'var(--color-vintage-teal-700)' }}>
          Explore my academic research, scholarly publications, and conference presentations.
          This section features peer-reviewed papers, research articles, and presentations from academic conferences.
        </p>
        <div className="mt-8 p-6 rounded-lg" style={{
          backgroundColor: 'var(--color-cream-100)',
          border: '2px solid var(--color-vintage-teal-200)'
        }}>
          <p className="italic" style={{ color: 'var(--color-cream-700)' }}>
            Content coming soon! Check back later for my latest research papers and conference presentations.
          </p>
        </div>
      </div>
    </div>
  );
}
