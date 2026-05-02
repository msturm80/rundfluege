export type Photo = {
  id: string;
  md: string;
  lg: string;
  alt: { de: string; en: string };
  caption?: { de: string; en: string };
  width: number;
  height: number;
};

const photo = (
  id: string,
  width: number,
  height: number,
  alt: { de: string; en: string },
  caption?: { de: string; en: string },
): Photo => ({
  id,
  md: `/images/photos/${id}_md.jpg`,
  lg: `/images/photos/${id}_lg.jpg`,
  alt,
  caption,
  width,
  height,
});

export const PHOTOS: Record<string, Photo> = {
  lindau: photo(
    "lindau",
    2400,
    1197,
    {
      de: "Luftaufnahme der Insel Lindau im Bodensee",
      en: "Aerial view of Lindau island in Lake Constance",
    },
    {
      de: "Lindau – Inselstadt mit historischem Hafen",
      en: "Lindau – island town with historic harbour",
    },
  ),
  mainau: photo(
    "mainau",
    2400,
    1601,
    {
      de: "Insel Mainau im Bodensee aus der Luft",
      en: "Mainau island in Lake Constance from the air",
    },
    {
      de: "Mainau – die Blumeninsel im westlichen Bodensee",
      en: "Mainau – the flower island on the western lake",
    },
  ),
  friedrichshafen: photo(
    "friedrichshafen",
    2400,
    1800,
    {
      de: "Friedrichshafen am Bodensee – Uferpanorama",
      en: "Friedrichshafen on Lake Constance — waterfront panorama",
    },
    {
      de: "Friedrichshafen – Heimathafen unseres Rundflugs",
      en: "Friedrichshafen – home airfield for our flights",
    },
  ),
  pfaender: photo(
    "pfaender",
    2048,
    1536,
    {
      de: "Sendemast am Pfänder, Blick aus der Cessna",
      en: "Pfänder transmitter mast seen from the Cessna",
    },
    {
      de: "Pfänder – Blick aus dem Cockpit",
      en: "Pfänder – view from the cockpit",
    },
  ),
  konstanz: photo(
    "konstanz",
    2400,
    1200,
    {
      de: "Konstanz am Bodensee aus der Luft",
      en: "Konstanz on Lake Constance from the air",
    },
    {
      de: "Konstanz – Altstadt und Seepanorama",
      en: "Konstanz – old town and lake panorama",
    },
  ),
  alps: photo(
    "alps",
    2048,
    1536,
    {
      de: "Verschneite Alpengipfel aus der Cessna",
      en: "Snow-capped Alps from the Cessna",
    },
    {
      de: "Alpenkulisse – Bergrundflüge an klaren Tagen",
      en: "Alpine panorama – mountain rounds on clear days",
    },
  ),
};

export const PILOT_PHOTOS = {
  cockpit: "/images/pilot/hans_cockpit.jpg",
  walking: "/images/pilot/hans_walking.jpg",
  withPlane: "/images/pilot/hans_with_plane.jpg",
} as const;

export const HERO_PHOTO = PHOTOS.lindau;
export const ABOUT_MAIN_PHOTO = PHOTOS.mainau;
export const ABOUT_SECONDARY_PHOTO = PHOTOS.alps;

export const GALLERY_ORDER: ReadonlyArray<keyof typeof PHOTOS> = [
  "lindau",
  "mainau",
  "friedrichshafen",
  "alps",
  "pfaender",
] as const;

export const galleryPhotos = (): Photo[] =>
  GALLERY_ORDER.map((id) => PHOTOS[id]);
