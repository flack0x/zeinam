export default function AboutPage() {
  return (
    <article className="max-w-2xl mx-auto prose prose-stone prose-lg font-serif text-stone-800 leading-loose">
      <h1 className="text-4xl font-bold text-center mb-8">About Me</h1>
      
      <div className="relative h-80 w-full mb-10 rounded-xl overflow-hidden shadow-md bg-stone-200">
         {/* Placeholder for her photo */}
         <div className="flex items-center justify-center h-full text-stone-500 italic">
            (Place your photo here)
         </div>
      </div>

      <p>
        Hello! Welcome to my little corner of the internet. I created this space to share stories, 
        recipes, and the little moments that make life beautiful.
      </p>
      <p>
        Whether you are here for a quick read or to stay for a while, I hope you find something 
        that warms your heart.
      </p>
    </article>
  );
}
