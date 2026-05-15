import { client } from './lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function Home() {
  // Fetch entries matching the template's exact ID
  const response = await client.getEntries({ content_type: 'pageBlogPost' });
  const posts = response.items;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          My Headless CMS Blog
        </h1>
        
        <div className="space-y-6">
          {posts.map((post: any) => (
            <article 
              key={post.sys.id} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {post.fields.title}
              </h2>
              {/* Checking if there is content before rendering to prevent errors */}
              {post.fields.content && (
                <div className="text-gray-600 prose">
                  {documentToReactComponents(post.fields.content)}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
