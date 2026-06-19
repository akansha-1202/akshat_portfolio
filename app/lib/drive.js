/**
 * Google Drive helpers for embeds without downloading files.
 *
 * File ID: open file → Share (Anyone with link) → copy from
 * https://drive.google.com/file/d/FILE_ID/view
 *
 * Folder ID: open folder → copy from
 * https://drive.google.com/drive/folders/FOLDER_ID
 */

export function getDriveFileId(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (!trimmed.includes("/") && trimmed.length > 10) return trimmed;

  const patterns = [
    /\/file\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
    /\/open\?id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getDriveFolderId(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (!trimmed.includes("/") && trimmed.length > 10) return trimmed;

  const match = trimmed.match(/\/folders\/([^/?]+)/);
  return match?.[1] || null;
}

export function getDriveEmbedUrl(fileIdOrUrl) {
  const fileId = getDriveFileId(fileIdOrUrl);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveViewUrl(fileIdOrUrl) {
  const fileId = getDriveFileId(fileIdOrUrl);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/view`;
}

export function getDriveFolderUrl(folderIdOrUrl) {
  const folderId = getDriveFolderId(folderIdOrUrl);
  if (!folderId) return null;
  return `https://drive.google.com/drive/folders/${folderId}`;
}

export function getDriveThumbnailUrl(fileIdOrUrl, size = 800) {
  const fileId = getDriveFileId(fileIdOrUrl);
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
