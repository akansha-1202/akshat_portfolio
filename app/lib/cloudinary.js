const CLOUD_NAME = "akshat-portfolio";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/** Strip file extension from a Cloudinary public id. */
export function stripExt(publicId = "") {
  return String(publicId).replace(/\.[^./]+$/, "");
}

/**
 * Build a Cloudinary delivery URL.
 * Transforms use q_auto / f_auto so the CDN caches optimized variants.
 */
export function cloudinaryUrl({
  publicId,
  resourceType = "image",
  transforms = [],
} = {}) {
  if (!publicId) return null;
  const tx = transforms.filter(Boolean).join(",");
  const path = tx ? `${tx}/` : "";
  return `${BASE}/${resourceType}/upload/${path}${publicId}`;
}

/** Full-quality media URL for lightbox playback / large preview. */
export function getMediaUrl(item) {
  if (!item?.publicId) return null;

  if (item.type === "video") {
    return cloudinaryUrl({
      publicId: item.publicId,
      resourceType: "video",
      transforms: ["q_auto"],
    });
  }

  if (item.type === "ppt" || item.type === "pdf") {
    // PDFs render as page images on this Cloudinary account
    return cloudinaryUrl({
      publicId: item.publicId,
      resourceType: "image",
      transforms: ["f_jpg", "pg_1", "q_auto", "c_limit", "w_1400"],
    });
  }

  return cloudinaryUrl({
    publicId: item.publicId,
    resourceType: "image",
    transforms: ["f_auto", "q_auto", "c_limit", "w_1600"],
  });
}

/** Cached thumbnail / poster URL (smaller, CDN-optimized). */
export function getThumbnailUrl(item, width = 600) {
  if (!item?.publicId) return null;

  if (item.type === "video") {
    return cloudinaryUrl({
      publicId: `${stripExt(item.publicId)}.jpg`,
      resourceType: "video",
      transforms: [`w_${width}`, "c_fill", "q_auto", "f_jpg", "so_0"],
    });
  }

  if (item.type === "ppt" || item.type === "pdf") {
    return cloudinaryUrl({
      publicId: item.publicId,
      resourceType: "image",
      transforms: ["f_jpg", "pg_1", `w_${width}`, "c_fill", "q_auto"],
    });
  }

  return cloudinaryUrl({
    publicId: item.publicId,
    resourceType: "image",
    transforms: ["f_auto", "q_auto", "c_fill", `w_${width}`],
  });
}

/** Direct CDN link (share / open original). */
export function getOriginalUrl(item) {
  if (!item?.publicId) return null;
  const resourceType =
    item.type === "video" ? "video" : "image";
  return cloudinaryUrl({
    publicId: item.publicId,
    resourceType,
  });
}
