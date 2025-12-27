export default function HobbiesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-vintage-teal-800)' }}>
        Home Economics & Hobbies
      </h1>
      <div className="prose prose-lg max-w-none">
        <p style={{ color: 'var(--color-vintage-teal-700)' }}>
          Step into my world of personal interests, lifestyle pursuits, and creative hobbies.
          This section celebrates the art of homemaking, creative projects, and the joy of lifelong learning beyond academia.
        </p>
        <div className="mt-8 p-6 rounded-lg" style={{
          backgroundColor: 'var(--color-cream-100)',
          border: '2px solid var(--color-vintage-teal-200)'
        }}>
          <p className="italic" style={{ color: 'var(--color-cream-700)' }}>
            Content coming soon! Check back later for stories about home economics, hobbies, and personal projects.
          </p>
        </div>
      </div>
    </div>
  );
}
