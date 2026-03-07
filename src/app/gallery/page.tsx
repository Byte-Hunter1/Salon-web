export const dynamic = "force-dynamic";
import Link from 'next/link';
import './gallery.css';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In Next.js App Router, searchParams is a promise in Next 15, but we are using whatever version npx create-next-app brought (likely 15).
// In Next.js 15, `searchParams` needs to be awaited.
export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const categories = await prisma.category.findMany();
  
  // Apply category filter if requested
  const where = resolvedParams.category ? { categoryId: resolvedParams.category } : {};
  const hairstyles = await prisma.hairstyle.findMany({ 
    where,
    include: { category: true }
  });

  return (
    <div className="page-container">
      <div className="page-header gallery-header">
        <h1>Hairstyle Gallery</h1>
        <p>Find inspiration for your next look.</p>
      </div>

      <div className="container section">
        {/* Category Filters */}
        <div className="filter-tabs">
          <Link href="/gallery" className={`filter-tab ${!resolvedParams.category ? 'active' : ''}`}>All</Link>
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              href={`/gallery?category=${cat.id}`} 
              className={`filter-tab ${resolvedParams.category === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid-3">
          {hairstyles.map(style => (
            <div key={style.id} className="gallery-item glass">
              <div className="gallery-img-container">
                <img src={style.imageUrl} alt={style.name} className="gallery-img" />
              </div>
              <div className="gallery-item-content">
                <div className="gallery-item-header">
                  <h3>{style.name}</h3>
                  <span className="tag">{style.category.name}</span>
                </div>
                <p className="desc">{style.description}</p>
                <div className="gallery-action">
                  <Link href={`/book?hairstyle=${style.id}`} className="btn btn-outline btn-full">Book This Style</Link>
                </div>
              </div>
            </div>
          ))}
          {hairstyles.length === 0 && (
            <div className="empty-state">No hairstyles found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}
