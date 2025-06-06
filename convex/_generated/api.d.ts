/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analysis from "../analysis.js";
import type * as analysisActions from "../analysisActions.js";
import type * as claudeImageAnalysis from "../claudeImageAnalysis.js";
import type * as conversations from "../conversations.js";
import type * as metaNarrative from "../metaNarrative.js";
import type * as selfAnalysis from "../selfAnalysis.js";
import type * as selfAnalysisMutations from "../selfAnalysisMutations.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analysis: typeof analysis;
  analysisActions: typeof analysisActions;
  claudeImageAnalysis: typeof claudeImageAnalysis;
  conversations: typeof conversations;
  metaNarrative: typeof metaNarrative;
  selfAnalysis: typeof selfAnalysis;
  selfAnalysisMutations: typeof selfAnalysisMutations;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
