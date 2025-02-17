// components/ProgressBar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Import from `next/navigation` in the `app` directory setup
import NProgress from "nprogress";

import { Suspense, useEffect } from "react";
type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

const ProgressBar = () => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;

      const currentUrl = window.location.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("a[href]");

      const filteredAnchors = Array.from(anchorElements).filter((element) => {
        const rel = element.getAttribute("rel");

        const href = element.getAttribute("href");

        const target = element.getAttribute("target");

        return (
          href?.startsWith("/") && target !== "_blank" && rel !== "noopener"
        );
      });

      filteredAnchors.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return (
    <Suspense fallback={null}>
      <NProgressDone />
    </Suspense>
  );
};

export default ProgressBar;

function NProgressDone() {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router, searchParams]);

  return null;
}
