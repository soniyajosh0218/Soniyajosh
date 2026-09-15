export type MomentPhoto = {
  src: string;
  rotate: number;
};

const rotates = [-3.5, 2.5, -2, 3, -2.5, 1.5, -3, 2, -1.5, 3.5, -2.8, 1.8];

const imageFiles = [
  "4912cbb9-763c-4eff-829c-73e7901fb51a.JPG",
  "655e872a-159f-4c4a-952b-0db3713266f5.jpg",
  "IMG_0755.jpg",
  "IMG_2676.jpg",
  "IMG_4378.JPG",
  "IMG_4670.JPG",
  "IMG_4703.JPG",
  "IMG_4754.jpg",
  "IMG_4819.jpg",
  "IMG_4888.JPG",
  "IMG_6990.jpg",
  "IMG_7153.jpg",
  "IMG_7191.jpg",
  "IMG_7568.jpg",
  "IMG_7571.jpg",
  "IMG_7783.jpg",
  "IMG_7900.jpg",
  "IMG_7913.jpg",
  "IMG_7918.jpg",
  "IMG_7984.jpg",
  "IMG_8071.jpg",
  "IMG_8883.PNG",
  "IMG_9216.jpg",
  "PHOTO-2025-09-16-23-10-51.jpg",
  "PHOTO-2025-12-06-10-32-22.jpg",
  "PHOTO-2025-12-06-18-50-56.jpg",
  "PHOTO-2025-12-27-22-30-08.jpg",
  "PHOTO-2026-01-02-20-16-03.jpg",
  "PHOTO-2026-01-04-23-54-44.jpg",
  "PHOTO-2026-04-15-22-43-27.jpg",
  "PHOTO-2026-05-25-13-09-41.jpg",
  "PHOTO-2026-06-19-15-12-15.jpg",
  "PHOTO-2026-06-19-21-49-37.jpg",
  "PHOTO-2026-06-29-20-15-25.jpg",
  "PHOTO-2026-07-26-22-42-43.jpg",
  "PHOTO-2026-08-12-23-21-31.jpg",
  "PHOTO-2026-09-09-02-02-27.jpg",
  "PHOTO-2026-09-09-02-02-28.jpg",
  "PHOTO-2026-09-12-22-29-13.jpg",
  "PHOTO-2026-09-12-22-30-32.jpg",
  "PHOTO-2026-09-12-22-35-14.jpg",
  "PHOTO-2026-09-12-22-35-15.jpg",
  "b3ddccb9-d0bd-48c8-bbee-c621bb8d997f.JPG",
  "e562f5b7-d43d-4c05-a27c-10591cbcaeb9.jpg",
];

export const moments: MomentPhoto[] = imageFiles.map((file, i) => ({
  src: `/Photos/${encodeURIComponent(file)}`,
  rotate: rotates[i % rotates.length],
}));
