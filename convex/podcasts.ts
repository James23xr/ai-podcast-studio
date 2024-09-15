import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    audioUrl: v.string(),
    id: v.optional(v.string()), // Add this line to accept the id field
  },
  handler: async (ctx, args) => {
    const { id, ...podcastData } = args; // Remove the id from the data to be inserted
    const podcastId = await ctx.db.insert('podcasts', podcastData);
    return { id: podcastId };
  },
});