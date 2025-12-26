export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto text-center py-12">
      <h1 className="font-serif text-4xl font-bold text-stone-900 mb-6">Get in Touch</h1>
      <p className="text-lg text-stone-600 mb-8 leading-relaxed font-serif">
        I'd love to hear from you! Whether you have a question, a story to share, or just want to say hello.
      </p>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 inline-block">
        <p className="text-stone-800 font-medium mb-2">You can email me at:</p>
        <a href="mailto:hello@example.com" className="text-2xl font-bold text-stone-900 hover:text-stone-600 border-b-2 border-stone-300 hover:border-stone-600 transition-colors">
          hello@example.com
        </a>
      </div>
    </div>
  );
}
