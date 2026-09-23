import Image from "next/image";
import type { GalleryImage } from "@/lib/images";
import { cn } from "@/lib/utils";

export function PhotoGrid({ images, className }: { images: GalleryImage[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", className)}>
      {images.map((image, i) => (
        <div
          key={image.src}
          className={cn(
            "relative aspect-square overflow-hidden rounded-2xl border border-white/10",
            i === 0 && "col-span-2 row-span-2 aspect-square sm:aspect-auto"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
