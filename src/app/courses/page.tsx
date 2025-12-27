export default function CoursesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-vintage-teal-800)' }}>
        Courses I Teach
      </h1>
      <div className="prose prose-lg max-w-none">
        <p style={{ color: 'var(--color-vintage-teal-700)' }}>
          Discover the courses I teach and my educational philosophy.
          This section showcases my teaching portfolio, course descriptions, and educational resources.
        </p>
        <div className="mt-8 p-6 rounded-lg" style={{
          backgroundColor: 'var(--color-cream-100)',
          border: '2px solid var(--color-vintage-teal-200)'
        }}>
          <p className="italic" style={{ color: 'var(--color-cream-700)' }}>
            Content coming soon! Check back later for information about my current and upcoming courses.
          </p>
        </div>
      </div>
    </div>
  );
}
