import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Mutations for storing analysis results
export const createUserProfile = mutation({
  args: {
    userId: v.id("users"),
    primaryArchetype: v.union(
      v.literal("PRINCE"), v.literal("CHILD"),
      v.literal("WARRIOR"), v.literal("SOLDIER"), 
      v.literal("JOKER"), v.literal("AFFAIRIST"),
      v.literal("EMPEROR"), v.literal("DADDY"),
      v.literal("SAGE"), v.literal("ORACLE"),
      v.literal("GUARDIAN"), v.literal("PROTECTOR"),
      v.literal("PIONEER"), v.literal("EXPLORER"),
      v.literal("COLLECTOR"), v.literal("CURATOR")
    ),
    archetypeConfidence: v.number(),
    communicationStyle: v.any(),
    personalVulnerabilities: v.any(),
    powerLawViolations: v.any(),
    nlpProfile: v.any(),
    chatSampleSize: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("userProfiles", {
      ...args,
      analyzedAt: Date.now(),
    });
  },
});

export const createCharacterRemodeling = mutation({
  args: {
    userId: v.id("users"),
    targetAnalysisId: v.id("analyses"),
    adaptivePersona: v.any(),
    communicationAdjustments: v.any(),
    vulnerabilityMitigation: v.any(),
    characterDevelopment: v.any(),
    synergyAnalysis: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("characterRemodeling", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Queries
export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const getCharacterRemodeling = query({
  args: { targetAnalysisId: v.id("analyses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("characterRemodeling")
      .withIndex("by_target", (q) => q.eq("targetAnalysisId", args.targetAnalysisId))
      .filter((q) => q.eq(q.field("userId"), user._id))
      .first();
  },
});