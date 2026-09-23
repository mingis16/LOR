// Curated photography manifest — sourced from the venue's own restaurant and
// gym photo sets in /public/images. Central place so components don't
// hardcode raw filenames.

export interface GalleryImage {
  src: string;
  alt: string;
}

export const RESTAURANT_HERO: GalleryImage = {
  src: "/images/restaurant/hero-dining.jpg",
  alt: "Rooftop dining terrace at LÖR overlooking the Freetown coastline at sunset",
};

export const RESTAURANT_GALLERY: GalleryImage[] = [
  { src: "/images/restaurant/hero-terrace.jpg", alt: "LÖR rooftop terrace with ocean views and shaded lounge seating" },
  { src: "/images/restaurant/interior-lounge.jpg", alt: "LÖR indoor lounge with gold leaf-shaped pendant lighting" },
  { src: "/images/restaurant/dish-sushi-spread.jpg", alt: "Sharing platter of sushi and grilled skewers at LÖR" },
  { src: "/images/restaurant/interior-bar.jpg", alt: "Moody, low-lit cocktail bar inside LÖR Lounge" },
  { src: "/images/restaurant/hero-oceanview-table.jpg", alt: "Table set for dining directly beside the ocean at LÖR" },
  { src: "/images/restaurant/dish-tomahawk.jpg", alt: "Tomahawk steak presentation table-side at LÖR" },
  { src: "/images/restaurant/cocktail-sunset.jpg", alt: "Signature LÖR cocktail with a sunset ocean backdrop" },
  { src: "/images/restaurant/gallery-terrace-day.jpg", alt: "LÖR rooftop terrace seating by day with sea view" },
];

export const GYM_HERO: GalleryImage = {
  src: "/images/gym/hero-exterior-night.jpg",
  alt: "Royal Fitness and LÖR complex exterior lit up at night on Goderich Road",
};

export const GYM_GALLERY: GalleryImage[] = [
  { src: "/images/gym/floor-main.jpg", alt: "Royal Fitness main training floor with full Technogym equipment line" },
  { src: "/images/gym/zone-functional.jpg", alt: "Functional training zone with punch bags, kettlebells and a rig" },
  { src: "/images/gym/studio-spin.jpg", alt: "Neon-lit indoor spin studio at Royal Fitness" },
  { src: "/images/gym/cardio-oceanview.jpg", alt: "Row of Technogym treadmills facing floor-to-ceiling ocean views" },
  { src: "/images/gym/zone-cardio-balls.jpg", alt: "Cardio zone with stability balls and medicine balls" },
  { src: "/images/gym/floor-tire-zone.jpg", alt: "Strength and conditioning zone with tire-flip station" },
  { src: "/images/gym/locker-room.jpg", alt: "Royal Fitness locker room with numbered lockers and benches" },
  { src: "/images/gym/corridor-treadmills.jpg", alt: "Wide training corridor lined with cardio machines" },
];
