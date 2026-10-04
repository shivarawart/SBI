import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isOwnerRoute = createRouteMatcher(["/owner(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isOwnerRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ico|webp|mp4|webm|woff2?|ttf|map)).*)",
    "/(api|trpc)(.*)",
  ],
};
