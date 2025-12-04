import { articles, auth, client } from "@/utils/api";

/**
 * Fetch all notices
 */
export const fetchNotices = async () => {
  try {
    const records = await articles.fetchAll({ page: 1, limit: 100 });
    console.log("Notices fetched:", records);

    let articlesList = [];

    // if API returned { items: [...] } or similar, normalize to array
    if (Array.isArray(records)) {
      articlesList = records;
    } else if (records.items) {
      articlesList = records.items;
    } else if (records.articles) {
      articlesList = records.articles;
    } else if (typeof records === "object" && records !== null) {
      // If it's an object, try to extract array from common keys
      const possibleKeys = ["data", "results", "records"];
      for (const key of possibleKeys) {
        if (Array.isArray(records[key])) {
          articlesList = records[key];
          break;
        }
      }
    }

    // Map 'published' boolean to 'status' string for frontend
    return articlesList.map((article) => ({
      ...article,
      status: article.published ? "published" : "draft",
      created: article.createdAt,
      updated: article.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
};

/**
 * Fetch a single notice by ID
 */
export const fetchNoticeById = async (id) => {
  try {
    const record = await articles.fetchById(id);
    // Map 'published' boolean to 'status' string for frontend
    return {
      ...record,
      status: record.published ? "published" : "draft",
      created: record.createdAt,
      updated: record.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};

/**
 * Create a new notice
 * Accepts plain JSON (no image uploads)
 */
export const createNotice = async (data) => {
  try {
    const payload = {
      title: data.title,
      content: data.content,
      published: data.status === "published",
    };

    const record = await articles.create(payload);
    return record;
  } catch (error) {
    console.error("Error creating notice:", error);
    throw error;
  }
};

/**
 * Update a notice
 */
export const updateNotice = async (id, data) => {
  try {
    const payload = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.content !== undefined) payload.content = data.content;
    if (data.status !== undefined)
      payload.published = data.status === "published";

    const record = await articles.update(id, payload);
    return record;
  } catch (error) {
    console.error("Error updating notice:", error);
    throw error;
  }
};

/**
 * Delete a notice
 */
export const deleteNotice = async (id) => {
  try {
    await articles.remove(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};

/**
 * Toggle notice status (published/draft)
 * Ensures only one notice can be published at a time
 */
export const toggleNoticeStatus = async (id, currentStatus) => {
  try {
    const newPublishedValue = currentStatus !== "published";

    // If publishing, the backend will automatically unpublish other articles
    // Update the target notice
    const record = await articles.update(id, { published: newPublishedValue });
    return record;
  } catch (error) {
    console.error("Error toggling notice status:", error);
    throw error;
  }
};

/**
 * Get currently published notice (client-side filter)
 */
export const getPublishedNotice = async () => {
  try {
    const all = await fetchNotices();
    const published = all
      .filter((n) => n.status === "published")
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.created) -
          new Date(a.createdAt || a.created)
      );
    return published[0] || null;
  } catch (error) {
    console.error("Error fetching published notice:", error);
    throw error;
  }
};

export const getAnnouncement = async () => {
  try {
    const response = await client.get("articles/announcement");
    const payload = response?.data;
    let record = payload;

    if (
      payload &&
      typeof payload === "object" &&
      payload.success &&
      payload.data
    ) {
      record = payload.data;
    }

    if (!record) return null;

    return {
      ...record,
      status: record.published ? "published" : "draft",
      created: record.createdAt || record.created,
      updated: record.updatedAt || record.updated,
    };
  } catch (error) {
    // If it's a 404 or the announcement doesn't exist, return null instead of throwing
    if (
      error.response &&
      (error.response.status === 404 || error.response.status === 400)
    ) {
      console.log("No published announcement found");
      return null;
    }
    console.error("Error fetching announcement:", error);
    throw error;
  }
};
