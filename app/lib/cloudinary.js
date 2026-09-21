const CLOUD_NAME = "akshat-portfolio";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/** Browser Cache Storage bucket for Cloudinary video blobs. */
export const VIDEO_CACHE_NAME = "akshat-cloudinary-videos-v1";

/** Strip file extension from a Cloudinary public id. */
export function stripExt(publicId = "") {
  return String(publicId).replace(/\.[^./]+$/, "");
}

/** Encode each public-id path segment (supports Hindi / special chars). */
function encodePublicId(publicId) {
  return String(publicId)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

/**
 * Build a Cloudinary delivery URL.
 * Transformed URLs are edge-cached by Cloudinary CDN.
 */
export function cloudinaryUrl({
  publicId,
  resourceType = "image",
  transforms = [],
} = {}) {
  if (!publicId) return null;
  const tx = transforms.filter(Boolean).join(",");
  const path = tx ? `${tx}/` : "";
  return `${BASE}/${resourceType}/upload/${path}${encodePublicId(publicId)}`;
}

/** Render a single PDF/PPT page as a JPEG (raw PDF download is blocked on this account). */
export function getPdfPageUrl(publicId, page = 1, width = 1400) {
  if (!publicId) return null;
  return cloudinaryUrl({
    publicId,
    resourceType: "image",
    transforms: ["f_jpg", `pg_${page}`, "q_auto", "c_limit", `w_${width}`],
  });
}

/**
 * Portfolio playback URL — capped, H.264 MP4 so Cloudinary caches a smaller
 * derived asset instead of re-serving the full original every time.
 */
export function getVideoPlaybackUrl(publicId) {
  if (!publicId) return null;
  return cloudinaryUrl({
    publicId,
    resourceType: "video",
    transforms: [
      "f_mp4",
      "vc_h264",
      "q_auto:eco",
      "c_limit",
      "w_1080",
      "ac_aac",
    ],
  });
}

/** Full-quality media URL for lightbox playback / large preview. */
export function getMediaUrl(item) {
  if (!item?.publicId) return null;

  if (item.type === "video") {
    return getVideoPlaybackUrl(item.publicId);
  }

  if (item.type === "ppt" || item.type === "pdf") {
    return getPdfPageUrl(item.publicId, 1, 1400);
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

/**
 * Direct CDN link (share / open original).
 * PDFs on this Cloudinary account return 401 without transforms,
 * so PPT/PDF links use a rendered page image instead.
 */
export function getOriginalUrl(item) {
  if (!item?.publicId) return null;

  if (item.type === "ppt" || item.type === "pdf") {
    return getPdfPageUrl(item.publicId, 1, 1600);
  }

  if (item.type === "video") {
    return getVideoPlaybackUrl(item.publicId);
  }

  return cloudinaryUrl({
    publicId: item.publicId,
    resourceType: "image",
  });
}

/** Read a video Response from Cache Storage (return visits). */
export async function matchCachedVideo(url) {
  if (!url || typeof caches === "undefined") return null;
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME);
    return (await cache.match(url)) || null;
  } catch {
    return null;
  }
}

/** Store a successful video response for next visit. */
export async function putCachedVideo(url, response) {
  if (!url || !response?.ok || typeof caches === "undefined") return;
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME);
    await cache.put(url, response.clone());
  } catch {
    // Quota / private mode — ignore
  }
}

/**
 * Resolve a playable video src: prefer Cache Storage blob on repeat visits,
 * otherwise stream from Cloudinary and warm the cache in the background.
 */
export async function resolveCachedVideoSrc(url) {
  if (!url) return null;

  const cached = await matchCachedVideo(url);
  if (cached) {
    const blob = await cached.blob();
    return URL.createObjectURL(blob);
  }

  // Warm CDN + browser cache without blocking first paint
  if (typeof fetch === "function") {
    fetch(url, { mode: "cors", credentials: "omit" })
      .then((res) => putCachedVideo(url, res))
      .catch(() => {});
  }

  return url;
}
